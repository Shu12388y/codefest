import ImageKit from "imagekit";
import { ENV } from "../../env/env.js";

const publicKey = ENV.IMAGEKIT_PUBLIC_KEY || "";
const privateKey = ENV.IMAGEKIT_PRIVATE_KEY || "";
const urlEndpoint = ENV.IMAGEKIT_URL_ENDPOINT || "";

if (!publicKey || !privateKey || !urlEndpoint) {
  console.warn(
    "ImageKit credentials are missing. Set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT in your environment.",
  );
}

export const imageKit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export type UploadableFile = File | Blob | Buffer | ArrayBuffer | string;

export const uploadFilesToImageKit = async (
  files: UploadableFile[] | UploadableFile,
) => {
  if (!files) {
    throw new Error("Files are required");
  }

  const normalizedFiles = Array.isArray(files) ? files : [files];

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error("ImageKit configuration is missing");
  }

  const uploadedFiles = await Promise.all(
    normalizedFiles.map(async (file, index) => {
      const fileBuffer = await normalizeFile(file);

      const response = await imageKit.upload({
        file: fileBuffer,
        fileName: getFileName(file, index),
        folder: "/codefest",
        useUniqueFileName: true,
      });

      return {
        fileId: response.fileId,
        url: response.url,
        name: response.name,
        size: response.size,
      };
    }),
  );

  return uploadedFiles.length === 1 ? uploadedFiles[0] : uploadedFiles;
};

async function normalizeFile(file: UploadableFile): Promise<string | Buffer> {
  if (typeof file === "string") {
    return file;
  }

  if (Buffer.isBuffer(file)) {
    return file;
  }

  if (file instanceof Blob) {
    const arrayBuffer = await file.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  if (file instanceof ArrayBuffer) {
    return Buffer.from(file);
  }

  //   if (typeof File !== "undefined" && file as File) {
  //     const arrayBuffer = await file.arrayBuffer();
  //     return Buffer.from(arrayBuffer);
  //   }

  throw new Error("Unsupported file type for ImageKit upload");
}

function getFileName(file: UploadableFile, index: number): string {
  if (typeof File !== "undefined" && file instanceof File && file.name) {
    return file.name;
  }

  if (typeof file === "string") {
    return file.split("/").pop() || `image-${index}.png`;
  }

  return `image-${Date.now()}-${index}.png`;
}
