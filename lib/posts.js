import fs from "fs";
import path from "path";
import matter from "gray-matter";

import remark from "remark";
import html from "remark-html";
import sanitize from "sanitize-html";

const postsDirectory = path.join(process.cwd(), "blog-data");

export function getSortedPostsData() {
    // get file names under post directory
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames.map((filename) => {
        // remove .md from filename to get id
        const id = filename.replace(/\.md$/, "");

        // Read Markdown file as string
        const fullPath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, "utf-8");

        // use gray matter to parse the post metadata section
        const matterResults = matter(fileContents);

        // combine the data with the id
        return {
            id,
            ...matterResults.data,
        };
    });

    // sort posts by date
    return allPostsData.sort((a, b) => {
        return a.date < b.date ? 1 : -1;
    });
}

export function getAllPostIds() {
    const filenames = fs.readdirSync(postsDirectory);
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]

    return filenames.map((filename) => {
        return {
            params: {
                id: filename.replace(/\.md$/, ""),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // use remark to convert markdown in html string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    // Combine the data with the id
    return {
        id,
        contentHtml: sanitize(contentHtml),
        ...matterResult.data,
    };
}
