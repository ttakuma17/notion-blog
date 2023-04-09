import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  isPagenationPage: boolean;
};

const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug, isPagenationPage } = props;

  return isPagenationPage ? (
    <section className="bg-sky-600 mb-8 mx-auto ronded-mb p-5 shadow-xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
      <div className="lg:flex items-center">
        <h2 className="text-gray-100 text-2xl font-medium mb-2">
          <Link href={`/posts/${slug}`}>{title}</Link>
        </h2>
        <div className="text-gray-100">{date}</div>
        {tags.map((tag: string, index: number) => (
          <span
            className="text-white bg-gray-400 rounded-xl px-2 pb-1 font-medium mr-2"
            key={index}
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-gray-100">{description}</p>
    </section>
  ) : (
    <div>
      <section className="lg:w-1/2 bg-sky-600 mb-8 mx-auto ronded-mb p-5 shadow-xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-3">
          <h2 className="text-gray-100 text-2xl font-medium mb-2">
            <Link href={`/posts/${slug}`}>{title}</Link>
          </h2>
          <div className="text-gray-100">{date}</div>
          {tags.map((tag: string, index: number) => (
            <span
              className="text-white bg-gray-400 rounded-xl px-2 pb-1 font-medium"
              key={index}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-100">{description}</p>
      </section>
    </div>
  );
};

export default SinglePost;
