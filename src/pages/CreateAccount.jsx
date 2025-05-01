import CreateAccountForm from "../components/CreateAccountForm"
import Navigation from "../components/Navigation";

export default function CreateAccount() {
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Home page loaded");
    if (role == "user"){

    } else if (role == "admin"){

    } else{
        return <>
            <Navigation />
            
            <CreateAccountForm />
        </>
    }
}