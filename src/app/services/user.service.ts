import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, throwError} from "rxjs";
import {User} from "../interface/user.interface";
import {HttpClient} from "@angular/common/http";
import {UserResponse} from "../interface/user-response.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCache : { [key: number] : UserResponse } = {};
  private userDetailsCache : { [key: number] : User } = {};


  constructor(private http: HttpClient) { }

  public getUsers(page: number): Observable<UserResponse> {
    if(this.userCache[page])
      return of(this.userCache[page]);

    const url = `https://reqres.in/api/users?page=${page}`;
    return this.http.get<UserResponse>(url).pipe(map( data => {
      this.userCache[page] = data;
      return data;
    }));
  }

  public getUserDetails(id: number): Observable<User | null> {
    if (this.userDetailsCache[id])
      return of(this.userDetailsCache[id]);

    const url = `https://reqres.in/api/users/${id}`;
    return this.http.get<any>(url).pipe(map(data => {
        this.userDetailsCache[id] = data.data;
        return data.data;
      }),
      catchError(error => {
        if (error.status === 404) {
          return of(null);
        } else {
          return throwError(error);
        }
      })
    );
  }


}
