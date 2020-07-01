import { createClient } from "contentful";
import { format, parseISO } from "date-fns";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: "preview.contentful.com",
});

export const getClient = (preview) => (preview ? previewClient : client);

function parsePost({ fields }) {
  return {
    created: format(parseISO(fields.created), "PPP"),
    createdRaw: fields.created,
    description: fields.description || {},
    links: fields.links || [],
    media: fields.media,
    tagline: fields.tagline,
    thumbnail: fields.thumbnail,
    title: fields.title,
    types: fields.types,
    scale: Math.ceil(Math.random() * 2),
    slug: fields.slug,
  };
}

const parsePostEntries = (entries) => entries?.items?.map(parsePost);

export async function getPost({ slug, preview }) {
  const entries = await getClient(true).getEntries({
    content_type: "post",
    limit: 1,
    "fields.slug[in]": slug,
  });

  return parsePostEntries(entries)[0];
}

const PAGE_SIZE = 10;

export async function getAllPosts({ page: queryPage, preview, query, type }) {
  const page = queryPage ? parseInt(queryPage) : 1;

  const entries = await getClient(preview).getEntries({
    content_type: "post",
    "fields.types": type,
    limit: PAGE_SIZE,
    order: "-fields.created",
    skip: PAGE_SIZE * (page - 1),
    query,
  });

  return {
    entries: parsePostEntries(entries),
    page,
    totalPages: Math.ceil(entries.total / PAGE_SIZE),
  };
}

export async function getAllPostSlugs() {
  const entries = await client.getEntries({
    content_type: "post",
    select: "fields.slug",
  });

  return entries.items.map(({ fields: { slug } }) => `/${slug}`);
}
