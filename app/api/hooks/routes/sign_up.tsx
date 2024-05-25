import prisma from "@/app/db"

export default async function Signup(body:any) {
    console.log(body)
    // mapping the output (body) to the prisma schema
    // await prisma.user.deleteMany({where:{
    //     "birthday":null
    // }})
    await prisma.user.create({
        data:{
            "id":body.id,
            "lastName":body.last_name,
            "firstName":body.first_name,
            "email":body.email_addresses[0].email_address,
            "passwordEnabled":body.password_enabled,
            "emailVerified":Boolean(body.email_addresses[0].verification.status === "verified"),
            "image":body.profile_image_url,
            "username":body.username,
            "tfaEnabled": body.two_factor_enabled,
            "gender":body.gender
    
        }
    })
    console.log("created user")
    let p = await prisma.user.count();
    
}