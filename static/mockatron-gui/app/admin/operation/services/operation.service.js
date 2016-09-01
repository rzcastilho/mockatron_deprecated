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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var message_service_1 = require('../../../common/services/message.service');
var OperationService = (function () {
    function OperationService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
    }
    OperationService.prototype.getAll = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.get('/mockatron/api/operations/', options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error getting operations."); });
    };
    OperationService.prototype.getByAgent = function (agent_id) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.get('/mockatron/api/agents/' + agent_id + '/operations/', options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error getting operations."); });
    };
    OperationService.prototype.get = function (id) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.get('/mockatron/api/operations/' + id, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error getting operation."); });
    };
    OperationService.prototype.update = function (operation) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put('/mockatron/api/operations/' + operation.id, JSON.stringify(operation), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error updating operation."); });
    };
    OperationService.prototype.create = function (operation) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('/mockatron/api/operations/', JSON.stringify(operation), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error creating operation."); });
    };
    OperationService.prototype.delete = function (operation) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.delete('/mockatron/api/operations/' + operation.id, options)
            .catch(function (error) { return _this.handleError(error, "Error deleting operation."); });
    };
    OperationService.prototype.handleError = function (error, message) {
        return Rx_1.Observable.throw(this.messageService.error(message, error.json().message || error.json().error || 'Server error'));
    };
    OperationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, message_service_1.MessageService])
    ], OperationService);
    return OperationService;
}());
exports.OperationService = OperationService;
//# sourceMappingURL=operation.service.js.map