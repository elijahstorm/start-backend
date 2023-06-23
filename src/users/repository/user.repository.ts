
import { EntityRepository, Repository } from "typeorm";
import { User } from "../../entities/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
    findAllUser(uid: number, partyid: number):Promise<User[]>{
        const queryBuilder = this.createQueryBuilder('u')
        if(uid) { 
            queryBuilder.andWhere("u.uid = :uid ", {uid})
        }

        else if(partyid) {
            queryBuilder.andWhere("u.partyid = :partyid", {partyid});
        }

        return queryBuilder.getMany()
    }


    
}