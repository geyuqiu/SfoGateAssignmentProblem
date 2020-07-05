import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BarComponent} from 'app/shared/bar/bar.component';
import {SfoGateAssignmentProblemTestModule} from '../../../test.module';

describe('BarComponent', () => {
	let component: BarComponent;
	let fixture: ComponentFixture<BarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [SfoGateAssignmentProblemTestModule],
			declarations: []
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
