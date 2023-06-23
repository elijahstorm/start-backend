
import { EntityRepository, Repository } from "typeorm";
import { Song } from "src/entities/Song";
import { Singer } from "src/entities/Singer";

@EntityRepository(Singer)
export class SingerRepository extends Repository<Singer> {
    
    
}