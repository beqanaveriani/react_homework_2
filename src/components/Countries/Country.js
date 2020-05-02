import React from "react"
import CountryModal from "./CountryModal"

class Country extends React.Component{

    constructor(props) {
        super(props);
        this.state = {data: props.country, modal: false, history: props.history};
        this.showModal = this.showModal.bind(this)
    }


    showModal = e => {
        this.setState({
            data: this.state.data,
            modal: !this.state.modal,
            history: this.state.history
        });
    }

    render(){
        return (
            <tr name={this.state.data.countryInfo.iso2} onClick={e => {this.showModal();}}>
                <td><img src={this.state.data.countryInfo.flag} alt="flag"></img></td>
                <td>{this.state.data.continent}</td>
                <td>{this.state.data.country}</td>
                <td>{this.state.data.cases}</td>
                <td>{this.state.data.active}</td>
                <td>{this.state.data.deaths}</td>
                <td style={{color: "#1dd1a1"}}>+ {this.state.data.recovered}</td>
                <td>{this.state.data.todayCases}</td>
                <td style={{color: "#ff6b6b"}}>- {this.state.data.todayDeaths}</td>
                <td><button className="showModal">Show</button><CountryModal onClose={this.showModal} show={this.state.modal} country={this.state.data.countryInfo.iso2} key={this.state.data.countryInfo.iso3} history={this.state.history} /></td>
            </tr>
        );
    }

}

export default Country;