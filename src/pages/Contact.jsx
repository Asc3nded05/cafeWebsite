import ContactForm from "../components/ContactForm";
import Navigation from "../components/Navigation";
import NavigationAdmin from "../components/NavigationAdmin";
import NavigationUser from "../components/NavigationUser";


export default function Contact() {
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Home page loaded");
    if (role == "user"){
        return <>
            <NavigationUser />
            
            <ContactForm />
        </>   
    } else if (role == "admin"){
            return<>
            <NavigationAdmin/>
            <ContactForm/>
            </>
    } else{
        return <>
            <Navigation />
            
            <ContactForm />
        </>   
    }
}