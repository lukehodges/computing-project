import { Opportunity } from "@/lib/entities/Opportunity"
import { Opportunity as PrismaOpportunity } from "@prisma/client"
export const mapPrismaOpportunityToEntity  = (prismaOpportunity: PrismaOpportunity) : Opportunity => {
    return new Opportunity(
        prismaOpportunity.id,
        prismaOpportunity.title,
        prismaOpportunity.createdAt,
        prismaOpportunity.monetaryValue,
        prismaOpportunity.confidence,
        prismaOpportunity.stageId,
        prismaOpportunity.pipelineId
    )
}
export const mapEntityToPrismaOpportunity = (opportunity:Opportunity): PrismaOpportunity => {
    return {
        id: opportunity.id,
        title: opportunity.title,
        createdAt: opportunity.createdAt,
        monetaryValue: opportunity.monetaryValue,
        confidence: opportunity.confidence,
        stageId: opportunity.stageId,
        pipelineId: opportunity.pipelineId,
    }
}