import {Component} from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";

@Component({
	selector: 'app-bar',
	templateUrl: './bar.component.html',
	styleUrls: ['./bar.component.scss']
})
export class BarComponent {

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

	constructor() {
		this.data = {
			labels: ['1', '2', '3', 'I'], // static
			datasets: [
				{
					label: '#DEP - #ARR',
					backgroundColor: '#42A5F5',
					borderColor: '#1E88E5',
					data: [65, 59, 80, 81, 56, 55, -40]
				}
			]
		}
	}
}
