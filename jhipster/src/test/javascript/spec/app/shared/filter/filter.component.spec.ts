import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterComponent} from 'app/shared/filter/filter.component';
import {SfoGateAssignmentProblemTestModule} from '../../../test.module';

describe('FilterComponent', () => {
	let component: FilterComponent;
	let fixture: ComponentFixture<FilterComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [SfoGateAssignmentProblemTestModule],
			declarations: []
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have white as background color', () => {
		// GIVEN
		component.searchText = '';

		// WHEN
		fixture.detectChanges();

		// THEN
		const input = fixture.nativeElement.querySelector('input[type=text]');
		expect(input.className).not.toContain('form-control-filter-with-background-color');
	});

	it('should have gray as background color after user input', () => {
		// GIVEN
		component.searchText = 'test';

		// WHEN
		fixture.detectChanges();

		// THEN
		const input = fixture.nativeElement.querySelector('input[type=text]');
		expect(input.className).toContain('form-control-filter-with-background-color');
	});
});
