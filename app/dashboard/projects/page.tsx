
import { ProjectUseCases, TagUseCases, TaskUseCases } from "@/lib/usecases";
import { TableGeneration } from "./table-generator";



export default async function Apps() {
  let p = (await ProjectUseCases.listProjects()).map(ProjectUseCases.serializeProject);
  let projects = []
  for (let i = 0; i < p.length; i++) {
    let k =p[i]
    k.tags = await (await ProjectUseCases.getTags(k.id)).map(TagUseCases.serializeTag)
    console.log(k.tags)
    projects.push(k)
  } 
  return (
    <div>
      <TableGeneration projects={projects} />
      </div>
  );
}
