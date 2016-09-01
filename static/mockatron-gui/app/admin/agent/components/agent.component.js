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
var agent_service_1 = require('../services/agent.service');
var message_service_1 = require('../../../common/services/message.service');
var AgentComponent = (function () {
    function AgentComponent(agentService, messageService) {
        this.agentService = agentService;
        this.messageService = messageService;
    }
    AgentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.agentService.getAll().subscribe(function (agents) { return _this.agents = agents; }, function (error) { return console.log(error); });
    };
    AgentComponent.prototype.select = function (agent) {
        this.selectedAgent = agent;
    };
    AgentComponent.prototype.delete = function (agent) {
        var _this = this;
        this.agentService.delete(agent).subscribe(function (res) {
            var index = _this.agents.indexOf(agent);
            if (index >= 0) {
                _this.agents.splice(index, 1);
            }
            _this.messageService.success("Agent deleted successfully.");
        }, function (error) { return console.log(error); });
    };
    AgentComponent.prototype.classMethod = function (agent) {
        return "method_" + agent.method.toLowerCase();
    };
    AgentComponent = __decorate([
        core_1.Component({
            selector: 'agent',
            templateUrl: 'app/admin/agent/components/agent.component.html'
        }), 
        __metadata('design:paramtypes', [agent_service_1.AgentService, message_service_1.MessageService])
    ], AgentComponent);
    return AgentComponent;
}());
exports.AgentComponent = AgentComponent;
//# sourceMappingURL=agent.component.js.map