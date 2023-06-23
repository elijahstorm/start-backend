
import { EntityRepository, Repository } from "typeorm";
import { Song } from "src/entities/Song";
import { Video } from "src/entities/Video";

@EntityRepository(Video)
export class VideoRepository extends Repository<Video> {
    
    
}