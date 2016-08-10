/**
 * Created by gautam on 28/07/16.
 */
import React, {Component} from 'react';
import BaseContainer from '../base_container';
import FacebookDataTable from '../../components/facebook_data_table/facebook_data_table';
import { Tab, Tabs } from 'react-bootstrap';
import { observer } from 'mobx-react';
import Post from '../../data/models/post'
import store from '../../data/store'
@observer
export default class FacebookDataTableContainer extends Component {
    handleSelect(eventKey) {
        //event.preventDefault();
        console.log('${eventKey} selected');
    }

    render() {
        return (
            <BaseContainer routes={this.props.routes}>
                <Tabs defaultActiveKey={1} onSelect={this.handleSelect} id="audit-tab" className="tenet-tabs">
                    <Tab eventKey={1} title="Facebook Data Table">
                        <FacebookDataTable></FacebookDataTable>
                    </Tab>
                </Tabs>
            </BaseContainer>
        );
    }
}
