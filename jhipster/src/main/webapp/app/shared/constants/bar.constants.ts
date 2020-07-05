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
			backgroundColor: '#42A5F5',
			borderColor: '#1E88E5',
			data: []
		}
	]
};
