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
var message_service_1 = require('../../../common/services/message.service');
var FilterComponent = (function () {
    function FilterComponent(filterService, route, messageService) {
        this.filterService = filterService;
        this.route = route;
        this.messageService = messageService;
    }
    FilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var agentOperationPath = /^(agent|operation)/g;
            if (agentOperationPath.test(_this.route.snapshot.routeConfig.path)) {
                if (_this.route.snapshot.routeConfig.path.startsWith('agent')) {
                    _this.filterService.getByAgent(+params['id']).subscribe(function (filters) { return _this.filters = filters; }, function (error) { return console.log(error); });
                }
                else {
                    _this.filterService.getByOperation(+params['id']).subscribe(function (filters) { return _this.filters = filters; }, function (error) { return console.log(error); });
                }
            }
            else {
                _this.filterService.getAll().subscribe(function (filters) { return _this.filters = filters; }, function (error) { return console.log(error); });
            }
        });
    };
    FilterComponent.prototype.select = function (filter) {
        this.selectedFilter = filter;
    };
    FilterComponent.prototype.delete = function (filter) {
        var _this = this;
        this.filterService.delete(filter).subscribe(function (res) {
            var index = _this.filters.indexOf(filter);
            if (index >= 0) {
                _this.filters.splice(index, 1);
            }
            _this.messageService.success("Filter deleted successfully.");
        }, function (error) { return console.log(error); });
    };
    FilterComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    FilterComponent = __decorate([
        core_1.Component({
            selector: 'filter',
            templateUrl: 'app/admin/filter/components/filter.component.html'
        }), 
        __metadata('design:paramtypes', [filter_service_1.FilterService, router_1.ActivatedRoute, message_service_1.MessageService])
    ], FilterComponent);
    return FilterComponent;
}());
exports.FilterComponent = FilterComponent;
//# sourceMappingURL=filter.component.js.map