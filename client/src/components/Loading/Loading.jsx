import React from "react";
import classes from "./Loading.module.css";
import {useLoading} from "../Hooks/useLoading.jsx";

function Loading () {
    const {isLoading} = useLoading();
    if(!isLoading) return ;

    return (
        <div className={classes.container}>
            <img className={classes.img} src="/loading.svg" alt="loading"/>
            <hr/>
            <span className={classes.loading}>Loading...</span>
        </div>
    )
}

export default Loading;