import { Injectable } from '@angular/core';
import { AngularFire,FirebaseListObservable ,FirebaseObjectObservable} from 'angularfire2';
import { Router } from '@angular/router'
import { Observable,Observer } from 'rxjs';
import { User } from '../models'
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";

@Injectable()
export class BiddingService {

    categoryList : string[];
    timeSlots: number[];
    userId : string;
    constructor(public af: AngularFire,private router: Router) {
        //this.users = this.af.database.object("/users")
        this.categoryList = [
            "Cell Phones",
            "Computers",
            "Tablets"
        ]
        this.timeSlots = [
            2,3,4,5,6
        ]
    }


    getCategoryList(){
        return this.categoryList;
    }

    getTimeSlots(){
        return this.timeSlots;
    }

    addProductForAuction (product,user){
        product.userId = user.$key;
        product.postedBy = user.firstName;
        return this.af.database.list("/products/").push(product);
    }

    getProductList(category:string){
        return this.af.database.list("/products",{query: {
                            orderByChild: 'category',
                            equalTo: category
        }});
    }

    getProduct(productId:string){
        return this.af.database.object("/products/"+productId);
    }

    getProductBids(productId:string){
        return this.af.database.list("/productBids/"+productId);
    }

    submitBid(productId,bidAmount,userId,userName){
        this.af.database.list("/productBids/"+productId)
        .push({
            productId:productId,
            userId:userId,
            userName:userName,
            bidAmount:bidAmount,
            bidDatetime: (new Date()).getTime()
        })
    }

    setUserId(userId){
        this.userId = userId;
    }

    getUserId(){
        return this.userId;
    }

    awardBid(product){
        if(product && product.$key){
            let key= product.$key;
            product.productId = key;
            delete product["$exists"];
            delete product["$key"];
            this.af.database.object("/awardedBids/"+key).subscribe(val=>{
                if(!val.$exists()){
                    this.af.database.object("/awardedBids/"+key).set(product);   
                }
            })
        }
    }

    getAwardedByOfProduct(product){
        if(product && product.$key)
            return this.af.database.object("/awardedBids/"+product.$key);
    }

    
   
}