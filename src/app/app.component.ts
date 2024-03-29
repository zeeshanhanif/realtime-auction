import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable} from 'rxjs';
import {AuthService} from './providers';
import { IAppState, CounterAction,AuthActions } from './store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
    @select(['auth','isLoggedin']) isLoggedin$ :Observable<any>;
    @select(['auth','user']) user$ :Observable<any>;
    constructor(private authService: AuthService,private authAction: AuthActions,
            private router: Router ) {
        this.isLoggedin$.subscribe(val=>{
          if(!val){
            this.router.navigate(['signin']);
          }
        })

    }

    logout(){
      /*
      this.authService.logout().subscribe(val=>{
        console.log("Logged out");
      });
      */
      this.authAction.logout();
    }
}
