import {Pipe, PipeTransform} from '@angular/core';
import {MessageType} from '../models/message.type';
import {Message} from '../models/message';

@Pipe({
  name: "filterMessageType"
})
export class FilterMessageTypePipe implements PipeTransform {
  transform(messages: Message[], messageType: MessageType): Message[] {
    return messages.filter(message => message.type == messageType);
  }
}
