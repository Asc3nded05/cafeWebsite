import LoginForm from "../components/LoginForm.jsx";
import Navigation from "../components/Navigation.jsx";
import NavigationAdmin from "../components/NavigationAdmin.jsx";
import NavigationUse from "../components/NavigationUser.jsx";


export default function Login() {
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Home page loaded");

    if (role == "user"){
        return <>
            <NavigationUse />
            <LoginForm />
        </>  
    } else if (role == "admin"){
        return <>
            <NavigationAdmin />
            <LoginForm />
        </>  
    } else{
        return <>
            <Navigation />
            <LoginForm />
        </>   
    }
}