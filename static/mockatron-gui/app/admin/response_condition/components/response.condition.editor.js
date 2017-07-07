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
var response_condition_service_1 = require('../services/response.condition.service');
var ResponseConditionEditorComponent = (function () {
    function ResponseConditionEditorComponent(responseConditionService) {
        this.responseConditionService = responseConditionService;
        this.response_conditions = [];
        this.edit_mode = false;
    }
    ResponseConditionEditorComponent.prototype.toggleMode = function () {
        this.edit_mode = !this.edit_mode;
    };
    ResponseConditionEditorComponent.prototype.refreshData = function () {
        var _this = this;
        this.responseConditionService.getByFilter(this.filterId).subscribe(function (response_conditions) { return _this.response_conditions = response_conditions; }, function (error) { return console.log(error); });
    };
    ResponseConditionEditorComponent.prototype.ngOnInit = function () {
        this.refreshData();
    };
    ResponseConditionEditorComponent.prototype.select = function (response_condition) {
        this.current_response_condition = response_condition;
    };
    ResponseConditionEditorComponent.prototype.edit = function (response_condition) {
        this.current_response_condition = response_condition;
        this.toggleMode();
    };
    ResponseConditionEditorComponent.prototype.create = function () {
        this.current_response_condition = {};
        this.toggleMode();
    };
    ResponseConditionEditorComponent.prototype.cancel = function () {
        this.current_response_condition = null;
        this.toggleMode();
        return null;
    };
    ResponseConditionEditorComponent.prototype.save = function (response_condition) {
        var _this = this;
        response_condition.filter = this.filterId;
        if (response_condition.id) {
            this.responseConditionService.update(response_condition).subscribe(function (response_condition) { return _this.refreshData(); }, function (error) { return console.log(); }, function () { return _this.toggleMode(); });
        }
        else {
            this.responseConditionService.create(response_condition).subscribe(function (response_condition) { return _this.refreshData(); }, function (error) { return console.log(); }, function () { return _this.toggleMode(); });
        }
    };
    ResponseConditionEditorComponent.prototype.delete = function (response_condition) {
        var _this = this;
        this.responseConditionService.delete(response_condition).subscribe(function (res) { return _this.refreshData(); }, function (error) { return console.log(error); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ResponseConditionEditorComponent.prototype, "filterId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ResponseConditionEditorComponent.prototype, "modalName", void 0);
    ResponseConditionEditorComponent = __decorate([
        core_1.Component({
            selector: 'response-condition-editor',
            templateUrl: 'app/admin/response_condition/components/response.condition.editor.html'
        }), 
        __metadata('design:paramtypes', [response_condition_service_1.ResponseConditionService])
    ], ResponseConditionEditorComponent);
    return ResponseConditionEditorComponent;
}());
exports.ResponseConditionEditorComponent = ResponseConditionEditorComponent;
//# sourceMappingURL=response.condition.editor.js.map