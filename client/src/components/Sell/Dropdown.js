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
                <div className="styled-select rounded">
                <select defaultValue={this.state.selectedValue}  onChange={this.handleChange} >
                    <option value="SOLD">Sold</option>
                    <option value="REMOVED">Remove</option>
                    <option value="NOT SOLD">Not Sold</option>
                </select>
            </div>
        );
    }
}

export default Dropdown;