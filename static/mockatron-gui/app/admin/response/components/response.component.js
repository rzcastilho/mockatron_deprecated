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
var message_service_1 = require('../../../common/services/message.service');
var ResponseComponent = (function () {
    function ResponseComponent(responseService, route, messageService) {
        this.responseService = responseService;
        this.route = route;
        this.messageService = messageService;
    }
    ResponseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var agentOperationPath = /^(agent|operation)/g;
            if (agentOperationPath.test(_this.route.snapshot.routeConfig.path)) {
                if (_this.route.snapshot.routeConfig.path.startsWith('agent')) {
                    _this.responseService.getByAgent(+params['id']).subscribe(function (responses) { return _this.responses = responses; }, function (error) { return console.log(error); });
                }
                else {
                    _this.responseService.getByOperation(+params['id']).subscribe(function (responses) { return _this.responses = responses; }, function (error) { return console.log(error); });
                }
            }
            else {
                _this.responseService.getAll().subscribe(function (responses) { return _this.responses = responses; }, function (error) { return console.log(error); });
            }
        });
    };
    ResponseComponent.prototype.select = function (response) {
        this.selectedResponse = response;
    };
    ResponseComponent.prototype.delete = function (response) {
        var _this = this;
        this.responseService.delete(response).subscribe(function (res) {
            var index = _this.responses.indexOf(response);
            if (index >= 0) {
                _this.responses.splice(index, 1);
            }
            _this.messageService.success("Response deleted successfully.");
        }, function (error) { return console.log(error); });
    };
    ResponseComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ResponseComponent = __decorate([
        core_1.Component({
            selector: 'response',
            templateUrl: 'app/admin/response/components/response.component.html'
        }), 
        __metadata('design:paramtypes', [response_service_1.ResponseService, router_1.ActivatedRoute, message_service_1.MessageService])
    ], ResponseComponent);
    return ResponseComponent;
}());
exports.ResponseComponent = ResponseComponent;
//# sourceMappingURL=response.component.js.map