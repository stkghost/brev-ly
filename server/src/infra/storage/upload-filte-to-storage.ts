import { randomUUID } from "node:crypto";
import { basename, extname } from "node:path";
import { Readable } from "node:stream";
import z from "zod";
import { Upload } from "@aws-sdk/lib-storage";
import { r2 } from "./client";
import { env } from "../env";

const uploadFileToStorageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
  folder: z.enum(["images", "downloads"]),
});

type UploadFileToStorageInput = z.input<typeof uploadFileToStorageInput>;

export async function uploadFileToStorage(input: UploadFileToStorageInput) {
  const { contentStream, contentType, fileName, folder } =
    uploadFileToStorageInput.parse(input);

  const fileExtension = extname(fileName);
  const fileNameWithoutExtension = basename(fileName);
  const sanitizedFilename = fileNameWithoutExtension.replace(
    /[^a-zA-Z0-9]/g,
    "",
  );

  const sanitizedFileNameWithExtension =
    sanitizedFilename.concat(fileExtension);

  const uniqueFileName = `${folder}/${randomUUID()}-${sanitizedFileNameWithExtension}`;

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueFileName,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: contentStream,
      ContentType: contentType,
    },
  });

  await upload.done();

  return {
    key: uniqueFileName,
    url: new URL(uniqueFileName, env.CLOUDFLARE_BUCKET_URL).toString(),
  };
}
