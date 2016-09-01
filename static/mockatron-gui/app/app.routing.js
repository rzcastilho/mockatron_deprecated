"use strict";
var router_1 = require('@angular/router');
var common_resources_1 = require('./common/common.resources');
var auth_routing_1 = require('./auth/auth.routing');
var pages_routing_1 = require('./pages/pages.routing');
var admin_routing_1 = require('./admin/admin.routing');
var routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' }
].concat(auth_routing_1.authRoutes, pages_routing_1.pagesRoutes, admin_routing_1.adminRoutes);
exports.appRoutingProviders = [
    common_resources_1.commonProviders,
    auth_routing_1.authProviders,
    admin_routing_1.adminProviders,
    pages_routing_1.pagesProviders
];
exports.routing = router_1.RouterModule.forRoot(routes, { useHash: true });
//# sourceMappingURL=app.routing.js.map