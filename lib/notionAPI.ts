import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { NUMBER_OF_POSTS_PER_PAGE } from "../constants/constants";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("データベースIDが設定されていません");
  }
  const posts = await notion.databases.query({
    database_id: databaseId,
    page_size: 100,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [{ property: "date", direction: "descending" }],
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

const getPageMetaData = (post) => {
  const getTags = (tags) => {
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

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mbString = n2m.toMarkdownString(mdBlocks);

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

export const getNumberOfPagesById = async (tagName: string) => {
  const allPosts = await getAllPosts();

  const posts = allPosts.filter((post) => {
    return post.tags.find((tag: string) => tag === tagName);
  });

  return (
    Math.floor(posts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (posts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

export const getAllTags = async () => {
  const allPosts = await getAllPosts();

  const allTagsDuplicationLists = allPosts.flatMap((post) => post.tags);
  const set = new Set(allTagsDuplicationLists);
  const allTagsList = Array.from(set);

  return allTagsList;
};
