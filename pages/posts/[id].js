import Head from "next/head";
import Layout from "../../components/layout";
import { parseISO, format } from "date-fns";

import { getAllPostIds, getPostData } from "../../lib/posts";

const Post = ({ postData }) => {
    return (
        <Layout title="The Amazing Blog">
            <div
                className="card"
                style={{
                    marginTop: 30,
                    marginBottom: 30,
                    backgroundColor: "lightgreen",
                }}
            >
                <header
                    className="card-header"
                    style={{ backgroundColor: "lightyellow" }}
                >
                    <h1
                        className="card-title text-center"
                        style={{ color: "navy" }}
                    >
                        {postData.title}
                    </h1>
                    <p className="card-subtitle" style={{ display: "flex" }}>
                        Created by{" "}
                        <strong style={{ color: "darkorange", marginLeft: 10 }}>
                            {postData.author}
                        </strong>
                        <time
                            style={{ marginLeft: "auto", color: "darkblue" }}
                            dateTime={postData.date}
                        >
                            {format(parseISO(postData.date), "LLLL d, yyyy")}
                        </time>
                    </p>
                </header>
                <section
                    className="card-body"
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                ></section>
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export default Post;
