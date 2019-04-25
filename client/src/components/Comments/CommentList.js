import React, { Component } from 'react'
import Comment from './Comment';

export default class CommentList extends Component {
	render() {
		let comments = this.props.comments.map((comment, index) => {
			return (
				<Comment comment={comment} key={index} handleDeleteComment={this.props.handleDeleteComment} username={this.props.username}/>
			)
		});
		return (
			<div className="comment-container">
				<form onSubmit={this.props.handlePost}>
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
