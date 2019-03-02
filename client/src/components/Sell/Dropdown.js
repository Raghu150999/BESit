import React, {Component} from 'react';
import './Dropdown.css'

class Dropdown extends Component{

    state = {
        selectedValue : this.props.current
    }

    updateHandler = (e) => {
        const status = e.target.value;
        console.log(status, this.props.id)
        this.props.update(status, this.props.id);
    }

    handleChange =(e) =>{
        this.setState({
            selectedValue : e.target.value
        });
        {/*CHECK THIS PART
        console.log(this.state.selectedValue);
        console.log(this.state.selectedValue);
        console.log(e.target.value);*/}
        this.updateHandler(e)
    }

   

    render(){
        return(
                <div class="styled-select rounded">
                <select defaultValue={this.state.selectedValue}  onChange={this.handleChange} >
                    <option value="SOLD">Mark as Sold</option>
                    <option value="REMOVED">Remove</option>
                    <option value="NOT SOLD">Not Sold</option>
                </select>
                
                {/* <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Update Status
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Mark as Sold</a>
                    <a className="dropdown-item" href="#">Remove</a>
                    <a className="dropdown-item" href="#">Not Sold</a>
        </div> 
    <button onClick={this.updateHandler} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Update Status
                </button>*/}
            </div>
        );
    }
}

export default Dropdown;