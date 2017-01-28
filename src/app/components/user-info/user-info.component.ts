import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

import { Observable} from 'rxjs';
import { IAppState,AuthActions } from '../../store';
import { NgRedux, select } from 'ng2-redux';
import {BiddingService} from '../../providers/BiddingService'


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @select(['auth','user']) user$ :Observable<any>;
  constructor(private route: ActivatedRoute,private biddingService : BiddingService) {
    console.log("User-info: ");
    this.user$.subscribe(user=>{
        if(user && user.$key){
          this.biddingService.setUserId(user.$key);
        }
    });
    /*
    route.params.subscribe(params=> {
      //this.id = params['id'];
      console.log("student-info us id: ");
    })
    */
   }

  ngOnInit() {
  }

  getCategoryList() {
    return this.biddingService.getCategoryList();
  }

}
