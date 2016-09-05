import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {routing, appRoutingProviders} from './app.routing';

import {MessagesPanelComponent} from './common/components/messages.panel.component';
import {SigninComponent} from './auth/components/signin.component';
import {SignupComponent} from './auth/components/signup.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AgentComponent} from './admin/agent/components/agent.component';
import {AgentFormComponent} from './admin/agent/components/agent.form.component';
import {OperationComponent} from './admin/operation/components/operation.component';
import {OperationFormComponent} from './admin/operation/components/operation.form.component';
import {ResponseComponent} from './admin/response/components/response.component';
import {ResponseFormComponent} from './admin/response/components/response.form.component';
import {FilterComponent} from './admin/filter/components/filter.component';
import {FilterFormComponent} from './admin/filter/components/filter.form.component';
import {RequestConditionEditorComponent} from './admin/request_condition/components/request.condition.editor';
import {ResponseConditionEditorComponent} from './admin/response_condition/components/response.condition.editor';

@NgModule({
  declarations: [
    AppComponent,
    MessagesPanelComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    AgentComponent,
    AgentFormComponent,
    OperationComponent,
    OperationFormComponent,
    ResponseComponent,
    ResponseFormComponent,
    FilterComponent,
    FilterFormComponent,
    RequestConditionEditorComponent,
    ResponseConditionEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
