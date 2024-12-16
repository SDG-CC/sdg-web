import { createUploadthing, type FileRouter } from "uploadthing/next";

const Upload = createUploadthing();

export const ourFileRouter = {

    imageUploader: Upload({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    })

    .onUploadComplete(async ({ file }) =>{

        // console.log("file url", file, file.url);

        return {uploadedBy: "SDGCC"};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;