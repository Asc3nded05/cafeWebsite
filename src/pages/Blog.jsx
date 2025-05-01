import BlogPost from "../components/BlogPost.jsx";


export default function Blog() {

    return <>
        {/* {Nav} */}
        <h1>Blog</h1>

        <BlogPost title="Blog Post 4" date="4/28/2025" text="Some quick example text to build on the card title and make up the bulk of the card's content." />
        <BlogPost title="Blog Post 3" date="4/27/2025" text="Some quick example text to build on the card title and make up the bulk of the card's content." />
        <BlogPost title="Blog Post 2" date="4/26/2025" text="Some quick example text to build on the card title and make up the bulk of the card's content." />
        <BlogPost title="Blog Post 1" date="4/25/2025" text="Some quick example text to build on the card title and make up the bulk of the card's content." />
    </>
}