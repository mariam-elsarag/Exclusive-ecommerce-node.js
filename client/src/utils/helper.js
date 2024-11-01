export const apiKey = import.meta.env.VITE_REACT_APP_BASE_URL;
export function truncateText(text, length, withDots = true) {
  if (text.length <= length) {
    return text;
  }

  return `${text.substring(0, length)} ${withDots ? "..." : ""}`;
}
