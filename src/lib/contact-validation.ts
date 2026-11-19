export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_FILES = 5;
const allowed = ['jpg', 'jpeg', 'png', 'webp', 'pdf'];
export function fileError(file: { name: string; size: number }) {
  if (!allowed.includes(file.name.split('.').pop()?.toLowerCase() ?? '')) return 'Formato no admitido. Usá JPG, PNG, WebP o PDF.';
  if (file.size > MAX_FILE_SIZE) return 'Cada archivo debe pesar como máximo 10 MB.';
  return '';
}