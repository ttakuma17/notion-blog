import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { NUMBER_OF_POSTS_PER_PAGE } from "../constants/constants";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    // NOTION_DATABASE_ID が string | undefined になってるので、型エラーが出る
    database_id: process.env.NOTION_DATABASE_ID,
    page_size: 100,
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

const getPageMetaData = (post) => {
  const getTags = (tags) => {
    console.log(tags);
    const allTags = tags.map((tag) => {
      return tag.name;
    });

    return allTags;
  };

  return {
    id: post.id,
    title: post.properties.title.title[0].plain_text,
    description: post.properties.description.rich_text[0].plain_text,
    date: post.properties.date.date.start,
    slug: post.properties.slug.rich_text[0].plain_text,
    tags: getTags(post.properties.tags.multi_select),
  };
};

export const getSinglePost = async (slug) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  const metadata = getPageMetaData(page);

  // console.log(metadata);
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mbString = n2m.toMarkdownString(mdBlocks);
  // console.log(mbString);

  return {
    metadata,
    markdown: mbString,
  };
};

// Top　ページ用記事の取得(4つ)
export const getPostsForTopPage = async (pageSize: number) => {
  const allPosts = await getAllPosts();
  const fourPost = allPosts.slice(0, pageSize);

  return fourPost;
};

// ページ番号に応じた記事の取得
export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts();
  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);
  return posts;
};

//
export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts();

  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

export const getPostsByTagAndPage = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts();

  const posts = allPosts.filter((post) => {
    return post.tags.find((tag: string) => tag === tagName);
  });

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;

  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return posts.slice(startIndex, endIndex);
};
