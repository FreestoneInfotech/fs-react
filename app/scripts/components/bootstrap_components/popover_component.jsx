import React, {Component} from 'react';
import { Popover, ButtonToolbar, OverlayTrigger, Button } from 'react-bootstrap';

export default class PopoverComponent extends Component {
  render() {
    const popoverLeft = (
      <Popover id="popover-positioned-left" title="Popover left">
        <strong>Holy guacamole!</strong> Check this info.
      </Popover>
    );

    const popoverTop = (
      <Popover id="popover-positioned-top" title="Popover top">
        <strong>Holy guacamole!</strong> Check this info.
      </Popover>
    );

    const popoverBottom = (
      <Popover id="popover-positioned-bottom" title="Popover bottom">
        <strong>Holy guacamole!</strong> Check this info.
      </Popover>
    );

    const popoverRight = (
      <Popover id="popover-positioned-right" title="Popover right">
        <strong>Holy guacamole!</strong> Check this info.
      </Popover>
    );
    return (
      <div className='row'>
        <div className="col-md-12">
          <h2>Popovers</h2>
          <h4>With OverlayTrigger</h4>
          <p>The Popover component, like the Tooltip can be used with an OverlayTrigger Component, and positioned around it.</p>
          <div>
            <ButtonToolbar>
              <OverlayTrigger trigger="click" placement="left" overlay={popoverLeft}>
                <Button bsStyle='primary'>Holy guacamole!</Button>
              </OverlayTrigger>
              <OverlayTrigger trigger="click" placement="top" overlay={popoverTop}>
                <Button>Holy guacamole!</Button>
              </OverlayTrigger>
              <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
                <Button>Holy guacamole!</Button>
              </OverlayTrigger>
              <OverlayTrigger trigger="click" placement="right" overlay={popoverRight}>
                <Button>Holy guacamole!</Button>
              </OverlayTrigger>
            </ButtonToolbar>
          </div>
        </div>
      </div>
      )
  }
}