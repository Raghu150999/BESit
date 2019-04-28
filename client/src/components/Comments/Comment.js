import React, { Component } from 'react'
import './Comments.css';

export default class Comment extends Component {

	calcTime(timestamp) {
		let x = new Date(timestamp);
		let y = new Date();
		let diff = (y.getTime() / 1000) - (x.getTime() / 1000);
		let val;
		if (diff < 3600) {
			val = parseInt(diff / 60);
			if (val != 1)
				return val + ' minutes ago';
			else
				return val + ' minute ago';
		}
		if (diff < 86400) {
			val = parseInt(diff / 3600);
			if (val != 1)
				return val + ' hours ago';
			else
				return val + ' hour ago';
		}
		else {
			val = parseInt(diff / 86400);
			if (val != 1)
				return val + ' days ago';
			else
				return val + ' day ago';
		}
	}


	render() {
		let comment = this.props.comment;
		let deleteBtn = (
			<button type="button" className="btn btn-default delete-btn" onClick={() => {this.props.handleDeleteComment(comment._id)}}>
				<img src="https://img.icons8.com/material-outlined/24/000000/waste.png" />
			</button>
		);
		deleteBtn = this.props.username === comment.username ? deleteBtn : '';
		return (
			<div className="comment">
				<div className="card">
					<div className="card-body">
						<div className="card-title">{comment.username} {deleteBtn}</div>
						<p className="card-text">{comment.text}</p>
						<div className="card-text int-card-text time"><small className="text-muted">{this.calcTime(comment.timestamp)}</small></div>
					</div>
				</div>
			</div>
		)
	}
}
