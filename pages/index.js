import Layout from "../components/layout";
import Hero from "../components/hero";
import PostItem from "../components/PostItem";

import { getSortedPostsData } from "../lib/posts";

import Link from "next/link";

export default function Home({ allPostsData }) {
    return (
        <Layout title="Posts | Homepage">
            <Hero />
            <main>
                {allPostsData.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </main>
        </Layout>
    );
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: { allPostsData },
    };
}
