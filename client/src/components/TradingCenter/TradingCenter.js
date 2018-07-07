//The contents of this file should go on client side main pages

import React, {Component} from 'react';
import {Button, FormGroup, Label, Input,} from 'reactstrap';
import API from '../../utils/API';

class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            price: 0,
            shares: 0,
            response: '',
            user_id: 'XXXX'
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    buyShares = event => {
        event.preventDefault();
        const today = new Date();

        API.findQuotes(
            { ticker: this.state.ticker }
        ).then(res => {
            this.setState({ price: res.body.quote.latestPrice });
            if (this.state.ticker && this.state.price && this.state.shares) {
                API.buyShares({
                    transaction_id: Date.now(),
                    date: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
                    type: 'buy',
                    ticker: this.state.ticker,
                    sharePrice: this.state.price,
                    shares: this.state.shares
                }, this.state.user_id)
                    .then(res => {
                        this.setState({
                            ticker: '',
                            price: 0,
                            shares: 0,
                            response: 'Transaction successfully completed'
                        })
                    })
                    .catch(err => console.log(err));

            }
        }).catch(err => console.log(err));
    };

    sellShares = event => {
        event.preventDefault();
        const today = new Date();
        API.findQuotes(
            { ticker: this.state.ticker }
        ).then(res => {
            this.setState({ price: res.body.quote.latestPrice });
            if (this.state.ticker && this.state.price && this.state.shares) {
                API.sellShares({
                    transaction_id: Date.now(),
                    date: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
                    type: 'sell',
                    ticker: this.state.ticker,
                    sharePrice: this.state.price,
                    shares: this.state.shares
                }, this.state.user_id)
                    .then(res => {
                        this.setState({
                            ticker: '',
                            price: 0,
                            shares: 0,
                            response: 'Transaction successfully completed'
                        })
                    })
                    .catch(err => console.log(err));

            }
        }).catch(err => console.log(err));
    };

    render() {
        return (
            <div className="transactionForm container">
                <form className='buySell'>
                    <legend>
                        <h1>Transaction Form</h1>
                    </legend>
                    <div class='form-row'>
                        <div class="col-sm-6 tradeInputs">
                            <FormGroup>
                                <Label><h2>Select One Option</h2>
                                    <div class="form-check form-check-inline">
                                        <Input class="form-check-input" type="radio" name="buy" id="inlineRadio1" />{' '}
                                        <Label class="form-check-label" for="inlineRadio1"><h3>BUY</h3></Label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <Input class="form-check-input" type="radio" name="sell" id="inlineRadio2" />{' '}
                                        <Label class="form-check-label" for="inlineRadio1"><h3>SELL</h3></Label>
                                    </div>
                                </Label>
                            </FormGroup>
                        </div>
                        <div class="col-sm-6">
                            <FormGroup>
                                <Label for="numberOfShares"> <h2>Number of Shares</h2></Label>
                                <Input type="text" name="shares" id="numberOfShares" />
                            </FormGroup>
                        </div>
                    </div>
                    <div class='form-row'>
                        <div class="col-sm-6 totalCalcLabel">
                            <h4>SUBTOTAL:</h4>
                        </div>
                        <div class="col-sm-6 totalCalc">
                            <h4>$-2,500.00</h4>
                            {/* Placeholder */}
                        </div>
                    </div>
                    <div class='form-row totalCalc'>
                        <div class="col-sm-6 totalCalcLabel">
                            <h4>New Bank Vale:</h4>
                        </div>
                        <div class="col-sm-6 totalCalc">
                            <h4>$10,000.00</h4>
                            {/* Placeholder */}
                        </div>
                    </div>
                    <Button className='submitBtn'>SUBMIT ORDER</Button>
                </form>
            </div>
        )
    }
}

export default Transaction;