import {NgModule} from '@angular/core';
import {SfoGateAssignmentProblemSharedLibsModule} from './shared-libs.module';
import {FindLanguageFromKeyPipe} from './language/find-language-from-key.pipe';
import {AlertComponent} from './alert/alert.component';
import {AlertErrorComponent} from './alert/alert-error.component';
import {LoginComponent} from './login/login.component';
import {HasAnyAuthorityDirective} from './auth/has-any-authority.directive';
import {BarComponent} from './bar/bar.component';

import {ChartModule} from 'primeng/chart';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {ProgressBarModule} from 'primeng/progressbar';
import {ToastModule} from 'primeng/toast';

@NgModule({
	imports: [SfoGateAssignmentProblemSharedLibsModule, ChartModule, ProgressBarModule, ToastModule],
	declarations: [FindLanguageFromKeyPipe, AlertComponent, AlertErrorComponent, LoginComponent, HasAnyAuthorityDirective, BarComponent,
		ProgressBarComponent],
  exports: [
    SfoGateAssignmentProblemSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
	  LoginComponent,
    HasAnyAuthorityDirective,
	  BarComponent,
	  ChartModule,
	  ProgressBarComponent,
	  ProgressBarModule,
	  ToastModule
  ],
})
export class SfoGateAssignmentProblemSharedModule {}
