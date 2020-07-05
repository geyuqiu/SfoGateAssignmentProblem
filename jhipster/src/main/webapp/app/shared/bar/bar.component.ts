import {Component, OnInit} from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";
import {BarService} from 'app/shared/bar/bar.service';
import {HttpResponse} from '@angular/common/http';
import {IBar} from 'app/shared/model/bar.model';

@Component({
	selector: 'app-bar',
	templateUrl: './bar.component.html',
	styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

	data: ChartData;
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

	constructor(private barService: BarService) {
		this.data = {
			labels: ['1', '2', '3', 'I'], // static
			datasets: [
				{
					label: '#DEP - #ARR',
					backgroundColor: '#42A5F5',
					borderColor: '#1E88E5',
					data: []
				}
			]
		}
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
		if (bar && bar.body && this.data && this.data.datasets) {
			this.data.datasets[0].data = bar.body.depMinusArrOfEveryYear[2015];
		}
	}

	private onError(): void {

	}
}
