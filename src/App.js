import React, { Component } from 'react';

import './App.css';
import Hello from './Hello';
import Products from './components/Products/Products';

class App extends Component {

  state = {
    items : [
      {id : 1, name : 'Item1' , desc : '"good"', price :'Rs. 200' , status : 'SOLD' , image:'http://lorempixel.com/400/200/technics/1'},
      {id : 2, name : 'Item2' , desc : '"good"', price :'Rs. 600' , status : 'NOT SOLD',image:'http://lorempixel.com/400/200/technics/2' },
      {id : 3, name : 'Item3' , desc : '"comfy"', price :'Rs. 300' , status : 'SOLD',image:'http://lorempixel.com/400/200/technics/3' },
      {id : 4, name : 'Item4' , desc : '"great"', price :'Rs. 400' , status : 'NOT SOLD',image:'http://lorempixel.com/400/200/technics/10' },
      {id : 5, name : 'Item5' , desc : '"great"', price :'Rs. 800' , status : 'NOT SOLD',image:'http://lorempixel.com/400/200/technics/5' },
      {id : 6, name : 'Item6' , desc : '"great"', price :'Rs. 400' , status : 'SOLD',image:'http://lorempixel.com/400/200/technics/6' },
      {id : 7, name : 'Item7' , desc : '"great"', price :'Rs. 900' , status : 'NOT SOLD',image:'http://lorempixel.com/400/200/technics/7' },
      {id : 8, name : 'Item8' , desc : '"great"', price :'Rs. 100' , status : 'SOLD',image:'http://lorempixel.com/400/200/technics/8' },
      {id : 9, name : 'Item9' , desc : '"great"', price :'Rs. 500' , status : 'NOT SOLD',image:'http://lorempixel.com/400/200/technics/9' },
    ],
    
    value : 'initial'
  }
  /*  */
  componentDidMount() {
/*     axios.get(`https://localhost:8080/items`)
      .then(res => {
        const items = res.data;
        this.setState({  items : items });
      }) */
  }

  updateStatus = (status,id)=>{
      console.log(status,id)
      const items = [...this.state.items];
      const index =    items.findIndex((item)=>{
            return item.id == id
          });
          items[index].status = status
        this.setState({
            items
          });
    }

  inputChangeHandler = (e)=>{

    console.log(e.target);

    this.setState({
      value : e.target.value
    })
  }


  render() {
    return (
      <div className="App">
      
        <Products items={this.state.items} update={this.updateStatus} />   
       {/*  <input type='text' onChange={this.inputChangeHandler} value={this.state.value} />
        <p>{this.state.value}</p>
        <Hello /> */}
      </div>
    );
  }
}

export default App;
