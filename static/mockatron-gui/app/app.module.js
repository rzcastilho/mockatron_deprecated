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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routing_1 = require('./app.routing');
var messages_panel_component_1 = require('./common/components/messages.panel.component');
var signin_component_1 = require('./auth/components/signin.component');
var signup_component_1 = require('./auth/components/signup.component');
var dashboard_component_1 = require('./pages/dashboard/dashboard.component');
var agent_component_1 = require('./admin/agent/components/agent.component');
var agent_form_component_1 = require('./admin/agent/components/agent.form.component');
var operation_component_1 = require('./admin/operation/components/operation.component');
var operation_form_component_1 = require('./admin/operation/components/operation.form.component');
var response_component_1 = require('./admin/response/components/response.component');
var response_form_component_1 = require('./admin/response/components/response.form.component');
var filter_component_1 = require('./admin/filter/components/filter.component');
var filter_form_component_1 = require('./admin/filter/components/filter.form.component');
var request_condition_editor_1 = require('./admin/request_condition/components/request.condition.editor');
var response_condition_editor_1 = require('./admin/response_condition/components/response.condition.editor');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                messages_panel_component_1.MessagesPanelComponent,
                signin_component_1.SigninComponent,
                signup_component_1.SignupComponent,
                dashboard_component_1.DashboardComponent,
                agent_component_1.AgentComponent,
                agent_form_component_1.AgentFormComponent,
                operation_component_1.OperationComponent,
                operation_form_component_1.OperationFormComponent,
                response_component_1.ResponseComponent,
                response_form_component_1.ResponseFormComponent,
                filter_component_1.FilterComponent,
                filter_form_component_1.FilterFormComponent,
                request_condition_editor_1.RequestConditionEditorComponent,
                response_condition_editor_1.ResponseConditionEditorComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                app_routing_1.routing
            ],
            providers: [
                app_routing_1.appRoutingProviders
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map