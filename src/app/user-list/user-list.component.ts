import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {UserResponse} from "../interface/user-response.interface";
import {UserService} from "../services/user.service";
import {Subject, takeUntil} from "rxjs";
import {UserSearchService} from "../services/user-search.service";
import {User} from "../interface/user.interface";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  private readonly $destroy: Subject<void> = new Subject<void>();

  protected userResponse: UserResponse;
  private currentPage: number = 1;
  protected user: User | null;
  searchText = '';

  constructor(private _usersService: UserService) { }

  private _getUsers(): void {
    this._usersService
      .getUsers(this.currentPage)
      .pipe(takeUntil(this.$destroy))
      .subscribe(response => this.userResponse = {data: response?.data, total: response?.total, per_page: response?.per_page });
  }

  protected onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1; // Page index starts from 0
    this._getUsers();
  }

  onInputChange($event: any) {
    this.searchText = $event?.target?.value;

    if (this.searchText && !isNaN(Number(this.searchText)))
      this._getUserDetails(parseInt(this.searchText));
    else
      this.user = null;
  }

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
    this._getUsers();
  }

  public ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
