import { IUserRepository } from "../repositories/IUserRepository";

export class UserUseCases{
    constructor(private userRepository: IUserRepository){}

    getUserByID(userID:number) {
        return this.userRepository.getbyID(userID);
    }
}