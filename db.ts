import { load } from 'https://deno.land/std@0.202.0/dotenv/mod.ts'
import Storage from 'https://denopkg.com/ultraxlight/storage@0.1.3/implementations/supabase.ts'

const env = await load({ envPath: './.env.develop' })
const url = env['SUPABASE_URL'] || Deno.env.get('SUPABASE_URL')
const publicAnonKey = env['SUPABASE_PUBLIC_ANON_KEY'] || Deno.env.get('SUPABASE_PUBLIC_ANON_KEY')

await Storage.init({url, publicAnonKey})

export default Storage