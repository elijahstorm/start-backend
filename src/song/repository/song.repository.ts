
import { EntityRepository, Repository } from "typeorm";
import { Song } from "src/entities/Song";
import { Singer } from "src/entities/Singer";
import { Video } from "src/entities/Video";

@EntityRepository(Song)
export class SongRepository extends Repository<Song> {

    async getSongInfo( song_id : number):Promise<Song>{
        const queryBuilder = this.createQueryBuilder('u')
            .leftJoin(Singer, 's')
            .leftJoin(Video, 'v')
            .where('id = :song_id' , {song_id});

        return queryBuilder.getOne();
    }
    
}