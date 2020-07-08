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
import {SliderModule} from 'primeng/slider';
import {SliderComponent} from './slider/slider.component';
import {FilterComponent} from 'app/shared/filter/filter.component';

@NgModule({
	imports: [SfoGateAssignmentProblemSharedLibsModule, ChartModule, ProgressBarModule, ToastModule,
		SliderModule],
	declarations: [FindLanguageFromKeyPipe, AlertComponent, AlertErrorComponent, LoginComponent, HasAnyAuthorityDirective, BarComponent,
		ProgressBarComponent,
		SliderComponent,
		FilterComponent],
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
	  ToastModule,
	  SliderModule,
	  FilterComponent
  ],
})
export class SfoGateAssignmentProblemSharedModule {}
