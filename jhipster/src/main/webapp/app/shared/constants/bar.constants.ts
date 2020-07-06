import {ChartData, ChartOptions} from 'chart.js';

export const chartOptions: ChartOptions = {
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
			label: '#DEP - #ARR',
			backgroundColor: '#435565',
			data: []
		}
	]
};
