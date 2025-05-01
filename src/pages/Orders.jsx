import NavigationAdmin from "../components/NavigationAdmin";

export default function Orders() {
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Home page loaded");
    
    return<>
    <NavigationAdmin/>
    <h1>Orders</h1>
    </>
}