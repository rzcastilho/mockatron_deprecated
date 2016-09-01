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
var router_1 = require('@angular/router');
var response_service_1 = require('../services/response.service');
var operation_service_1 = require('../../operation/services/operation.service');
var agent_service_1 = require('../../agent/services/agent.service');
var ResponseFormComponent = (function () {
    function ResponseFormComponent(responseService, operationService, agentService, router, route) {
        this.responseService = responseService;
        this.operationService = operationService;
        this.agentService = agentService;
        this.router = router;
        this.route = route;
        this.response = {};
        this.isNew = false;
    }
    ResponseFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = params['id'];
            if (id != 'new') {
                _this.responseService.get(+id).subscribe(function (response) {
                    _this.response = response;
                    if (response.operation != null) {
                        _this.operationService.get(response.operation).subscribe(function (operation) {
                            _this.response.agent = operation.agent;
                            _this.selectAgent(operation.agent);
                        }, function (error) { return console.log(error); });
                    }
                }, function (error) { return console.log(error); });
            }
            else {
                _this.isNew = true;
            }
        });
        this.agentService.getAll().subscribe(function (agents) { return _this.agents = agents; }, function (error) { return console.log(error); });
    };
    ResponseFormComponent.prototype.selectAgent = function (agent_id) {
        var _this = this;
        this.selectedAgent = { "id": agent_id };
        this.operationService.getByAgent(+agent_id).subscribe(function (operations) { return _this.operations = operations; }, function (error) { return console.log(error); });
    };
    ResponseFormComponent.prototype.update = function (response) {
        var _this = this;
        this.responseService.update(response).subscribe(function (response) { return _this.router.navigate(['/response']); });
    };
    ResponseFormComponent.prototype.create = function (response) {
        var _this = this;
        this.responseService.create(response).subscribe(function (response) { return _this.router.navigate(['/response']); });
    };
    ResponseFormComponent.prototype.save = function (response) {
        if (this.isNew) {
            this.create(response);
        }
        else {
            this.update(response);
        }
    };
    ResponseFormComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ResponseFormComponent = __decorate([
        core_1.Component({
            selector: 'response-form',
            templateUrl: 'app/admin/response/components/response.form.component.html'
        }), 
        __metadata('design:paramtypes', [response_service_1.ResponseService, operation_service_1.OperationService, agent_service_1.AgentService, router_1.Router, router_1.ActivatedRoute])
    ], ResponseFormComponent);
    return ResponseFormComponent;
}());
exports.ResponseFormComponent = ResponseFormComponent;
//# sourceMappingURL=response.form.component.js.map