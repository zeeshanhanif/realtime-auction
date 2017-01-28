import { Routes } from '@angular/router';
import {LoggedInGuard} from './providers/loggedin-guard'

import { 
    SignupContainer, 
    SigninContainer, 
    UserContainer
} from "./containers";
import {   
    AuctioneerComponent,
    ProductListComponent,
    ProductDetailComponent
} from "./components";

export const AppRoutes: Routes = [
    {path: '', redirectTo:'/signin',pathMatch:'full'},
    {path:'signup', component: SignupContainer},
    {path:'signin', component: SigninContainer},
    {path:'user', component: UserContainer, 
        canActivate: [LoggedInGuard],
        children: [
            {path:'auctioneer', component: AuctioneerComponent},
            {path:'products/:category', component: ProductListComponent},
            {path:'product-detail/:productId', component: ProductDetailComponent},
            
        ]
    }
];