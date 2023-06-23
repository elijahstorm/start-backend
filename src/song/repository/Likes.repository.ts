
import { EntityRepository, Repository } from "typeorm";
import { Likes } from "src/entities/Likes";

@EntityRepository(Likes)
export class LikesRepository extends Repository<Likes> {
    
    
}