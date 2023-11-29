import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { getUserById } from "@/lib/getUser";
import { getDomain, getFullUrl, getValidSubdomain } from "@/lib/url";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
