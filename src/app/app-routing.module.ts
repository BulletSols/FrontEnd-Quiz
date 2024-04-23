import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserDetailsComponent} from "./user-details/user-details.component";
import {UserListComponent} from "./user-list/user-list.component";
import {UserService} from "./services/user.service";

const routes: Routes = [
  { path:'', component:UserListComponent },
  { path:'user-details/:id', component:UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private _userService: UserService) {
  }

}
