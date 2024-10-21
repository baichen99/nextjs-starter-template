"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginWithEmail } from "@/app/(routes)/auth/login/action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginForm, LoginFormSchema } from "@/schemas/auth";

export default function LoginPage() {
  const [serverErrors, setServerErrors] = useState({});
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async () => {
    // react-hook-form will validate the form before calling onSubmit
    setServerErrors({});
    try {
      const result = await loginWithEmail(form.getValues());
      if (result.errors) {
        setServerErrors(result.errors);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 w-full px-2">
      {serverErrors && (
        <div className="mb-10 text-red-500">
          {Object.keys(serverErrors).map((key) => (
            <p
              key={key}
            >{`${key}: ${serverErrors[key as keyof typeof serverErrors]}`}</p>
          ))}
        </div>
      )}
      <Form {...form}>
        <h1 className="text-center text-4xl font-extrabold text-neutral-500">
          Login
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex w-1/2 flex-col gap-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input {...field} />
                {form.formState.errors.email && (
                  <FormMessage>
                    {form.formState.errors.email.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input {...field} type="password" />
                {form.formState.errors.password && (
                  <FormMessage>
                    {form.formState.errors.password.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
