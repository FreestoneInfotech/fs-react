import React, {Component} from 'react';
import { Pagination } from 'react-bootstrap';

export default class PaginationComponent extends Component {
  state = {
    activePage: 1
  }
  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  }
  render() {
    return (
      <div className='row'>
        <div className="col-md-12">
          <h2>Pagination</h2>
          <p>Provide pagination links for your site or app with the multi-page pagination component, or the simpler pager alternative</p>
          <div>
            <Pagination
              bsSize="large"
              items={10}
              activePage={this.state.activePage}
              onSelect={this.handleSelect.bind(this)} />
            <br />

            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              bsSize="medium"
              items={20}
              maxButtons={5}
              activePage={this.state.activePage}
              onSelect={this.handleSelect.bind(this)} />
            <br />

            <Pagination
              bsSize="small"
              items={10}
              activePage={this.state.activePage}
              onSelect={this.handleSelect.bind(this)} />

          </div>
        </div>
      </div>
      )
  }
}