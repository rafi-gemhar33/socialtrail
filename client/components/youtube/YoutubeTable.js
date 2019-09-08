import React, { Component } from 'react';

class YoutubeTable extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let date = new Date(this.props.account.createdAt);
		return (
			<>
				<table className="content-table">
					<thead>
						<tr>
							<th>DATES</th>
							<th>TOTAL VIEWS</th>
							<th>TOTAL SUBSCRIBERS</th>
							<th>TOTAL VIDEOS</th>
						</tr>
					</thead>
					<tbody>
						{this.props.account &&
							this.props.account.viewCount.map((_, i) => {
								date.setDate(date.getDate() + i);

								return (
									<tr key={i}>
										<td>{date.toDateString().slice(4, 10)}</td>
										<td>{this.props.account.viewCount[i]}</td>
										<td>{this.props.account.subscriberCount[i]}</td>
										<td>{this.props.account.videoCount[i]}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</>
		);
	}
}

export default YoutubeTable;
