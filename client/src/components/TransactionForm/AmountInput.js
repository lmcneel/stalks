import React from 'react';
import {FormGroup, Label, Input} from 'reactstrap';


export const AmountInput = (props) => {
    return (
        <FormGroup>
        <Label for='Amount of Shares'>Amount of Shares</Label>
            <Input type='radio'/> SELL
        <Input type='Shares' name='Shares'/>
        </FormGroup>
    );
};
