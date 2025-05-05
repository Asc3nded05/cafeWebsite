// Importing necessary components and libraries
import { Link, useParams } from "react-router-dom";

export default function NoPage(){
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
   
    return <>
        <h1> You seem to be lost </h1>
        <h2>Lets help you find your way back </h2> 
        <Link to="/" > Go to Homepage</Link>
    </>
}