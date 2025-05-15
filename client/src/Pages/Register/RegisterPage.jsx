import classes from "./RegisterPage.module.css";
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useAuth } from "../../components/Hooks/useAuth.jsx";
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone : 0,
      });

      const [error, setError] = useState({isError : false , error : ""});
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (Object.values(formData).some(value => value === '')) {
            setError({isError : true, error : "Enter valid details "});
            return;
        }
        if (!validateEmail(formData.email)) {
          setError({isError : true,error : "Email is not valid"});
          return;
        }
        if (formData.password !== formData.confirmPassword ) {
          setError({isError : true , error : "Password not matched "})
          return;
        }
        if (formData.password.length < 4) {
            setError({ isError: true, error: "pass.length >= 4" });
            return;
        }
        setError({isError: false});
        
        await auth.register(formData);
        navigate("/");
    };

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    
      return (
        <div className={classes.main}>
          <h1 className={classes.login}>Register</h1>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              sx={{ height: "5rem", width: "15rem" }}
              name='name'
              label="Name"
              type='text'
              variant="standard"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <br />
            <TextField
              sx={{ height: "5rem", width: "15rem" }}
              name='email'
              label="Email"
              type='email'
              variant="standard"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <br />
            <TextField
              sx={{ height: "5rem", width: "15rem" }}
              name='phone'
              label="Phone no."
              type='number'
              variant="standard"
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <br />
            {error.isError && error.error.toLowerCase().includes("email") && <><Alert variant="outlined" sx={{color:"red"}}  severity="error">{error.error}</Alert><br /></>}
            <TextField
              sx={{ height: "5rem", width: "15rem" }}
              label="Password"
              variant="standard"
              type="password"
              autoComplete="current-password"
              required
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
            <br />
            <TextField
              sx={{ height: "5rem", width: "15rem" }}
              label="Confirm Password"
              variant="standard"
              type="password"
              autoComplete="current-password"
              required
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <br />
            {error.isError && error.error.toLowerCase().includes("pass") && <><Alert variant="outlined" sx={{color:"red"}}  severity="error">{error.error}</Alert><br /></>}
            <TextField
              sx={{ height: "5rem", width: "15rem" }}
              name='address'
              label="Address"
              type='text'
              variant="standard"
              required
              value={formData.address}
              onChange={handleChange}
            />
            <br />
            {error.isError && error.error.toLowerCase().includes("detail") && <><Alert variant="outlined" sx={{color:"red"}}  severity="error">{error.error}</Alert><br /></>}
            <span className={classes.button}><Button type="submit" variant='contained' sx={{ bgcolor: "#d32f2f" }} >Submit</Button></span>
          </form>
        </div>
      );
}