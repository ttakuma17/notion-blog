import React from "react";
import { getAllPosts, getSinglePost } from "../../../lib/notionAPI";

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths: paths,
    fallback: "blocking",
    // fallback: false は、存在しないページにアクセスした場合に404ページを表示する
    // fallback: "blocking"は、存在しないページにアクセスした場合に、ビルド時に指定したパスを表示する
    // fallback: trueは、存在しないページにアクセスした場合に、ビルド時に指定したパスを表示する
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

const Post = (post) => {
  return (
    <section className="container lg:px-2 px-4 h-screen lg:w-2/5 mx-auto mt-20">
      <h2 className="w-full text-2xl font-medium">3回目の投稿です</h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-gray-500">2023/4/19</span>
      <br />
      <p className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block">
        Next.js
      </p>
      <div className="mt-10 font-medium">dfghjklfghjkl</div>
    </section>
  );
};

export default Post;
