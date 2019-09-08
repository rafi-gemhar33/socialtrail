import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class TwitterChart extends Component {
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
		let date = new Date(this.props.account.createdAt);
		let labels = this.props.account.friends_count.map((_, i) => {
			date.setDate(date.getDate() + i);
			return date.toDateString().slice(4, 10);
		});
		// this.props.tweets.map(a => a[0].slice(0, 6));

		let data = this.props.account[key];
		let chartData = {
			labels,
			datasets: [
				{
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

	getOptions = text => {
		return {
			title: {
				display: this.props.displayTitle,
				text: text,
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
		};
	};

	render() {
		return (
			<div className="chart-box">
				<div className="chart">
					<Line
						data={this.setTweetData('avgLikes')}
						options={this.getOptions('Average likes per day')}
					/>
				</div>
				<div className="chart">
					<Line
						data={this.setTweetData('avgRT')}
						options={this.getOptions('Average RT per day')}
					/>
				</div>
				<div className="chart">
					<Line
						data={this.setTweetData('avgEngagement')}
						options={this.getOptions('Average Engagement per day')}
					/>
				</div>

				<div className="chart">
					<Line
						data={this.setTweetData('tweets')}
						options={this.getOptions('tweets per day')}
					/>
				</div>

				<div className="chart">
					<Line
						data={this.setUserData('followers_count')}
						options={this.getOptions('Followers changes per day')}
					/>
				</div>
				<div className="chart">
					<Line
						data={this.setUserData('friends_count')}
						options={this.getOptions('following change per day')}
					/>
				</div>
			</div>
		);
	}
}

export default TwitterChart;
