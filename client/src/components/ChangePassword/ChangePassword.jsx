import React ,{useEffect, useState} from "react";
import classes from "./ChangePassword.module.css";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useAuth } from "../Hooks/useAuth";
import { changePassword } from "../../Services/userService";

export default function ChangePassword () {
    const [passData , setPassData] = useState({
        currPass : '',
        newPass : '',
        confirmPass : '',
    });
    const [error , setError] = useState(true);
    const [errorData , setErrorData] = useState("Empty Fields");
    const {changePassword} = useAuth();

    const handleChange = (e) => {
        const {name , value} = e.target;
        setPassData(prevPassData => ({
            ...prevPassData,
            [name]: value
        }));
        
        if(value.length <= 3){
            setError(true);
            setErrorData("Password length is too short !");
        } else if(name === "confirmPass" ){
            if(value !== passData.newPass ){
                setError(true);
                setErrorData("Password not match!");
            } else {
                setError(false);
            }
        } else if(name === "newPass" ){
            if(value !== passData.confirmPass){
                setError(true);
                setErrorData("Password not match!");
            } else {
                setError(false);
            }
        } else {
            setError(false);
        }       
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if( passData.confirmPass.length <= 3 || passData.newPass.length <= 3 || passData.currPass.length <= 3 
            || passData.confirmPass !== passData.newPass
        ){
            setError(true);
            setErrorData("Password length is too short !");
            return ;
        }
        setError(false);
        changePassword(passData);
    }

    return (
        <>
            <form className={classes.details} onSubmit={handleSubmit}>
                <span className={classes.mapHead}>Change Password</span>
                <TextField
                    sx={{ height: "5rem", width: "100%" }}
                    name='currPass'
                    label="Current Password"
                    type='text'
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    sx={{ height: "5rem", width: "`00%`" }}
                    name='newPass'                        
                    label="New Password"
                    type='text'
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    sx={{ height: "5rem", width: "100%" }}
                    name='confirmPass'
                    label="Confirm New Password"
                    type='text'
                    variant="outlined"
                    onChange={handleChange}
                />
                {error && 
                    <Alert variant="outlined" severity="error" sx={{marginBottom :"4%", width:"100%" ,color:"red"}}>
                        {errorData}
                    </Alert>
                }
                <Button 
                   type="submit" 
                   variant='contained' 
                    sx={{
                    bgcolor:"#04AF70", 

                    width:"fit-content", 
                    height:"3rem", 
                    fontSize:"1.2rem",
                    marginLeft : "20%",
                    '&:hover': {
                        bgcolor: "#027148"
                    }
                }} >
                    Change Password
                </Button>
            </form>
        </>
    )
}