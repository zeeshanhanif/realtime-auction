import { Component, OnInit } from '@angular/core';
import {BiddingService} from '../../providers/BiddingService'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable} from 'rxjs';
import { IAppState,AuthActions } from '../../store';
import { NgRedux, select } from 'ng2-redux';
import { Router } from '@angular/router';



@Component({
  selector: 'app-auctioneer',
  templateUrl: './auctioneer.component.html',
  styleUrls: ['./auctioneer.component.css']
})
export class AuctioneerComponent implements OnInit {

  myForm: FormGroup;
  isError: boolean;
  errorMessage: String;

  @select(['auth','user']) user$ :Observable<any>;
  constructor(private router: Router,private biddingService : BiddingService,
        private fb: FormBuilder) { 

    this.user$.subscribe(user=> {
      this.myForm = fb.group({
        'productName': ['',Validators.required],
        'productDescription': ['',Validators.required],
        'category': ['',Validators.required],
        'auctionEndDate': ['',Validators.required],
        'auctionEndTime': ['',Validators.required],
        'startBiddingAmount': ['',Validators.required]
      });
    })

  }

  getCategoryList(){
    return this.biddingService.getCategoryList();
  }

  getTimeSlot(){
    return this.biddingService.getTimeSlots();
  }

  ngOnInit() {
  }

  onSubmit(value: any): void {
    console.log('you submitted value: ', value);
    this.user$.subscribe(user=>{
      console.log(user);
      if(user && user.$key){
        this.biddingService.addProductForAuction(value,user).then(val=>{
            this.router.navigate(['user'])
        })
      }
      //this.studentService.updateInfo(user.uid,value)  
    });
  }
}
