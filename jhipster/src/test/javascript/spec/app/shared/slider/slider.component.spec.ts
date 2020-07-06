import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SliderComponent} from 'app/shared/slider/slider.component';
import {SfoGateAssignmentProblemTestModule} from '../../../test.module';

describe('SliderComponent', () => {
	let component: SliderComponent;
	let fixture: ComponentFixture<SliderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [SfoGateAssignmentProblemTestModule],
			declarations: []
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SliderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
