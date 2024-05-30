import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDTO } from "./users.dto";
export interface IUser{
    id: number;
    name: string;
    isSmoker: boolean;
}
@Injectable()
export class UsersService{
    private users = [
        {
            id:1,
            name:"bachi",
            isSmoker:false
        },
        {
            id:2,
            name:"vano",
            isSmoker:true
        },
    ]
    getAllUsers():IUser[]{
        return this.users
    }

    getUserById(id:number){
        const user = this.users.find(el => el.id === id)
        if(!user)throw new HttpException("Not Found This User",HttpStatus.NOT_FOUND)
            return user
    }

    createUser(body:UserDTO){
        if(!body.name || !body.isSmoker)throw new HttpException("name and isSMoker is require",HttpStatus.BAD_REQUEST)
            const lastId = this.users[this.users.length - 1]?.id || 0
            const newUSer = {
                id:lastId + 1,
                ...body
            }
            this.users.push(newUSer)
            return newUSer
    }

    deleteUser(id:number){
        const index = this.users.findIndex(el => el.id === id)
        if(index === -1)throw new HttpException("Not Found User vasiaa",HttpStatus.NOT_FOUND)
            const deletedUser = this.users.splice(index,1)
        return deletedUser
    }

    updateUser(id: number, updateUserDto: UserDTO): IUser {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        const updatedUser = { ...this.users[index], ...updateUserDto };
        this.users[index] = updatedUser;
        return updatedUser;
    }
}