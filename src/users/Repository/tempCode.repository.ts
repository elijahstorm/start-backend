
import { EntityRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { tempCode } from "src/entities/tempCode";

@EntityRepository(tempCode)
export class TempCodeRepository extends Repository<tempCode> {
    
    
}