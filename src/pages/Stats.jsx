// Importing necessary components and libraries
import NavigationAdmin from "../components/NavigationAdmin";

export default function Stats() {
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Stats page loaded");
    
    return <>
    <NavigationAdmin/>
    <h1>stats</h1>
    </>
}