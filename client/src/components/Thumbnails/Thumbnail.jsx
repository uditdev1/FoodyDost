import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import Rating from '@mui/material/Rating';
import {Link, useNavigate} from "react-router-dom";
import Price from '../Price/Price.jsx';
import { useCart } from '../Hooks/useCart.jsx';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import classes from "./Thumbnail.module.css";
import { useState } from 'react';
import { useEffect } from 'react';
import * as userService from "../../Services/userService.js"
import { addToFavourites, isFavourite, removeFromFavourites, saveSearchTerm ,removeSearchTerm} from '../../Services/services.js';
import { toast } from 'react-toastify';

export default function MediaCard({food}) {
    const defaultImage = "/foods/";
    const {addToCart } = useCart();
    const handleAddToCart = () => {
      addToCart(food);
    }

    const [favoriteFood , setFavouriteFood] = useState(false);

    useEffect(() => {
      async function check(){
        const res = await isFavourite(food.id, userService.getUser().id);
        if(res.success){
          setFavouriteFood(res.data);
        }
      }
      if(userService.getUser()){
        check();
      }
    },[]);
    const navigate = useNavigate();
    const handleFavouriteFood = async () => {
      if(!userService.getUser()) {
        navigate("/login");
        toast.error("login before adding to favourite");
        return ;
      }
      if(!favoriteFood){
        const res = await addToFavourites(food.id, userService.getUser().id);
        await saveSearchTerm(userService.getUser().id ,food.name);
        setFavouriteFood((prev) => !prev);
      } else {
        const res = await removeFromFavourites(food.id, userService.getUser().id);
        await removeSearchTerm(userService.getUser().id ,food.name);
        setFavouriteFood((prev) => !prev);
      }
    }
  return (
    <div className={classes.main} >
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/food/${food.id}`} style={{textDecoration:"none", }}>
      <CardMedia
        sx={{ height: 300 , width : 380}}
        image={food.imageUrl}
        title={food.name}
      />
      </Link>
      <CardContent>
        <span style={{display:"flex" , justifyContent:"space-between"}}>
            <Link to={`/food/${food.id}`} style={{textDecoration:"none",color:"black" }}>
              <Typography gutterBottom variant="h4" component="div">
              {food.name}
              </Typography>
            </Link>
            <IconButton onClick={handleFavouriteFood} aria-label="add to favorites" style={{position:"relative", top:"-0.2rem"}}>
            <FavoriteIcon sx={{ color: favoriteFood ? "#D32F2F" : "grey"}}/>
            </IconButton>
        </span>    
        <Rating name="read-only" value={food.rating} readOnly />
        <span style={{display:"flex" , justifyContent:"space-between"}}>
            <Typography gutterBottom variant="h6" component="span">
            <Price price={food.price}/>
            </Typography>
            
            <Typography variant="h6" component="span" color="#2e7d32" fontWeight="bolder">
                <MoreTimeIcon color="success" sx={{ fontSize: 20 }} />
                <span style={{position:"relative", top:"-0.2rem", fontSize:"1rem"}}>{" "+ food.cookTime + " min"}</span>
            </Typography>
        </span>
        <br/>
          <div className='flex gap-2 flex-wrap'>
            {food.origins.map( (origin) => <Chip key={origin} label={origin}/> )}
          </div>
          <br/>
          <Button variant="contained" sx={{bgcolor:"#D32F2F", marginTop:"1rem"}} onClick={handleAddToCart}><AddShoppingCartIcon /></Button>
      </CardContent>
    </Card>
    </div>
  );
}
