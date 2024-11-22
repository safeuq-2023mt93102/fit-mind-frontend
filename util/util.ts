import { Servers, GetRequest, PostRequest } from "@/interfaces/api/interfaces";
import { CORE_BE_URL, USERS_BE_URL } from "@/config/env";
import {signOut} from "next-auth/react";

export function getBaseUrl(server: Servers) {
  switch (server) {
    case Servers.CORE:
      return CORE_BE_URL;
    case Servers.USERS:
      return USERS_BE_URL;
  }
}

export async function callGet(request: GetRequest) {
  return fetch("/api/get", {
    method: "POST",
    body: JSON.stringify(request)
  }).then((response): Response => {
    if (response.status == 401) {
      signOut();
    }
    return response;
  });
}

export async function callPost(request: PostRequest) {
  return fetch("/api/post", {
    method: "POST",
    body: JSON.stringify(request)
  }).then((response) => {
    if (response.status == 401) {
      signOut();
    }
    return response;
  });
}