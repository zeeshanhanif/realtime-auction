import { Component, OnInit } from '@angular/core';
import {BiddingService} from '../../providers/BiddingService'
import { Observable} from 'rxjs';
import { IAppState,AuthActions } from '../../store';
import { NgRedux, select } from 'ng2-redux';
import {ActivatedRoute} from '@angular/router'
import { Router } from '@angular/router';
import { AngularFire,FirebaseListObservable ,FirebaseObjectObservable, FirebaseApp} from 'angularfire2';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @select(['auth','user']) user$ :Observable<any>;
  @select(['auth', 'isLoggedin']) isLoggedin$: Observable<boolean>;
  product: any;
  productId: string;
  productBids: FirebaseListObservable<any>;
  myBidAmount : number;
  isAwarded :boolean;
  highestBidderId: string;
  highestAmountBidded:number;
  highestBidderName: string;
  highestBidId :string;
  awardedBidObj : any
  constructor(private router: Router,private route: ActivatedRoute,private biddingService : BiddingService) {

    this.user$.subscribe(user=>{

        if(user){
          if(!user || !user.$key){
            this.router.navigate(['signin'])

          }
        }
      })


       this.isLoggedin$.subscribe(val=>{
          if(!val){
            this.router.navigate(['signin']);
          }
        })

    this.isAwarded = false;
    this.highestAmountBidded = 0;
    route.params.subscribe(params=> {
      this.productId = params['productId'];
      this.biddingService.getProduct(this.productId).subscribe(prod=> {
        console.log("in prouduct detail test ",prod);
        this.product = prod;
        //this.highestAmount = this.product.startBiddingAmount;
        this.biddingService.getAwardedByOfProduct(this.product)
        .subscribe(bid=>{
          if(bid.$exists()){
            this.awardedBidObj = bid;
          }
        });
      });
      this.productBids = this.biddingService.getProductBids(this.productId);
      
      this.productBids.subscribe(val=>{
        console.log("bids : ",val);
        for(var a=0;a<val.length;a++){
          if(val[a].bidAmount > this.highestAmountBidded){
            this.highestAmountBidded = val[a].bidAmount;
            this.highestBidderId = val[a].userId;
            this.highestBidderName = val[a].userName;
            this.highestBidderId = val[a].$key;
          } 
        }
        
      })
      console.log("product detail  id: ");
    })

    
   }

  ngOnInit() {
  }

  submitBid() {
    this.user$.subscribe(user=>{
      if(user && user.$key){
        this.biddingService.submitBid(this.productId,this.myBidAmount,user.$key,user.firstName);
      }
    });
    
  }

  awardBid(product){
    if(!this.isAwarded && this.highestBidderId){
        product.awardedToUserId = this.highestBidderId;
        product.awardedToUserName = this.highestBidderName;
        product.bidId = this.highestBidderId;
        product.awardedPrice = this.highestAmountBidded;
        this.biddingService.awardBid(product);
        this.isAwarded=true;
    }
  }

  checkBiddingAvailablility(product){
    let isTimeAvailable = new Date(product.auctionEndDate+" "+product.auctionEndTime) > new Date();
    if(!isTimeAvailable) {
      this.awardBid(product);
    }
    return isTimeAvailable;
  }


}
