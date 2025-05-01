

export default function Checkout() {
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Home page loaded");
    if (role == "user"){

    } else if (role == "admin"){

    } else{
        return <>
            <Navigation/>
            <h1>Checkout</h1>
        </>   
    }
}