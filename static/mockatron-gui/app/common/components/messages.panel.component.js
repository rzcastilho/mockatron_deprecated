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
var message_type_1 = require('../models/message.type');
var filter_message_type_pipe_1 = require('../pipes/filter.message.type.pipe');
var message_service_1 = require('../services/message.service');
var MessagesPanelComponent = (function () {
    function MessagesPanelComponent(_messageService) {
        var _this = this;
        this._messageService = _messageService;
        this.messageType = message_type_1.MessageType;
        _messageService.messages.subscribe(function (messages) { return _this.messages = messages; });
    }
    MessagesPanelComponent.prototype.dismissMessages = function (messageType) {
        this._messageService.removeMessagesByType(messageType);
    };
    MessagesPanelComponent.prototype.existsMessageType = function (messageType) {
        return this.messages.filter(function (message) { return message.type == messageType; }).length > 0;
    };
    MessagesPanelComponent = __decorate([
        core_1.Component({
            selector: 'messages-panel',
            pipes: [filter_message_type_pipe_1.FilterMessageTypePipe],
            template: "\n    <div class=\"alert alert-success\" role=\"alert\" *ngIf=\"existsMessageType(messageType.Success)\">\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"dismissMessages(messageType.Success)\"><span aria-hidden=\"true\">&times;</span></button>\n      <blockquote *ngFor=\"let message of messages | filterMessageType:messageType.Success\">\n        <p>{{message.message}}</p>\n        <footer *ngIf=\"message.detail\">{{message.detail}}</footer>\n      </blockquote>\n    </div>\n    <div class=\"alert alert-warning\" role=\"alert\" *ngIf=\"existsMessageType(messageType.Warning)\">\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"dismissMessages(messageType.Warning)\"><span aria-hidden=\"true\">&times;</span></button>\n      <blockquote *ngFor=\"let message of messages | filterMessageType:messageType.Warning\">\n        <p>{{message.message}}</p>\n        <footer *ngIf=\"message.detail\">{{message.detail}}</footer>\n      </blockquote>\n    </div>\n    <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"existsMessageType(messageType.Error)\">\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"dismissMessages(messageType.Error)\"><span aria-hidden=\"true\">&times;</span></button>\n      <blockquote *ngFor=\"let message of messages | filterMessageType:messageType.Error\">\n        <p>{{message.message}}</p>\n        <footer *ngIf=\"message.detail\">{{message.detail}}</footer>\n      </blockquote>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService])
    ], MessagesPanelComponent);
    return MessagesPanelComponent;
}());
exports.MessagesPanelComponent = MessagesPanelComponent;
//# sourceMappingURL=messages.panel.component.js.map