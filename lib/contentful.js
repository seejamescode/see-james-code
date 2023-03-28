import { createClient } from "contentful";
import { format, parseISO } from "date-fns";
import { TYPES } from "../lib/constants";

const TYPES_KEYS = Object.keys(TYPES);

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: "preview.contentful.com",
});

const PAGE_SIZE = 8;

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
    types: fields.typesV2,
    scale: Math.ceil(Math.random() * 2),
    slug: fields.slug,
  };
}

const parsePostEntries = (entries) => entries?.items?.map(parsePost);

export async function getPost({ slug, preview }) {
  const entries = await getClient(preview).getEntries({
    content_type: "post",
    limit: 1,
    "fields.slug[in]": slug,
    "fields.typesV2[in]": `${TYPES_KEYS[0]},${TYPES_KEYS[1]}`,
  });

  return parsePostEntries(entries)[0];
}

export async function getAllPosts({
  isAuthenticated,
  limit = PAGE_SIZE,
  page: queryPage,
  preview,
  query,
  type,
}) {
  const page = queryPage ? parseInt(queryPage) : 1;

  const entries = await getClient(preview).getEntries({
    content_type: "post",
    "fields.typesV2[in]": type || `${TYPES_KEYS[0]},${TYPES_KEYS[1]}`,
    limit,
    order: "-fields.created",
    skip: limit * (page - 1),
    query,
  });

  return {
    entries: parsePostEntries(entries),
    page,
    totalPages: Math.ceil(entries.total / limit),
  };
}

export async function getAllPublicPostSlugs() {
  const entries = await client.getEntries({
    content_type: "post",
    select: "fields.slug",
    "fields.typesV2[in]": `${TYPES_KEYS[0]},${TYPES_KEYS[1]}`,
  });

  return entries.items.map(({ fields: { slug } }) => `/${slug}`);
}
