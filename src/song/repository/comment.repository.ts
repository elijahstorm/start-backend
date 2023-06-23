
import { EntityRepository, Repository } from "typeorm";
import { Comment } from "src/entities/Comment";

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
    
    
}