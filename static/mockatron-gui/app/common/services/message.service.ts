import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Observer} from 'rxjs/Observer';
import {Message} from '../models/message';
import {MessageType} from '../models/message.type';

@Injectable()
export class MessageService {
  messages: Observable<Message[]>;
  private messagesObserver: Observer<Message[]>;
  private dataStore: {
    messages: Message[];
  }

  constructor() {
    //let message: Message = <Message>{};
    let date = new Date();
    //message.type = MessageType.Success;
    //message.message = 'Welcome to Mockatron!';
    //this.dataStore = { messages: [message] };
    this.dataStore = { messages: [] };
    this.messages = new Observable<Message[]>(observer => this.messagesObserver = observer)
                                  .startWith(this.dataStore.messages)
                                  .share();
  }

  private addMessage(message: Message) {
    this.dataStore.messages = this.dataStore.messages.concat([message])
    this.messagesObserver.next(this.dataStore.messages);
  }

  removeMessagesByType(messageType: MessageType) {
    this.dataStore.messages = this.dataStore.messages.filter(message => message.type != messageType);
    this.messagesObserver.next(this.dataStore.messages);
  }

  success(message: string, detail: string = null) {
    let msg: Message = {
      type: MessageType.Success,
      message: message,
      detail: detail
    };
    this.addMessage(msg);
    return msg;
  }

  warning(message: string, detail: string = null) {
    let msg: Message = {
      type: MessageType.Warning,
      message: message,
      detail: detail
    };
    this.addMessage(msg);
    return msg;
  }

  error(message: string, detail: string = null) {
    let msg: Message = {
      type: MessageType.Error,
      message: message,
      detail: detail
    };
    this.addMessage(msg);
    return msg;
  }

}
