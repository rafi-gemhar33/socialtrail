import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: props.chartData
		};
	}

	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: "right",
		location: "City"
	};

	setChartData = (key) => {
		let labels = this.props.chartData.map(a => a[0]);
		let data = this.props.chartData.map(a => a[1][key]);
		let chartData = {
			labels,
			datasets: [
				{
					label: "Avg. Likes per day",
					data,
					backgroundColor: [
						"rgba(255, 99, 132, 0.6)",
						"rgba(54, 162, 235, 0.6)",
						"rgba(255, 206, 86, 0.6)",
						"rgba(75, 192, 192, 0.6)",
						"rgba(153, 102, 255, 0.6)",
						"rgba(255, 159, 64, 0.6)",
						"rgba(255, 99, 132, 0.6)"
					]
				}
			]
		};
		return chartData;
	};
	render() {
		return (
			<div className="chart-box">
				<div className="chart">
					<Line
						data={this.setChartData("avgLikes")}
						options={{
							title: {
								display: this.props.displayTitle,
								text: "Average likes per day",
								fontSize: 12
							},
							legend: {
								display: this.props.displayLegend,
								position: this.props.legendPosition
							}
						}}
					/>
				</div>
        <div className="chart">
					<Line
						data={this.setChartData("avgRT")}
						options={{
							title: {
								display: this.props.displayTitle,
								text: "Average RT per day",
								fontSize: 12
							},
							legend: {
								display: this.props.displayLegend,
								position: this.props.legendPosition
							}
						}}
					/>
				</div>
        <div className="chart">
					<Line
						data={this.setChartData("avgEngagement")}
						options={{
							title: {
								display: this.props.displayTitle,
								text: "Average ENgagement per day",
								fontSize: 12
							},
							legend: {
								display: this.props.displayLegend,
								position: this.props.legendPosition
							}
						}}
					/>
				</div>
			</div>
		);
	}
}

export default Chart;
