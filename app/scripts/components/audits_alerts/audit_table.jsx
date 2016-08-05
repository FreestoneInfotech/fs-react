/**
 * Created by gautam on 28/07/16.
 */
import React, {Component} from 'react';
import {DataListWrapper,FakeDataStore} from '../../data/FakeDataStore'
import FixedDataTable from 'fixed-data-table';
import Papa from 'papaparse';
import { Label } from 'react-bootstrap';
import {audit_data} from '../../data/demo/demoData';
import {TextCell, AlertCodeCell, AlertLevelCell, DateCell} from '../FixedDataTable/FDTCells';

const {Table, Column, Cell} = FixedDataTable;

export default class AuditTable extends React.Component {
    constructor(props) {
        super(props);
        var results = Papa.parse(audit_data, {
            header: true,
            skipEmptyLines: true,
        });
        //results.data.shift();
        //results.data.pop();
        console.log(results);
        this._dataList = new FakeDataStore(results);

        this.state = {
            filteredDataList: this._dataList,
        };

        this._onFilterChange = this._onFilterChange.bind(this);

    }

    _onFilterChange(e) {
        if (!e.target.value) {
            this.setState({
                filteredDataList: this._dataList,
            });
        }

        var filterBy = e.target.value.toLowerCase();
        var filteredIndexes = new Set(); // using set so it has unique values
        var allData = this._dataList.getAll();
        allData.forEach((d,i) => {
            Object.values(d).forEach( (e) => {
                if (e.toLowerCase().includes(filterBy)){
                    console.log(`pushing one match. $i`)
                    filteredIndexes.add(i);
                }
            });

        });
        console.log('filtered size :', filteredIndexes.size);

        this.setState({
            filteredDataList: new DataListWrapper([...filteredIndexes], allData),
        });
    }

    render() {
        var {filteredDataList} = this.state;
        return (
            <div>
                        <div className="row row-margin-bottom">
                    <div className="col-md-6">
                        <div className="input-group">
                            <input
                                className="form-control"
                                onChange={this._onFilterChange}
                                placeholder="Search..."
                            />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button"><i className="fa fa-search"></i></button>
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <Table
                        rowHeight={50}
                        headerHeight={50}
                        rowsCount={filteredDataList.getSize()}
                        width={1100}
                        height={500}
                        {...this.props}>
                        <Column
                            header={<Cell>Date</Cell>}
                            cell={<DateCell data={filteredDataList} col="Date" />}
                            fixed={true}
                            width={200}
                            />
                        <Column
                            header={<Cell>Provider</Cell>}
                            cell={<TextCell data={filteredDataList} col="Provider" />}
                            fixed={true}
                            width={200}
                            />
                        <Column
                            header={<Cell>Patient</Cell>}
                            cell={<TextCell data={filteredDataList} col="Patient" />}
                            fixed={true}
                            width={200}
                            />
                        <Column
                            header={<Cell>Application</Cell>}
                            cell={<TextCell data={filteredDataList} col="Application" />}
                            fixed={true}
                            width={150}
                            />
                        <Column
                            header={<Cell>Location</Cell>}
                            cell={<TextCell data={filteredDataList} col="Location" />}
                            fixed={true}
                            width={150}
                            />
                        <Column
                            header={<Cell>Alerts</Cell>}
                            cell={<AlertCodeCell data={filteredDataList} col="Alerts" />}
                            fixed={true}
                            width={120}
                            />
                        <Column
                            header={<Cell>Accessed PHI/PII</Cell>}
                            cell={<AlertLevelCell data={filteredDataList} col="Accessed PHI/PII" />}
                            fixed={true}
                            width={80}
                            />
                    </Table>
                </div>
            </div>
        );
    }
}
