'use server'

import { createClerkSupabaseClientSsr } from "./client"

const client = createClerkSupabaseClientSsr()

export async function addUser(user_id: string, email: string) {
  try {
    const response = await (await client).from('users').insert({
      user_id: user_id,
      email: email,
    })

    console.log('User successfully added!', response)
  } catch (error: any) {
    console.error('Error adding user:', error.message)
    throw new Error('Failed to add user')
  }
}
