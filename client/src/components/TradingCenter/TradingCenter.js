//The contents of this file should go on client side main pages

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import API from '../../utils/API';

class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            price: 0,
            shares: 0,
            response: '',
            user_id: 'XXXX',
            transaction: 'buy',
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
                    user_id: this.state.user_id,
                    type: 'buy',
                    ticker: this.state.ticker,
                    sharePrice: this.state.price,
                    shares: this.state.shares
                })
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
                    user_id: this.state.user_id,
                    type: 'sell',
                    ticker: this.state.ticker,
                    sharePrice: this.state.price,
                    shares: this.state.shares
                })
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
            <form className='buySell'>
                <legend>I WANT TO:</legend>
                <FormGroup check>
                    <Label check>
                        <Input
                            type='radio'
                            name='transaction'
                            value='buy'
                            checked={this.state.transaction === 'buy'}
                            onChange={this.handleInputChange}
                        />{' '}
                        BUY
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input
                            type="radio"
                            name='transaction'
                            value='sell'
                            checked={this.state.transaction === 'sell'}
                            onChange={this.handleInputChange}
                        />{' '}
                        SELL
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label for="numberOfShares">Number of Shares</Label>
                    <Input
                        type="text"
                        name="shares"
                        value={this.state.shares}
                        onChange={this.handleInputChange} />
                </FormGroup>
                <Button>Submit Order</Button>
            </form>
        )
    }
}

export default Transaction;