"use strict";
var dashboard_component_1 = require('./dashboard/dashboard.component');
var auth_guard_1 = require('../auth/auth.guard');
var resume_service_1 = require('./services/resume.service');
exports.pagesRoutes = [
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_1.AuthGuard] }
];
exports.pagesProviders = [
    resume_service_1.ResumeService
];
//# sourceMappingURL=pages.routing.js.map