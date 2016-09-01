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
var RequestConditionService = (function () {
    function RequestConditionService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
    }
    RequestConditionService.prototype.getAll = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.get('/mockatron/api/request_conditions/', options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error getting request conditions."); });
    };
    RequestConditionService.prototype.getByFilter = function (filter_id) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.get('/mockatron/api/filters/' + filter_id + '/request_conditions/', options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error getting request conditions."); });
    };
    RequestConditionService.prototype.update = function (request_condition) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put('/mockatron/api/request_conditions/' + request_condition.id, JSON.stringify(request_condition), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error updating request condition."); });
    };
    RequestConditionService.prototype.create = function (request_condition) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('/mockatron/api/request_conditions/', JSON.stringify(request_condition), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error creating request condition."); });
    };
    RequestConditionService.prototype.delete = function (request_condition) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.delete('/mockatron/api/request_conditions/' + request_condition.id, options)
            .catch(function (error) { return _this.handleError(error, "Error deleting request condition."); });
    };
    RequestConditionService.prototype.handleError = function (error, message) {
        return Rx_1.Observable.throw(this.messageService.error(message, error.json().message || error.json().error || 'Server error'));
    };
    RequestConditionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, message_service_1.MessageService])
    ], RequestConditionService);
    return RequestConditionService;
}());
exports.RequestConditionService = RequestConditionService;
//# sourceMappingURL=request.condition.service.js.map