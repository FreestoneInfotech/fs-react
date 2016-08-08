import React, {Component} from 'react';
import BaseContainer from '../base_container';
import FSModal from '../../components/fs_modal';
import TabsComponent from '../../components/bootstrap_components/tabs_component';
import ModalComponent from '../../components/bootstrap_components/modal_component';
import TooltipComponent from '../../components/bootstrap_components/tooltip_component';
import PopoverComponent from '../../components/bootstrap_components/popover_component';
import PaginationComponent from '../../components/bootstrap_components/pagination_component';



export default class BootstrapComponentsContainer extends Component {
    handleSelect(eventKey) {
        console.log(`${eventKey} selected`);
    }
    render() {
        return(
           <BaseContainer routes={this.props.routes}>
            <TabsComponent />
            <ModalComponent />
            <TooltipComponent />
            <PopoverComponent />
            <PaginationComponent />
           </BaseContainer>
      )
   }
}
