import { checkAccessCode, getAllPosts } from "../../lib/contentful";

const CaseStudy = async (req, res) => {
  const { accessCode, limit, page, preview, query, type } = req.body;

  if (!accessCode) {
    res.status(400).json({ error: "No access code provided." });
    return;
  }

  const result = await checkAccessCode({ accessCode, preview });

  if (!result?.total) {
    res.status(400).json({ error: "Access code not valid." });
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

export default CaseStudy;
