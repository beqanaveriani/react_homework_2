import React from 'react';
import axios from "axios";
import Country from "./Country"
import "./css/Countries.css"

export default class Countries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            history: {},
            dataDone: false,
            historyDone: false
        };
    }


    collectHistory(data){
        let newData = {};

        for (let i=0; i<data.length; i++){
            let tmp = data[i];
            if (!(tmp.country in newData)) {
                newData[tmp.country] = [];
            }
            
            for (const key of Object.keys(tmp.timeline.cases)){
                newData[tmp.country].push({province: tmp.province !== null ? tmp.province : "N/A" , date: `${key}`, cases: tmp.timeline.cases[`${key}`], deaths: tmp.timeline.deaths[`${key}`], recovered: tmp.timeline.recovered[`${key}`]})
            }
        }

        return newData;
    }


    componentDidMount() {
        axios
            .get(`https://corona.lmao.ninja/v2/countries?sort=country`)
            .then((response) => {
                this.setState({ data: response.data.sort((a, b) => (a.cases < b.cases) ? 1 : ((b.cases < a.cases) ? -1 : 0)), history: this.state.history, dataDone: true, historyDone: this.state.historyDone});
            })
            .catch(() => {
                console.error('Error');
            });

        axios
            .get(`https://corona.lmao.ninja/v2/historical`)
            .then((response) => {
                this.setState({ data: this.state.data, history: this.collectHistory(response.data), dataDone: this.state.dataDone, historyDone: true});
            })
            .catch(() => {
                console.error('Error');
            });
    }


    render() {
       if (!this.state.dataDone || !this.state.historyDone){
          return <h1>Loading...</h1>
       } 
        return (
            <div>
                <table id="countries">
                    <thead>
                        <tr>
                            <th>Flag</th>
                            <th>Continent</th>
                            <th>Country</th>
                            <th>Cases</th>
                            <th>Active cases</th>
                            <th>Deaths</th>
                            <th>Recovered</th>
                            <th>Today cases</th>
                            <th>Today deaths</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((item, key) => <Country country={item} key={item.country + "-" + item.continent + "-" + key} history={this.state.history[item.country]} />)
                        }
                    </tbody>
                </table>
            </div>
            
        );
    }
}
