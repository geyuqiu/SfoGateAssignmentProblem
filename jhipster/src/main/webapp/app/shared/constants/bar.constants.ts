import {ChartData, ChartOptions} from 'chart.js';

export const chartOptions: ChartOptions = {
	legend: {
		display: false
	},
	scales: {
		yAxes: [{
			scaleLabel: {
				display: true,
				labelString: 'Terminal'
			},
		}]
	}
};

export const chartDataTemplate: ChartData = {
	labels: ['1', '2', '3', 'I'], // static
	datasets: [
		{
			backgroundColor: ['blue',
				'gray',
				'green',
				'orange'
			],
			data: []
		}
	]
};
