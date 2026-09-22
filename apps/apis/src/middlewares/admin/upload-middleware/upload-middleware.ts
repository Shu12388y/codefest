import fs from "fs/promises";
import path from "path";
import type { MiddlewareHandler } from "hono";
import { uploadFilesToImageKit } from "../../../utils/imageKit/imageKit.js";

export class uploaderMiddleware {
  static upload: MiddlewareHandler = async (c, next) => {
    try {
      const contentType = c.req.header("content-type") || "";

      if (!contentType.includes("multipart/form-data")) {
        await next();
        return;
      }

      const formData = await c.req.raw.formData();
      const requestWithFormData = c.req as typeof c.req & {
        parsedFormData?: FormData;
      };
      requestWithFormData.parsedFormData = formData;
      const fieldName = ["thumbnail", "image", "file", "upload"].find((name) =>
        formData.has(name),
      );

      if (!fieldName) {
        await next();
        return;
      }

      const fileValue = formData.get(fieldName);

      if (!(fileValue instanceof File)) {
        await next();
        return;
      }

      const uploadDirectory = path.resolve(process.cwd(), "uploads");
      await fs.mkdir(uploadDirectory, { recursive: true });

      const fileName = fileValue.name || `upload-${Date.now()}.png`;
      const localFilePath = path.join(uploadDirectory, fileName);
      const fileBuffer = Buffer.from(await fileValue.arrayBuffer());

      await fs.writeFile(localFilePath, fileBuffer);

      const uploaded = await uploadFilesToImageKit(fileBuffer);
      const uploadedUrl = Array.isArray(uploaded)
        ? uploaded[0]?.url
        : uploaded?.url;

      if (!uploadedUrl) {
        throw new Error("Image upload failed");
      }

      const requestWithThumbnail = c.req as typeof c.req & {
        thumbnail?: string;
        thumbnailUrl?: string;
      };

      requestWithThumbnail.thumbnail = uploadedUrl;
      requestWithThumbnail.thumbnailUrl = uploadedUrl;

      await fs.unlink(localFilePath).catch(() => undefined);

      await next();
    } catch (error) {
      console.log(error);
      c.status(500);
      return c.json({ message: "Image upload failed" });
    }
  };
}