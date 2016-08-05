import React, {Component} from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class FSModal extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        show: false
    }
    showModal() {
        this.setState({show: true});
    }
    hideModal() {
        this.setState({show: false});
    }
    onSave(){
        console.log('save clicked')
        this.props.onSave();
    }
    render() {
        return (
            <Modal
                show={this.state.show}
                onHide={this.hideModal.bind(this)}
                {...this.props}
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.children}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.hideModal.bind(this)}>Close</Button>
                    <Button bsStyle="primary" onClick={this.onSave.bind(this)}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}