import CreateAccountForm from "../components/CreateAccountForm"
import Navigation from "../components/Navigation";
import NavigationUser from "../components/NavigationUser";
import NoPage from "./NoPage";

export default function CreateAccount() {
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Home page loaded");
    if (role == "user"){
        <NoPage/>
    } else if (role == "admin"){
        <NoPage/>
    } else{
        return <>
            <Navigation />
            
            <CreateAccountForm />
        </>
    }
}