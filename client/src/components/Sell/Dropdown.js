import React, { Component } from 'react';
import './Dropdown.css'

class Dropdown extends Component {

  state = {
    selectedValue: this.props.current
  }

  updateHandler = (e) => {
    const status = e.target.value;
    this.props.update(status, this.props.id);
  }

  handleChange = (e) => {
    this.setState({
      selectedValue: e.target.value
    });
    this.updateHandler(e)
  }

  render() {
    return (
      <div className="styled-select rounded">
        <select defaultValue={this.state.selectedValue} onChange={this.handleChange} >
          <option value="Sold">Sold</option>
          <option value="Removed">Removed</option>
          <option value="Available">Available</option>
        </select>
      </div>
    );
  }
}

export default Dropdown;