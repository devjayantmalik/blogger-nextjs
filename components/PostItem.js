import Link from "next/link";

const PostItem = ({ post }) => {
    return (
        <article
            className="card"
            style={{
                marginTop: 30,
                backgroundColor: "lightgreen",
                borderRadius: 10,
            }}
        >
            <div className="card-body">
                <h2>
                    <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </h2>
                <p className="card-subtitle">
                    Written by: <strong>{post.author}</strong>
                </p>
                <div>{post.description}</div>
            </div>
        </article>
    );
};

export default PostItem;
