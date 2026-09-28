import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import useHttp from "../hooks/useHttp.js";
import ErrorMsg from "./ErrorMsg.jsx";

const reqConfig = {};

export default function Meals() {

    const {data: loadedMeals, isLoading,error } = 
    useHttp('http://localhost:3000/meals', reqConfig, []);
    if(isLoading){
        return <p className="center">Still loading...</p>
    }
    if(error){
        return <ErrorMsg title="Failed to fetch meals" 
        message={error}></ErrorMsg>
    }
    return (
        <ul id="meals">{loadedMeals.map(meal =>
            <MenuItem key={meal.id} meal={meal}></MenuItem>)}
        </ul>
    )

}