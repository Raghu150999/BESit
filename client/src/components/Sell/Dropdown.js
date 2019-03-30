import React, {Component} from 'react';
import './Dropdown.css'
// props.update see
class Dropdown extends Component{

    state = {
        selectedValue : this.props.current
        //prev value already when called
    }

    updateHandler = (e) => {
        const status = e.target.value;
        this.props.update(status, this.props.id);
        // calls update method which is actuaally present in products page
        //which requests server for upating status using axios.post(/url,json object)
    }
 
    handleChange =(e) =>{
        this.setState({
            selectedValue : e.target.value
        });
        this.updateHandler(e)
    }

   

    render(){
        return(
                <div className="styled-select rounded">
                <select defaultValue={this.state.selectedValue}  onChange={this.handleChange} >
                    <option value="SOLD">Sold</option>
                    <option value="REMOVED">Remove</option>
                    <option value="Available">Available</option>
                </select>
            </div>
        );
    }
}

export default Dropdown;