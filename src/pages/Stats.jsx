export default function Stats() {
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    console.log("Stats page loaded");
    
    if (role == "user"){
        return <>
            <Navigation/>

            <h1>Stats</h1>
        </>
    } else if (role == "admin"){
        return <>
            <Navigation/>

            <h1>Stats</h1>
        </>
    } else{
        return <>
            <Navigation/>

            <h1>Stats</h1>
        </>
    }
}