import { Component, OnInit } from '@angular/core';
import {BiddingService} from '../../providers/BiddingService'
import { Observable} from 'rxjs';
import { IAppState,AuthActions } from '../../store';
import { NgRedux, select } from 'ng2-redux';
import {ActivatedRoute} from '@angular/router'
import { AngularFire,FirebaseListObservable ,FirebaseObjectObservable, FirebaseApp} from 'angularfire2';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @select(['auth','user']) user$ :Observable<any>;
  product: any;
  productId: string;
  productBids: FirebaseListObservable<any>;
  myBidAmount : number;
  constructor(private route: ActivatedRoute,private biddingService : BiddingService) {
    route.params.subscribe(params=> {
      this.productId = params['productId'];
      this.biddingService.getProduct(this.productId).subscribe(prod=> {
        console.log("in prouduct detail ",prod);
        this.product = prod;
      });
      this.productBids = this.biddingService.getProductBids(this.productId);
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

}
