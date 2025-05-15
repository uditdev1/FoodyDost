import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom";
import classes from "./FoodPage.module.css";
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../../components/Hooks/useCart.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';
import { foodById, getReviewsById,isFavourite, submitReview , deleteReviewById, addToFavourites, removeFromFavourites} from '../../Services/services.js';
import Textarea from '@mui/joy/Textarea';
import * as userService from "../../Services/userService.js"
import { toast } from "react-toastify";
import {useAuth} from "../../components/Hooks/useAuth.jsx";

export default function FoodPage() {
  const { id } = useParams();
  const {addToCart } = useCart();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  }
  
  const [food, setFood] = useState();
  const [reviews, setReviews] = useState([]);
  const [favoriteFood , setFavouriteFood] = useState(false);
  const [ratingValue, setRatingValue] = useState(1); 
  const [comment, setComment] = useState(""); 
  const auth = useAuth();

  useEffect( () => {
    async function find(){
      const res = await foodById(id);
      setFood(res);  
      setReviews(res.reviews);
    }
    find();
  }, []);

  useEffect(()=> {
    async function check(){
      if(food && userService.getUser() && userService.getUser().id){
        const res2 = await isFavourite(food.id, userService.getUser().id);
        if(res2.success){
          setFavouriteFood(res2.data);
        }
      }
    }
    check();  
  },[food])

  const formattedCurrency = food ? 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR', 
    }).format(food.price) 
    : null ;
  
  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue); 
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value); 
  };
  const onReviewSubmit = async () => {
    if(comment.length == 0) return ;
    const res = await submitReview(ratingValue, comment, id ,  auth.user.email , auth.user.name);
    if(res.success){
      setReviews(res.data.reviews);
      setFood(res.data);
    }
    setRatingValue(1);
    setComment("");
  }
  const onReviewDelete = async (reviewId) => {
    const res = await deleteReviewById(reviewId, id);
    if(res.success){
      setReviews(res.data.reviews);
      setFood(res.data);
    }
  }
  const handleFavouriteFood = async (foodId) => {
    if(!userService.getUser()) {
      navigate("/login");
      toast.error("login before adding to favourite");
      return ;
    }
    if(!favoriteFood){
      const res = await addToFavourites(foodId, userService.getUser().id);
      setFavouriteFood((prev) => !prev);
    } else {
      const res = await removeFromFavourites(foodId, userService.getUser().id);
      setFavouriteFood((prev) => !prev);
    }
  }
  return (
    <>
    {food ? 
      <div className={classes.box}>
        <div className={classes.main}>
          <img className={classes.img} src={food.imageUrl}/>
          <span className={classes.span}>
            <h1 className={classes.name_Favourite}>
              {food.name}
              <FavoriteIcon onClick={() => handleFavouriteFood(food._id)} sx={{ color: favoriteFood ? "red" : "grey", position:"relative", top:"0.6rem", fontSize:"2rem", cursor : 'pointer'}}/>
            </h1>
            <Rating name="read-only" value={food.rating} size='large'  readOnly />
            <br/>
            {
              food.origins.map( (origin) => <Chip key={origin} label={origin}/> )
            }
            <br/>
            <br/>
            {
              food.tags.map( (origin) => <Chip key={origin} label={origin}/> )
            }
            <p>Time to cook about <MoreTimeIcon color="success" sx={{ fontSize: 28, position:"relative", top:"0.4rem" }} />{food.cookTime}</p>
            <span className={classes.priceName}>Price : </span><span className={classes.price}>{formattedCurrency}</span>
            <br/>
            <br/>
            <Button variant="contained" onClick={handleAddToCart}>Add To Cart <AddShoppingCartIcon /></Button>
            
          </span>
        </div>
        <div  className={classes.allReviews}>
          {
            userService.getUser() && 
            <div className={classes.reviewBox}>
              <span className={classes.title}>
                Leave a review
              </span>
              <div className={classes.ratingBox}>
                <Rating name="size-large" onChange={handleRatingChange} value={ratingValue} defaultValue={1} size="large"/>
              </div>
              <span className={classes.comment}>
                Comment
              </span>
              <div className={classes.textArea}>
                <Textarea onChange={handleCommentChange} value={comment} placeholder="Type your review here" />
              </div>
              <div className={classes.uploadButton}>
                <Button
                  variant="contained"
                  onClick={onReviewSubmit}
                  sx={{
                    backgroundColor: "red", // Change background color to red
                    "&:hover": {
                      backgroundColor: "darkred", // Optional: Darker red on hover
                    },
                  }}
                >
                  Submit
                </Button>            
              </div>
            </div>
          }
          {
            reviews.map((review, ind) => (
              <div key={ind} className={classes.reviewBox}>
                <span className={classes.title}>
                  {review.name}
                </span>
                <div className={classes.ratingBox}>
                  <Rating name="size-large" readOnly onChange={handleRatingChange} defaultValue={review.rating} size="large"/>
                </div>
                <span className={classes.comment}>
                  Comment
                </span>
                <div className={classes.commentText}>
                  {review.comment}
                </div>
                {auth.user && auth.user.email === review.email && <div className={classes.deleteButton}>
                  <Button
                    variant="contained"
                    onClick={() => onReviewDelete(review._id)}
                    sx={{
                      backgroundColor: "red", 
                      height : "1.4rem",
                      "&:hover": {
                        backgroundColor: "darkred",
                      },
                    }}
                  >
                    Delete
                  </Button> 
                </div>}
              </div>
            ))
          }
        </div>
      </div>

      :
      <NotFound message="FoodPage Not Found ! "/>
    }
    </>
  )
}
