import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { SignJWT, jwtVerify } from "jose";

import { env } from "@/env/server";

const secretKey = env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

const EXPIRED_TIME = 30 * 24 * 60 * 60 * 1000;

export async function encrypt(
  payload: Record<string, unknown>
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(key);
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

// export async function login(formData: FormData) {
//   // Verify credentials && get the user

//   const user = { email: formData.get("email"), name: "John" };

//   // Create the session
//   const expires = new Date(Date.now() + EXPIRED_TIME);
//   const session = await encrypt({ user, expires });

//   // Save the session in a cookie
//   cookies().set("session", session, { expires, httpOnly: true });
// }

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + EXPIRED_TIME);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires as Date,
  });
  return res;
}
