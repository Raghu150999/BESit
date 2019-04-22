import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import moment from 'moment';
import RadialChart from './RadialChart.js';
import './Dashboard.css';

class Dashboard extends Component
{

    state = 
    {
        requirementsTime: [],
        requirementsVal: [],
        prodTime: [],
        prodVal: [],
        req:
        {
            options:
            {
                chart: 
                {
                    offsetY: 10,
                    background: '#f4f4f4',
                },
                plotOptions:
                {
                    bar:
                    {
                        dataLabels:
                        {
                            position: 'top',
                        }
                    },
                },
                dataLabels:
                {
                    enabled:true,
                    offsetY: -30,
                    style:
                    {
                        fontSize: '20px',
                        colors: ['#304758']
                    }
                },
                xaxis:
                {
                    categories: [],
                    labels:
                    {
                        offsetY: 5,
                        style:
                        {
                            fontSize: '15px',
                        }
                    },
                    axisTicks:
                    {
                        show: false
                    }
                },
                yaxis:
                {
                    labels:
                    {
                        show: false
                    },
                    axisBorder: 
                    {
                        show: false
                    },
                    axisTicks: 
                    {
                        show: false,
                    }
                },
                title: 
                {
                    text: '#Requirements uploaded',
                    floating: false,
                    offsetY: 0,
                    align: 'center',
                    style:
                    {
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }
                },
            },

            series: 
            [{
                data: []
            }],
        },

        prod:
        {
            options:
            {
                chart: 
                {
                    offsetY: 10,
                    background: '#f4f4f4',
                },
                plotOptions:
                {
                    bar:
                    {
                        dataLabels:
                        {
                            position: 'top',
                        }
                    },
                },
                dataLabels:
                {
                    enabled:true,
                    offsetY: -30,
                    style:
                    {
                        fontSize: '20px',
                        colors: ['#304758']
                    }
                },
                xaxis:
                {
                    categories: [],
                    labels:
                    {
                        offsetY: 5,
                        style:
                        {
                            fontSize: '15px',
                        }
                    },
                    axisTicks:
                    {
                        show: false
                    }
                },
                yaxis:
                {
                    labels:
                    {
                        show: false
                    },
                    axisBorder: 
                    {
                        show: false
                    },
                    axisTicks: 
                    {
                        show: false,
                    }
                },
                title: 
                {
                    text: '#Sale-Items uploaded',
                    floating: false,
                    offsetY: 0,
                    align: 'center',
                    style:
                    {
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }
                },
            },

            series: 
            [{
                data: []
            }],
        }
    };

    prodScaleDate = () =>
    {
        var t1 = this.state.prodTime;
        var t2 = this.state.prodVal;
        console.log(t1);
        console.log(t2);
        this.setState(
        {
            prod:
            {
                options:
                {
                    xaxis:
                    {
                        categories: t1
                    },

                    plotOptions:
                    {
                        bar:
                        {
                            columnWidth: '20px',
                        }
                    },
                    fill:
                    {
                        colors: ['#00FF7F']
                    }
                },

                series: 
                [{
                    name: 'Date',
                    data: t2
                }]
            }
        });
    }

    reqScaleDate = () =>
    {
        var t1 = this.state.requirementsTime;
        var t2 = this.state.requirementsVal;
        console.log(t1);
        console.log(t2);
        this.setState(
        {
            req:
            {
                options:
                {
                    xaxis:
                    {
                        categories: t1
                    },

                    plotOptions:
                    {
                        bar:
                        {
                            columnWidth: '20px',
                        }
                    },
                    fill:
                    {
                        colors: ['#00bfff']
                    }
                },

                series: 
                [{
                    name: 'Date',
                    data: t2
                }]
            }
        });
    };

    prodScaleMonth = () =>
    {
        var t1 = this.state.prodTime;
        var t2 = this.state.prodVal;
        var map1 = new Map();
        for(var i=0;i<t1.length;i++)
        {
            var month = moment(t1[i]).format("MMMM YY");
            if(map1.has(month))
            {
                var x = map1.get(month);
                map1.set(month,t2[i]+x);
            }
            else
                map1.set(month,t2[i]);
        }
        var x = Array.from(map1.keys());
        var y = [];
        for(var i=0;i<x.length;i++)
            y.push(map1.get(x[i]));
        //console.log(x);
        //console.log(y);
        this.setState(
        {
            prod:
            {
                options:
                {
                    xaxis:
                    {
                        categories: x
                    },

                    plotOptions:
                    {
                        bar:
                        {
                            columnWidth: '10px'
                        }
                    },
                    fill:
                    {
                        colors: ['#FFFF33']
                    }
                },

                series: 
                [{
                    name: 'Month',
                    data: y
                }]
            }
        });
    };

    reqScaleMonth = () =>
    {
        var t1 = this.state.requirementsTime;
        var t2 = this.state.requirementsVal;
        var map1 = new Map();
        for(var i=0;i<t1.length;i++)
        {
            var month = moment(t1[i]).format("MMMM YY");
            if(map1.has(month))
            {
                var x = map1.get(month);
                map1.set(month,t2[i]+x);
            }
            else
                map1.set(month,t2[i]);
        }
        var x = Array.from(map1.keys());
        var y = [];
        for(var i=0;i<x.length;i++)
            y.push(map1.get(x[i]));
        //console.log(x);
        //console.log(y);
        this.setState(
        {
            req:
            {
                options:
                {
                    xaxis:
                    {
                        categories: x
                    },

                    plotOptions:
                    {
                        bar:
                        {
                            columnWidth: '10px'
                        }
                    },
                    fill:
                    {
                        colors: ['#f44336']
                    }
                },

                series: 
                [{
                    name: 'Month',
                    data: y
                }]
            }
        });
    };

    componentDidMount() 
    {
        axios.get('/api/getreq').then(res => 
        {
            //console.log(res.data);
            var rows = res.data
            var occurences = rows.reduce(function (r, row) 
            {
                var date = "";
                for(var i=0;i<10;i++)
                    date+=row.timestamp[i];
                date = moment(date).format("DD MMMM YYYY");
                r[date] = ++r[date] || 1;
                return r;
            }, {});
        
            var result = Object.keys(occurences).map(function (key) 
            {
                return { key: key, value: occurences[key] };
            });

            result.sort(function(a,b)
            {
                var d1 = moment(a.key).format("YYYY MM DD");
                var d2 = moment(b.key).format("YYYY MM DD");
                return d1.localeCompare(d2);
            });

            var t1 = [];
            var t2 = [];

            for(var i=0;i<result.length;i++)
            {
                t1.push(result[i].key);
                t2.push(result[i].value);                
            }

            this.setState(
            {
                requirementsTime: t1,
                requirementsVal: t2
            });

            this.reqScaleDate();
        });

        axios.get('/api/getprods').then(res => 
        {
            console.log(res.data);
            var rows = res.data;
            var occurences = rows.reduce(function (r, row) 
            {
                var date = "";
                for(var i=0;i<10;i++)
                    date+=row.timestamp[i];
                date = moment(date).format("DD MMMM YYYY");
                r[date] = ++r[date] || 1;
                return r;
            }, {});
        
            var result = Object.keys(occurences).map(function (key) 
            {
                return { key: key, value: occurences[key] };
            });

            result.sort(function(a,b)
            {
                var d1 = moment(a.key).format("YYYY MM DD");
                var d2 = moment(b.key).format("YYYY MM DD");
                return d1.localeCompare(d2);
            });

            var t1 = [];
            var t2 = [];

            for(var i=0;i<result.length;i++)
            {
                t1.push(result[i].key);
                t2.push(result[i].value);                
            }

            this.setState(
            {
                prodTime: t1,
                prodVal: t2
            });

            this.prodScaleDate();
        });
    }

    render()
    {
        return(
            <div className = "container">
                <div className = "req-chart">
                    <Chart 
                        options = {this.state.req.options}
                        series = {this.state.req.series}
                        type = "bar"
                        height = "450"
                        width = "100%"
                    />
                    <div className = "buttons">
                        <button onClick = {this.reqScaleDate} type = "button" class = "btn btn-primary chart-btn">Date</button>
                        <button onClick = {this.reqScaleMonth} type = "button" class = "btn btn-primary chart-btn">Month</button>
                    </div>
                </div>
                <br /><br />
                <div className = "prod-chart">
                    <Chart 
                        options = {this.state.prod.options}
                        series = {this.state.prod.series}
                        type = "bar"
                        height = "450"
                        width = "100%"
                    />
                    <div className = "buttons">
                        <button onClick = {this.prodScaleDate} type = "button" class = "btn btn-primary chart-btn">Date</button>
                        <button onClick = {this.prodScaleMonth} type = "button" class = "btn btn-primary chart-btn">Month</button>
                    </div>
                </div>
                <br /><br /><br />

                <div className = "radialChart">
                    <RadialChart />
                </div>
            </div>
        );
    }
}

export default Dashboard;

/*

Group by date
db.requirements.aggregate([
{
    $group : 
    {
       _id : { month: {$month: "$timestamp"}, day: {$dayOfMonth: "$timestamp"}, year: {$year: "$timestamp"} },
       count: { $sum: 1 }
    }
}])
*/