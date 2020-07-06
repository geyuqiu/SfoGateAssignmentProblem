import {Component} from '@angular/core';

@Component({
	selector: 'app-slider',
	templateUrl: './slider.component.html'
})
export class SliderComponent {
	val = 2015;

	constructor() {
	}

	handleChange($event: any): void {
		;
	}
}
