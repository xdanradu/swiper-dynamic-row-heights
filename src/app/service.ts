import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CompareService {

    getMaxHeights(cards: any){
        let res: any;
        for(let i=0;i<cards.length;i++) {
            let heights = this.getHeights(cards[i], res);
            res = heights;
        }
        return res;
    }

    getHeights(card: any, currentHeights: any) {
        let tmp = [];
        let res =[];
        let rows= card.querySelectorAll('.row');

        for(let i=0;i<rows.length;i++) {
            let height = rows[i].clientHeight;
            tmp.push(height);
        }

        if (!currentHeights) return tmp;

        for(let i=0;i<tmp.length;i++) {
            res.push(tmp[i]>currentHeights[i]? tmp[i]: currentHeights[i])
        }
        return res;
    }
}
