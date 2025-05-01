import { Link, useParams } from "react-router-dom";


export default function NoPage(){
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Home page loaded");
   
    return <>
    if (role == "user"){
        
} else if (role == "admin"){

} else{
    
}
     <h1> This is a "You are kinda lost" Page </h1>
        <h2>Lets help you find your way back </h2> 
        <Link to="/" > Go to Homepage</Link>
        </>}