import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

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
  console.log(mbString);

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
