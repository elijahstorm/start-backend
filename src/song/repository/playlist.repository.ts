
import { EntityRepository, Repository } from "typeorm";
import { PlayList } from "src/entities/PlayList";

@EntityRepository(PlayList)
export class PlayListRepository extends Repository<PlayList> {

    //플레이 리스트 페이지 네이션해서 가져오기
    async getAllPlayList( uid : number, page: number, size:number):Promise<[PlayList[], number]>{
        const queryBuilder = this.createQueryBuilder('u')
            .where("u.uid = :uid", {uid})
            .andWhere('is_deleted = 0')
            .limit(size) 
            .offset(page*size); 

        return queryBuilder.getManyAndCount();
    }
    
}