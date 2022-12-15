export default async function checkAuthenticated({ accessCode, preview }) {
  const accessCodeToCheck = accessCode || localStorage.getItem("accessCode");
  if (!accessCodeToCheck) {
    return false;
  }

  const response = await fetch(`/api/access`, {
    body: JSON.stringify({ accessCode: accessCodeToCheck, preview }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (response.ok) {
    const result = await response.json();
    return result?.isValidated;
  }
}

export async function getAuthenticatedPost({ accessCode, preview, slug }) {
  const accessCodeToCheck = accessCode || localStorage.getItem("accessCode");
  if (!accessCodeToCheck) {
    return false;
  }

  const response = await fetch(`/api/case-study`, {
    body: JSON.stringify({ accessCode: accessCodeToCheck, preview, slug }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  }
}

export async function getAuthenticatedPosts({
  accessCode,
  limit,
  page,
  preview,
  query,
  type,
}) {
  const accessCodeToCheck = accessCode || localStorage.getItem("accessCode");
  if (!accessCodeToCheck) {
    return false;
  }

  const response = await fetch(`/api/all-posts`, {
    body: JSON.stringify({
      accessCode: accessCodeToCheck,
      limit,
      page,
      preview,
      query,
      type,
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  }
}
