import { getAllPosts } from "../../lib/contentful";

const AllPosts = async (req, res) => {
  const { accessCode, limit, page, preview, query, type } = req.body;

  if (!accessCode) {
    res.status(400).json({ error: "No access code provided." });
    return;
  }

  const posts = await getAllPosts({
    isAuthenticated: true,
    limit,
    page,
    preview,
    query,
    type,
  });
  res.status(200).json({ posts });
};

export default AllPosts;
