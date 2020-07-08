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
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {SliderModule} from 'primeng/slider';
import {SliderComponent} from './slider/slider.component';
import {TableModule} from 'primeng/table';
import {TableComponent} from './table/table.component';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
	imports: [SfoGateAssignmentProblemSharedLibsModule, ChartModule, ProgressBarModule, ToastModule,
		SliderModule, TableModule, DropdownModule, InputTextModule, MultiSelectModule,
		ButtonModule, CalendarModule],
	declarations: [FindLanguageFromKeyPipe, AlertComponent, AlertErrorComponent, LoginComponent, HasAnyAuthorityDirective, BarComponent,
		ProgressBarComponent,
		SliderComponent,
		TableComponent],
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
		TableModule,
		DropdownModule, InputTextModule,
		ButtonModule,
		MultiSelectModule,
		CalendarModule
	],
})
export class SfoGateAssignmentProblemSharedModule {
}
