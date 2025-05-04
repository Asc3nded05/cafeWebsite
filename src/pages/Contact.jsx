import ContactForm from "../components/ContactForm";
import ContactFormUser from "../components/ContactFormUser";
import Messages from "../components/Messages";
import Navigation from "../components/Navigation";
import NavigationAdmin from "../components/NavigationAdmin";
import NavigationUser from "../components/NavigationUser";


export default function Contact() {
    const user = localStorage.getItem('user');

    const role = user ? JSON.parse(user).role : null;
    const senderFirstName = user ? JSON.parse(user).firstName : null;
    const senderLastName = user ? JSON.parse(user).lastName : null;
    const senderEmail = user ? JSON.parse(user).email : null;

    if (role == "user"){
        return <>
            <NavigationUser />
            
            <ContactFormUser firstName={senderFirstName} lastName={senderLastName} email={senderEmail} />
        </>   
    } else if (role == "admin"){
            return<>
            <NavigationAdmin/>
            <Messages />
            </>
    } else{
        return <>
            <Navigation />
            
            <ContactForm />
        </>   
    }
}