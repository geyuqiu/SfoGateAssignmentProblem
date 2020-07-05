import {Navigator} from "../../util/Navigator";

export class GateAssignmentsComponentsPage extends Navigator {
	getCreateButton() {
		return cy.get('#cy-create');
	}

	getTitle() {
		return cy.get('#cy-title');
	}

	getDeleteButtons() {
		return cy.get('.btn-danger');
	}

	clickOnCreateButton(): void{
		this.getCreateButton().click();
	}

	clickOnLastDeleteButton(): void{
		this.getDeleteButtons().last().click();
	}
}

export class GateAssignmentsUpdatePage {
	getTitle() {
		return cy.get('#app-gate-assignments-heading');
	}

	getTimeInput() {
		return cy.get('#field_time');
	}

	getAirlineInput() {
		return cy.get('#field_airline');
	}

	getFlightNumberInput() {
		return cy.get('#field_flightNumber');
	}

	getTransactionSelect() {
		return cy.get('#field_transaction');
	}

	getTerminalInput() {
		return cy.get('#field_terminal');
	}

	getGateInput() {
		return cy.get('#field_gate');
	}

	getRemarkInput() {
		return cy.get('#field_remark');
	}

	setTimeInput(time: string): void{
		this.getTimeInput().type(time)
			.should('have.value', time);
	}

	setAirlineInput(airline: string): void{
		this.getAirlineInput().type(airline)
			.should('have.value', airline);
	}

	setFlightNumberInput(flightNumber: string): void{
		this.getFlightNumberInput().type(flightNumber)
			.should('have.value', flightNumber);
	}

	setTransactionSelect(transaction: string): void{
		this.getTransactionSelect()
			.select(transaction)
			.should('have.value', transaction)
	}

	setTerminalInput(terminal: string): void{
		this.getTerminalInput().type(terminal)
			.should('have.value', terminal);
	}

	setGateInput(gate: string): void{
		this.getGateInput().type(gate)
			.should('have.value', gate);
	}

	setRemarkInput(remark: string): void{
		this.getRemarkInput().type(remark)
			.should('have.value', remark);
	}

	save(): void{
		this.getSaveButton().click();
	}

	cancel(): void{
		this.getCancelButton().click();
	}

	getCancelButton() {
		return cy.get('#cancel-save');
	}

	getSaveButton() {
		return cy.get('#save-entity');
	}
}

export class GateAssignmentsDeleteDialog {
	getDialogTitle() {
		return cy.get('#app-delete-gateAssignments-heading');
	}

	clickOnConfirmButton(): void{
		this.getConfirmButton().click();
	}

	getConfirmButton() {
		return cy.get('#app-confirm-delete-gateAssignments');
	}
}
