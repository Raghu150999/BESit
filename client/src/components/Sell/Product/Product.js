import React from 'react';
import './Product.css';
import Dropdown from '../Dropdown.js'
import axios from 'axios';

const Product = (props) => {
  let item = props.item;
  const api_uri = process.env.REACT_APP_API_URI_LOCAL;

  if (!item.desc) {
    item.desc = 'No description provided';
  }
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

  const handleDelete = (e) => {
    let confirmation = window.confirm('This action will permanently delete this item. Do you want to continue?');
    if (!confirmation)
      return;
    axios.post('/removeitem', props.item)
      .then(res => {
        console.log(res.data);
        window.location = '/sell';
      })
  }

  return (
    <div className="">
      <div className="">
        <div className="col-sm-auto">
          <div className="card box-shadow--8dp">
            
            <div id={"images" + item._id} className="carousel slide" data-ride="carousel">
              {/* <ol className="carousel-indicators">
                {varOl}
              </ol> */}

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
            <div className="card-body">
              <h4 className="card-title">{item.name}</h4>
              <div className="container desc-list">
                <dl className="row">
                  <dt className="col-sm-4">Price:</dt>
                  <dd className="col-sm-8">{String.fromCharCode(8377) + " " + item.price}</dd>

                  <dt className="col-sm-4">Desc:</dt>
                  <dd className="col-sm-8">{item.desc}</dd>
                </dl>
                {<Dropdown update={props.update} id={props.id} current={props.item.status} />}
                <button type="button" className="btn btn-dark prod-btn" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Product;