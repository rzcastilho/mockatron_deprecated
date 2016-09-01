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
var filter_service_1 = require('../services/filter.service');
var operation_service_1 = require('../../operation/services/operation.service');
var agent_service_1 = require('../../agent/services/agent.service');
var FilterFormComponent = (function () {
    function FilterFormComponent(filterService, operationService, agentService, router, route) {
        this.filterService = filterService;
        this.operationService = operationService;
        this.agentService = agentService;
        this.router = router;
        this.route = route;
        this.filter = {
            "request_conditions": [],
            "response_conditions": []
        };
        this.isNew = false;
    }
    FilterFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = params['id'];
            if (id != 'new') {
                _this.filterService.get(+id).subscribe(function (filter) {
                    _this.filter = filter;
                    if (filter.operation != null) {
                        _this.operationService.get(filter.operation).subscribe(function (operation) {
                            _this.filter.agent = operation.agent;
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
    FilterFormComponent.prototype.selectAgent = function (agent_id) {
        var _this = this;
        this.selectedAgent = { "id": agent_id };
        this.operationService.getByAgent(+agent_id).subscribe(function (operations) { return _this.operations = operations; }, function (error) { return console.log(error); });
    };
    FilterFormComponent.prototype.update = function (filter) {
        var _this = this;
        this.filterService.update(filter).subscribe(function (filter) { return _this.router.navigate(['/filter']); });
    };
    FilterFormComponent.prototype.create = function (filter) {
        var _this = this;
        this.filterService.create(filter).subscribe(function (filter) { return _this.router.navigate(['/filter']); });
    };
    FilterFormComponent.prototype.save = function (filter) {
        if (this.isNew) {
            this.create(filter);
        }
        else {
            this.update(filter);
        }
    };
    FilterFormComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    FilterFormComponent = __decorate([
        core_1.Component({
            selector: 'filter-form',
            templateUrl: 'app/admin/filter/components/filter.form.component.html'
        }), 
        __metadata('design:paramtypes', [filter_service_1.FilterService, operation_service_1.OperationService, agent_service_1.AgentService, router_1.Router, router_1.ActivatedRoute])
    ], FilterFormComponent);
    return FilterFormComponent;
}());
exports.FilterFormComponent = FilterFormComponent;
//# sourceMappingURL=filter.form.component.js.map