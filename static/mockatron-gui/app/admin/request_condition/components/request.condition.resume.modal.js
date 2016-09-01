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
var request_condition_service_1 = require('../services/request.condition.service');
var truncate_string_pipe_1 = require('../../../common/pipes/truncate.string.pipe');
var RequestConditionResumeModalComponent = (function () {
    function RequestConditionResumeModalComponent(requestConditionService) {
        this.requestConditionService = requestConditionService;
        this.request_conditions = [];
        this.edit_mode = false;
    }
    RequestConditionResumeModalComponent.prototype.toggleMode = function () {
        this.edit_mode = !this.edit_mode;
    };
    RequestConditionResumeModalComponent.prototype.refreshData = function () {
        var _this = this;
        this.requestConditionService.getByFilter(this.filterId).subscribe(function (request_conditions) { return _this.request_conditions = request_conditions; }, function (error) { return console.log(error); });
    };
    RequestConditionResumeModalComponent.prototype.ngOnInit = function () {
        this.refreshData();
    };
    RequestConditionResumeModalComponent.prototype.select = function (request_condition) {
        this.current_request_condition = request_condition;
    };
    RequestConditionResumeModalComponent.prototype.edit = function (request_condition) {
        this.current_request_condition = request_condition;
        this.toggleMode();
    };
    RequestConditionResumeModalComponent.prototype.create = function () {
        this.current_request_condition = {};
        this.toggleMode();
    };
    RequestConditionResumeModalComponent.prototype.cancel = function () {
        this.current_request_condition = null;
        this.toggleMode();
        return null;
    };
    RequestConditionResumeModalComponent.prototype.save = function (request_condition) {
        var _this = this;
        request_condition.filter = this.filterId;
        if (request_condition.id) {
            this.requestConditionService.update(request_condition).subscribe(function (request_condition) { return _this.refreshData(); }, function (error) { return console.log(); }, function () { return _this.toggleMode(); });
        }
        else {
            this.requestConditionService.create(request_condition).subscribe(function (request_condition) { return _this.refreshData(); }, function (error) { return console.log(); }, function () { return _this.toggleMode(); });
        }
    };
    RequestConditionResumeModalComponent.prototype.delete = function (request_condition) {
        var _this = this;
        this.requestConditionService.delete(request_condition).subscribe(function (res) { return _this.refreshData(); }, function (error) { return console.log(error); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RequestConditionResumeModalComponent.prototype, "filterId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RequestConditionResumeModalComponent.prototype, "modalName", void 0);
    RequestConditionResumeModalComponent = __decorate([
        core_1.Component({
            selector: 'request-condition-resume-modal',
            pipes: [truncate_string_pipe_1.TruncateStringPipe],
            templateUrl: 'app/admin/request_condition/components/request.condition.resume.modal.html'
        }), 
        __metadata('design:paramtypes', [request_condition_service_1.RequestConditionService])
    ], RequestConditionResumeModalComponent);
    return RequestConditionResumeModalComponent;
}());
exports.RequestConditionResumeModalComponent = RequestConditionResumeModalComponent;
//# sourceMappingURL=request.condition.resume.modal.js.map