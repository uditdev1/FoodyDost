import React from 'react'
import Chip from '@mui/material/Chip';
import { getUser } from '../../Services/userService';
import { useNavigate } from 'react-router-dom';

export default function Tags({tags }) {

  const navigate = useNavigate();

  return (
    <>
        <Chip sx={{margin:"0.3rem"}} key={"All"} label={"All"} component="a" onClick={() => navigate("/home")} clickable />
        {
            tags.map( (tag) => 
                <Chip sx={{margin:"0.3rem"}} key={tag.name} label={tag.name + " " + tag.count} component="a" href={`/tag/${tag.name}`} clickable />
            )
        }
    </>
  )
}