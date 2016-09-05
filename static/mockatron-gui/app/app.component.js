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
var auth_service_1 = require('./auth/services/auth.service');
var resume_service_1 = require('./common/services/resume.service');
var AppComponent = (function () {
    function AppComponent(authService, router, resumeService) {
        this.authService = authService;
        this.router = router;
        this.resumeService = resumeService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resumeService.resume().subscribe(function (resume) { return _this.resume = resume; }, function (error) { return console.log(error); });
    };
    AppComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['signin']);
    };
    AppComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'mockatron-app',
            templateUrl: 'app/app.component.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, resume_service_1.ResumeService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map