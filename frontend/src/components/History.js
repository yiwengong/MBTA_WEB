import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {API_ROOT, USER_ID} from '../constants';
import { Table } from 'antd';
import {message} from "antd/lib/index"

export class History extends Component {
    constructor() {
        super();
        this.state = {
            records:[]
        };
    }

    componentWillMount () {
        // fetch data from backend according to the userID
        console.log(localStorage.getItem(USER_ID));
        axios.get(`${API_ROOT}/history?userId=${localStorage.getItem(USER_ID)}`)
            .then((response) => {
                console.log(response);
                var records = response.data.map((record, i) => {
                    return {
                        key: i,
                        from: record.fromName,
                        to: record.toName,
                        time: record.time.substr(0,10)
                    }
                })
                this.setState({
                    records:records
                });
            },(response) => {
                message.error(response.data.message);
            })
    }

    render() {
        const columns = [{
            title: 'From',
            dataIndex: 'from',
            key: 'from',
        }, {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
        }, {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        }];

        return (
            <div>
                <Link className="to-home-button" to="/home">Home</Link>
                <Table className="history-table" size="middle" dataSource={this.state.records} columns={columns}/>
            </div>
        );
    }

}