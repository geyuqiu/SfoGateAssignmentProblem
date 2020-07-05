import {
	GateAssignmentsComponentsPage,
	GateAssignmentsDeleteDialog,
	GateAssignmentsUpdatePage
} from '../pages/gate-assignments.page-object';

describe('GateAssignments e2e test', () => {
	let gateAssignmentsUpdatePage: GateAssignmentsUpdatePage;
	let gateAssignmentsDeleteDialog: GateAssignmentsDeleteDialog;
	let gateAssignmentsComponentsPage: GateAssignmentsComponentsPage;

	before(()=> {
		gateAssignmentsComponentsPage = new GateAssignmentsComponentsPage();
		gateAssignmentsComponentsPage.login();
		gateAssignmentsComponentsPage.navigateTo("/gate-assignments");
	});

	it('should load GateAssignments', () => {
		gateAssignmentsComponentsPage = new GateAssignmentsComponentsPage();
		gateAssignmentsComponentsPage.getTitle().should('have.attr', 'jhiTranslate', 'sfoGateAssignmentProblemApp.gateAssignments.home.title');
	});

	it('should load create GateAssignments page', () => {
		gateAssignmentsComponentsPage.clickOnCreateButton();
		gateAssignmentsUpdatePage = new GateAssignmentsUpdatePage();
		gateAssignmentsUpdatePage.getTitle().should('have.attr', 'jhiTranslate', 'sfoGateAssignmentProblemApp.gateAssignments.home.createOrEditLabel');
		gateAssignmentsUpdatePage.cancel();
	});

	it('should create and save GateAssignments', () => {
		gateAssignmentsComponentsPage.getDeleteButtons().should('have.length', 14);

		gateAssignmentsComponentsPage.clickOnCreateButton();

		gateAssignmentsUpdatePage.setTimeInput('2017-06-01T08:30');
		gateAssignmentsUpdatePage.setAirlineInput('airline');
		gateAssignmentsUpdatePage.setFlightNumberInput('flightNumber');
		gateAssignmentsUpdatePage.setTransactionSelect('DEP');
		gateAssignmentsUpdatePage.setTerminalInput('terminal');
		gateAssignmentsUpdatePage.setGateInput('gate');
		gateAssignmentsUpdatePage.setRemarkInput('remark');

		gateAssignmentsUpdatePage.save();
		gateAssignmentsUpdatePage.getSaveButton().should('not.be.visible');

		gateAssignmentsComponentsPage.getDeleteButtons().should('have.length', 15);
	});

	it('should delete last GateAssignments', () => {
		gateAssignmentsComponentsPage.clickOnLastDeleteButton();

		gateAssignmentsDeleteDialog = new GateAssignmentsDeleteDialog();
		gateAssignmentsDeleteDialog.getDialogTitle().should('have.attr', 'jhiTranslate', 'sfoGateAssignmentProblemApp.gateAssignments.delete.question');
		gateAssignmentsDeleteDialog.clickOnConfirmButton();

		gateAssignmentsComponentsPage.getDeleteButtons()
			.should('have.length', 14);
	});

	after(() => {
		gateAssignmentsComponentsPage.logout();
	});
});
