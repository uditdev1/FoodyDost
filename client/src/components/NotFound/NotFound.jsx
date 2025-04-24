import React from 'react'
import classes from "./NotFound.module.css";
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function NotFound({message = "Nothing found!", linkRoute = "/home", linkText = "Go To Home Page"}) {
  return ( 
      <Link style={{color :"white", minHeight : "100vh"}} className={classes.linkTag} to={linkRoute}>
        <Alert severity="info" variant='filled' sx={{bgcolor:"#d32f2f"}}>
          <AlertTitle sx={{fontWeight:"bolder"}}>{message}</AlertTitle>
          {linkText}
        </Alert>
      </Link>
  )
}

// NotFound.defaultProps = {
//   message : ,
//   linkRoute : ,
//   linkText : 
// }