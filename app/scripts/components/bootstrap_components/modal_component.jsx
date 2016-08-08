import React, {Component} from 'react';
import FSModal from '../../components/fs_modal';

export default class ModalComponent extends Component {
  openModal() {
    this.refs.FSModal.showModal();
  }
  save() {
    console.log('save modal event')
  }
  modalExiting() {
    console.log('Modal Exiting')
  }
  render() {
    return (
        <div className="row">
          <div className="col-md-12">
            <h2>Modal</h2>
            <button className="btn btn-primary" onClick={this.openModal.bind(this)} >Open Modal</button>
            <FSModal ref="FSModal"
              title="Modal"
              options={{
                      modalAttr: {
                          backdrop:"static",//Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked-- // true, false, static
                          onExiting: this.modalExiting.bind(this), //onEnter, onEntered, onEntering,onExit, onExited are supported
                          bsSize: "large", //small
                      }
                  }
              }
              onSave={this.save.bind(this)} >
                 <h4>Wrapped Text</h4>
                  <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                  <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                  <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                  <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                  <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                  <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
               </FSModal>
          </div>
        </div>
      );
  }
}