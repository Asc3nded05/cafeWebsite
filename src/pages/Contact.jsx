// Importing necessary components and libraries
import ContactForm from "../components/ContactForm";
import ContactFormUser from "../components/ContactFormUser";
import Messages from "../components/Messages";
import Navigation from "../components/Navigation";
import NavigationAdmin from "../components/NavigationAdmin";
import NavigationUser from "../components/NavigationUser";


export default function Contact() {
    const user = localStorage.getItem('user');  // Retrieve user data from local storage

    const role = user ? JSON.parse(user).role : null; // Gets the role of the user (user or admin)
    const senderFirstName = user ? JSON.parse(user).firstName : null; // Gets the first name of the user
    const senderLastName = user ? JSON.parse(user).lastName : null; // Gets the last name of the user
    const senderEmail = user ? JSON.parse(user).email : null; // Gets the email of the user

    // If the user is not logged in, render the contact form that asks for the user's name and email
    // If the user is logged in as a normal user, render the contact form that doesn't require the user to impor their name and email
    // If the user is logged in as an admin, render the messages component that shows all the messages sent by users
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