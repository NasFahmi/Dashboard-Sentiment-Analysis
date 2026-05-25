export const parseDate = (date: string | Date | null): Date => {
  if (date instanceof Date) {
    return date;
  }
  if (typeof date === "string") {
    const parsed = new Date(date);
    // Pastikan tanggal valid
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }
  // Jika null atau undefined, fallback ke sekarang
  return new Date();
};