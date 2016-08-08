import React, {Component} from 'react';
import { Tab, Tabs, Badge } from 'react-bootstrap';

export default class TabsComponent extends Component {
  render() {
    const badgeInstance = (
      <p>Badges <Badge>42</Badge></p>
    );
    return (
        <div className='row'>
          <div className="col-md-12">
            <h2>Tabs</h2>
            <Tabs defaultActiveKey={1} onSelect={this.handleSelect} id="tabs">
                  <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
                  <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
                  <Tab eventKey={3} title="Tab 3 (disabled)" disabled>Tab 3 content</Tab>
            </Tabs>
          </div>
        </div>
      )
  }
}