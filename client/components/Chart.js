import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class Chart extends Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: "right",
		location: "City"
	};

	setTweetData = key => {
		let labels = this.props.chartData.map(a => a[0]);
		let data = this.props.chartData.map(a =>
			key === "tweets" ? a[1][key].length : a[1][key]
		);

		let chartData = {
			labels,
			datasets: [
				{
					label: "Avg. Likes per day",
					data,
					backgroundColor: ["rgba(255, 99, 132, 0.6)"]
				}
			]
		};
		return chartData;
	};

	setUserData = key => {
		let labels = this.props.chartData.map(a => a[0]);
		let data = labels.map(() => this.props.user[key]);
		let chartData = {
			labels,
			datasets: [
				{
					label: "Avg. Likes per day",
					data,
					backgroundColor: ["rgba(255, 99, 132, 0.6)"]
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
						data={this.setTweetData("avgLikes")}
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
						data={this.setTweetData("avgRT")}
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
						data={this.setTweetData("avgEngagement")}
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
				<div className="chart">
					<Line
						data={this.setUserData("followers_count")}
						options={{
							title: {
								display: this.props.displayTitle,
								text: "Followers changes per day",
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
						data={this.setUserData("friends_count")}
						options={{
							title: {
								display: this.props.displayTitle,
								text: "following change per day",
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
						data={this.setTweetData("tweets")}
						options={{
							title: {
								display: this.props.displayTitle,
								text: "tweets per day",
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
