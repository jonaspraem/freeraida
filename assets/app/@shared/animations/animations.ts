import { trigger, state, style, transition, animate } from '@angular/core';

export const Animations =
    {
    slideDown: trigger('slideUpDown', [
        transition(':enter', [
            style({transform: 'translateY(0%)'}),
            animate(
                '1000ms ease-in',
                style({transform: 'translateY(100%)'})
            ),
        ]),
        transition(':leave', [
            animate(
                '500ms ease-in',
                style({transform: 'translateY (0%)'})
            ),
        ]),
    ]),
};