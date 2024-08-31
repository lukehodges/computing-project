import { TaskUseCases } from "@/lib/usecases";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, context:any) {

}

export async function DELETE(req:NextRequest, context:any) {
    const {params} = context;
    const tid = params.taskid;
    const uid = params.userid;
    if (!tid) {
        return NextResponse.json({error:"Task ID is required"}, {status:400})
    }
    if (!uid) {
        return NextResponse.json({error:"User ID is required"}, {status:400})
    }
    try {
        let task = await TaskUseCases.removeAssignee(Number(tid),Number(uid))
    return NextResponse.json({message:"sent successfully"}, {status:200})
    }
    catch(e){
        console.log(e)
        return NextResponse.json({error:"Error Occured"},{status:500})
    }
}