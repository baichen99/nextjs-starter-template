"use server";

import { eq } from "drizzle-orm";
import { Scrypt } from "lucia";

import db from "@/db";
import users from "@/db/schema/users";
import { RegisterForm, RegisterFormSchema } from "@/schemas/auth";

type ReturnType = {
  message: string;
  errors?: Record<string, unknown>;
  id?: string;
};

export async function register(data: RegisterForm): Promise<ReturnType> {
  const parsed = RegisterFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  const existingUser = await db.query.users.findFirst({
    where: (users) => eq(users.email, data.email),
  });

  if (existingUser) {
    return {
      message: "User already exists",
    };
  }
  // hash password
  const hashedPassword = await new Scrypt().hash(data.password);
  // create user
  const newUser = await db
    .insert(users)
    .values({
      email: data.email,
      hashedPassword,
    })
    .returning({
      id: users.id,
    });
  if (!newUser || newUser.length === 0) {
    return {
      message: "Failed to create user",
    };
  }
  return {
    message: "User created",
    id: newUser[0].id,
  };
}
