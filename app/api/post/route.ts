import {auth} from "@/auth";

export async function POST(forwardRequest: any) {
  const session = await auth()

  const request = await forwardRequest.json();
  const requestBody = request.payload
  const requestPath = request.path;

  console.log("Request body: ", requestBody);
  console.log("Request path: ", requestPath);
  let headers: any = {
    'Content-Type': 'application/json',
  };
  if (session) {
    headers['Authorization'] = "Bearer " + session?.accessToken
  }
  return fetch('http://localhost:8080' + requestPath, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  });
}