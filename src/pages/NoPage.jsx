import { Link, useParams } from "react-router-dom";


export default function NoPage(){
   
    return <>
 
     <h1> This is a "You are kinda lost" Page </h1>
        <h2>Lets help you find your way back </h2> 
        <Link to="/" > Go to Homepage</Link>
        </>}