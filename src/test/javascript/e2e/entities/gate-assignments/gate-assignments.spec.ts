import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GateAssignmentsComponentsPage, GateAssignmentsDeleteDialog, GateAssignmentsUpdatePage } from './gate-assignments.page-object';

const expect = chai.expect;

describe('GateAssignments e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let gateAssignmentsComponentsPage: GateAssignmentsComponentsPage;
  let gateAssignmentsUpdatePage: GateAssignmentsUpdatePage;
  let gateAssignmentsDeleteDialog: GateAssignmentsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GateAssignments', async () => {
    await navBarPage.goToEntity('gate-assignments');
    gateAssignmentsComponentsPage = new GateAssignmentsComponentsPage();
    await browser.wait(ec.visibilityOf(gateAssignmentsComponentsPage.title), 5000);
    expect(await gateAssignmentsComponentsPage.getTitle()).to.eq('sfoGateAssignmentProblemApp.gateAssignments.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(gateAssignmentsComponentsPage.entities), ec.visibilityOf(gateAssignmentsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create GateAssignments page', async () => {
    await gateAssignmentsComponentsPage.clickOnCreateButton();
    gateAssignmentsUpdatePage = new GateAssignmentsUpdatePage();
    expect(await gateAssignmentsUpdatePage.getPageTitle()).to.eq('sfoGateAssignmentProblemApp.gateAssignments.home.createOrEditLabel');
    await gateAssignmentsUpdatePage.cancel();
  });

  it('should create and save GateAssignments', async () => {
    const nbButtonsBeforeCreate = await gateAssignmentsComponentsPage.countDeleteButtons();

    await gateAssignmentsComponentsPage.clickOnCreateButton();

    await promise.all([
      gateAssignmentsUpdatePage.setTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      gateAssignmentsUpdatePage.setAirlineInput('airline'),
      gateAssignmentsUpdatePage.setFlightNumberInput('flightNumber'),
      gateAssignmentsUpdatePage.transactionSelectLastOption(),
      gateAssignmentsUpdatePage.setTerminalInput('terminal'),
      gateAssignmentsUpdatePage.setGateInput('gate'),
      gateAssignmentsUpdatePage.setRemarkInput('remark'),
    ]);

    expect(await gateAssignmentsUpdatePage.getTimeInput()).to.contain('2001-01-01T02:30', 'Expected time value to be equals to 2000-12-31');
    expect(await gateAssignmentsUpdatePage.getAirlineInput()).to.eq('airline', 'Expected Airline value to be equals to airline');
    expect(await gateAssignmentsUpdatePage.getFlightNumberInput()).to.eq(
      'flightNumber',
      'Expected FlightNumber value to be equals to flightNumber'
    );
    expect(await gateAssignmentsUpdatePage.getTerminalInput()).to.eq('terminal', 'Expected Terminal value to be equals to terminal');
    expect(await gateAssignmentsUpdatePage.getGateInput()).to.eq('gate', 'Expected Gate value to be equals to gate');
    expect(await gateAssignmentsUpdatePage.getRemarkInput()).to.eq('remark', 'Expected Remark value to be equals to remark');

    await gateAssignmentsUpdatePage.save();
    expect(await gateAssignmentsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await gateAssignmentsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last GateAssignments', async () => {
    const nbButtonsBeforeDelete = await gateAssignmentsComponentsPage.countDeleteButtons();
    await gateAssignmentsComponentsPage.clickOnLastDeleteButton();

    gateAssignmentsDeleteDialog = new GateAssignmentsDeleteDialog();
    expect(await gateAssignmentsDeleteDialog.getDialogTitle()).to.eq('sfoGateAssignmentProblemApp.gateAssignments.delete.question');
    await gateAssignmentsDeleteDialog.clickOnConfirmButton();

    expect(await gateAssignmentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
