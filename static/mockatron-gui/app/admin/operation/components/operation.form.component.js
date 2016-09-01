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
var operation_service_1 = require('../services/operation.service');
var agent_service_1 = require('../../agent/services/agent.service');
var OperationFormComponent = (function () {
    function OperationFormComponent(operationService, agentService, router, route) {
        this.operationService = operationService;
        this.agentService = agentService;
        this.router = router;
        this.route = route;
        this.operation = {
            "responses": [],
            "filters": []
        };
        this.isNew = false;
    }
    OperationFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = params['id'];
            if (id != 'new') {
                _this.operationService.get(+id).subscribe(function (operation) { return _this.operation = operation; }, function (error) { return console.log(error); });
            }
            else {
                _this.isNew = true;
            }
        });
        this.agentService.getAll().subscribe(function (agents) { return _this.agents = agents; }, function (error) { return console.log(error); });
    };
    OperationFormComponent.prototype.update = function (operation) {
        var _this = this;
        this.operationService.update(operation).subscribe(function (operation) { return _this.router.navigate(['/operation']); });
    };
    OperationFormComponent.prototype.create = function (operation) {
        var _this = this;
        this.operationService.create(operation).subscribe(function (operation) { return _this.router.navigate(['/operation']); });
    };
    OperationFormComponent.prototype.save = function (operation) {
        if (this.isNew) {
            this.create(operation);
        }
        else {
            this.update(operation);
        }
    };
    OperationFormComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    OperationFormComponent = __decorate([
        core_1.Component({
            selector: 'operation-form',
            templateUrl: 'app/admin/operation/components/operation.form.component.html'
        }), 
        __metadata('design:paramtypes', [operation_service_1.OperationService, agent_service_1.AgentService, router_1.Router, router_1.ActivatedRoute])
    ], OperationFormComponent);
    return OperationFormComponent;
}());
exports.OperationFormComponent = OperationFormComponent;
//# sourceMappingURL=operation.form.component.js.map