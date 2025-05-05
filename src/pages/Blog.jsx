// Importing necessary components and libraries
import { useState, useEffect } from "react";
import BlogPost from "../components/BlogPost.jsx";
import BlogPostAdmin from "../components/BlogPostAdmin.jsx";
import BlogPostUser from "../components/BlogPostUser.jsx";
import Navigation from "../components/Navigation.jsx";
import NavigationAdmin from "../components/NavigationAdmin.jsx";
import NavigationUser from "../components/NavigationUser.jsx";

export default function Blog() {
    const [blogPosts, setBlogPosts] = useState([]); // State to store blog posts
    const user = localStorage.getItem('user'); // Retrieve user data from local storage
    const role = user ? JSON.parse(user).role : null; // Gets the role of the user (user or admin)
    //Variables to store the new post data
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [likedBy, setLikeBy] = useState([]);
    const [dislikedBy, setDislikedBy] = useState([]);
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
                const reversedPosts = [...data].reverse(); // Reverse the order of the posts so that most recent posts are first
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

    // Function to update the title and content of the new post
    function updateTitle(newTitle) {
        setTitle(newTitle);
    }

    function updateContent(newContent) {
        setContent(newContent);
    }

    // Function to handle form submission for creating a new post
    function handleSubmit(e) {
        e.preventDefault();
        
        // Creates a new post object with the data from the form
        const newPost = { title, content, likes, dislikes, likedBy, dislikedBy, createdAt, updatedAt };
    
        // Send the new post to the backend
        fetch('http://localhost:5000/api/blog/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Post created successfully!');
                    location.reload(); // Reload the page to see the new post
                } else if (response.status === 409) {
                    alert('Error creating post. Please try again.');
                    throw new Error('Conflict: Duplicate post');
                } else {
                    console.log(response);
                    alert('Error creating post. Please try again.');
                    throw new Error('Error creating post');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                if (error.message.includes('NetworkError')) {
                    alert('Network error. Please check your connection.');
                }
            });
    }

    // If the user is not logged in, show the blog posts without the ability to like or dislike them.
    // If the user is logged in as a normal user, show the blog posts with the ability to like or dislike them.
    // If the user is logged in as an admin, show the blog posts witht the ability to add, update, and delete posts.
    if (role === "user") {
        return (
            <>
                <NavigationUser />
                <h1>Blog</h1>
                <div className="mt-4">
                {blogPosts.map((post) => (
                    <BlogPostUser
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        date={post.updatedAt}
                        text={post.content}
                        initialLikes={post.likes}
                        initialDislikes={post.dislikes}
                        likedBy={post.likedBy}
                        dislikedBy={post.dislikedBy}
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
                            <input type="text" className="form-control" id="title" onChange={(e) => updateTitle(e.target.value)} placeholder="Enter a title" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Post Content</label>
                            <textarea type="text" className="form-control" id="content" onChange={(e) => updateContent(e.target.value)} placeholder="Enter the post content" required />
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
                            date={post.updatedAt}
                            text={post.content}
                            likes={post.likes}
                            dislikes={post.dislikes}
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
                            date={post.updatedAt}
                            text={post.content}
                            initialLikes={post.likes}
                            initialDislikes={post.dislikes}
                        />
                    ))}
                </div>
            </>
        );
    }
}