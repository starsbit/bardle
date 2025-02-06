import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('GamePage => AboutPage, AboutPage => ContactPage', [
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
  transition('GamePage => ContactPage', [
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
  transition('ContactPage => AboutPage, AboutPage => GamePage', [
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
  transition('ContactPage => GamePage', [
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
