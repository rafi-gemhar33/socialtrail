import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

class Chart extends Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		displayTitle: true,
		displayLegend: false,
		legendPosition: 'right',
		location: 'City',
	};

	setTweetData = key => {
		let labels = this.props.tweets.map(a => a[0].slice(0, 6));
		let data = this.props.tweets.map(a =>
			key === 'tweets' ? a[1][key].length : a[1][key]
		);

		let chartData = {
			labels,
			datasets: [
				{
					// label: "Avg. Likes per day",
					data,
					label: 'key',
					backgroundColor: 'rgba(255, 99, 132, .25)',
					borderColor: 'rgba(255, 99, 132, 1)',
					pointStrokeColor: '#fff',
					lineTension: 0,
				},
			],
		};
		return chartData;
	};

	setUserData = key => {
		let labels = this.props.tweets.map(a => a[0].slice(0, 6));

		let data = labels.map(() => this.props.account[key]);
		let chartData = {
			labels,
			datasets: [
				{
					// label: "Avg. Likes per day",
					data,
					label: 'key',
					backgroundColor: 'rgba(255, 99, 132, .25)',
					borderColor: 'rgba(255, 99, 132, 1)',
					pointStrokeColor: '#fff',
					lineTension: 0,
				},
			],
		};
		return chartData;
	};

	render() {
		return (
			<div className="chart-box">
				<div className="chart">
					<Line
						data={this.setTweetData('avgLikes')}
						options={{
							title: {
								display: this.props.displayTitle,
								text: 'Average likes per day',
								fontSize: 16,
							},
							legend: {
								display: this.props.displayLegend,
								position: this.props.legendPosition,
							},
							options: {
								plugins: {
									filler: {
										propagate: true,
									},
								},
							},
						}}
					/>
				</div>
				<div className="chart">
					<Line
						data={this.setTweetData('avgRT')}
						options={{
							title: {
								display: this.props.displayTitle,
								text: 'Average RT per day',
								fontSize: 16,
							},
							legend: {
								display: this.props.displayLegend,
								position: this.props.legendPosition,
							},
						}}
					/>
				</div>
				<div className="chart">
					<Line
						data={this.setTweetData('avgEngagement')}
						options={{
							title: {
								display: this.props.displayTitle,
								text: 'Average Engagement per day',
								fontSize: 16,
							},
							legend: {
								display: this.props.displayLegend,
								position: this.props.legendPosition,
							},
						}}
					/>
				</div>

				<div className="chart">
					<Line
						data={this.setTweetData('tweets')}
						options={{
							title: {
								display: this.props.displayTitle,
								text: 'tweets per day',
								fontSize: 16,
							},
							legend: {
								display: this.props.displayLegend,
								position: this.props.legendPosition,
							},
						}}
					/>
				</div>

				<div className="chart">
					<Line
						data={this.setUserData('followers_count')}
						options={{
							title: {
								display: this.props.displayTitle,
								text: 'Followers changes per day',
								fontSize: 16,
							},
							legend: {
								display: this.props.displayLegend,
								position: this.props.legendPosition,
							},
						}}
					/>
				</div>
				<div className="chart">
					<Line
						data={this.setUserData('friends_count')}
						options={{
							title: {
								display: this.props.displayTitle,
								text: 'following change per day',
								fontSize: 16,
							},
							legend: {
								display: this.props.displayLegend,
								position: this.props.legendPosition,
							},
						}}
					/>
				</div>
			</div>
		);
	}
}

export default Chart;
