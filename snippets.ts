// // Code Snippet: Supabase
//   // The `useUser()` hook will be used to ensure that Clerk has loaded data about the logged in user
//   const { user } = useUser()
//   // The `useSession()` hook will be used to get the Clerk session object
//   const { session } = useSession()

//   // Create a custom supabase client that injects the Clerk Supabase token into the request headers
//   function createClerkSupabaseClient() {
//     return createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_KEY!,
//       {
//         global: {
//           // Get the custom Supabase token from Clerk
//           fetch: async (url, options = {}) => {
//             const clerkToken = await session?.getToken({
//               template: "supabase",
//             })

//             // Insert the Clerk Supabase token into the headers
//             const headers = new Headers(options?.headers)
//             headers.set("Authorization", `Bearer ${clerkToken}`)

//             // Now call the default fetch
//             return fetch(url, {
//               ...options,
//               headers,
//             })
//           },
//         },
//       }
//     )
//   }

//   // Create a `client` object for accessing Supabase data using the Clerk token
//   const supabaseClient = createClerkSupabaseClient()
