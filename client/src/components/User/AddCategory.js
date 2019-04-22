import React, { Component } from 'react';
import axios from 'axios';

class AddCategory extends Component
{
    state =
    {
      
    };

  handleSubmit = (e) => 
  {
    e.preventDefault();
    if (this.state.err)
      return;

    const data =
    {
      name: e.target[0].value
    };

    axios.post('/api/addCategory', data).then(
      res => {
        window.location = '/user';
        console.log(data);
      });

  }

    render()
    {
        return(
          <div >
            <div style={{marginRight:"50px",marginLeft:"50px",marginBottom:"10px"}}>
                <form  onSubmit={this.handleSubmit}>
                    <div className="form-group" id="category-form">
                        <label htmlFor="category-new" >New Category</label>
                        <input type="text" className="form-control" name="category-new" aria-describedby="emailHelp" placeholder="Enter category name" />
                    </div>

                    <div className="container-button" id="prof">
                        <button type="submit" className="btn btn-primary" id="add-submit">Add</button>
                    </div>
                </form>
            </div>
          </div>
        )
    }
}

export default AddCategory;