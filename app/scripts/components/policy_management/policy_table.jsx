import React, {Component} from 'react';
import {DataListWrapper, FakeDataStore} from '../../data/fake_data_store'
import FixedDataTable from 'fixed-data-table';
import Papa from 'papaparse';
import { Label } from 'react-bootstrap';
import {policy_data, system_enums} from '../../data/demo/demo_data';
import {TextCell, AlertLevelCell, CheckboxCell, ButtonCell} from '../fixed_data_table/fdt_cells';
import FSModal from '../fs_modal';
import linkState from 'react-link-state';
import Select2 from 'react-select2-wrapper';

const {Table, Column, Cell} = FixedDataTable;

class PolicyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      policyName: '',
      condition: '',
      alertLevel: '',
      alertDesc: '',
      tags: new Set()
    };
  }
  get data() {
    let data = this.state;
    data.tags = data.tags instanceof Set ? data.tags.toJSON() : data.tags;
    return data;
  }
  cbSelect(e) {
    let tags = this.state.tags;
    tags.add(e.currentTarget.value);
    this.setState({tags: tags})
  }
  cbUnselect(e) {
    let tags = this.state.tags;
    tags.delete(e.currentTarget.value)
    this.setState({tags: tags})
  }

  render() {
    return (
      <div className="form-horizontal">
            <div className="form-group">
                <label className="col-sm-4 control-label">Policy Name</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" valueLink={linkState(this, 'policyName')} />
                </div>
            </div>
            <div className="form-group">
                <label className="col-sm-4 control-label">Condition</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" valueLink={linkState(this, 'condition')} />
                </div>
            </div>
            <div className="form-group">
                <label className="col-sm-4 control-label">Tag</label>
                <div className="col-sm-8">
                    <Select2 ref="tags"
                        className="form-control select-tags"
                        multiple
                        data={system_enums.tags}
                        options={
                            {
                                placeholder: 'Tags',
                                tags: true
                            }
                        }
                        onSelect={this.cbSelect.bind(this)}
                        onUnselect={this.cbUnselect.bind(this)}
                    />
                </div>
            </div>
            <div className="form-group">
                <label className="col-sm-4 control-label">Alert Level</label>
                <div className="col-sm-8">
                    <select className="form-control" valueLink={linkState(this, 'alertLevel')} >
                        {
                            system_enums.alert_levels.map((type, index) => {
                                return <option value={index}>{type}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label className="col-sm-4 control-label">Alert Description</label>
                <div className="col-sm-8">
                    <textarea className="form-control" valueLink={linkState(this, 'alertDesc')}></textarea>
                </div>
            </div>
        </div>
    );
  }
}


export default class PatientsTable extends Component {
    constructor(props) {
        super(props);
        var results = Papa.parse(policy_data, {
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

    addPolicy() {
        this.refs.FSModal.showModal();
    }
    onAddPolicy(){
        console.log(this.refs)
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
                    <div className="col-md-6">
                        <button className="btn btn-primary pull-right" onClick={this.addPolicy.bind(this)}>
                            <i className="fa fa-plus-circle"></i>  Add Policy
                        </button>
                        <FSModal
                            ref="FSModal"
                            title="Add New Policy"
                            backdrop="static"
                            onSave={this.onAddPolicy.bind(this)}
                        >
                            <PolicyForm ref="PolicyForm"></PolicyForm>
                        </FSModal>
                    </div>
                    <br />
                </div>
                <div>
                    <Table
                        rowHeight={50}
                        headerHeight={50}
                        rowsCount={filteredDataList.getSize()}
                        width={1000}
                        height={500}
                        {...this.props}>
                        <Column
                            header={<Cell>Tags</Cell>}
                            cell={<AlertLevelCell data={filteredDataList} col="Tags" />}
                            fixed={true}
                            width={100}
                            />
                        <Column
                            header={<Cell>Condition</Cell>}
                            cell={<TextCell data={filteredDataList} col="Condition" />}
                            fixed={true}
                            width={600}
                            />
                        <Column
                            header={<Cell>Notify</Cell>}
                            cell={<CheckboxCell data={filteredDataList} col="Notify" />}
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
