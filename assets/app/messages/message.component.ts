import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Message} from "./message.model";
import {MessageService} from "./message.service";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})

export class MessageComponent {
    @Input() message: Message;
    @Output() editClicked = new EventEmitter<string>();

    constructor(private messageService : MessageService) {}

    onEdit() {
        this.editClicked.emit('A new value');
    }

    onDelete() {
        this.messageService.deleteMessage(this.message);
    }
}