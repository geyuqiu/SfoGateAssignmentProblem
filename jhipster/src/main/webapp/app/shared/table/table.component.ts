import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Table} from 'primeng/table';
import {data} from 'app/shared/table/customers-large';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
	customers: Customer[] = [];

	statuses: any[] = [];

	@ViewChild('dt')
	table!: Table;

	constructor(private http: HttpClient) {
	}

	ngOnInit(): void {
		this.customers = this.getCustomersLarge();

		this.statuses = [
			{label: 'Unqualified', value: 'unqualified'},
			{label: 'Qualified', value: 'qualified'},
			{label: 'New', value: 'new'},
			{label: 'Negotiation', value: 'negotiation'},
			{label: 'Renewal', value: 'renewal'},
			{label: 'Proposal', value: 'proposal'}
		]
	}

	filterName($event: any): void {
		this.table.filter($event.target.value, 'name', 'startsWith')
	}

	filterCountry($event: any): void {
		this.table.filter($event.target.value, 'country.name', 'contains')
	}


	filterStatus($event: any): void {
		this.table.filter($event.value, 'status', 'equals')
	}

	getCustomersLarge(): any {
		return data.data;
	}
}

export interface Country {
	name?: string;
	code?: string;
}

export interface Representative {
	name?: string;
	image?: string;
}

export interface Customer {
	id?: number;
	name?: number;
	country?: Country;
	company?: string;
	date?: string;
	status?: string;
	representative?: Representative;
}
