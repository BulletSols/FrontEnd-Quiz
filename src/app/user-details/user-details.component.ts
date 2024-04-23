import { Component } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UserService} from "../services/user.service";
import {User} from "../interface/user.interface";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {NgIf} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    MatIcon,
    MatTooltip,
    RouterLink,
    NgIf,
    MatProgressBar
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

  private readonly $destroy: Subject<void> = new Subject<void>();
  protected user: User | null;
  constructor(private route: ActivatedRoute, private _usersService: UserService) { }


  private _getUserDetails(searchValue: number): void {
    this._usersService
      .getUserDetails(searchValue)
      .pipe(takeUntil(this.$destroy))
      .subscribe(response => {
        if (response) {
          this.user = {
            id: response.id,
            first_name: response.first_name,
            last_name: response.last_name,
            avatar: response.avatar,
            email: response.email
          }
        }
        else this.user =  null;
      });
  }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this._getUserDetails(+id);
    }
  }

  public ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  goBack() {

  }
}
