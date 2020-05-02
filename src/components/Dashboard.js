import React from 'react';
import axios from "axios";
import Countries from "./Countries/Countries"
import "./css/style.css"


class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .get(`https://corona.lmao.ninja/v2/all`)
            .then((response) => {
                this.setState(response.data);
            })
            .catch(() => {
                console.error('Error');
            });
    }


    render(){
        return (
            <div>
                <h1 id="stayhome">#STAYHOME</h1>
                <div className="summary">
                    <div className="summary-child total">
                        <h3>Total cases : {this.state.cases}</h3>
                    </div>
                    <div  className="summary-child total-today">
                        <h3>Total cases today : {this.state.todayCases}</h3>
                    </div >
                    <div  className="summary-child total-death">
                        <h3>Total death : {this.state.deaths}</h3>
                    </div>
                    <div  className="summary-child total-recovered">
                        <h3>Total recovered : {this.state.recovered}</h3>
                    </div>
                    <div className="summary-child total-active">
                        <h3>Total active : {this.state.active}</h3>
                    </div>
                </div>
                <Countries />
            </div>
        );
    }

}

export default Dashboard;