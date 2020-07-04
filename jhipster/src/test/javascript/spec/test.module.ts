import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {NgModule} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {
	JhiAlertService,
	JhiDataUtils,
	JhiDateUtils,
	JhiEventManager,
	JhiLanguageService,
	JhiParseLinks
} from 'ng-jhipster';

import {MockLanguageService} from './helpers/mock-language.service';
import {AccountService} from 'app/core/auth/account.service';
import {LoginModalService} from 'app/core/login/login-modal.service';
import {MockLoginModalService} from './helpers/mock-login-modal.service';
import {MockAccountService} from './helpers/mock-account.service';
import {MockActivatedRoute, MockRouter} from './helpers/mock-route.service';
import {MockActiveModal} from './helpers/mock-active-modal.service';
import {MockAlertService} from './helpers/mock-alert.service';
import {MockEventManager} from './helpers/mock-event-manager.service';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {SfoGateAssignmentProblemSharedModule} from 'app/shared/shared.module';

@NgModule({
	providers: [
		DatePipe,
		JhiDataUtils,
		JhiDateUtils,
		JhiParseLinks,
		{
			provide: JhiLanguageService,
			useClass: MockLanguageService,
		},
		{
			provide: JhiEventManager,
			useClass: MockEventManager,
		},
		{
			provide: NgbActiveModal,
			useClass: MockActiveModal,
		},
		{
			provide: ActivatedRoute,
			useValue: new MockActivatedRoute({id: 123}),
		},
		{
			provide: Router,
			useClass: MockRouter,
		},
		{
			provide: AccountService,
			useClass: MockAccountService,
		},
		{
			provide: LoginModalService,
			useClass: MockLoginModalService,
		},
		{
			provide: JhiAlertService,
			useClass: MockAlertService,
		},
		{
			provide: NgbModal,
			useValue: null,
		},
		{
			provide: SessionStorageService,
			useValue: null,
		},
		{
			provide: LocalStorageService,
			useValue: null,
		},
	],
	imports: [HttpClientTestingModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		SfoGateAssignmentProblemSharedModule,
		TranslateModule.forRoot()
	],
	exports: [
		HttpClientTestingModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		SfoGateAssignmentProblemSharedModule
	]
})
export class SfoGateAssignmentProblemTestModule {
}
