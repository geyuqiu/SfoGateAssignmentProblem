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
			backgroundColor: ['rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)'
			],
			data: []
		}
	]
};
