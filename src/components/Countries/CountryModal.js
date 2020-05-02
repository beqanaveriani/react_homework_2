import React from "react";
import axios from "axios";
import "./css/Modal.scss"
import CountryHistory from "./CountryHistory";

export default class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: {}, loaded: false, update: null, history: props.history !== undefined && props.history !== null ? props.history : []};
        this.country = props.country;
    }

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };

    fillData() {
        if (this.state.loaded === true || !this.props.show) return;
        axios
        .get(`https://corona.lmao.ninja/v2/countries/${this.country}`)
        .then((response) => {
            this.setState({data: response.data, loaded: true, update: new Date(response.data.updated).toISOString(), history: this.state.history});
        })
        .catch(() => {
            console.error('Error');
        });  
    }


  render() {
    if(!this.props.show){
        return null;
    } else {
      this.fillData()
    }

    return (
        <div className="modal" >
          <h2>Detail info of {this.state.data.country}</h2>
          <div className="content">
            <h5>Last updated: {this.state.update}</h5>
            <h5>Critical: {this.state.data.critical}</h5>
            <h5>Total Tests: {this.state.data.tests}</h5>
            <div style={{overflowY: "auto", height: "200px"}}>
                <table>
                  <thead>
                    <tr>
                      <th>Province</th>
                      <th>Date</th>
                      <th>Cases</th>
                      <th>Deaths</th>
                      <th>Recovered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.history.map((item) => <CountryHistory item={item} key={Math.random()} />) 
                    }
                  </tbody>
                </table>
            </div>
          </div>
          <div className="actions">
            <button className="toggle-button" onClick={this.onClose}>
              Close
            </button>
          </div>
       </div>
    );
  }
}