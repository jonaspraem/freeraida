import {Directive, ElementRef, Input, Output, EventEmitter, OnChanges} from "@angular/core";

@Directive({
    selector: '[contentEditableModel]',
    host: {
        '(blur)': 'onEdit()',
        '(keyup)': 'onEdit()'
    }
})

export class ContentEditableDirective implements OnChanges {
    @Input('contentEditableModel') model: any;
    @Output('contentEditableModelChange') update = new EventEmitter();

    constructor(
        private elementRef: ElementRef
    ) {
        console.log('ContentEditableDirective.constructor');
    }

    ngOnChanges(changes) {
        console.log('ContentEditableDirective.ngOnChanges');
        console.log(changes);
        if (changes.model.isFirstChange())
            this.refreshView();
    }

    onEdit() {
        console.log('ContentEditableDirective.onEdit');
        let value = this.elementRef.nativeElement.innerText
        this.update.emit(value)
    }

    private refreshView() {
        console.log('ContentEditableDirective.refreshView');
        this.elementRef.nativeElement.textContent = this.model
    }
}