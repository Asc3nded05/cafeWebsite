import { useState, useEffect } from "react";
import BlogPost from "../components/BlogPost.jsx";
import BlogPostAdmin from "../components/BlogPostAdmin.jsx";
import Navigation from "../components/Navigation.jsx";
import NavigationAdmin from "../components/NavigationAdmin.jsx";
import NavigationUser from "../components/NavigationUser.jsx";

export default function Blog() {
    const [blogPosts, setBlogPosts] = useState([]); // State to store blog posts
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;

    // Function to fetch blog posts from the backend
    function getBlogPosts() {
        fetch('http://localhost:5000/api/blog', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse the JSON data
                } else {
                    throw new Error('Error retrieving blog posts');
                }
            })
            .then((data) => {
                setBlogPosts(data); // Store the blog posts in state
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    // Fetch blog posts when the component mounts
    useEffect(() => {
        getBlogPosts();
    }, []);

    if (role === "user") {
        return (
            <>
                <NavigationUser />
                <h1>Blog</h1>
                <div className="mt-4">
                    {blogPosts.map((post) => (
                        <BlogPost
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            date={post.createdAt}
                            text={post.Content}
                        />
                    ))}
                </div>
            </>
        );
    } else if (role === "admin") {
        return (
            <>
                <NavigationAdmin />
                <h1>Blog</h1>
                <div className="mt-4">
                    {blogPosts.map((post) => (
                        <BlogPostAdmin
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            date={post.createdAt}
                            text={post.Content}
                        />
                    ))}
                </div>
            </>
        );
    } else {
        return (
            <>
                <Navigation />
                <h1>Blog</h1>
                <div className="mt-4">
                    {blogPosts.map((post) => (
                        <BlogPost
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            date={post.createdAt}
                            text={post.Content}
                        />
                    ))}
                </div>
            </>
        );
    }
}