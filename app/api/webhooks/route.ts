import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser } from '@/controllers'
import { deleteUser } from '@/controllers/userControllers'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!SIGNING_SECRET) {
    return new Response('Please add CLERK_WEBHOOK_SECRET to your environment variables', { status: 400 })
  }

  const headerPayload = await headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing Svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(SIGNING_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return new Response('Invalid signature', { status: 401 })
  }

  if (evt.type === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data

    // Validate required fields
    if (!email_addresses?.length) {
      return new Response('User email is required', { status: 400 })
    }
      const userData = { 
        email : email_addresses[0].email_address,
        planId : 1,
        subscribedAt : new Date(),
        renewsAt : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        
       
      }
    console.log( await createUser(userData)) ; 
   
  }
  if (evt.type === 'user.deleted') {
    try { 
      const {id} = evt.data
      await deleteUser(id as string)

      return new Response ("User deleted successfully", {status : 200})
    }catch(e) {
        return new Response ("can't deleted user account , please visite my doc" , {status : 500})
    } 
    



   } 

  return new Response('Event received but not processed', { status: 200 })
}