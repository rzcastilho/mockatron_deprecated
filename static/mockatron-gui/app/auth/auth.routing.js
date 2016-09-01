"use strict";
var auth_guard_1 = require('./auth.guard');
var redirect_guard_1 = require('./redirect.guard');
var auth_service_1 = require('./services/auth.service');
var signin_component_1 = require('./components/signin.component');
var signup_component_1 = require('./components/signup.component');
exports.authRoutes = [
    { path: 'signin', component: signin_component_1.SigninComponent, canActivate: [redirect_guard_1.RedirectGuard] },
    { path: 'signup', component: signup_component_1.SignupComponent, canActivate: [redirect_guard_1.RedirectGuard] }
];
exports.authProviders = [
    auth_guard_1.AuthGuard,
    redirect_guard_1.RedirectGuard,
    auth_service_1.AuthService
];
//# sourceMappingURL=auth.routing.js.map