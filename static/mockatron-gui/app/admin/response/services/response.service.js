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
var ResponseService = (function () {
    function ResponseService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
    }
    ResponseService.prototype.getAll = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.get('/mockatron/api/responses/', options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error getting responses."); });
    };
    ResponseService.prototype.getByAgent = function (agent_id) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.get('/mockatron/api/agents/' + agent_id + '/responses/', options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error getting responses."); });
    };
    ResponseService.prototype.getByOperation = function (operation_id) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.get('/mockatron/api/operations/' + operation_id + '/responses/', options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error getting responses."); });
    };
    ResponseService.prototype.get = function (id) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.get('/mockatron/api/responses/' + id, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error getting response."); });
    };
    ResponseService.prototype.update = function (response) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers });
        if (response.operation != null) {
            response.agent = null;
        }
        return this.http.put('/mockatron/api/responses/' + response.id, JSON.stringify(response), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error updating response."); });
    };
    ResponseService.prototype.create = function (response) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers });
        if (response.operation != null) {
            response.agent = null;
        }
        return this.http.post('/mockatron/api/responses/', JSON.stringify(response), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error creating response."); });
    };
    ResponseService.prototype.delete = function (response) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.delete('/mockatron/api/responses/' + response.id, options)
            .catch(function (error) { return _this.handleError(error, "Error deleting response."); });
    };
    ResponseService.prototype.handleError = function (error, message) {
        return Rx_1.Observable.throw(this.messageService.error(message, error.json().message || error.json().error || 'Server error'));
    };
    ResponseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, message_service_1.MessageService])
    ], ResponseService);
    return ResponseService;
}());
exports.ResponseService = ResponseService;
//# sourceMappingURL=response.service.js.map