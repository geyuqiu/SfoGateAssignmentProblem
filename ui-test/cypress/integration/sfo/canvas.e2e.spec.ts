import {CanvasPage} from '../pages/canvas.page-object';

describe('GateAssignments e2e test', () => {
	let canvasPage: CanvasPage = new CanvasPage();
	before(()=> {
		canvasPage.login();
		canvasPage.navigateTo("/gate-assignments/bar");
	});

	it('should load bar on start', () => {
		canvasPage.getCanvas().should('be.visible');
	});

	after(() => {
		canvasPage.logout();
	});
});
