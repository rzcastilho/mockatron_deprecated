import { MessageType } from './message.type';

export interface Message {
  type: MessageType,
  message: string,
  detail?: string
}
