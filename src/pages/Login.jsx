// Importing necessary components and libraries
import LoginForm from "../components/LoginForm.jsx";
import Navigation from "../components/Navigation.jsx";
import NavigationAdmin from "../components/NavigationAdmin.jsx";
import NavigationUser from "../components/NavigationUser.jsx";
import NoPage from "./NoPage.jsx";


export default function Login() {
    const user = localStorage.getItem('user'); // Retrieve user data from local strorage
    const role = user ? JSON.parse(user).role : null; // Gets the role of the user (user or admin)

    // If the user is not logged in render the login form
    // If the user is logged in as a normal user or as an admin, render the NotPage component to help them return to the homepage.
    if (role == "user"){
        return <>
            <NavigationUser />

            <NoPage />
        </>  
    } else if (role == "admin"){
        return <>
            <NavigationAdmin />

            <NoPage />
        </>  
    } else{
        return <>
            <Navigation />

            <LoginForm />
        </>   
    }
}