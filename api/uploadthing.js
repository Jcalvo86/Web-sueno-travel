import { createUploadthing, createRouteHandler } from "uploadthing/next-legacy";

const f = createUploadthing();

const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("ImageUploader complete for file:", file.url);
      return { url: file.url };
    }),
};

export default createRouteHandler({
  router: ourFileRouter,
});
