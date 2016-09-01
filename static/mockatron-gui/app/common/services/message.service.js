"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require("rxjs/Observable");
var message_type_1 = require('../models/message.type');
var MessageService = (function () {
    function MessageService() {
        var _this = this;
        //let message: Message = <Message>{};
        var date = new Date();
        //message.type = MessageType.Success;
        //message.message = 'Welcome to Mockatron!';
        //this.dataStore = { messages: [message] };
        this.dataStore = { messages: [] };
        this.messages = new Observable_1.Observable(function (observer) { return _this.messagesObserver = observer; })
            .startWith(this.dataStore.messages)
            .share();
    }
    MessageService.prototype.addMessage = function (message) {
        this.dataStore.messages = this.dataStore.messages.concat([message]);
        this.messagesObserver.next(this.dataStore.messages);
    };
    MessageService.prototype.removeMessagesByType = function (messageType) {
        this.dataStore.messages = this.dataStore.messages.filter(function (message) { return message.type != messageType; });
        this.messagesObserver.next(this.dataStore.messages);
    };
    MessageService.prototype.success = function (message, detail) {
        if (detail === void 0) { detail = null; }
        var msg = {
            type: message_type_1.MessageType.Success,
            message: message,
            detail: detail
        };
        this.addMessage(msg);
        return msg;
    };
    MessageService.prototype.warning = function (message, detail) {
        if (detail === void 0) { detail = null; }
        var msg = {
            type: message_type_1.MessageType.Warning,
            message: message,
            detail: detail
        };
        this.addMessage(msg);
        return msg;
    };
    MessageService.prototype.error = function (message, detail) {
        if (detail === void 0) { detail = null; }
        var msg = {
            type: message_type_1.MessageType.Error,
            message: message,
            detail: detail
        };
        this.addMessage(msg);
        return msg;
    };
    MessageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map