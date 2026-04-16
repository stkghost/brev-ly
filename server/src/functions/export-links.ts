import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { uploadFileToStorage } from "@/infra/storage/upload-filte-to-storage";
import { Either, makeRight } from "@/shared/either";
import { stringify } from "csv-stringify";
import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

export async function exportLinks(): Promise<
  Either<never, { fileUrl: string }>
> {
  const { sql, params } = db
    .select({
      original_url: schema.links.original_url,
      created_at: schema.links.createdAt,
      alias: schema.links.alias,
      clicks: schema.links.clicks,
    })
    .from(schema.links)
    .toSQL();

  const cursor = pg.unsafe(sql, params as string[]).cursor(1);

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "alias", header: "Alias" },
      { key: "original_url", header: "ID" },
      { key: "clicks", header: "Clicks" },
      { key: "craeted_at", header: "Criado Em" },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const convertToCsvPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }
        callback();
      },
    }),
    csv,
    uploadToStorageStream,
  );

  const uploadToStrage = uploadFileToStorage({
    contentType: "text/csv",
    folder: "downloads",
    fileName: `${new Date().toISOString()}-uploads.csv`,
    contentStream: uploadToStorageStream,
  });

  const [{ url }] = await Promise.all([uploadToStrage, convertToCsvPipeline]);

  return makeRight({ fileUrl: url });
}
