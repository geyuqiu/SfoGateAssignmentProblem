import {BarchartPage} from '../pages/barchart.page-object';

describe('GateAssignments e2e test', () => {
	let barchartPage: BarchartPage = new BarchartPage();
	before(() => {
		barchartPage.login();
		barchartPage.navigateTo("/gate-assignments/bar");
	});

	it('should load bar on start', () => {
		barchartPage.getCanvas().should('be.visible');
		barchartPage.assertSliderYear(2015);
	});

	it('year display should +1', () => {
		barchartPage.slideRight();
		barchartPage.assertSliderYear(2016);
	});

	after(() => {
		barchartPage.logout();
	});
});
