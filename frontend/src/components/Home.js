import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {API_ROOT, USER_ID} from '../constants';
import { Cascader, message, Button } from 'antd';

export class Home extends Component {
   constructor() {
       super();
       this.state = {
           originStations: [],
           destinations:[],
           selectedOriginStation: 0,
           selectedDestination: 0,
       };
   }

    componentWillMount () {
       //fetch the data from backend;
       //and set state of originStation.
        axios.get(`${API_ROOT}/station`)
            .then((response) => {
                var stations = response.data.map((station)=> {
                    return {
                        value: station.id,
                        label: station.name
                    };
                });
                console.log(stations);
                this.setState({
                    originStations:stations,
                    destinations:stations
                });
            },(response) => {
                message.error(response.data.message);
            })

    }

    fetchDestinations (startStation) {
        //fetch the data from backend;
        //and set state of destinations.
        axios.get(`${API_ROOT}/station?from_id=${startStation}`)
            .then((response) => {
                var stations = response.data.map((station)=> {
                    return {
                        value: station.id,
                        label: station.name
                    };
                });
                console.log(stations);
                this.setState({
                    destinations:stations
                });
            }, (response) => {
                message.error(response.data.message);
            })
    }

    originStationOnChange = (value) => {
        // the value of selected station
        this.setState({
            selectedOriginStation: value,
        });

        this.fetchDestinations(value);
        console.log(value);

    }

    destinationsOnChange = (value) => {
        // the value of selected station
        this.setState({
            selectedDestination: value,
        });
        console.log(value);
    }

    putOrder = () =>{
       console.log("start: " + this.state.selectedOriginStation);
       console.log("end: " + this.state.selectedDestination);
       // add the order into history database!
        axios.post(`${API_ROOT}/history`, {userID: localStorage.getItem(USER_ID), from_id: this.state.selectedOriginStation,to_id:this.state.selectedDestination})
            .then((response) => {
                message.success(response.data.message);
            }, (response) => {
                message.error(response.data.message);
            });
    }

    render() {
        return(
            <div >
                <Link className="to-history-button" to='history'>History</Link>
                <br/>
                <Cascader className="station-input" options={this.state.originStations} onChange={this.originStationOnChange} placeholder="Please select origin station"/>
                <Cascader className="station-input" options={this.state.destinations} onChange={this.destinationsOnChange} placeholder="Please select destination"/>
                <Button type="primary" onClick={this.putOrder}>Submit</Button>
            </div>
        );
    }
}
