import { Tag } from "../entities/Tag";

export class TagUseCases {
    // constructor(private tagRepository: ITagRepository) {}
    serializeTag(tag:Tag){
        return JSON.parse(JSON.stringify(tag))
    }
}