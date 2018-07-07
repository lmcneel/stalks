//The contents of this file should go on client side main pages

import React, { Component } from 'react';
// import { Input, TextArea, FormBtn } from '../../components/Form';
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
        API.findQuotes(
            { ticker: this.state.ticker }
        ).then(res => {
            this.setState({ price: res.body.quote.latestPrice });
            if (this.state.ticker && this.state.price && this.state.shares) {
                API.buyShares({
                    transaction_id: Date.now(),
                    date: Date.now(),
                    type: "buy",
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
        API.findQuotes(
            { ticker: this.state.ticker }
        ).then(res => {
            this.setState({ price: res.body.quote.latestPrice });
            if (this.state.ticker && this.state.price && this.state.shares) {
                API.sellShares({
                    // Need to update transaction_id and date fields
                    transaction_id: Date.now(),
                    date: Date.now(),
                    type: "sell",
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
            <div>

            </div>
        )
    }
}

export default Transaction;