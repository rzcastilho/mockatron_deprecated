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
var message_service_1 = require('../../../common/services/message.service');
var OperationComponent = (function () {
    function OperationComponent(operationService, route, messageService) {
        this.operationService = operationService;
        this.route = route;
        this.messageService = messageService;
    }
    OperationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var agentPath = /^agent/g;
            if (agentPath.test(_this.route.snapshot.routeConfig.path)) {
                _this.operationService.getByAgent(+params['id']).subscribe(function (operations) { return _this.operations = operations; }, function (error) { return console.log(error); });
            }
            else {
                _this.operationService.getAll().subscribe(function (operations) { return _this.operations = operations; }, function (error) { return console.log(error); });
            }
        });
    };
    OperationComponent.prototype.select = function (operation) {
        this.selectedOperation = operation;
    };
    OperationComponent.prototype.delete = function (operation) {
        var _this = this;
        this.operationService.delete(operation).subscribe(function (res) {
            var index = _this.operations.indexOf(operation);
            if (index >= 0) {
                _this.operations.splice(index, 1);
            }
            _this.messageService.success("Operation deleted successfully.");
        }, function (error) { return console.log(error); });
    };
    OperationComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    OperationComponent = __decorate([
        core_1.Component({
            selector: 'operation',
            templateUrl: 'app/admin/operation/components/operation.component.html'
        }), 
        __metadata('design:paramtypes', [operation_service_1.OperationService, router_1.ActivatedRoute, message_service_1.MessageService])
    ], OperationComponent);
    return OperationComponent;
}());
exports.OperationComponent = OperationComponent;
//# sourceMappingURL=operation.component.js.map