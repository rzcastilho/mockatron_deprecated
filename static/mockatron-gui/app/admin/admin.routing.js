"use strict";
var agent_component_1 = require('./agent/components/agent.component');
var agent_form_component_1 = require('./agent/components/agent.form.component');
var agent_service_1 = require('./agent/services/agent.service');
var operation_service_1 = require('./operation/services/operation.service');
var operation_component_1 = require('./operation/components/operation.component');
var operation_form_component_1 = require('./operation/components/operation.form.component');
var response_service_1 = require('./response/services/response.service');
var response_component_1 = require('./response/components/response.component');
var response_form_component_1 = require('./response/components/response.form.component');
var filter_service_1 = require('./filter/services/filter.service');
var filter_component_1 = require('./filter/components/filter.component');
var filter_form_component_1 = require('./filter/components/filter.form.component');
var request_condition_service_1 = require('./request_condition/services/request.condition.service');
var response_condition_service_1 = require('./response_condition/services/response.condition.service');
var auth_guard_1 = require('../auth/auth.guard');
exports.adminRoutes = [
    // AGENT
    { path: 'agent', component: agent_component_1.AgentComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'agent/:id', component: agent_form_component_1.AgentFormComponent, canActivate: [auth_guard_1.AuthGuard] },
    // OPERATION
    { path: 'operation', component: operation_component_1.OperationComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'agent/:id/operation', component: operation_component_1.OperationComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'operation/:id', component: operation_form_component_1.OperationFormComponent, canActivate: [auth_guard_1.AuthGuard] },
    // RESPONSE
    { path: 'response', component: response_component_1.ResponseComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'agent/:id/response', component: response_component_1.ResponseComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'operation/:id/response', component: response_component_1.ResponseComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'response/:id', component: response_form_component_1.ResponseFormComponent, canActivate: [auth_guard_1.AuthGuard] },
    // FILTER
    { path: 'filter', component: filter_component_1.FilterComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'agent/:id/filter', component: filter_component_1.FilterComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'operation/:id/filter', component: filter_component_1.FilterComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'filter/:id', component: filter_form_component_1.FilterFormComponent, canActivate: [auth_guard_1.AuthGuard] },
];
exports.adminProviders = [
    agent_service_1.AgentService,
    operation_service_1.OperationService,
    response_service_1.ResponseService,
    filter_service_1.FilterService,
    request_condition_service_1.RequestConditionService,
    response_condition_service_1.ResponseConditionService
];
//# sourceMappingURL=admin.routing.js.map