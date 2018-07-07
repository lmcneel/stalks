//The contents of this file should go on client side main pages

import React, { Component } from 'react';
<<<<<<< HEAD
// import { Input, TextArea, FormBtn } from '../../components/Form';
=======
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
>>>>>>> a21340ea1f848b58ce27e0f2d18a979afb39de1e
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
            <form className='buySell'>
                <legend>I WANT TO:</legend>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        BUY
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        SELL
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label for="numberOfShares">Number of Shares</Label>
                    <Input type="text" name="shares" id="numberOfShares" />
                </FormGroup>
                <Button>Submit Order</Button>
            </form>
        )
    }
}

export default Transaction;