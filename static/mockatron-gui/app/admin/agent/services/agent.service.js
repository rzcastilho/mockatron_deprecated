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
var AgentService = (function () {
    function AgentService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
    }
    AgentService.prototype.getAll = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.get('/mockatron/api/agents/', options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error getting agents."); });
    };
    AgentService.prototype.get = function (id) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.get('/mockatron/api/agents/' + id, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error getting agent."); });
    };
    AgentService.prototype.update = function (agent) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put('/mockatron/api/agents/' + agent.id, JSON.stringify(agent), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error updating agent."); });
    };
    AgentService.prototype.create = function (agent) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('/mockatron/api/agents/', JSON.stringify(agent), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return _this.handleError(error, "Error creating agent."); });
    };
    AgentService.prototype.delete = function (agent) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        var options = new http_1.RequestOptions({ headers: headers, body: {} });
        return this.http.delete('/mockatron/api/agents/' + agent.id, options)
            .catch(function (error) { return _this.handleError(error, "Error deleting agent."); });
    };
    AgentService.prototype.handleError = function (error, message) {
        return Rx_1.Observable.throw(this.messageService.error(message, error.json().message || error.json().error || 'Server error'));
    };
    AgentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, message_service_1.MessageService])
    ], AgentService);
    return AgentService;
}());
exports.AgentService = AgentService;
//# sourceMappingURL=agent.service.js.map