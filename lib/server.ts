import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createServerComponentClient() {
    const cookieStore = cookies()
    return createServerClient("https://oirqwnbtxkeuhhegsnkd.supabase.co"!, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pcnF3bmJ0eGtldWhoZWdzbmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MjE2OTUsImV4cCI6MjAzNzM5NzY5NX0.s2uMs93AnQ1LTOP96pzj8YqGEx5kSfA0-fSBDSMg4_8"!, {
        cookies: {
            getAll() {
                return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            }
        }
    })
}