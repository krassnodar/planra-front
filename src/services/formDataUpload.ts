// // src/utils/formDataUpload.ts

// export interface FormDataUploadParams {
//   requestBody: Blob;
//   originalFileName: string;
//   metadata?: Record<string, unknown>;
//   querystring?: Record<string, unknown>;
// }

// export async function formDataUpload(
//   params: FormDataUploadParams
// ): Promise<any> {
//   const baseUrl = "https://api.bytescale.com";
//   const path = `/v2/accounts/${process.env.REACT_APP_BYTESCALE_ACCOUNT_ID}/uploads/form_data`;
//   const entries = (obj: Record<string, unknown>) =>
//     Object.entries(obj).filter(([, val]) => val != null);
//   const query = entries(params.querystring ?? {})
//     .flatMap(([k, v]) => (Array.isArray(v) ? v.map((v2) => [k, v2]) : [[k, v]]))
//     .map((kv) => kv.join("="))
//     .join("&");
//   const formData = new FormData();
//   formData.append("file", params.requestBody, params.originalFileName);

//   const headers = new Headers({
//     Authorization: `Bearer ${process.env.REACT_APP_BYTESCALE_API_KEY}`,
//     "X-Upload-Metadata": JSON.stringify(params.metadata ?? {}),
//   });

//   const response = await fetch(
//     `${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`,
//     {
//       method: "POST",
//       body: formData,
//       headers: headers,
//     }
//   );
//   const result = await response.json();

//   console.log("result:  ", result);
//   if (response.status >= 400) {
//     throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
//   }
//   return result;
// }

export interface FormDataUploadParams {
  requestBody: Blob;
  originalFileName: string;
  metadata?: Record<string, unknown>;
  querystring?: Record<string, unknown>;
}

export async function formDataUpload(
  params: FormDataUploadParams
): Promise<any> {
  const baseUrl = "https://api.bytescale.com";
  const path = `/v2/accounts/${process.env.REACT_APP_BYTESCALE_ACCOUNT_ID}/uploads/form_data`;
  const entries = (obj: Record<string, unknown>) =>
    Object.entries(obj).filter(([, val]) => val != null);
  const query = entries(params.querystring ?? {})
    .flatMap(([k, v]) => (Array.isArray(v) ? v.map((v2) => [k, v2]) : [[k, v]]))
    .map((kv) => kv.join("="))
    .join("&");
  const formData = new FormData();
  formData.append("file", params.requestBody, params.originalFileName);

  const headers = new Headers({
    Authorization: `Bearer ${process.env.REACT_APP_BYTESCALE_API_KEY}`,
    "X-Upload-Metadata": JSON.stringify(params.metadata ?? {}),
  });

  const response = await fetch(
    `${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`,
    {
      method: "POST",
      body: formData,
      headers: headers,
    }
  );
  const result = await response.json();
  if (response.status >= 400) {
    throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
  }
  return result;
}
