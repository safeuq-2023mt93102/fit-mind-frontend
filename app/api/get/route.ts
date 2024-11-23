import {auth} from "@/auth";
import {ISession} from "@/interfaces/auth/interface";
import {NextRequest} from "next/server";
import {GetRequest, Servers} from "@/interfaces/api/interfaces";
import {getBaseUrl} from "@/util/util";

export async function POST(forwardRequest: NextRequest) {
  const session = await auth() as ISession

  const request = await forwardRequest.json() as GetRequest;
  const requestPath = request.path;

  let headers: any = {
    'Content-Type': 'application/json',
  };
  if (session) {
    headers['Authorization'] = "Bearer " + session?.accessToken
  }
  let fullUrl = getBaseUrl(request.server) + requestPath;
  return fetch(fullUrl, {
    method: 'GET',
    headers: headers
  }).then((response) => {
    console.log("External: GET ", fullUrl, response.status)
    return response
  });
}