import {Component, OnInit} from '@angular/core';
import {ChartData} from "chart.js";
import {BarService} from 'app/shared/bar/bar.service';
import {HttpResponse} from '@angular/common/http';
import {IBar} from 'app/shared/model/bar.model';
import {chartDataTemplate, chartOptions} from 'app/shared/constants/bar.constants';

@Component({
	selector: 'app-bar',
	templateUrl: './bar.component.html'
})
export class BarComponent implements OnInit {

	data: ChartData = {};
	options = chartOptions;
	depMinusArrOfEveryYear: Map<number, number[]> = new Map();
	template = chartDataTemplate;

	constructor(private barService: BarService) {
	}

	ngOnInit(): void {
		this.barService
			.query()
			.subscribe(
				(res: HttpResponse<IBar>) => this.onSuccess(res),
				() => this.onError()
			);
	}

	private onSuccess(bar: HttpResponse<IBar>): void {
		if (bar && bar.body && bar.body.depMinusArrOfEveryYear
			&& this.template
			&& this.template.datasets && this.template.datasets[0]
		) {
			this.depMinusArrOfEveryYear = bar.body.depMinusArrOfEveryYear;

			this.template.datasets[0].data = this.depMinusArrOfEveryYear[2015];
			this.data = this.template;
		}
	}

	private onError(): void {

	}
}
