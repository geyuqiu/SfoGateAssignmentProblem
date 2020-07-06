import {Component, OnInit} from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";
import {BarService} from 'app/shared/bar/bar.service';
import {HttpResponse} from '@angular/common/http';
import {IBar} from 'app/shared/model/bar.model';
import {chartDataTemplate, chartOptions} from 'app/shared/constants/bar.constants';
import {MessageService} from 'primeng/api';

@Component({
	selector: 'app-bar',
	templateUrl: './bar.component.html',
	providers: [MessageService]
})
export class BarComponent implements OnInit {

	data: ChartData = {};
	depMinusArrOfEveryYear: Map<number, number[]> = new Map();
	canShowBar = false;
	options: ChartOptions;
	template: ChartData;

	constructor(private barService: BarService, private messageService: MessageService) {
		this.options = chartOptions;
		this.template = chartDataTemplate;
	}

	ngOnInit(): void {
		this.barService
			.query()
			.subscribe(
				(res: HttpResponse<IBar>) => this.onSuccess(res),
				() => this.onError()
			);
	}

	private displaySuccessToast(): void {
		this.messageService.add({severity: 'info', summary: 'Success', detail: 'loaded: 2015 - 2019'});
	}

	private onSuccess(bar: HttpResponse<IBar>): void {
		if (bar && bar.body && bar.body.depMinusArrOfEveryYear
			&& this.template
			&& this.template.datasets && this.template.datasets[0]
		) {
			this.depMinusArrOfEveryYear = bar.body.depMinusArrOfEveryYear;

			this.template.datasets[0].data = this.depMinusArrOfEveryYear[2015];
			this.data = this.template;

			this.canShowBar = true;
			this.displaySuccessToast();
		}
	}

	private onError(): void {

	}

	changechartDataDisplayed($event: number): void {
		if (this.template && this.template.datasets) {
			this.template.datasets[0].data = this.depMinusArrOfEveryYear[$event];
			this.data = {...this.template};
		}
	}
}
