import {Router} from "express";
import { sample_foods, sample_tags } from "../data.js";
import {SearchHistory} from "../models/searchHistory.model.js";
import mongoose from "mongoose";
import { foodModel } from "../models/food.model.js";
import handler from "express-async-handler";
import admin from '../middleware/admin.mid.js';
import { userModel } from "../models/user.model.js";
import { GEMINI_API_KEY, create_prompt, personalized_food_recommendation_prompt } from "./GeminiUtils/gemini_utils.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

import dotenv from "dotenv";
dotenv.config();

const router = Router();
let StoredFoodData ;
let personalized_food_data = {} ;


if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY not found environment variable is not set.");
}
let genAI ;
try {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
} catch (err){
  console.log("error", err.message);
}


const update_catched_food_data = async () => {
  const allFoods = await foodModel.find({});
  StoredFoodData = allFoods;
  personalized_food_data = {};
}

// const update_catched_personalized_food_data = async (userId, allFoods) => {
//   const recommendedItems = await getRecommendations(userId);

//   let sortedFoods = [];
//   const notRecommendedFoods = [];
//   recommendedItems.forEach((item) => {
//       const foodsWithItem = allFoods.filter((food) =>
//           food.name.toLowerCase().includes(item.toLowerCase())
//       );
//       sortedFoods.push(...foodsWithItem);
//   });
//   allFoods.forEach((food) => {
//       if (
//           !recommendedItems.some((item) =>
//               food.name.toLowerCase().includes(item.toLowerCase())
//           )
//       ) {
//           notRecommendedFoods.push(food);
//       }

//   personalized_food_data[userId] = sortedFoods;
// }

const update_catched_personalized_food_data = async (userId, allFoods) => {
  const recommendedItems = await getRecommendations(userId);
  console.log(recommendedItems);
  
  if(!StoredFoodData) {
    await update_catched_food_data();
  }

  const context = personalized_food_recommendation_prompt(recommendedItems , StoredFoodData) ; 

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  let sorted_foods = [];

  try {
      const result = await model.generateContent(context);
      const gemini_response = result.response.text();
      // store given ids in new array 
      // add all other ids in last of new array
      sorted_foods = StoredFoodData.filter((food) => {
        return gemini_response.includes(food._id);
      })
      let other_foods = StoredFoodData.filter((food) => {
        return !gemini_response.includes(food._id);
      })
      sorted_foods = [...sorted_foods , ...other_foods];
  } catch (error) {
      console.error("Error:", error);
  }
  
  personalized_food_data[userId] = sorted_foods;
}

const removeDuplicatesById = (foods) => {
  const seen = new Set();
  return foods.filter((food) => {
      if (seen.has(food._id.toString())) return false;
      seen.add(food._id.toString());
      return true;
  });
};

router.get("/", async (req, res) => {
  try {
      const userId = req.query.id; 

      if(!userId && StoredFoodData) {
        return res.send(StoredFoodData);
      } 
      if(!StoredFoodData) {
        await update_catched_food_data();
      }
      if(userId == 'undefined' || userId == 'null'){
        return res.send(StoredFoodData);
      }
      const allFoods = StoredFoodData;
      if (!userId) {
        return res.send(allFoods);
      }
      if(personalized_food_data[userId]) {
        return res.send(personalized_food_data[userId]);
      }
      await update_catched_personalized_food_data(userId, allFoods);
      if(!personalized_food_data[userId] || personalized_food_data[userId].length == 0) {
        return res.send(StoredFoodData);
      }
      return res.send(personalized_food_data[userId]);
  } catch (error) {
      console.error("Error fetching food data:", error);
      return res.status(500).send({ error: "Error fetching food data." });
  }
});

router.get("/favourites", handler (async (req, res) => {
  const {userId , foodId} = req.query;
  const user = await userModel.findById(userId);
  let isFavourite = false;
  if(user.favourite_food){
    isFavourite = user.favourite_food.includes(foodId);
  }
  res.status(200).json({
    success : true,
    data : isFavourite
  })
}));

router.post("/favourites", handler (async (req, res) => {
  const {userId , foodId} = req.body;
  const foodProduct = await userModel.findByIdAndUpdate(
    {_id : userId},
    {
      $push : {
        favourite_food : foodId
      }
    },
    {new : true}
  );
  res.status(200).json({
    success : true,
    data : foodProduct
  })
}));

router.delete("/favourites", handler (async (req, res) => {
  const {userId , foodId} = req.query;
  const foodProduct = await userModel.findByIdAndUpdate(
    {_id : userId},
    {
      $pull : {
        favourite_food : foodId
      }
    },
    {new : true}
  );
  res.status(200).json({
    success : true,
    data : foodProduct
  })

}));

router.post("/review", handler (async (req, res) => {
  const {id , comment , rating, email, name} = req.body;
  const foodProduct = await foodModel.findByIdAndUpdate(
    {_id : id},
    {
      $push : {
        reviews : {comment , rating, email, name}
      }
    },
    {new : true}
  );
  const updatedFood = await foodModel.findByIdAndUpdate(
    {_id : id},
    {
      $set : {
        rating : foodProduct.averageRating
      }
    },
    {new : true}
  );
  await update_catched_food_data();
  res.status(200).json({
    success : true,
    message : "Upload Success",
    data : updatedFood
  })
}));

router.delete("/review", handler (async (req, res) => {
  const {reviewId , foodId} = req.query;
  const foodProduct = await foodModel.findByIdAndUpdate(
    {_id : foodId}, 
    {
      $pull : {
        reviews : {_id : reviewId}
      }
    },
    {new : true}
  );
  const updatedFood = await foodModel.findByIdAndUpdate(
    {_id : foodId},
    {
      $set : {
        rating : foodProduct.averageRating
      }
    },
    {new : true}
  );
  await update_catched_food_data();
  res.status(200).json({
    success : true,
    message : "Data fetched success",
    data : updatedFood
  });
}));


router.get("/reviews/:id", handler (async (req, res) => {
  const {id} = req.params;
  const foodProduct = await foodModel.findById({_id : id});
  res.status(200).json({
    success : true,
    message : "Data fetched success",
    data : foodProduct.reviews
  });
}));

router.post('/',
  admin,
  handler(async (req, res) => {
    const { name, price, tags, favorite, imageUrl, origins, cookTime } = req.body;
    const food = new foodModel({
      name,
      price,
      tags: tags.split ? tags.split(',') : tags,
      favorite,
      imageUrl,
      origins: origins.split ? origins.split(',') : origins,
      cookTime,
    });

    await food.save();
    await update_catched_food_data();
    res.send(food);
  })
);


router.put('/',
  admin,
  handler(async (req, res) => {
    const { id, name, price, tags, favorite, imageUrl, origins, cookTime } =
      req.body;

    await foodModel.updateOne(
      { _id: id },
      {
        name,
        price,
        tags: tags.split ? tags.split(',') : tags,
        favorite,
        imageUrl,
        origins: origins.split ? origins.split(',') : origins,
        cookTime,
      }
    );
    await update_catched_food_data();
    res.send();
  })
);
router.delete('/:foodId',
  admin,
  handler(async (req, res) => {
    const { foodId } = req.params;
    await foodModel.deleteOne({ _id: foodId });
    await update_catched_food_data();
    res.send();
  })
);

router.get("/search/:searchTerm", handler ( async (req,res) => {
    const searchTerm = req.params.searchTerm;
    const searchRegex = new RegExp(searchTerm , 'i');
    const foods = await foodModel.find({name : {$regex : searchRegex }});
    res.send(foods);
}));

router.post('/saveSearch', async (req, res) => {
  console.log("save Seach called");
  const { id, term } = req.body;
  const newSearch = new SearchHistory({ userId: id, searchTerm: term });
  try {
    const searchCount = await SearchHistory.countDocuments({ userId: id });
    if (searchCount >= 6) {
      const oldestSearch = await SearchHistory.findOneAndDelete({ userId: id }, { sort: { timestamp: 1 } });
    }
    await newSearch.save();
    await update_catched_personalized_food_data(id , StoredFoodData);

    res.status(201).json({ message: 'Search saved' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving search' });
  }
});

router.post('/removeSearch', async (req, res) => {
  const { id, term } = req.body;
  try {
    await SearchHistory.findOneAndDelete({usrId : id , searchTerm : term});
    await update_catched_personalized_food_data(id , StoredFoodData);

    res.status(201).json({ message: 'Search removed' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing search' });
  }
});


const getRecommendations = async (userId) => {
  try {
    const searches = await SearchHistory.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$searchTerm', count: { $sum: 1 }, lastSearchedAt: { $last: '$timestamp' } } },
      { $sort: { lastSearchedAt: -1, count: -1 } }, // Sort by last searched time and then by count
      { $limit: 4 }
    ]);
    const recommendedItems = searches.map(search => search._id);
    return recommendedItems;
  } catch (error) {
    console.error(error);
    return [];
  }
};
  
router.get('/recommendations/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const recommendations = await getRecommendations(userId);
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recommendations' });
  }
});

router.get("/tags/getAll", handler (async (req, res) => {
    const userId = req.query.id; 
    const tags = await foodModel.aggregate([
        {
            $unwind : '$tags' ,
        },
        {
            $group : {
                _id : '$tags',
                count : {$sum : 1} ,
            },
        },
        {
            $project : {
                _id : 0,
                name : "$_id",
                count : "$count",
            }
        }
    ]).sort({count : -1 }); // -1 for descending and 1 is for ascending 
    
    if(userId){
      const foodIds = await userModel.findById({_id : userId});
      if(!foodIds.favourite_food) {
        return res.send(ans);
      }
      tags.unshift({name : "favourites" , count : foodIds.favourite_food.length });
    }

    res.send(tags);
}));

router.get("/tags/:tag",handler( async (req, res) => {
    const {tag} = req.params;
    const foods = await foodModel.find({tags : tag});
    res.send(foods);
}));

router.get("/tags/favourites/:userId", handler (async (req, res) => {
  const {userId} = req.params;
  const foodIds = (await userModel.findById({_id : userId})).favourite_food;
  const foods = await foodModel.find({ _id: { $in: foodIds } });
  res.send(foods);
}));

router.get("/:id",handler( async (req, res) => {
    const {id} = req.params;
    const food = await foodModel.findById(id);
    res.send(food);
}));


const filter_food_based_on_ids = async (ids) => {
  if(!StoredFoodData) {
    await update_catched_food_data();
  }
  const result_food_data = StoredFoodData.filter((food) => {
    return ids.includes(food._id);
  })

  return result_food_data;
}


router.post("/ai_query", async (req, res) => {

  const { prompt, userId } = req.body;

  if(!StoredFoodData) {
    await update_catched_food_data();
  }

  if (!prompt || !userId) {
      return res.status(400).json({ error: "Prompt and userId are required" });
  }

  const context = create_prompt(prompt , StoredFoodData) ; 
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
      const result = await model.generateContent(context);
      const filtered_foods = await filter_food_based_on_ids(result.response.text());

      res.status(200).send(filtered_foods)

  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Something went wrong!" });
  }
});


export default router;