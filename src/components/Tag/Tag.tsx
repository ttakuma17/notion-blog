import Link from "next/link";
import React from "react";

const Tag = () => {
  return (
    <div className="mx-4">
      <section className="lg:w-1/2  mb-8 mx-auto bg-orange-200 rounded-md p-5 shadow-xl hover:shadow-none hover:transkate-y-1 duration-300 transition-all">
        <div className="font-medium mb-4">タグ検索</div>
        <div className="flex flex-wrap gap-5">
          <Link
            href="/posts/tag/blog/page/1"
            className="cursor-pointer px-2 font-medium pb-1 rounded-xl bg-gray-400 inline-block"
          >
            <span>Blog</span>
          </Link>
          <Link
            href="/posts/tag/blog/page/1"
            className="cursor-pointer px-2 font-medium pb-1 rounded-xl bg-gray-400 inline-block"
          >
            <span>Next.js</span>
          </Link>
          <Link
            href="/posts/tag/blog/page/1"
            className="cursor-pointer px-2 font-medium pb-1 rounded-xl bg-gray-400 inline-block"
          >
            <span>Typescript</span>
          </Link>
          <Link
            href="/posts/tag/blog/page/1"
            className="cursor-pointer px-2 font-medium pb-1 rounded-xl bg-gray-400 inline-block"
          >
            <span>React</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Tag;
