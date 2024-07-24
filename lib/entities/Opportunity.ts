// src/lib/entities/Opportunity.ts
export class Opportunity {
    constructor(
      public id: number,
      public title: string,
      public createdAt:Date,
      public monetaryValue:number,
      public confidence: number,
      public stageId: number,
      public pipelineId: number
    ) {}
  }