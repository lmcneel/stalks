//The contents of this file should go on client side main pages

import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Transaction extends Component {

    state = {
        ticker: "",
        price: 0,
        shares: 0,
        response: ""
    };


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
                    ticker: this.state.ticker,
                    price: this.state.price,
                    shares: this.state.shares
                })
                    .then(res => {
                        //Send transaction data to data base here
                        this.setState({
                        ticker: "",
                        price: 0,
                        shares: 0,
                        response: "Transaction successfully completed"
                    })})
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
                    ticker: this.state.ticker,
                    price: this.state.price,
                    shares: this.state.shares
                })
                    .then(res => {
                        //Send transaction data to data base here
                        this.setState({
                        ticker: "",
                        price: 0,
                        shares: 0,
                        response: "Transaction successfully completed"
                    })})
                    .catch(err => console.log(err));

            }
        }).catch(err => console.log(err));
    };
}

export default Transaction;