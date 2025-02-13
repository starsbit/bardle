import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('HomePage => AboutPage, AboutPage => ContactPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '100%' })]),
    query(':leave', [style({ left: '0%' })]),
    group([
      query(':leave', [animate('500ms ease-in-out', style({ left: '-100%' }))]),
      query(':enter', [animate('500ms ease-in-out', style({ left: '0%' }))]),
    ]),
  ]),
  transition('HomePage => ContactPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '100%' })]),
    query(':leave', [style({ left: '0%' })]),
    group([
      query(':leave', [animate('500ms ease-in-out', style({ left: '-100%' }))]),
      query(':enter', [animate('500ms ease-in-out', style({ left: '0%' }))]),
    ]),
  ]),
  transition('ContactPage => AboutPage, AboutPage => HomePage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', [style({ left: '0%' })]),
    group([
      query(':leave', [animate('500ms ease-in-out', style({ left: '100%' }))]),
      query(':enter', [animate('500ms ease-in-out', style({ left: '0%' }))]),
    ]),
  ]),
  transition('ContactPage => HomePage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', [style({ left: '0%' })]),
    group([
      query(':leave', [animate('500ms ease-in-out', style({ left: '100%' }))]),
      query(':enter', [animate('500ms ease-in-out', style({ left: '0%' }))]),
    ]),
  ]),
]);
