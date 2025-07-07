"use server";

import { z } from "zod";
import { FormState } from "./auth/signup/page";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  number: z.string().min(10).min(10),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function CreateUser(prevState: FormState, formData: FormData) {
  const validationFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    number: formData.get("number"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
  });

  if (!validationFields.success) {
    return {
      errors: validationFields.error.flatten().fieldErrors,
      success: false,
      message: undefined,
    } as FormState;
  }

  const { name, email, number, password } = validationFields.data;

  try {
    console.log("name", name);
    console.log("email", email);
    console.log("number", number);
    console.log("password", password);

    return {
      errors: {},
      success: true,
      message: "User created successfully!",
    } as FormState;
  } catch (error) {
    return {
      errors: { general: ["Failed to create user. Please try again."] },
      success: false,
      message: undefined,
    } as FormState;
  }
}

export async function LoginUser(prevState: FormState, formData: FormData) {
  const validationFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      errors: validationFields.error.flatten().fieldErrors,
      success: false,
      message: undefined,
    } as FormState;
  }

  const { email, password } = validationFields.data;

  try {
    console.log("email", email);
    console.log("password", password);

    return {
      errors: {},
      success: true,
      message: "Logged successfully!",
    } as FormState;
  } catch (error) {
    return {
      errors: { general: ["Failed to create user. Please try again."] },
      success: false,
      message: undefined,
    } as FormState;
  }
}
