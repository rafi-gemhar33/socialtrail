import React, { Component } from 'react';

class Table extends Component {
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
							<th>FOLLOWING</th>
							<th>FOLLOWERS</th>
							<th>STATUS</th>
							<th>FAVOURITES</th>
						</tr>
					</thead>
					<tbody>
						{this.props.account &&
							this.props.account.friends_count.map((_, i) => {
								date.setDate(date.getDate() + i);

								return (
									<tr key={i}>
										<td>{date.toDateString().slice(4, 10)}</td>
										<td>{this.props.account.friends_count}</td>
										<td>{this.props.account.followers_count}</td>
										<td>{this.props.account.statuses_count}</td>
										<td>{this.props.account.favourites_count}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</>
		);
	}
}

export default Table;
