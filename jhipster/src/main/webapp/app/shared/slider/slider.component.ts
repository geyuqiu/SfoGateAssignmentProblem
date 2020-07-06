import {Component, EventEmitter, Output} from '@angular/core';

@Component({
	selector: 'app-slider',
	templateUrl: './slider.component.html'
})
export class SliderComponent {
	val = 20150;
	valWithStep = 2015;

	@Output()
	yearChanged = new EventEmitter<number>();

	handleChange($event: any): void {
		if ($event.value / 10 !== this.valWithStep) {
			this.valWithStep = $event.value / 10;
			this.yearChanged.emit(this.valWithStep);
		}
	}
}
