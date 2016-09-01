import {Routes} from '@angular/router';
import {AgentComponent} from './agent/components/agent.component';
import {AgentFormComponent} from './agent/components/agent.form.component';
import {AgentService} from './agent/services/agent.service';
import {OperationService} from './operation/services/operation.service';
import {OperationComponent} from './operation/components/operation.component';
import {OperationFormComponent} from './operation/components/operation.form.component';
import {ResponseService} from './response/services/response.service';
import {ResponseComponent} from './response/components/response.component';
import {ResponseFormComponent} from './response/components/response.form.component';
import {FilterService} from './filter/services/filter.service';
import {FilterComponent} from './filter/components/filter.component';
import {FilterFormComponent} from './filter/components/filter.form.component';
import {RequestConditionService} from './request_condition/services/request.condition.service';
import {ResponseConditionService} from './response_condition/services/response.condition.service';
import {AuthGuard} from '../auth/auth.guard';

export const adminRoutes: Routes = [
  // AGENT
  { path: 'agent', component: AgentComponent, canActivate: [AuthGuard] },
  { path: 'agent/:id', component: AgentFormComponent, canActivate: [AuthGuard] },
  // OPERATION
  { path: 'operation', component: OperationComponent, canActivate: [AuthGuard] },
  { path: 'agent/:id/operation', component: OperationComponent, canActivate: [AuthGuard] },
  { path: 'operation/:id', component: OperationFormComponent, canActivate: [AuthGuard] },
  // RESPONSE
  { path: 'response', component: ResponseComponent, canActivate: [AuthGuard] },
  { path: 'agent/:id/response', component: ResponseComponent, canActivate: [AuthGuard] },
  { path: 'operation/:id/response', component: ResponseComponent, canActivate: [AuthGuard] },
  { path: 'response/:id', component: ResponseFormComponent, canActivate: [AuthGuard] },
  // FILTER
  { path: 'filter', component: FilterComponent, canActivate: [AuthGuard] },
  { path: 'agent/:id/filter', component: FilterComponent, canActivate: [AuthGuard] },
  { path: 'operation/:id/filter', component: FilterComponent, canActivate: [AuthGuard] },
  { path: 'filter/:id', component: FilterFormComponent, canActivate: [AuthGuard] },
];

export const adminProviders = [
  AgentService,
  OperationService,
  ResponseService,
  FilterService,
  RequestConditionService,
  ResponseConditionService
];
