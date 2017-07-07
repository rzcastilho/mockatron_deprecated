import {Component} from '@angular/core';
import {Message} from '../models/message';
import {MessageType} from '../models/message.type';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'messages-panel',
  template: `
    <div class="alert alert-success" role="alert" *ngIf="existsMessageType(messageType.Success)">
      <button type="button" class="close" aria-label="Close" (click)="dismissMessages(messageType.Success)"><span aria-hidden="true">&times;</span></button>
      <blockquote *ngFor="let message of messages | filterMessageType:messageType.Success">
        <p>{{message.message}}</p>
        <footer *ngIf="message.detail">{{message.detail}}</footer>
      </blockquote>
    </div>
    <div class="alert alert-warning" role="alert" *ngIf="existsMessageType(messageType.Warning)">
      <button type="button" class="close" aria-label="Close" (click)="dismissMessages(messageType.Warning)"><span aria-hidden="true">&times;</span></button>
      <blockquote *ngFor="let message of messages | filterMessageType:messageType.Warning">
        <p>{{message.message}}</p>
        <footer *ngIf="message.detail">{{message.detail}}</footer>
      </blockquote>
    </div>
    <div class="alert alert-danger" role="alert" *ngIf="existsMessageType(messageType.Error)">
      <button type="button" class="close" aria-label="Close" (click)="dismissMessages(messageType.Error)"><span aria-hidden="true">&times;</span></button>
      <blockquote *ngFor="let message of messages | filterMessageType:messageType.Error">
        <p>{{message.message}}</p>
        <footer *ngIf="message.detail">{{message.detail}}</footer>
      </blockquote>
    </div>
  `
})
export class MessagesPanelComponent {

  messageType = MessageType;
  messages: Message[];

  constructor(private _messageService: MessageService) {
    _messageService.messages.subscribe(
      messages => this.messages = messages
    );
  }

  dismissMessages(messageType: MessageType) {
    this._messageService.removeMessagesByType(messageType);
  }

  private existsMessageType(messageType: MessageType) {
    return this.messages.filter(message => message.type == messageType).length > 0;
  }

}
