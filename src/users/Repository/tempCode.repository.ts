
import { EntityRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { TempCode } from "src/entities/TempCode";

@EntityRepository(TempCode)
export class TempCodeRepository extends Repository<TempCode> {
    
    
}