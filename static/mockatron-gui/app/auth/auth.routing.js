"use strict";
var auth_guard_1 = require('./auth.guard');
var auth_service_1 = require('./services/auth.service');
var signin_component_1 = require('./components/signin.component');
var signup_component_1 = require('./components/signup.component');
exports.authRoutes = [
    { path: 'signin', component: signin_component_1.SigninComponent },
    { path: 'signup', component: signup_component_1.SignupComponent }
];
exports.authProviders = [
    auth_guard_1.AuthGuard,
    auth_service_1.AuthService
];
//# sourceMappingURL=auth.routing.js.map