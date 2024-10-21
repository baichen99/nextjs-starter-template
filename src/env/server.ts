import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { ZodError, z } from "zod";

// 允许使用${}语法引用其他环境变量
expand(config());

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.coerce.number(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_URL: z.string(),
    DATABASE_MIGRATING: z
      .string()
      .refine((s) => s === "true" || s === "false")
      .transform((s) => {
        return s === "true";
      }),
    JWT_SECRET: z.string(),
  },

  emptyStringAsUndefined: true, // 如果有配置项的值为空字符串，则转换为 undefined
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // eslint-disable-next-line n/no-process-env
  experimental__runtimeEnv: process.env,
  onValidationError: (error: ZodError) => {
    console.error(
      "❌ Invalid environment variables:",
      error.flatten().fieldErrors
    );
    process.exit(1);
  },
});
