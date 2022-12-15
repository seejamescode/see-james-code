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

export async function checkAccessCode({ accessCode, preview }) {
  const entries = await getClient(preview).getEntries({
    content_type: "caseStudyAccess",
    limit: 1,
    "fields.password": accessCode,
  });
  return entries;
}

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

export async function getPost({ isAuthenticated, slug, preview }) {
  const entries = await getClient(preview).getEntries({
    content_type: "post",
    limit: 1,
    "fields.slug[in]": slug,
    ...(isAuthenticated
      ? {}
      : { "fields.typesV2[in]": `${TYPES_KEYS[1]},${TYPES_KEYS[2]}` }),
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
    ...(isAuthenticated
      ? type && (type !== TYPES_KEYS[0] || isAuthenticated)
        ? { "fields.typesV2": type }
        : {}
      : { "fields.typesV2[in]": type || `${TYPES_KEYS[1]},${TYPES_KEYS[2]}` }),
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
    "fields.typesV2[in]": `${TYPES_KEYS[1]},${TYPES_KEYS[2]}`,
  });

  return entries.items.map(({ fields: { slug } }) => `/${slug}`);
}
