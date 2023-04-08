import React from "react";

const Post = () => {
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
