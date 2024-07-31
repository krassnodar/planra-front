export interface UploadWidgetResult {
  /**
   * The `accountId` the file was uploaded to.
   */
  accountId: string;
  editedFile: UploadedFile | undefined;
  /**
   * The `etag` of the `originalFile`
   */
  etag: string;
  /**
   * The `filePath` of `editedFile` (if it exists) else the `filePath` of `originalFile`.
   */
  filePath: string;
  /**
   * The `fileUrl` of `editedFile` (if it exists) else the `fileUrl` of `originalFile`.
   */
  fileUrl: string;
  originalFile: UploadedFile;
}

export interface UploadedFile extends UploadResult {
  file: FileLike;
}

export interface FileLike {
  readonly name: string;
  readonly size: number;
  readonly type: string;
  slice: (start?: number, end?: number) => Blob;
}

export type UploadResult = Omit<FileDetails, "etag"> & {
  /**
   * The file's ETag, short for "entity tag", reflects the file's version and changes whenever the file is modified.
   */
  etag: string;
};

export interface FileDetails {
  /**
   * Your account ID.
   *
   * This is visible on the settings page:
   *
   * https://www.bytescale.com/dashboard/settings
   * @type {string}
   * @memberof FileDetails
   */
  accountId: string;
  /**
   * The file's ETag, short for "entity tag", reflects the file's version and changes whenever the file is modified.
   * @type {string}
   * @memberof FileDetails
   */
  etag: string | null;
  /**
   * The file metadata specified in the original upload request as a JSON object.
   * @type {{ [key: string]: any; }}
   * @memberof FileDetails
   */
  metadata: {
    [key: string]: any;
  };
  /**
   * File MIME type.
   * @type {string}
   * @memberof FileDetails
   */
  mime: string;
  /**
   *
   * @type {string}
   * @memberof FileDetails
   */
  originalFileName: string | null;
  /**
   *
   * @type {Array<string>}
   * @memberof FileDetails
   */
  tags: Array<string>;
  /**
   * Absolute path to a file. Begins with a `/`.
   * @type {string}
   * @memberof FileDetails
   */
  filePath: string;
  /**
   * URL for a raw file hosted on the Bytescale CDN.
   * @type {string}
   * @memberof FileDetails
   */
  fileUrl: string;
  /**
   * Epoch milliseconds (since midnight 1 January 1970, UTC).
   * @type {number}
   * @memberof FileDetails
   */
  lastModified: number;
  /**
   * Size in bytes.
   * @type {number}
   * @memberof FileDetails
   */
  size: number;
}
