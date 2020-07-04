import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {Router, Routes} from '@angular/router';
import {Location} from '@angular/common';

import {LoginService} from 'app/core/login/login.service';
import {SfoGateAssignmentProblemTestModule} from '../../../test.module';
import {MockLoginService} from '../../../helpers/mock-login.service';
import {GateAssignmentsComponent} from 'app/entities/gate-assignments/gate-assignments.component';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginComponent} from 'app/shared/login/login.component';

describe('LoginComponent Tests', () => {
	let comp: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let mockLoginService: MockLoginService;
	let router: Router;
	let location: Location;

	beforeEach(async(() => {
		const routesStub: Routes = [{path: 'gate-assignments', component: GateAssignmentsComponent}];
		TestBed.configureTestingModule({
			imports: [SfoGateAssignmentProblemTestModule, RouterTestingModule.withRoutes(routesStub)],
			declarations: [GateAssignmentsComponent],
			providers: [
				FormBuilder,
				{
					provide: LoginService,
					useClass: MockLoginService,
				},
			],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		comp = fixture.componentInstance;
		mockLoginService = TestBed.get(LoginService);
		router = TestBed.get(Router);
		location = TestBed.get(Location);
	});


	it('should authenticate the user',
		fakeAsync(() => {
			// GIVEN
			const credentials = {
				username: 'admin',
				password: 'admin',
				rememberMe: true
			};

			comp.loginForm.patchValue({
				username: 'admin',
				password: 'admin',
				rememberMe: true
			});
			mockLoginService.setResponse({});

			spyOn(comp, 'login').and.callThrough();
			// WHEN
			comp.login();
			tick(); // simulate async

			// THEN
			expect(comp.authenticationError).toEqual(false);
			expect(mockLoginService.loginSpy).toHaveBeenCalledWith(credentials);

			// expect(location.path()).toContain('/gate-assignments');
		})
	);

	it('should empty the credentials upon cancel', () => {
		// GIVEN
		comp.loginForm.patchValue({
			username: 'admin',
			password: 'admin'
		});

		const expected = {
			username: '',
			password: '',
			rememberMe: false
		};

		// WHEN
		comp.cancel();

		// THEN
		expect(comp.authenticationError).toEqual(false);
		expect(comp.loginForm.get('username')!.value).toEqual(expected.username);
		expect(comp.loginForm.get('password')!.value).toEqual(expected.password);
		expect(comp.loginForm.get('rememberMe')!.value).toEqual(expected.rememberMe);
	});
});
