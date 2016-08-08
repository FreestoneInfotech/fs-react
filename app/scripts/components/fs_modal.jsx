/**
 * Created by Ketan on 29/07/16.
 */
import React, {Component} from 'react';
import { Button, Modal } from 'react-bootstrap';
import _ from 'lodash';

export default class FSModal extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        show: false,
        modalAttr: {},
        modalHeaderAttr: {
            closeButton: true
        },
        modalBodyAttr: {},
        modalFooterAttr: {},
        header: true,
        footer: true,
        saveText: 'Save Changes',
        closeText: 'Close'
    }
    showModal() {
        this.setState({show: true});
    }
    hideModal() {
        this.setState({show: false});
    }
    render() {
        _.extend(this.state, this.props.options);

        var modalHeader, modalFooter;
        if(this.state.header) {
            modalHeader = (
                <Modal.Header {...this.state.modalHeaderAttr} >
                    <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
                </Modal.Header>
            )
        }

        if(this.state.footer) {
            var saveBtn;
            if(this.props.onSave) {
                saveBtn = (<Button bsStyle="primary" onClick={this.props.onSave}>{this.state.saveText}</Button>)
            }

            modalFooter = (
                <Modal.Footer {...this.state.modalFooterAttr}>
                    <Button onClick={this.hideModal.bind(this)}>{this.state.closeText}</Button>
                    {saveBtn}
                </Modal.Footer>
            )
        }

        return (
            <Modal
                show={this.state.show}
                onHide={this.hideModal.bind(this)}
                {...this.state.modalAttr}
            >
                {modalHeader}
                <Modal.Body {...this.state.modalBodyAttr} >{this.props.children}</Modal.Body>
                {modalFooter}
            </Modal>
        )
    }
}