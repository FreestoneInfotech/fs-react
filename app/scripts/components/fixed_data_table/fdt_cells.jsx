/**
 * Created by gautam on 29/07/16.
 */

import React, {Component} from 'react';
import FixedDataTable from 'fixed-data-table';
import { Label, Checkbox, Glyphicon, Button} from 'react-bootstrap';

const {Cell} = FixedDataTable;

const DateCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        {data.get(rowIndex,col).toLocaleString()}
    </Cell>
);

const TextCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        {(data)? data.get(rowIndex,col) : "NODATA"}
    </Cell>
);

const AlertCodeCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        <Label bsStyle="primary">
            {data.get(rowIndex,col)}
        </Label>
    </Cell>
);

const AlertLevelCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        <Label bsStyle={(() => {
                switch (data.get(rowIndex,col).toLowerCase()) {
                    case "high":   return "danger";
                    case "medium": return "warning";
                    case "low":  return "primary";
                    case "yes":  return "danger";
                    case "no":  return "success";
                    case "phi":   return "info";
                    default:      return "primary";
                }
            })()}
               >
            {data.get(rowIndex,col)}
        </Label>
    </Cell>
);

const CheckboxCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        { (() => {
            if(data.get(rowIndex,col).toLowerCase() == 'yes') {
                return <Checkbox checked onChange={()=>{}}/>
            } else {
                return <Checkbox />
            }
        })()}
    </Cell>
);

const ButtonCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props} >
        <div className="btn-actions">
            {data.getData(rowIndex,col).split('==').map((btn, index) => {
                switch (btn) {
                    case 'edit':
                        return <a key={index} href="javascript: void(0)" className="text-success">
                            <i className="fa fa-pencil"></i>
                        </a>
                    case 'alert':
                        return <a key={index} href="javascript: void(0)" className="text-warning">
                            <i className="fa fa-bell-o"></i>
                        </a>
                    case 'delete':
                        return <a key={index} href="javascript: void(0)" className="text-danger">
                            <i className="fa fa-trash"></i>
                        </a>
                }
            })}
        </div>
    </Cell>
);

const IconCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props} >
        <i className={(() => {
                switch (data.getData(rowIndex,col).toLowerCase()) {
                    case "yes":  return "fa fa-check";
                    case "no":  return "fa fa-times";
                }
            })()}></i>
    </Cell>
);

export{
    DateCell,
    TextCell,
    AlertCodeCell,
    AlertLevelCell,
    CheckboxCell,
    ButtonCell,
    IconCell
}
