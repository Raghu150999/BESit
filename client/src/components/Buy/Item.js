import React, { Component } from 'react'
import './Product.css';

class Item extends Component {
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
					<img src={api_uri + "/image/" + item.fileNames[0]} className="card-img-top" alt="Responsive" />
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
					<img src={api_uri + "/image/" + item.fileNames[i]} className="card-img-top" alt="Responsive" />
				</div>
			));
		}

		if (item.desc === '') {
			item.desc = 'No description provided';
		}

		return (
			<div className="Product">
				<div className="row">
					<div className="col-sm">
						<div className="prod-card">
							<div id={"images" + item._id} className="carousel slide" data-ride="carousel">

								<ol className="carousel-indicators">
									{varOl}
								</ol>

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
							</div>
						</div>

						<div className="card-body">
							<h2 className="card-title">{item.name}
							<button type="button" className="btn btn-dark prod-btn">&#8377; {item.price}</button></h2>
							<br /><br /><br />

							<dl className="row">
								<dt className="col-sm-3">Owner:</dt>
								<dd className="col-sm-9">{item.owner}</dd>

								<dt className="col-sm-3">Desc:</dt>
								<dd className="col-sm-9">{item.desc}</dd>

								<dt className="col-sm-3">Status:</dt>
								<dd className="col-sm-9">{item.status}</dd>
							</dl>
							
							<div className="row">
								<button type="button" className="btn btn-primary" >
									Interested
								</button>
							</div>
						</div>
					</div>
				</div>
				<br /><br /><br /><br />
			</div>
		);
	}
}

export default Item;
