export const dbUrl: string = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.mfhxfav.mongodb.net/?retryWrites=true&w=majority`;
export const imagesWhitelist = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];
export const filesBlacklist = ["application/x-httpd-php"];
