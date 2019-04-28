import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import './Radial.css';

class RadialChart extends Component
{
    state = 
    {
        labels: [],
        
        options: 
        {
            labels: [],
            radialBar: 
            {
                dataLabels: 
                {
                    name: 
                    {
                        fontSize: '22px',
                    },
                    value: 
                    {
                        fontSize: '16px',
                    },
                }
            }
        },

        series: [1]
    }

    componentDidMount()
    {
        console.log('mount');
        axios.get('/api/getcategories').then(res =>
        {
            let categories = []
            for(let i=0;i<res.data.length;i++)
                categories.push(res.data[i].name);
            console.log(categories);
            let map1 = new Map();
            this.setState(
            {
                options:
                {
                    labels: categories
                }
            });
            console.log(this.state.options.labels);
            axios.get('/api/getallprods').then(res =>
            {
                //console.log(res.data);
                for(let i=0;i<res.data.length;i++)
                {
                    let category_ = (res.data[i]).category;
                    if(map1.has(category_))
                    {
                        let x = map1.get(category_);
                        map1.set(category_,1+x);
                    }
                    else
                        map1.set(category_,1);
                }
                let val = [], sum = 0;
                for(let i=0;i<categories.length;i++)
                {
                    if(map1.has(categories[i]))
                    {
                        let x = map1.get(categories[i]);
                        val.push(x);
                        console.log(x);
                        sum = sum + x;
                    }
                    else
                        val.push(0);
                }
                console.log(sum);
                for(let i=0;i<val.length;i++) {
                    val[i] = ((val[i]/sum)*100);
                    val[i] = val[i].toPrecision(4);
                }
                this.setState(
                {
                    series: val
                });
                console.log(this.state.series);
            });
        });
    }

    render()
    {
        return this.state.options.labels?
        (
            <div>
                <div className = "radial-chart">
                    <h5><strong>Categories</strong></h5>
                    <h6>populated by %</h6>
                    {console.log(this.state.options.labels)}
                    {console.log(this.state.series)}
                    <Chart options={this.state.options} series={this.state.series} type="radialBar" height="500" />
                </div>
                <br /><br />
            </div>
        ):(<div>{console.log('no')}</div>)
    }
}

export default RadialChart;
