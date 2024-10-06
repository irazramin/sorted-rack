export function formatCreatedAt(createdAt) {
  const date = new Date(createdAt);
  const options = { day: "numeric", month: "short", year: "numeric" };

  return date.toLocaleDateString("en-GB", options);
}
