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

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const createdAt = new Date().toLocaleString() + "";
    const updatedAt = new Date().toLocaleString() + "";

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
                // setBlogPosts(data); // Store the blog posts in state
                const reversedPosts = [...data].reverse(); // Reverse the order of the posts
                setBlogPosts(reversedPosts); // Store the reversed posts in state
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

    function updateTitle(newTitle) {
        setTitle(newTitle);
    }

    function updateContent(newContent) {
        setContent(newContent);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newPost = { title, content, likes, dislikes, createdAt, updatedAt };

        // Send the newUser to the backend
        fetch('http://localhost:5000/api/blog/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    
                } else if (response.status == 409) {
                     alert('Error creating post. Please try again.')
                } else {
                    console.log(response); 
                    alert('Error creating post. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
    
        location.reload(); // Reload the page to see the new post
    }

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

                <div className="container mt-5">
                    <h2 className="text-center">Add new blog post</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" onChange={(e) => updateTitle(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Post Content</label>
                            <input type="text" className="form-control" id="content" onChange={(e) => updateContent(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Post</button>
                    </form>
                </div>

                <h2 className="text-center">Post History</h2>

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