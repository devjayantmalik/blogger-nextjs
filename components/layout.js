import Head from "next/head";

const Layout = ({ children, title }) => {
    return (
        <div
            className="container"
            style={{ marginBottom: 30, padding: 15, backgroundColor: "white" }}
        >
            <Head>
                <title>{title}</title>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/papercss@1.6.1/dist/paper.min.css"
                />
            </Head>
            {children}
        </div>
    );
};

export default Layout;
