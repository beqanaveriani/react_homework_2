import React from "react";

export default class CountryHistory extends React.Component {

    constructor(props){
        super(props);
        this.state = props.item;
    }


    render() {
        return (
            <tr>
                <td>{this.state.province}</td>
                <td>{this.state.date}</td>
                <td>{this.state.cases}</td>
                <td>{this.state.deaths}</td>
                <td>{this.state.recovered}</td>
            </tr>
        )
    }

}