
import prisma from '@/lib/db'
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';

interface CreateUserData { 
    email: string; 
    planId?: number;
    subscribedAt?: Date;
    renewsAt ? : Date;
} 

export async function createUser(userData: CreateUserData) {
try {
const newUser = await prisma.user.create({
  data: {
    email : userData.email,
    planId :1,
    subscribedAt : userData.subscribedAt,
    renewsAt : userData.renewsAt

 
  }
})

return {
  success: true,
  data: newUser,
  error: null
}
} catch (error) {
// Handle known Prisma errors
if (error instanceof PrismaClientKnownRequestError) {
  // Unique constraint violation (e.g., duplicate email)
  if (error.code === 'P2002') {
    return {
      success: false,
      data: null,
      error: {
        code: 'CONFLICT',
        message: 'User with this email already exists'
      }
    }
  }

  // Other Prisma errors
  return {
    success: false,
    data: null,
    error: {
      code: 'DATABASE_ERROR',
      message: `Prisma error: ${error.message}`,
      meta: error.meta
    }
  }
}

// Handle validation errors
if (error instanceof PrismaClientValidationError) {
  return {
    success: false,
    data: null,
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Invalid user data format'
    }
  }
}

// Handle generic errors
return {
  success: false,
  data: null,
  error: {
    code: 'UNKNOWN_ERROR',
    message: error instanceof Error ? error.message : 'Unknown error occurred'
  }
}
}
}