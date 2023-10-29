import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts";
import { StorageInit } from "https://denopkg.com/ultraxlight/storage@0.3.1/src/types.ts";

const env = await load({ envPath: "./.env.develop" });
const url = env["SUPABASE_URL"] || Deno.env.get("SUPABASE_URL");
const publicAnonKey = env["SUPABASE_PUBLIC_ANON_KEY"] ||
  Deno.env.get("SUPABASE_PUBLIC_ANON_KEY");

export const get = async (tableName: string) => {
  const Storage: StorageInit = await import(
    "https://denopkg.com/ultraxlight/storage@0.3.1/implementations/supabase.ts"
  );

  return Storage.init({ url, publicAnonKey, tableName });
};
