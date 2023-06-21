import { ActiveLog } from "src/entities/ActiveLog";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ActiveLog)
export class ActiveLogRepository extends Repository<ActiveLog> {
    
    
}