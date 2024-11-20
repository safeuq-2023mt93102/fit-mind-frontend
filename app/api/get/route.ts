import {auth} from "@/auth";
import {ISession} from "@/interfaces/auth/interface";
import {NextRequest} from "next/server";
import {GetRequest} from "@/interfaces/api/interfaces";

export async function POST(forwardRequest: NextRequest) {
  const session = await auth() as ISession

  const request = await forwardRequest.json() as GetRequest;
  const requestPath = request.path;

  console.log("Request path: ", requestPath);
  return fetch('http://localhost:8081' + requestPath, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + session?.accessToken,
    },
  }).then((success) => {
    console.log("Success: ", success)
    return success
  }, (error) => {
    console.log("Error: ", error)
    return error
  });
}