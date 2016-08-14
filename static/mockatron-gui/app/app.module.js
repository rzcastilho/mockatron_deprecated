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
var button_1 = require('@angular2-material/button');
var button_toggle_1 = require('@angular2-material/button-toggle');
var card_1 = require('@angular2-material/card');
var checkbox_1 = require('@angular2-material/checkbox');
var core_2 = require('@angular2-material/core');
var grid_list_1 = require('@angular2-material/grid-list');
var icon_1 = require('@angular2-material/icon');
var input_1 = require('@angular2-material/input');
var list_1 = require('@angular2-material/list');
var menu_1 = require('@angular2-material/menu');
var progress_bar_1 = require('@angular2-material/progress-bar');
var progress_circle_1 = require('@angular2-material/progress-circle');
var radio_1 = require('@angular2-material/radio');
var sidenav_1 = require('@angular2-material/sidenav');
var slider_1 = require('@angular2-material/slider');
var slide_toggle_1 = require('@angular2-material/slide-toggle');
var tabs_1 = require('@angular2-material/tabs');
var toolbar_1 = require('@angular2-material/toolbar');
var tooltip_1 = require('@angular2-material/tooltip');
var app_routing_1 = require('./app.routing');
var signin_component_1 = require('./auth/components/signin.component');
var signup_component_1 = require('./auth/components/signup.component');
var home_component_1 = require('./pages/home/home.component');
var agent_component_1 = require('./admin/agent/components/agent.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                signin_component_1.SigninComponent,
                signup_component_1.SignupComponent,
                home_component_1.HomeComponent,
                agent_component_1.AgentComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.routing,
                button_1.MdButtonModule,
                button_toggle_1.MdButtonToggleModule,
                card_1.MdCardModule,
                checkbox_1.MdCheckboxModule,
                core_2.MdCoreModule,
                grid_list_1.MdGridListModule,
                icon_1.MdIconModule,
                input_1.MdInputModule,
                list_1.MdListModule,
                menu_1.MdMenuModule,
                progress_bar_1.MdProgressBarModule,
                progress_circle_1.MdProgressCircleModule,
                radio_1.MdRadioModule,
                sidenav_1.MdSidenavModule,
                slider_1.MdSliderModule,
                slide_toggle_1.MdSlideToggleModule,
                tabs_1.MdTabsModule,
                toolbar_1.MdToolbarModule,
                tooltip_1.MdTooltipModule
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