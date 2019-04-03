import React, { Component } from 'react'
import axios from 'axios';
import './../Sell/Product/Product.css';

class Item extends Component {

	state = {
		status: 'Not Interested',
		interestedUsers: [],
		sellerStatus: false,
		contact: 'Not provided'
	}

	handleInterested = (e) => {
		const newStatus = this.state.status === 'Not Interested' ? 'Interested' : 'Not Interested';
		console.log(newStatus);
		const interestedUsers = this.state.interestedUsers.filter(user => {
			if (user.username === this.props.user.username) {
				return false; // skip the current user
			}
			return true;
		});

		if (newStatus === 'Interested') {
			interestedUsers.push({
				username: this.props.user.username,
				status: this.state.sellerStatus
			})
		}
		axios.post('/api/updateinteresteduser', {
			item: this.props.item,
			interestedUsers
		});

		this.setState({
			status: newStatus,
			interestedUsers
		})

	}
	componentDidMount() {
		const interestedUsers = this.props.item.interestedUsers;
		let status = false;
		interestedUsers.forEach(user => {
			if (user.username === this.props.user.username) {
				status = user.status;
				this.setState({
					status: 'Interested',
					sellerStatus: user.status
				});
			}
		});
		if (status) {
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
		// generating elements for ol
		let varOl = [];

		// hard-coding first image for giving className="active"
		varOl.push((
			<li data-target={"#images" + item._id} data-slide-to="0" className="active" key="0"></li>
		));

		for (let i = 1; i < item.fileNames.length; i++) {
			varOl.push((
				<li data-target={"#images" + item._id} data-slide-to={i + ""} key={i + ""}></li>
			));
		}

		// generating carousel elements
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

		if (item.desc === '') {
			item.desc = 'No description provided';
		}

		return (
			<div className="col-sm-auto">
				<div className="card box-shadow--8dp">
					<div id={"images" + item._id} className="carousel slide" data-ride="carousel">
						{/* Indicators */}
						{/* <ol className="carousel-indicators">
							{varOl}
						</ol> */}
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
							</div>
							<button type="button" className="btn btn-dark prod-btn" onClick={this.handleInterested}>
								{this.state.status}
							</button>
						</div>
					</div>
				</div>
			</div>	
		);
	}
}

export default Item;
