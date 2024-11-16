import {Session} from "next-auth";
import {JWT} from "next-auth/jwt";


export interface ISession extends Session {
  accessToken: string;
}

export interface IToken extends JWT {
  accessToken: string;
  provider: string;
  idToken: string;
}