import {auth} from "@/auth";
import {ISession} from "@/interfaces/auth/interface";
import {NextRequest} from "next/server";
import {GetRequest, Servers} from "@/interfaces/api/interfaces";
import {getBaseUrl} from "@/util/util";

export async function POST(forwardRequest: NextRequest) {
  const session = await auth() as ISession

  const request = await forwardRequest.json() as GetRequest;
  const requestPath = request.path;

  console.log("Request path: ", requestPath);
  let headers: any = {
    'Content-Type': 'application/json',
  };
  if (session) {
    headers['Authorization'] = "Bearer " + session?.accessToken
  }
  return fetch(getBaseUrl(request.server) + requestPath, {
    method: 'GET',
    headers: headers
  });
}