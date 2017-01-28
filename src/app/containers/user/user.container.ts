import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import {AuthService} from '../../providers';
import { Router } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';

@Component({
  selector: 'app-user',
  templateUrl: './user.container.html',
  styleUrls: ['./user.container.css']
})
export class UserContainer implements OnInit {

  myForm: FormGroup;
  @select(['auth','user']) user$ :Observable<any>;
  @select(['auth', 'isLoggedin']) isLoggedin$: Observable<boolean>;
  constructor(private router: Router, private fb: FormBuilder,
  private authService: AuthService) {

      this.user$.subscribe(user=>{

        if(user){
          if(!user || !user.$key){
            this.router.navigate(['signin'])
          }
        }
      })
    
  }

  ngOnInit() {
  }

  
}
