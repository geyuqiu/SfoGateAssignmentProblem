import {NgModule} from '@angular/core';
import {SfoGateAssignmentProblemSharedLibsModule} from './shared-libs.module';
import {FindLanguageFromKeyPipe} from './language/find-language-from-key.pipe';
import {AlertComponent} from './alert/alert.component';
import {AlertErrorComponent} from './alert/alert-error.component';
import {LoginComponent} from './login/login.component';
import {HasAnyAuthorityDirective} from './auth/has-any-authority.directive';
import {BarComponent} from './bar/bar.component';

import {ChartModule} from 'primeng/chart';

@NgModule({
	imports: [SfoGateAssignmentProblemSharedLibsModule, ChartModule],
	declarations: [FindLanguageFromKeyPipe, AlertComponent, AlertErrorComponent, LoginComponent, HasAnyAuthorityDirective, BarComponent],
  exports: [
    SfoGateAssignmentProblemSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
	  LoginComponent,
    HasAnyAuthorityDirective,
	  BarComponent,
	  ChartModule
  ],
})
export class SfoGateAssignmentProblemSharedModule {}
