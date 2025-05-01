import ContactForm from "../components/ContactForm";
import Navigation from "../components/Navigation";


export default function Contact() {
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Home page loaded");
    if (role == "user"){
        return <>
            <Navigation />
            
            <ContactForm />
        </>   
    } else if (role == "admin"){

    } else{
        return <>
            <Navigation />
            
            <ContactForm />
        </>   
    }
}