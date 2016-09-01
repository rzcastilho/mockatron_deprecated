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
var agent_service_1 = require('../services/agent.service');
var AgentFormComponent = (function () {
    function AgentFormComponent(agentService, router, route) {
        this.agentService = agentService;
        this.router = router;
        this.route = route;
        this.agent = {
            "operations": [],
            "responses": [],
            "filters": []
        };
        this.isNew = false;
    }
    AgentFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = params['id'];
            if (id != 'new') {
                _this.agentService.get(+id).subscribe(function (agent) { return _this.agent = agent; }, function (error) { return console.log(error); });
            }
            else {
                _this.isNew = true;
            }
        });
    };
    AgentFormComponent.prototype.update = function (agent) {
        var _this = this;
        this.agentService.update(agent).subscribe(function (agent) { return _this.router.navigate(['/agent']); });
    };
    AgentFormComponent.prototype.create = function (agent) {
        var _this = this;
        this.agentService.create(agent).subscribe(function (agent) { return _this.router.navigate(['/agent']); });
    };
    AgentFormComponent.prototype.save = function (agent) {
        if (this.isNew) {
            this.create(agent);
        }
        else {
            this.update(agent);
        }
    };
    AgentFormComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    AgentFormComponent = __decorate([
        core_1.Component({
            selector: 'agent-form',
            templateUrl: 'app/admin/agent/components/agent.form.component.html'
        }), 
        __metadata('design:paramtypes', [agent_service_1.AgentService, router_1.Router, router_1.ActivatedRoute])
    ], AgentFormComponent);
    return AgentFormComponent;
}());
exports.AgentFormComponent = AgentFormComponent;
//# sourceMappingURL=agent.form.component.js.map