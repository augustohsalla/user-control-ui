export const variables = {
  API_URL: process.env.PROXY_API || "https://localhost:7146",
};

export const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
};
