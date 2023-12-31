import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
  transition('One => Two, Two => Three', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ opacity: 0, top: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('1s ease-out', style({ top: '100%', opacity: 0 }))]),
      query(':enter', [animate('1s ease-out', style({ top: '0%', opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ]),
  transition('Three => Two, Two => One, Three => One', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ top: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('1s ease-out', style({ top: '-100%', opacity: 0 }))]),
      query(':enter', [animate('1s ease-out', style({ top: '0%', opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ])
]);

