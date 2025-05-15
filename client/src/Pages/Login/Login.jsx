import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import classes from "./Login.module.css";
import { Button } from '@mui/material';
import {Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from '../../components/Hooks/useAuth';

export default function Login() {
  const {user, login} = useAuth();
  const [invalidValue , setInvalidValue] = useState(false);
  
  const [params] = useSearchParams();

  const returnUrl = params.get("returnUrl");
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) return ;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if( !email || !password ) return setInvalidValue(true); 
    if(!email.includes('@') ) return setInvalidValue(true); 
    await login(email , password);
  }

  return (
    <div className={classes.main + " min-h-svh"}>
      <h1 className={classes.login}>Login</h1>
        <form onSubmit={handleSubmit} noValidate>
          <TextField sx={{height:"5rem", width:"15rem"}} name='email' label="Email" type='email' variant="standard" required/>
          <br/>
          <TextField 
            sx={{height:"5rem", width:"15rem"}}
            label="Password" 
            variant="standard" 
            type="password"
            autoComplete="current-password"
            required
            name='password'
          />
          <br/>
          {invalidValue && <span>invalid values </span>}
          <br/>
          <span className={classes.button}><Button type="submit" variant='contained' sx={{bgcolor:"#d32f2f"}} >Submit</Button></span>
        </form>
          <div className={classes.register}>
            New user? &nbsp;
            <Link to={`/register`}>
              Register here
            </Link>
          </div>
    </div>
  )
}
