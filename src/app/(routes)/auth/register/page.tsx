"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterForm, RegisterFormSchema } from "@/schemas/auth";

import { register } from "./action";

export default function RegisterPage() {
  const [serverErrors, setServerErrors] = useState({});
  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async () => {
    // react-hook-form will validate the form before calling onSubmit
    setServerErrors({});
    try {
      const result = await register(form.getValues());
      if (result.errors) {
        setServerErrors(result.errors);
      } else {
        console.log(result);
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex w-1/2 flex-col gap-y-4"
        >
          <h1 className="text-center text-4xl font-extrabold text-neutral-600">
            Register
          </h1>
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
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </div>
  );
}
