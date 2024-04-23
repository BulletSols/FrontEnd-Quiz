import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  private readonly userSearchSubject: Subject<string> = new Subject<string>();
  private readonly searchObservable$: Observable<String> = this.userSearchSubject.asObservable();

  constructor() {}

  public emitSearch(value: string): void {
    this.userSearchSubject.next(value);
  }

  public get searchObservable(): Observable<String> {
    return this.searchObservable$;
  }


}
