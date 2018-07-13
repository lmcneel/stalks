//The contents of this file should go on client side main pages
import React, { Component } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Highcharts from 'highcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';
import Promise from 'bluebird';
import _ from 'underscore'


let watched = false; // This watchlist flag
let eyeWatched = 'faEye'; // class variable for watchlist condition

const checkWatchList = () => {
    // If in watchlist set [watched] to true
    return watched = false;
};

const addToWatchlist = () => {
    // Need to add to MySQL Watchlist, then check watch list
    checkWatchList();
};

class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticker: 'XOM',
            price: 0,
            shares: 0,
            change: 0,
            response: '',
            portfolio_id: '5b40fb129adc85a410f488bd',
            transaction: 'buy',
            ROI: 0,
            id:'5b44cd4e020eda5258fcf2c1',
            cost: 0,
            datePurchased: '',
            value: 0,
            totalShares: 0,
            cashBalance: 0,
            watchedArray:["AAPL", "XPP"],
            modal: false,
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    };
    componentDidMount() {
        // this.charting({ ticker: this.state.ticker });
        // this.myStocks(this.state.portfolio_id);
        // this.dbStocks(this.state.portfolio_id);
        // this.myStocksValue();
        // this.bankValue(this.state.id);
        // this.myWatchlist(this.state.watchedArray);
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    transactionExec = () => {
        if (this.state.transaction === 'buy') {
            this.buyShares();
        } else {
            this.sellShares();
        };
    };

    myStocks = (portfolio) => {
        console.log('2')
        
        return API.getMyStocks(portfolio)
            .then(res => {
                console.log('4')
                console.log(res.data);
                
                
                let userStocks = {};
                for (var i = 0; i < res.data.length; i++) {
                    if (!userStocks[res.data[i].ticker]) {
                        userStocks[res.data[i].ticker] = res.data[i].shares;
                    } else {
                        userStocks[res.data[i].ticker] += res.data[i].shares;
                    }
                }
                console.log(userStocks);
                
                return userStocks
            })
            .catch(err => console.log(err));
    };

    dbStocks = (portfolio) => {
        let self = this;

        console.log('2')
        let allUserStocks;
        let lastPrice = [];
        let userStocks = {};
        return API.getMyStocks(portfolio)
            .then(res => {
                console.log('4')
                console.log(res.data);
                allUserStocks=res.data;
                console.log(allUserStocks);
                for (var i = 0; i < res.data.length; i++) {
                    if (!userStocks[res.data[i].ticker]) {
                        userStocks[res.data[i].ticker] = res.data[i].shares;
                    } else {
                        userStocks[res.data[i].ticker] += res.data[i].shares;
                    }
                }
                console.log(userStocks);

                let current = Promise.resolve();

                Object.keys(userStocks).forEach(key => {
                    current = current.then(()=>{
                        console.log(key);
                        return API.userQuotes({
                                ticker: key
                            })
                            .then(res => {
                                console.log(res.data);
                                lastPrice.push(res.data[0]);
                                console.log(lastPrice);
                                self.ROI(userStocks, lastPrice, allUserStocks);
                                
                            })
                    })
                    // .then(result=>{
                })

                return current
           });
                            
    };

    myStocksValue = () => {
        let self = this;
                
        this.myStocks(this.state.portfolio_id)
            .then(result => {
                console.log(result);
                let stocks = result;
                let lastPrice = [];

                console.log('5')
                console.log(stocks);

                let current = Promise.resolve();

                Object.keys(stocks).forEach(function (key) {
                    current = current.then(()=>{
                        console.log(key);
                        return API.userQuotes({
                                ticker: key
                            })
                            .then(res => {
                                console.log(res.data);
                                lastPrice.push(res.data[0]);
                                console.log(lastPrice);
                                self.portfolioValue(stocks, lastPrice);
                                
                            })
                    })
                    // .then(result=>{
                })

                return current
            })

        

        };


    // This function will calculate the Portfolio Value & Portfolio Value ROI
    // The inputs to this function  are The list of Shares the user has and the latest Rpice of those shares    
    portfolioValue = (stocks, lastPrice) => {
            console.log(stocks);
            // Since the Game starts the user with a set starting value it's used as a variable
            let initCash = 20000.00; 
            let PV=0;
            let pvROI =0;
            // console.log(lastprice);
            console.log(lastPrice[0]);
            Object.keys(stocks).forEach( key => {            
                for (var j = 0, len2 = lastPrice.length; j < len2; j++) {
                    if (key == lastPrice[j].symbol) {
                        console.log(stocks[key]);
                        PV += (stocks[key]*lastPrice[j].price);
                    }
                }  
            })
            // Portfolio Value is Equal to
            console.log(PV);
            let userPortfolioValue = PV.toFixed(2)
            console.log(userPortfolioValue);
            console.log(initCash);
            let a = userPortfolioValue - initCash;
            // Portfolio ROI is Callculated Below
            pvROI = ((a/initCash)-1).toFixed(2);
            console.log(pvROI);
            return {
                userPortfolioValue,
                pvROI
            };
    };

    ROI = (allUserStocks, lastPrice, userStocks) => {
        console.log(allUserStocks);
        console.log(lastPrice);
        let eachROI = [];
             
        for(var i=0; i < userStocks.length; i++) {
            if(userStocks[i].type == "Sell")
            {
               userStocks.splice(i,1);
            }
         }
         console.log(userStocks);
         let boughtStocks = _.uniq(userStocks, function(p){ return p.ticker; });
         console.log(boughtStocks);
         
        
        Object.keys(allUserStocks).forEach( key => {
            for (var j = 0, len1 = lastPrice.length; j < len1; j++) {
                for (var i = 0, len2 = boughtStocks.length; i < len2; i++) {
                    let obj = {
                        ticker: "",
                        roi:""
                    };
                    
                        if (key == lastPrice[j].symbol && key == boughtStocks[i].ticker) {
                            obj.ticker = key;
                            let a = (lastPrice[j].price * allUserStocks[key]);
                            let b = (allUserStocks[key] * boughtStocks[i].sharePrice);
                            let c = ((a - b)/b) - 1;
                            obj.roi = (c).toFixed(2);
                            eachROI.push(obj);
                                                               
                        
                        }
                        
                } 
            }
        });

        console.log(eachROI);
        
        return eachROI;

};

// This function will give the Current user Cash
// The input needs to be the User Portfolio ID.
    bankValue = (portfolio) =>{
        let bank = 0;
        return API.getMyPortfolio(portfolio)
            .then(res => {
               console.log(res.data);
               let data = res.data;
               console.log(data);
               bank = (data[0].cash).toFixed(2);
               console.log(bank);
               return bank;
            })
            .catch(err => console.log(err));
    };

//This Fucntion gives the latest price for the Watch List that in retrieved from MySQL and fed to this function
    myWatchlist = (watchedArray) => {
        console.log(watchedArray);
        let self = this;
        let watchPrice =[];
        
                
        let current = Promise.resolve();
            
                for (let i =0; i< watchedArray.length; i++){
                    current = current.then(()=>{
                        console.log(watchedArray[i]);
                        return API.userQuotes({
                                ticker: watchedArray[i]
                            })
                            .then(res => {
                                console.log(res.data);
                                let watch = {
                                    ticker:"",
                                    price:""
                                };
                                let data = res.data;
                                 watch.ticker = data[0].symbol;
                                watch.price = data[0].price;
                                watchPrice.push(watch);
                                console.log(watchPrice);
                            })
                    })
                }            
                return current
        };

    charting = (ticker) => {
        API.findQuotes(ticker)
            .then(res => {
                console.log(res.data);
                this.setState({
                    price: res.data.quote.latestPrice,
                    change: res.data.quote.changePercent,
                });
                const chartData = res.data.chart.map(day => {
                    let dayArray = [];
                    dayArray.push(day.date);
                    dayArray.push(day.close);
                    return dayArray;
                });

                const chartCategories = res.data.chart.map(day => {
                    let dateArray = [];
                    dateArray.push(day.date);
                    return dateArray;
                });

                Highcharts.chart('stockChart', {
                    chart: {
                        spacingBottom: 20,
                        // plotBackgroundColor: '#DDDFE1',
                        // backgroundColor: '#DDDFE1',
                        height: null
                    },
                    title: {
                        // text: `${this.state.ticker} Stock Price`
                        text: null
                    },

                    xAxis: {
                        title: { text: 'Past 30 Days' },
                        // categories: chartCategories,
                        categories: null,
                        text: null,
                        lineColor: '#404850',
                        lineWidth: 2
                    },
                    yAxis: {
                        title: null,
                        lineColor: '#404850',
                        lineWidth: 2
                    },
                    legend: {
                        enabled: false
                    },

                    series: [{
                        type: 'line',
                        color: '#0C425C',
                        name: this.state.ticker,
                        data: chartData,
                        marker: { enabled: true },
                        tooltip: { valueDecimals: 2 },
                    }]
                });
            })
            .catch(err => console.log(err));
    }


    buyShares = () => {
        // event.preventDefault();
        API.findQuotes(
            { ticker: this.state.ticker }
        ).then(res => {
            console.log(res.data);
            this.setState({ price: res.data.quote.latestPrice });
            if (this.state.ticker && this.state.price && this.state.shares) {
                API.buyShares({
                    portfolio_id: this.state.portfolio_id,
                    type: 'buy',
                    ticker: this.state.ticker,
                    sharePrice: this.state.price,
                    shares: this.state.shares
                })
                    .then(res => {
                        this.setState({
                            ticker: 'XOM',
                            price: 0,
                            shares: 0,
                            response: 'Transaction successfully completed'
                        });
                        console.log(this.state.response);
                        this.toggle();
                    })
                    .catch(err => console.log(err));

            }
        }).catch(err => console.log(err));
    };


    sellShares = () => {
        // event.preventDefault();
        API.findQuotes(
            { ticker: this.state.ticker }
        ).then(res => {
            this.setState({ price: res.data.quote.latestPrice });
            if (this.state.ticker && this.state.price && this.state.shares) {
                API.sellShares({
                    portfolio_id: this.state.portfolio_id,
                    type: 'sell',
                    ticker: this.state.ticker,
                    sharePrice: this.state.price,
                    shares: -(this.state.shares)
                })
                    .then(res => {
                        this.setState({
                            ticker: 'XOM',
                            price: 0,
                            shares: 0,
                            response: 'Transaction successfully completed'
                        })
                        console.log(this.state.response);
                        this.toggle();
                    })
                    .catch(err => console.log(err));

            }
        }).catch(err => console.log(err));
    };

    render() {
        return (
            <div className='container trading'>
                <div className='stockStats container'>
                    <h1>Stock Stats</h1>

                    <div className='row stockTickerBar'>
                        <div className='col-sm-6 col-md-6'>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6'>
                                    <h1>{this.state.ticker}</h1>
                                </div>
                                <div className='col-sm-3'>
                                    <h2>PRICE</h2>
                                </div>
                                <div className='col-sm-3'>
                                    <h2>${this.state.price}</h2>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6'>
                            <div className='row'>
                                <div className='col-sm-4 changeValue'>
                                    <h2>CHANGE</h2>
                                </div>
                                <div className='col-sm-4'>
                                    {this.state.change >= 0 ? (
                                        <div id='changeValuePositive'>
                                            <h2>+{this.state.change.toFixed(2)}%</h2>
                                        </div>
                                    ) : (
                                            <div id='changeValueNegative'>
                                                <h2>{this.state.change.toFixed(2)}%</h2>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='col-sm-2'>
                                    <FontAwesomeIcon
                                        {...watched ? (eyeWatched = 'faEyeWatched') : (eyeWatched = 'faEye')}
                                        className={eyeWatched}
                                        onclick={addToWatchlist}
                                        size='1x'
                                        icon={faEye} />
                                    {/* OnClick Function Required */}
                                    {/* If not on user watchlist, will need have onclic function to add it to watchlist, and updated state */}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-8 chartSection'>
                            <div id='stockChart'>

                            </div>
                        </div>
                        <div className='col-sm-12 col-md-4 dataSection'>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>SHARES OWNED</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>{this.state.totalShares}</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>ROI</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>${this.state.ROI}</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>PRICE PURCHASED</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>${this.state.cost}</h4>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>DATE PURCHASED</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>{this.state.datePurchased}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='transactionForm container'>
                    <form className='buySell'>
                        <div className='row'>
                            <legend>
                                <h1>Transaction Form</h1>
                            </legend>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6 col-md-6 tradeInputs'>
                                <Label><h2>Select One Option</h2>
                                    <div className='form-check form-check-inline'>
                                        <Input
                                            className='form-check-input'
                                            type='radio'
                                            name='transaction'
                                            value='buy'
                                            checked={this.state.transaction === 'buy'}
                                            onChange={this.handleInputChange}
                                            id='inlineRadio1'
                                        />{' '}
                                        <Label
                                            className='form-check-label'
                                            for='inlineRadio1'>
                                            <h3>BUY</h3>
                                        </Label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <Input
                                            className='form-check-input'
                                            type='radio'
                                            name='transaction'
                                            value='sell'
                                            checked={this.state.transaction === 'sell'}
                                            onChange={this.handleInputChange}
                                            id='inlineRadio2'
                                        />{' '}
                                        <Label
                                            className='form-check-label'
                                            for='inlineRadio1'>
                                            <h3>SELL</h3>
                                        </Label>
                                    </div>
                                </Label>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <Label
                                    for='numberOfShares'>
                                    <h2>Number of Shares</h2>
                                </Label>
                                <Input
                                    type='number'
                                    min='1'
                                    name='shares'
                                    value={this.state.shares}
                                    onChange={this.handleInputChange}
                                    id='numberOfShares'

                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6 col-md-6 totalCalcLabel'>
                                <h4>SUBTOTAL:</h4>
                            </div>
                            <div className='col-sm-6 col-md-6 totalCalc'>
                                <h4>${-2500.00}</h4>
                            </div>
                        </div>
                        <div className='row totalCalc'>
                            <div className='col-sm-6 col-md-6 totalCalcLabel'>
                                <h4>New Bank Vale:</h4>
                            </div>
                            <div className='col-sm-6 col-md-6 totalCalc'>
                                <h4>${10000.00}</h4>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Button
                                    className='submitBtn'
                                    onClick={this.transactionExec}>
                                    {/* // onClick={this.toggle}>{this.props.buttonLabel} */}
                                    SUBMIT ORDER
                            </Button>
                            </div>
                            <Modal
                                isOpen={this.state.modal}
                                toggle={this.toggle}
                                className={this.props.className}>
                                <ModalHeader
                                    toggle={this.toggle}
                                    className='buySell'>
                                    <h2>TRANSACTION COMPLETE</h2>
                                </ModalHeader>
                                <ModalBody
                                    className='buySell transactionModal'>
                                    <h3>Your order was submitted and processed!</h3>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="secondary"
                                        onClick={this.toggle}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </form>
                </div >
            </div >
        )
    }
}

export default Transaction;