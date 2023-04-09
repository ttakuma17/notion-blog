import Head from "next/head";
import { Inter } from "next/font/google";
import { getPostsForTopPage } from "../../lib/notionAPI";
import SinglePost from "@/components/Post/SinglePost";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

// SSG - ビルドした時点でデータを取得している
// ISR - SSG もしつつ○秒ごとに更新する revalidate: 60

export const getStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(4);

  return {
    props: {
      // allPosts: allPosts, 1行へまとめておく
      fourPosts,
    },
    revalidate: 60,
  };
};

export default function Home({ fourPosts }) {
  // console.log(allPosts);
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Notion Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          Notion Blog 🚀
        </h1>
        {fourPosts.map((post) => (
          <div className="mx-auto" key={post.id}>
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPagenationPage={false}
            />
          </div>
        ))}
        <Link
          href="/posts/page/1"
          className="mb-6 lg:w-1/2 mx-auto rounded-md px-5 block text-right"
        >
          .....もっとみる
        </Link>
      </main>
    </div>
  );
}
