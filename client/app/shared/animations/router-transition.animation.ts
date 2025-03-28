import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [
          style({ transform: 'translateY(-100vh)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateY(0vh)' })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateY(0vh)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateY(100vh)' })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
