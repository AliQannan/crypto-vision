import prisma from "@/lib/db";

export const deleteUser  = async (id : string ) =>{ 
    try { 
        const user = await prisma.user.delete({where : {id : id}})
        return user ;

    }catch(e) {
        return new Response ( "can't deleted user account , please visite my doc" , {status : 500})
    }
}


