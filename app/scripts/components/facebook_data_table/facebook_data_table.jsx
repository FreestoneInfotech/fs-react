import React, {Component} from 'react';
import {DataListWrapper,FakeDataStore} from '../../data/fake_data_store'
import FixedDataTable from 'fixed-data-table';
import Papa from 'papaparse';
import _ from 'lodash';
import { Label } from 'react-bootstrap';
import {fb_table_data, system_enums} from '../../data/demo/demo_data';
import {TextCell, AlertCodeCell, AlertLevelCell, ButtonCell} from '../fixed_data_table/fdt_cells';
import StructuredFilter from '../../lib/react-structured-filter/main';
import { observer } from 'mobx-react';

const {Table, Column, Cell} = FixedDataTable;

@observer
export default class FacebookDataTable extends React.Component {
    constructor(props) {
        super(props);
        var results = Papa.parse(fb_table_data, {
            header: true,
            skipEmptyLines: true,
        });
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
                               {category:"Product", type:"text"},
                               {category:"Hacker Code", type:"text"},
                               {category:"Department", type: 'text'/*type:"textoptions", options:function(){ return system_enums.department;}*/},
                               {category:"Blogger", type:"text"},
                               {category:"Admin", type:"text"},
                               {category:"Application", type:"text"}
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
                            header={<Cell>Product</Cell>}
                            cell={<TextCell data={filteredDataList} col="Product" />}
                            fixed={true}
                            width={200}
                            />
                        <Column
                            header={<Cell>Hacker Code</Cell>}
                            cell={<TextCell data={filteredDataList} col="Hacker Code" />}
                            fixed={true}
                            width={100}
                            />
                        <Column
                            header={<Cell>Department</Cell>}
                            cell={<TextCell data={filteredDataList} col="Department" />}
                            fixed={true}
                            width={100}
                            />
                        <Column
                            header={<Cell>Blogger</Cell>}
                            cell={<TextCell data={filteredDataList} col="Blogger" />}
                            fixed={true}
                            width={100}
                            />
                        <Column
                            header={<Cell>Admin</Cell>}
                            cell={<TextCell data={filteredDataList} col="Admin" />}
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
