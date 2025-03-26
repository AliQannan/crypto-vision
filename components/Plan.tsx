
import prisma from '@/lib/db';
import React from 'react'

const  PricingSection = async() => {
  const plans = await  prisma.plan.findMany() ;
  return (
    <div> 
      {JSON.stringify(plans)}

    </div>
  )
}

export default PricingSection  ;