import { Project } from "@/lib/entities/Project";
import { ProjectUseCases } from "@/lib/usecases";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res:NextRequest) {
    const body = await res.json();
    let project = new Project(
        body.id,
        body.name,
        body.description,
        null,
        new Date(),
        new Date()
    )
    console.log(project)
    ProjectUseCases.createProject(project);
    return NextResponse.json({success: true, body: project});
}