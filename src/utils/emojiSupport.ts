export const EMOJI_MAP: Record<string, string> = {
  ':)': '😊',
  ':(': '😞',
  ':D': '😄',
  ':P': '😜',
  ':O': '😮',
  '<3': '❤️',
  ':heart:': '❤️',
  ':thumbsup:': '👍',
  ':thumbsdown:': '👎',
  ':fire:': '🔥',
};

export function replaceEmojis(text: string): string {
  let result = text;
  Object.entries(EMOJI_MAP).forEach(([code, emoji]) => {
    result = result.replace(new RegExp(code, 'g'), emoji);
  });
  return result;
}

export function hasEmojis(text: string): boolean {
  return Object.keys(EMOJI_MAP).some((code) => text.includes(code));
}
