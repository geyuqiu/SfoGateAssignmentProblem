import { element, by, ElementFinder } from 'protractor';

export class GateAssignmentsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-gate-assignments div table .btn-danger'));
  title = element.all(by.css('jhi-gate-assignments div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class GateAssignmentsUpdatePage {
  pageTitle = element(by.id('jhi-gate-assignments-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  timeInput = element(by.id('field_time'));
  airlineInput = element(by.id('field_airline'));
  flightNumberInput = element(by.id('field_flightNumber'));
  transactionSelect = element(by.id('field_transaction'));
  terminalInput = element(by.id('field_terminal'));
  gateInput = element(by.id('field_gate'));
  remarkInput = element(by.id('field_remark'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTimeInput(time: string): Promise<void> {
    await this.timeInput.sendKeys(time);
  }

  async getTimeInput(): Promise<string> {
    return await this.timeInput.getAttribute('value');
  }

  async setAirlineInput(airline: string): Promise<void> {
    await this.airlineInput.sendKeys(airline);
  }

  async getAirlineInput(): Promise<string> {
    return await this.airlineInput.getAttribute('value');
  }

  async setFlightNumberInput(flightNumber: string): Promise<void> {
    await this.flightNumberInput.sendKeys(flightNumber);
  }

  async getFlightNumberInput(): Promise<string> {
    return await this.flightNumberInput.getAttribute('value');
  }

  async setTransactionSelect(transaction: string): Promise<void> {
    await this.transactionSelect.sendKeys(transaction);
  }

  async getTransactionSelect(): Promise<string> {
    return await this.transactionSelect.element(by.css('option:checked')).getText();
  }

  async transactionSelectLastOption(): Promise<void> {
    await this.transactionSelect.all(by.tagName('option')).last().click();
  }

  async setTerminalInput(terminal: string): Promise<void> {
    await this.terminalInput.sendKeys(terminal);
  }

  async getTerminalInput(): Promise<string> {
    return await this.terminalInput.getAttribute('value');
  }

  async setGateInput(gate: string): Promise<void> {
    await this.gateInput.sendKeys(gate);
  }

  async getGateInput(): Promise<string> {
    return await this.gateInput.getAttribute('value');
  }

  async setRemarkInput(remark: string): Promise<void> {
    await this.remarkInput.sendKeys(remark);
  }

  async getRemarkInput(): Promise<string> {
    return await this.remarkInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class GateAssignmentsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-gateAssignments-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-gateAssignments'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
