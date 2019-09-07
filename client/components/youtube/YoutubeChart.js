import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class YoutubeChart extends Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		displayTitle: true,
		displayLegend: false,
		legendPosition: 'right',
		location: 'City',
	};

	setYoutubeData = key => {
		let labels = [];
		let data = this.props.items.map((item, i) => {
			labels.push(i);
			return item.statistics[key];
		});

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

	setUserData = key => {
		let date = new Date(this.props.account.createdAt);
		let labels = this.props.account.viewCount.map((_, i) => {
			date.setDate(date.getDate() + i);
			return date.toDateString().slice(4, 10);
		});

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
						data={this.setYoutubeData('viewCount')}
						options={this.getOptions('​View Count per day')}
					/>
				</div>
				<div className="chart">
					<Line
						data={this.setYoutubeData('likeCount')}
						options={this.getOptions('Likes per Video')}
					/>
				</div>
				<div className="chart">
					<Line
						data={this.setYoutubeData('dislikeCount')}
						options={this.getOptions('Dislikes per Video')}
					/>
				</div>
				<div className="chart">
					<Line
						data={this.setYoutubeData('commentCount')}
						options={this.getOptions('Comments per Video')}
					/>
				</div>

				<div className="chart">
					<Line
						data={this.setUserData('subscriberCount')}
						options={this.getOptions('Subscribers changes per day')}
					/>
				</div>
				<div className="chart">
					<Line
						data={this.setUserData('viewCount')}
						options={this.getOptions('Total view count change per day')}
					/>
				</div>
			</div>
		);
	}
}

export default YoutubeChart;
