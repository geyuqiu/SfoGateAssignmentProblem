import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgressBarComponent} from 'app/shared/progress-bar/progress-bar.component';
import {SfoGateAssignmentProblemTestModule} from '../../../test.module';
import {MessageService} from 'primeng/api';

describe('ProgressBarComponent', () => {
	let component: ProgressBarComponent;
	let fixture: ComponentFixture<ProgressBarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [SfoGateAssignmentProblemTestModule],
			providers: [MessageService]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProgressBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
