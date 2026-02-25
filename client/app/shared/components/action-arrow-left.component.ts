import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'arrow-action-left',
  template: `
    <div class="arrow-action-left">
      <div class="arrowSliding">
        <div class="arrow"></div>
      </div>
      <div class="arrowSliding delay1">
        <div class="arrow"></div>
      </div>
      <div class="arrowSliding delay2">
        <div class="arrow"></div>
      </div>
      <div class="arrowSliding delay3">
        <div class="arrow"></div>
      </div>
    </div>
  `,
})
export class ActionArrowLeftComponent {}
