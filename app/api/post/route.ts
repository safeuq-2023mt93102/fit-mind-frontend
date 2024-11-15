import {auth} from "@/auth";

export async function POST(forwardRequest: any) {
  const session = await auth()

  const request = await forwardRequest.json();
  const requestBody = request.payload
  const requestPath = request.path;

  console.log("Request body: ", requestBody);
  console.log("Request path: ", requestPath);
  return fetch('http://localhost:8080' + requestPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + session?.accessToken,
    },
    body: JSON.stringify(requestBody)
  });
}