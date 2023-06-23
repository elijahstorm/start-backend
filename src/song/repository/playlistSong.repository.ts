
import { EntityRepository, Repository } from "typeorm";
import { PlayList } from "src/entities/PlayList";
import { PlayListSong } from "src/entities/PlayListSong";
import { Song } from "src/entities/Song";

@EntityRepository(PlayListSong)
export class PlayListSongRepository extends Repository<PlayListSong> {
     
    // getAllPlayListSong( playlist_id : number):Promise<PlayList[]>{
    //     const queryBuilder = this.createQueryBuilder('u')
            
    //         .leftJoin(Song, 's')
            

    //     return queryBuilder.getMany();
    // }
    
}