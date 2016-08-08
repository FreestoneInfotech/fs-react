import React, {Component} from 'react';
import { Tooltip, ButtonToolbar, OverlayTrigger, Button } from 'react-bootstrap';

export default class TooltipComponent extends Component {
  render() {
    const tooltip = (
      <Tooltip id="tooltip"><strong>Holy guacamole!</strong> Check this info.</Tooltip>
    );
    return (
      <div className='row'>
        <div className="col-md-12">
          <h2>Tooltips</h2>
          <h4>With OverlayTrigger</h4>
          <p>Attach and position tooltips with OverlayTrigger.</p>
          <div>
            <ButtonToolbar>
              <OverlayTrigger placement="left" overlay={tooltip}>
                <Button bsStyle="default">Holy guacamole!</Button>
              </OverlayTrigger>

              <OverlayTrigger placement="top" overlay={tooltip}>
                <Button bsStyle="default">Holy guacamole!</Button>
              </OverlayTrigger>

              <OverlayTrigger placement="bottom" overlay={tooltip}>
                <Button bsStyle="default">Holy guacamole!</Button>
              </OverlayTrigger>

              <OverlayTrigger placement="right" overlay={tooltip}>
                <Button bsStyle="default">Holy guacamole!</Button>
              </OverlayTrigger>
            </ButtonToolbar>
          </div>
        </div>
      </div>
      )
  }
}