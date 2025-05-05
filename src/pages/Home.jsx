// Importing necessary components and libraries
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import NavigationAdmin from "../components/NavigationAdmin";
import NavigationUser from "../components/NavigationUser";

export default function Home() {
    const user = localStorage.getItem('user'); // Retrieve user data from local storage
    const role = user ? JSON.parse(user).role : null; // Gets the role of the user (user or admin)

    // If the user is not logged in render home page with the guest navigation bar
    // If the user is logged in as a normal user render the home page with the user navigation bar
    // If the user is logged in as an admin render the home page with the adnmin navigation bar
    if (role == "user") {
        return (
            <>
                <NavigationUser />

                <img src="src\assets\BagelBanner.png" width="100%"></img>

                <div className="container mt-5">
                    <h1>Welcome to Bagels Etc!</h1>

                    <hr></hr>
    
                    <p style={{ textAlign: "justify" }}>
                        Bagels etc. was founded on the principal of quality
                        NY style bagels made fresh daily. We are proud to
                        be serving the community of Irondequoit and our
                        neighboring communities for over 35 years.
                    </p>

                    <Link className="btn btn-primary" to="/menu">
                        Check out our menu!
                    </Link>

                    <hr></hr>

                    <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d875.9662338635214!2d-77.60309277012688!3d43.207380924058135!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d6b660d9680bb9%3A0xef6d5c28eb2762bc!2s525%20Titus%20Ave%2C%20Irondequoit%2C%20NY%2014617!5e0!3m2!1sen!2sus!4v1745872729453!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ position: 'absolute', top: 0, left: 0, border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </>
        );
    }
    else if (role == "admin") {
        return (
            <>
                <NavigationAdmin />

                <img src="src\assets\BagelBanner.png" width="100%"></img>

                <div className="container mt-5">
                    <h1>Welcome to Bagels Etc!</h1>

                    <hr></hr>
    
                    <p style={{ textAlign: "justify" }}>
                        Bagels etc. was founded on the principal of quality
                        NY style bagels made fresh daily. We are proud to
                        be serving the community of Irondequoit and our
                        neighboring communities for over 35 years.
                    </p>

                    <Link className="btn btn-primary" to="/menu">
                        Check out our menu!
                    </Link>

                    <hr></hr>

                    <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%'}}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d875.9662338635214!2d-77.60309277012688!3d43.207380924058135!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d6b660d9680bb9%3A0xef6d5c28eb2762bc!2s525%20Titus%20Ave%2C%20Irondequoit%2C%20NY%2014617!5e0!3m2!1sen!2sus!4v1745872729453!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ position: 'absolute', top: 0, left: 0, border: 0, paddingBottom: 0}}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </>
        );
    }

    else {
        return (
            <>
                <Navigation />
                <img src="src\assets\BagelBanner.png" width="100%"></img>

                <div className="container mt-5"> 

                    <h1>Welcome to Bagels Etc!</h1>

                    <hr></hr>
    
                    <p style={{ textAlign: "justify" }}>
                        Bagels etc. was founded on the principal of quality
                        NY style bagels made fresh daily. We are proud to
                        be serving the community of Irondequoit and our
                        neighboring communities for over 35 years.
                    </p>

                    <Link className="btn btn-primary" to="/menu">
                        Check out our menu!
                    </Link>

                    <hr></hr>

                    <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d875.9662338635214!2d-77.60309277012688!3d43.207380924058135!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d6b660d9680bb9%3A0xef6d5c28eb2762bc!2s525%20Titus%20Ave%2C%20Irondequoit%2C%20NY%2014617!5e0!3m2!1sen!2sus!4v1745872729453!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ position: 'absolute', top: 0, left: 0, border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </>
        );
    }
}