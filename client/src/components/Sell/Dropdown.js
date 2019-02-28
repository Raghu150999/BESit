import React, {Component} from 'react';

class Dropdown extends Component{

state = {
    selectedValue : 'select'
}

    updateHandler = () =>{
        const status = this.state.selectedValue;
        console.log(status,this.props.id)
        this.props.update(status,this.props.id);
    }

    handleChange =(e) =>{
        this.setState({
            selectedValue : e.target.value
        })
    }

    render(){
        return(
            <div class="dropdown">

                <select defaultValue={this.state.selectedValue}  onChange={this.handleChange} >
                    <option value="Select">Select</option>
                    <option value="SOLD">Mark as Sold</option>
                    <option value="REMOVED">Remove</option>
                    <option value="NOT SOLD">Not Sold</option>
                </select>
                <button onClick={this.updateHandler} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Update Status
                </button>
                {/* <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Update Status
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Mark as Sold</a>
                    <a class="dropdown-item" href="#">Remove</a>
                    <a class="dropdown-item" href="#">Not Sold</a>
                </div> */}
            </div>
        );
    }
}

export default Dropdown;