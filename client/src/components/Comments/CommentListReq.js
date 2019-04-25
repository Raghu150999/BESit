import React, { Component } from 'react'
import Comment from './Comment';
import axios from 'axios';

export default class CommentListReq extends Component {
	state = {
		comments: []
	}

	componentDidMount() {
		axios.get('/comment/getcomments', {
			params: {
				id: this.props.id
			}
		})
			.then(res => {
				let comments = res.data;
				this.setState({
					comments
				})
			});
	}

	handleDeleteComment = (id) => {
		let comments = this.state.comments.filter(comment => {
			return (comment._id != id);
		});
		this.setState({
			comments
		});
		axios.post('/comment/deletecomment', {
			id
		});
	}

	handlePost = (e) => {
		e.preventDefault();
		// Add a new comment
		let comment = {
			text: e.target[0].value,
			owner: this.props.requirement.username,
			username: this.props.username,
			itemName: this.props.requirement.title,
			itemID: this.props.requirement._id,
			timestamp: new Date()
		}
		e.target[0].value = '';
		let comments = this.state.comments;
		axios.post('/comment/addcomment', comment)
			.then(res => {
				comments.push(res.data);
				this.setState({
					comments
				});
			});
	}

	render() {
		let comments = this.state.comments.map((comment, index) => {
			return (
				<Comment comment={comment} key={index} handleDeleteComment={this.handleDeleteComment} username={this.props.username} />
			)
		});
		return (
			<div className="comment-container">
				<form onSubmit={this.handlePost}>
					<div className="form-group shadow-textarea">
						<textarea className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Write something here..."></textarea>
						<button className="btn btn-primary post-btn">Post</button>
					</div>
				</form>
				<div>
					{comments}
				</div>
			</div>
		)
	}
}
