
import { EntityRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { Grade } from "src/entities/Grade";

@EntityRepository(Grade)
export class GradeRepository extends Repository<Grade> {


    
}