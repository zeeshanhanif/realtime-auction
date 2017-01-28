import { Component, OnInit } from '@angular/core';
import {BiddingService} from '../../providers/BiddingService'
import { Observable} from 'rxjs';
import { IAppState,AuthActions } from '../../store';
import { NgRedux, select } from 'ng2-redux';
import {ActivatedRoute} from '@angular/router'
import { AngularFire,FirebaseListObservable ,FirebaseObjectObservable, FirebaseApp} from 'angularfire2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @select(['auth','user']) user$ :Observable<any>;
  products: FirebaseListObservable<any>;
  category: string;
  userId : string;
  constructor(private route: ActivatedRoute,private biddingService : BiddingService) {
    
    this.userId = this.biddingService.getUserId();
    route.params.subscribe(params=> {
      this.category = params['category'];
      this.products = this.biddingService.getProductList(this.category);
      console.log("student-info us id: ");
    })
    
  }

  ngOnInit() {
  }

}
