export interface NotionPage {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: { object: "user"; id: string };
  last_edited_by: { object: "user"; id: string };
  cover:
    | {
        type: "external";
        external: {
          url: string;
        };
      }
    | {
        type: "file";
        file: {
          url: string;
          expiry_time: string;
        };
      }
    | null;
  icon: { type: "emoji"; emoji: string };
  parent: { type: "database_id"; database_id: string };
  archived: boolean;
  properties: {
    description: {
      id: string;
      type: "rich_text";
      rich_text: { plain_text: string }[];
    };
    Published: { id: string; type: "checkbox"; checkbox: boolean };
    tags: {
      id: string;
      type: "multi_select";
      multi_select: { name: string }[];
    };
    slug: {
      id: string;
      type: "rich_text";
      rich_text: { plain_text: string }[];
    };
    date: { id: string; type: "date"; date: { start: string } };
    title: { id: string; type: "title"; title: { plain_text: string }[] };
  };
  url: string;
}
