export function getTruncatedText(text: string, maxLength = 40): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
