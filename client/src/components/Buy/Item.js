import React, { Component } from 'react'
import axios from 'axios';
import './../Sell/Product/Product.css';
import CommentList from './../Comments/CommentList';

class Item extends Component {

	state = {
		status: 'Not Interested',
		interestedUsers: [],
		sellerStatus: false,
		contact: 'Not provided',
		image: <img src="https://img.icons8.com/ios/40/000000/bookmark-ribbon.png" />,
		comments: []
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
			owner: this.props.item.owner,
			username: this.props.user.username,
			itemName: this.props.item.name,
			itemID: this.props.item._id,
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

	handleInterested = (e) => {
		const newStatus = this.state.status === 'Not Interested' ? 'Interested' : 'Not Interested';
		const image = newStatus === 'Interested' ? <img src="https://img.icons8.com/ios/40/000000/bookmark-ribbon-filled.png" /> : <img src="https://img.icons8.com/ios/40/000000/bookmark-ribbon.png" />;
		const interestedUsers = this.state.interestedUsers.filter(user => {
			if (user.username === this.props.user.username) {
				return false; // skip the current user
			}
			return true;
		});

		if (newStatus === 'Interested') {
			interestedUsers.push({
				username: this.props.user.username,
				status: this.state.sellerStatus,
			})
		}
		axios.post('/api/updateinteresteduser', {
			item: this.props.item,
			interestedUsers
		});

		this.setState({
			status: newStatus,
			interestedUsers,
			image
		});

		let data = {
			sourceUsername: this.props.user.username,
			targetUsername: this.props.item.owner,
			productID: this.props.item._id,
			productName: this.props.item.name,
			type: 'INTEREST',
			seenStatus: false,
			status: newStatus,
			timeStamp: new Date()
		};

		axios.post('/notify/interest', data)
			.then(res => {
			});
	}
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
	
	componentDidMount() {
		const interestedUsers = this.props.item.interestedUsers;
		let status = false;
		interestedUsers.forEach(user => {
			if (user.username === this.props.user.username) {
				status = user.status;
				this.setState({
					status: 'Interested',
					sellerStatus: user.status,
					image: <img src="https://img.icons8.com/ios/40/000000/bookmark-ribbon-filled.png" />
				});
			}
		});
		axios.get('/comment/getcomments', {
			params: {
				id: this.props.item._id
			}
		})
			.then(res => {
				let comments = res.data;
				this.setState({
					comments
				})
			});
		if (status) {
			// if status is true then contact sharing is allowed hence, get contact
			axios.get('/api/getContact', {
				params: {
					username: this.props.item.owner
				}
			})
				.then(res => {
					this.setState({
						contact: res.data.phoneno
					})
				});
		}
		this.setState({
			interestedUsers
		});
	}

	render() {
		const api_uri = process.env.REACT_APP_API_URI_LOCAL;
		let item = this.props.item;

		// generating carousel elements (array of JSX elements when rendered will come one after another)
		let carouselElements = [];
		if (item.fileNames.length > 0) {
			carouselElements.push((
				<div className="carousel-item active" key="0">
					<img src={api_uri + "/image/" + item.fileNames[0]} className="card-img-top" alt="Card image cap" />
				</div>
			));
		} else {
			// Default image if no image is available.
			carouselElements.push((
				<div className="carousel-item active" key="0">
					<img src="https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Ftimedotcom.files.wordpress.com%2F2015%2F06%2F521811839-copy.jpg&w=800&c=sc&poi=face&q=85" className="card-img-top" alt="Responsive" />
				</div>
			));
		}

		for (let i = 1; i < item.fileNames.length; i++) {
			carouselElements.push((
				<div className="carousel-item" key={i + ""}>
					<img src={api_uri + "/image/" + item.fileNames[i]} className="card-img-top" alt="Card image cap" />
				</div>
			));
		}

		// Default text if no description provided
		if (item.desc === '') {
			item.desc = 'No description provided';
		}



		return (
			<div className="item">
				<div className="col-sm-auto">
					<div className="card box-shadow--8dp">
						<div id={"images" + item._id} className="carousel slide" data-ride="carousel">
							{/* Indicators */}
							{/* Slideshow */}
							<div className="carousel-inner">
								{carouselElements}
							</div>

							<a className="carousel-control-prev" href={"#images" + item._id} role="button" data-slide="prev">
								<span className="carousel-control-prev-icon" aria-hidden="true"></span>
								<span className="sr-only">Previous</span>
							</a>

							<a className="carousel-control-next" href={"#images" + item._id} role="button" data-slide="next">
								<span className="carousel-control-next-icon" aria-hidden="true"></span>
								<span className="sr-only">Next</span>
							</a>

							<div className="card-body">
								<h4 className="card-title">{item.name}</h4>

								<div className="container desc-list">
									<dl className="row">
										<dt className="col-sm-4">Price:</dt>
										<dd className="col-sm-8">{String.fromCharCode(8377) + " " + item.price}</dd>

										<dt className="col-sm-4">Owner:</dt>
										<dd className="col-sm-8">{item.owner}</dd>

										<dt className="col-sm-4">Desc:</dt>
										<dd className="col-sm-8">{item.desc}</dd>

										<dt className="col-sm-4">Status:</dt>
										<dd className="col-sm-8">{item.status}</dd>

										<dt className="col-sm-4">Contact:</dt>
										<dd className="col-sm-8">{this.state.contact}</dd>
									</dl>

									<button type="button" className="btn btn-default prod-btn" onClick={this.handleInterested} data-toggle="tooltip" data-placement="bottom" title={this.state.status === 'Interested' ? 'Remove Interest' : 'Express Interest'} id='mytooltip'>
										{this.state.image}
									</button>

									<div className="card-text int-card-text time"><small className="text-muted">{this.calcTime(this.props.item.timestamp)}</small></div>

									<button type="button" className="btn btn-default" data-toggle="modal" data-target={"#commentsModal" + this.props.item._id}>
										<img src="https://img.icons8.com/metro/24/000000/comments.png" />
									</button>

									{/* Comments Modal */}
									<div className="modal interested-users-modal fade" id={"commentsModal" + this.props.item._id} tabIndex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
										<div className="modal-dialog interestDialog" role="document">
											<div className="modal-content" style={{ width: "150%" }}>
												<div className="modal-header">
													<h5 className="modal-title" id="commentModalLabel">Comments</h5>
													<button type="button" className="close interest" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true" className="cross-btn">&times;</span>
													</button>
												</div>
												<div className="modal-body interestBody">
													<CommentList handlePost={this.handlePost} comments={this.state.comments} handleDeleteComment={this.handleDeleteComment} username={this.props.user.username} />
												</div>
												<div className="modal-footer">
													<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Item;
