import React, {Component} from 'react';
import {DataListWrapper,FakeDataStore} from '../../data/fake_data_store'
import FixedDataTable from 'fixed-data-table';
import Papa from 'papaparse';
import _ from 'lodash';
import { Label } from 'react-bootstrap';
import {fb_table_data, system_enums} from '../../data/demo/demo_data';
import StructuredFilter from '../../lib/react-structured-filter/main';
import { observer } from 'mobx-react';
import store from '../../data/store';


const {Table, Column, Cell} = FixedDataTable;


const TextCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        {(data)? data.get(rowIndex,col) : "NODATA"}
    </Cell>
);


@observer
export default class FacebookDataTable extends React.Component {
    constructor(props) {
        super(props);
        var results = Papa.parse(fb_table_data, {
            header: true,
            skipEmptyLines: true,
        });
        console.log(results);
        this.observablePosts = null;
        store.findAll('post').then((posts) => {
          console.log("posts: ", posts);
          this.observablePosts = posts;
          for (let post of posts){
              console.log("post", post.title);
              //user.say();
          }
        });

        this.filteredIndexes = new Set(); // using set so it has unique values

    }

    render() {
        //var {filteredDataList} = this.state;
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
                        rowsCount={5}
                        width={800}
                        height={500}
                        {...this.props}>
                        <Column
                            header={<Cell>Application</Cell>}
                            cell={<TextCell data={this.observablePosts} col="title" />}
                            fixed={true}
                            width={200}
                            />
                    </Table>
                </div>
            </div>
        );
    }
}
