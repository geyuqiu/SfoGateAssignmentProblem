import {Component, OnInit} from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";
import {BarService} from 'app/shared/bar/bar.service';
import {HttpResponse} from '@angular/common/http';
import {IBar} from 'app/shared/model/bar.model';

@Component({
	selector: 'app-bar',
	templateUrl: './bar.component.html'
})
export class BarComponent implements OnInit {

	data: ChartData = {};
	options: ChartOptions = {
		scales: {
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Terminal'
				},
			}]
		}
	};
	depMinusArrOfEveryYear: Map<number, number[]> = new Map();
	chartDateTemplate: ChartData = {
		labels: ['1', '2', '3', 'I'], // static
		datasets: [
			{
				label: '#DEP - #ARR',
				backgroundColor: '#42A5F5',
				borderColor: '#1E88E5',
				data: []
			}
		]
	};

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
			&& this.chartDateTemplate
			&& this.chartDateTemplate.datasets && this.chartDateTemplate.datasets[0]
		) {
			this.depMinusArrOfEveryYear = bar.body.depMinusArrOfEveryYear;

			this.chartDateTemplate.datasets[0].data = this.depMinusArrOfEveryYear[2015];
			this.data = this.chartDateTemplate;
		}
	}

	private onError(): void {

	}
}
