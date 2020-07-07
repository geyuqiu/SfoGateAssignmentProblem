import {Navigator} from "../../util/Navigator";

export class BarchartPage extends Navigator {
	getCanvas() {
		return cy.get('canvas');
	}

	getSliderYear() {
		return cy.get('#cy-slider-year');
	}

	assertSliderYear(year: number) {
		this.getSliderYear().should(val => {
			expect(val).to.contain(`Year: ${year}`);
		});
	}

	getSlider() {
		return cy.get('span[aria-valuemin=20150]');
	}

	slideRight() {
		this.getSlider().type('{rightarrow}');
		cy.wait(2000);
	}
}
