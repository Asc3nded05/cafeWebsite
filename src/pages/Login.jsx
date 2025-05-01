import LoginForm from "../components/LoginForm.jsx";
import Navigation from "../components/Navigation.jsx";


export default function Login() {
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Home page loaded");

    if (role == "user"){
        return <>
            <Navigation />
            <LoginForm />
        </>  
    } else if (role == "admin"){
        return <>
            <Navigation />
            <LoginForm />
        </>  
    } else{
        return <>
            <Navigation />
            <LoginForm />
        </>   
    }
}