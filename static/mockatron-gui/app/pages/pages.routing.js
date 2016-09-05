"use strict";
var dashboard_component_1 = require('./dashboard/dashboard.component');
var auth_guard_1 = require('../auth/auth.guard');
exports.pagesRoutes = [
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_1.AuthGuard] }
];
//# sourceMappingURL=pages.routing.js.map