/**
 * Created by gautam on 28/07/16.
 */
import React, {Component} from 'react';
import BaseContainer from '../base_container';
import AlertsTable from '../../components/audits_and_alerts/alerts_table';
import AuditTable from '../../components/audits_and_alerts/audit_table';
import { Tab, Tabs } from 'react-bootstrap';


export default class AuditsContainer extends Component {
    handleSelect(eventKey) {
        //event.preventDefault();
        console.log('${eventKey} selected');
    }

    render() {
        return (
            <BaseContainer routes={this.props.routes}>
                <Tabs defaultActiveKey={1} onSelect={this.handleSelect} id="audit-tab" className="tenet-tabs">
                    <Tab eventKey={1} title="Alerts">
                        <AlertsTable></AlertsTable>
                    </Tab>
                    <Tab eventKey={2} title="Audits">
                        <AuditTable></AuditTable>
                    </Tab>
                </Tabs>
            </BaseContainer>
        );
    }
}
