export class Project {
    constructor(
        public id:number,
        public name:string,
        public description:string | null,
        public ownerID:number | null,
        public createdAt:Date,
        public updatedAt:Date,
        public iconId:number | null,
    ){}
}