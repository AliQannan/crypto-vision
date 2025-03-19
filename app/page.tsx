import prisma from '@/lib/db';
import React from 'react'

const Home = async () => { 
  const users = await prisma.user.findMany(); 

  return (
    <div>
      {JSON.stringify(users)}
      <h1>Home</h1>
    </div>
  )
}

export default Home