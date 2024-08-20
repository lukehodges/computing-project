
import { ProjectUseCases, TagUseCases, TaskUseCases } from "@/lib/usecases";
import { TableGeneration } from "./table-generator";


export const dynamic = 'force-dynamic'
export default async function Apps() {
  let p = (await ProjectUseCases.listProjects()).map(ProjectUseCases.serializeProject);
  let projects = []
  for (let i = 0; i < p.length; i++) {
    let k =p[i]
    k = {
      ...k,
      tags:await (await ProjectUseCases.getTags(k.id)).map(TagUseCases.serializeTag)
    }
    projects.push(k)
  } 
  return (
    <div>
      <TableGeneration projects={projects} />
      </div>
  );
}
