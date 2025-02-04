import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameListIdGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const listId = route.paramMap.get('listId');
    if (listId === 'gl' || listId === 'jp') {
      return true;
    }
    return this.router.createUrlTree(['/game/jp']);
  }
}
