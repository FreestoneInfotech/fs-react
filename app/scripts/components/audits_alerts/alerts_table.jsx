import React, {Component} from 'react';
import {DataListWrapper,FakeDataStore} from '../../data/FakeDataStore'
import FixedDataTable from 'fixed-data-table';
import Papa from 'papaparse';
import _ from 'lodash';
import { Label } from 'react-bootstrap';
import {alert_data} from '../../data/demo/demoData';
import {TextCell, AlertCodeCell, AlertLevelCell, ButtonCell} from '../FixedDataTable/FDTCells';
import StructuredFilter from '../../lib/react-structured-filter/main';
import {system_enums} from '../../data/demo/demoData';

const {Table, Column, Cell} = FixedDataTable;

export default class AlertsTable extends React.Component {
    constructor(props) {
        super(props);
        var results = Papa.parse(alert_data, {
            header: true,
            skipEmptyLines: true,
        });
        //results.data.shift();
        //results.data.pop();
        console.log(results);
        this._dataList = new FakeDataStore(results);

        this.state = {
            filteredDataList: this._dataList,
            filter: ""

        };

        //this._onFilterChange = this._onFilterChange.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.filteredIndexes = new Set(); // using set so it has unique values

    }

    /*
    _onFilterChange(e) {
        if (!e.target.value) {
            this.setState({
                filteredDataList: this._dataList,
            });
        }

        var filterBy = e.target.value.toLowerCase();
        var allData = this._dataList.getAll();
        allData.forEach((d,i) => {
            Object.values(d).forEach( (e) => {
                if (e.toLowerCase().includes(filterBy)){
                    console.log(`pushing one match. $i`)
                    this.filteredIndexes.add(i);
                }
            });

        });
        console.log('filtered size :', this.filteredIndexes.size);

        this.setState({
            filteredDataList: new DataListWrapper([...this.filteredIndexes], allData),
        });
    }
    */

    updateFilter(flt){
        this.filteredIndexes.clear();
        if(!flt.length){
            this.setState({
                filteredDataList: this._dataList,
            });
            this._dataList.getAll().forEach((d,i) => {
                this.filteredIndexes.add(i);
            });
            return;
        }

        var allData = this._dataList.getAll();
        var that = this;

        var currentFilterIndexes = [];
        flt.forEach( (filter, i) => {
            var currentFilterSet = new Set();
            var filterVal = filter.value.toLowerCase();
            allData.forEach((d,i) => {
                if(d[filter.category] !== undefined && d[filter.category].toLowerCase().includes(filterVal)){
                        currentFilterSet.add(i);
                }
            });
            currentFilterIndexes.push([...currentFilterSet]); // Convert set to array and push for intersection later
            // Take intersection of the old one with the current one
        });
        var intersection = _.intersection.apply(_,currentFilterIndexes);
        that.filteredIndexes = new Set([...intersection]);



        console.log('filtered size :', this.filteredIndexes.size);

        this.setState({
            filteredDataList: new DataListWrapper([...this.filteredIndexes], allData),
        });
    }

    render() {
        var {filteredDataList} = this.state;
        return (
            <div>
                <div className="row row-margin-bottom">
                    <div className="col-md-12">
                        <StructuredFilter
                             placeholder="Search.."
                             options={[
                               {category:"Date", type:"date"},
                               {category:"Alert", type:"text"},
                               {category:"Alert Code", type:"textoptions", options:function(){ return system_enums.alert_code;}},
                               {category:"Alert Level", type:"textoptions", options:function(){ return system_enums.alert_levels;}},
                               {category:"Provider", type:"text"},
                               {category:"Patient", type:"text"},
                               {category:"Application", type:"textoptions", options:function(){ return system_enums.applications;}}
                               ]}
                             customClasses={{
                               input: "filter-tokenizer-text-input",
                               results: "filter-tokenizer-list__container",
                               listItem: "filter-tokenizer-list__item"
                             }}
                             onChange={this.updateFilter}
                             onTokenRemove={this.updateFilter}
                           />
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
                            cell={<TextCell data={filteredDataList} col="Date" />}
                            fixed={true}
                            width={200}
                            />
                        <Column
                            header={<Cell>Alert</Cell>}
                            cell={<TextCell data={filteredDataList} col="Alert" />}
                            fixed={true}
                            width={200}
                            />
                        <Column
                            header={<Cell>Alert Code</Cell>}
                            cell={<AlertCodeCell data={filteredDataList} col="Alert Code" />}
                            fixed={true}
                            width={100}
                            />
                        <Column
                            header={<Cell>Alert Level</Cell>}
                            cell={<AlertLevelCell data={filteredDataList} col="Alert Level" />}
                            fixed={true}
                            width={100}
                            />
                        <Column
                            header={<Cell>Provider</Cell>}
                            cell={<TextCell data={filteredDataList} col="Provider" />}
                            fixed={true}
                            width={100}
                            />
                        <Column
                            header={<Cell>Patient</Cell>}
                            cell={<TextCell data={filteredDataList} col="Patient" />}
                            fixed={true}
                            width={100}
                            />
                        <Column
                            header={<Cell>Application</Cell>}
                            cell={<TextCell data={filteredDataList} col="Application" />}
                            fixed={true}
                            width={200}
                            />
                        <Column
                            header={<Cell>Actions</Cell>}
                            cell={<ButtonCell data={filteredDataList} col="Actions" />}
                            fixed={true}
                            width={100}
                            />
                    </Table>
                </div>
            </div>
        );
    }
}
