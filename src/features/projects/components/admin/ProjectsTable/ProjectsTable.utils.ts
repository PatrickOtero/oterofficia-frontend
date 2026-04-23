export const compactProjectDescription = (description: string) => {
  const normalized = description.replace(/\s+/g, " ").trim();

  if (normalized.length <= 110) {
    return normalized;
  }

  return `${normalized.slice(0, 107)}...`;
};
