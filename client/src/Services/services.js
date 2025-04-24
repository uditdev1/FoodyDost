import axios from "axios";

export const getAll = async (id) => {
    const response =  await axios.get(`/api/foods` + (id ? "?id=" + id : ""));
    return response;
}

export const getAllTags = async (userId) => {
    const response =  await axios.get("/api/foods/tags/getAll" + (userId && "?id=" + userId ));
    return response;
}

export const getAllByTag = async (tag, userId) => {
    const response = tag.toLocaleLowerCase() == "favourites" ?
        await axios.get("/api/foods/tags/favourites/" + userId)
        :
        await axios.get("/api/foods/tags/" + tag);
    return response;
}

// favourite in food page not working ...

// export const searchFood = async (searchTerm) => {
//     const response = await axios.get("/api/foods/search/" + searchTerm);
//     console.log(response);
//     return response;
// }

export const searchFood = async (searchTerm) => {
    try {
        const response = await axios.post("/api/foods/ai_query" , {prompt : searchTerm , userId : "finding"});
        return response;
    } catch (err) {
        console.log("searching error ... ", err);
    }
}

export const saveSearchTerm = async (id , term) => {
    await axios.post("/api/foods/saveSearch", {id , term});
}
export const removeSearchTerm = async (id , term) => {
    await axios.post("/api/foods/removeSearch", {id , term});
}

export const foodById = async (id) => {
    const response = await axios.get("/api/foods/" + id);
    return response.data;
}

export async function deleteById(foodId) {
    await axios.delete('/api/foods/' + foodId);
}
  
export async function update(food) {
    await axios.put('/api/foods', food);
}
  
export async function add(food) {
    const { data } = await axios.post('/api/foods', food);
    return data;
}
  
export async function submitReview(rating , comment, id, email, name) {
    const { data } = await axios.post('/api/foods/review', {rating, comment, id, email, name});
    return data;
}

export async function getReviewsById(id) {
    const {data} = await axios.get("/api/foods/reviews/" + id);
    return data;
}
export async function deleteReviewById(reviewId, foodId) {
    const { data } = await axios.delete(`/api/foods/review`, {
        params: { reviewId, foodId },
    });
    return data;
}

export async function addToFavourites(foodId , userId) {
    const {data} = await axios.post("/api/foods/favourites",{ foodId, userId});
    return data;
}
export async function removeFromFavourites(foodId , userId) {
    const {data} = await axios.delete("/api/foods/favourites",{ 
        params : {foodId, userId}
    });
    return data;
}
export async function isFavourite(foodId , userId) {
    const {data} = await axios.get("/api/foods/favourites",{ 
        params : {foodId, userId}
    });
    return data;
}