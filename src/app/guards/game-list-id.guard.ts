import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { StudentList } from '../models/student-list';

@Injectable({
  providedIn: 'root',
})
export class GameListIdGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const listId = route.paramMap.get('listId')?.toLocaleLowerCase();
    const validListIds = Object.values(StudentList).map((value) =>
      value.toLocaleLowerCase()
    );

    if (listId && validListIds.includes(listId)) {
      return true;
    }
    return this.router.createUrlTree([
      '/game',
      StudentList.JAPAN.toLowerCase(),
    ]);
  }
}
