"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";
import { Scrypt } from "lucia";

import db from "@/db";
import { encrypt } from "@/lib/auth";
import { LoginForm, LoginFormSchema } from "@/schemas/auth";

type ReturnType = {
  message: string;
  errors?: Record<string, unknown>;
};

export async function loginWithEmail(data: LoginForm): Promise<ReturnType> {
  // test error
  // data.email = "";
  // data.password = "";
  // validate on server side is important to prevent any kind of attack
  const parsed = LoginFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  // check if user exists
  const existingUser = await db.query.users.findFirst({
    where: (users) => eq(users.email, data.email),
  });
  if (!existingUser || !existingUser.hashedPassword) {
    return {
      message: "User not found",
    };
  }
  // check if password is correct
  const validatePassword = await new Scrypt().verify(
    existingUser.hashedPassword,
    data.password
  );
  if (!validatePassword) {
    return {
      message: "Password is incorrect",
    };
  }
  // Create the session
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    user: {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    },
    expires,
  });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
  redirect("/");
}
