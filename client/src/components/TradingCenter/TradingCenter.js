//The contents of this file should go on client side main pages
import React, { Component } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Highcharts from 'highcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';
import Joyride from 'react-joyride';
import ModalTwo from 'react-modal';
import '../../assets/react-joyride-compiled.css';

let watched = false; // This watchlist flag
let eyeWatched = 'faEye'; // class variable for watchlist condition

const checkWatchList = () => {
    // If in watchlist set [watched] to true
    return watched = false;
};

const addToWatchlist = () => {
    // Need to add to MySQL Watchlist, then check watch list
    checkWatchList();
}

class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticker: 'XOM',
            price: 0,
            shares: 0,
            change: 0,
            response: '',
            portfolio_id: '5b4565293d6a1edcfea8aec3',
            transaction: 'buy',
            ROI: 0,
            cost: 0,
            datePurchased: '',
            value: 0,
            totalShares: 0,
            cashBalance: 0,
            modal: false,
        }
        this.toggle = this.toggle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.resetTour = this.resetTour.bind(this);
        this.state = {
            sideNav: false,
            modalIsOpen: true,
            run: false,
            showModal: true,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.yes = this.yes.bind(this);
        this.never = this.never.bind(this);
        this.close = this.close.bind(this);
        this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    };
    componentDidMount() {
        this.charting({ ticker: this.state.ticker });
        this.myStocks(this.state.portfolio_id);
        this.myStocksValue();
    };

    handleInputChange = event => {
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
        API.getMyStocks(portfolio)
            .then(res => {
                console.log(res.data);
                const userStocks = {};
                for (var i = 0; i < res.data.length; i++) {
                    if (!userStocks[res.data[i].ticker]) {
                        userStocks[res.data[i].ticker] = res.data[i].shares;
                    } else {
                        userStocks[res.data[i].ticker] += res.data[i].shares;
                    }
                }
                console.log(userStocks);
                return userStocks;
            })
            .catch(err => console.log(err));
    };

    myStocksValue = () => {
        const stocks = this.myStocks(this.state.portfolio_id);
        console.log(stocks);
    }

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


  /**
 * openModal function
 */
openModal() {
    this.setState({modalIsOpen: true});
  }
  /**
   * closeModal function
   */
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  /**
  * handleSelect function
  * @param {number} index
  * @param {number} last
  */
  handleSelect(index, last) {
    if (this.joyride.getProgress().index === 2) {
      setTimeout(() => {
        this.joyride.next();
      }, 1);
    }
  }
  /**
  * handleSelect function
  * @param {number} result
  */
  handleJoyrideCallback(result) {
    const {joyride} = this.props;

    if (result.action == 'close') {
      this.setState({run: false});
    }
  }
  /**
   * resetTour function
   */
  resetTour() {
    console.dir(this);
    this.joyride.reset(true);
    this.setState({run: true});
  }
  /**
   * yes function
   */
  yes() {
    this.closeModal();
    this.setState({run: true});
  }
  /**
   * never function
   */
  never() {
    this.closeModal();
    this.close();
  }
  /**
   * close function
   */
  close() {
    this.setState({showModal: false});
  }

    render() {
        return (
            <div>
 <Joyride
                ref={(c) => (this.joyride = c)}
                steps={[
                    {
                      title: 'Bank Value',
                      text: 'This is the amount of liquid assets, money, that you can use to invest in stocks or spend on your pet for fun items in the shop. You can increase your liquid assets by selling your stocks as well as login bonuses.',
                      selector: '.bankValue',
                    },
                    {
                      title: 'Petfolio Value',
                      text: 'This is the sum of all stocks you own multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets.',
                      selector: '.portfolioValue',
                    },
                    {
                      title: 'Stock Overview',
                      text: 'This is the overview of a stocks stats. There is plenty of useful information here!',
                      selector: '.stockStats',
                    },
                    {
                      title: 'Stock Name',
                      text: 'This is the ticker symbol or stock symbol of this stock. It\'s an abbreviation used to uniquely identify publicly traded shares of a particular stock on a particular stock market. A stock symbol may consist of letters, numbers or a combination of both.',
                      selector: '.stockName',
                    },
                    {
                      title: 'Stock Price',
                      text: 'The is the current price of a single stock from this company. This will update, so keep an eye on it for changes!',
                      selector: '.stockPrice',
                    },
                    {
                      title: 'Percent Change',
                      text: 'This is is percentage that shows negative or positive preformance, compared to the price at the opening of the trading day. Green is positive, red is negative.',
                      selector: '.stockChange',
                    },
                    {
                      title: 'Add to Your Watchlist',
                      text: 'Using the eye icon you can add stocks you own or just ones that you are interested in to your watchlist. You can view Watchlist in the Stock Chart.',
                      selector: '.stockWatch',
                    },
                    {
                      title: 'View Your Watchlist',
                      text: 'The stocks added to your Watchlist scroll here so you can keep an eye on the price per share and the percentage change. You can use this tool to decide when to buy new stocks or sell the ones you have.',
                      selector: '.stockticker',
                    },
                    {
                      title: 'Stock Chart',
                      text: 'This chart tracks the preformance of this stock over the last 30 days. You can easily see how a stock is doing with this helpful chart!',
                      selector: '.chartSection',
                    },
                    {
                      title: 'Shares Owned',
                      text: 'This number is the amount of shares you currently own of this stock.',
                      selector: '.sharesOwned',
                    },
                    {
                      title: 'ROI',
                      text: 'ROI, Return on Investment, is the ratio between the net profit and cost of investment resulting from an investment of a stock. This is a helpful metric to determine if your investment in a stock is performing well. The higher this number, the better that stock is doing. You can also use this simple metric to compare different stocks in your portfolio.',
                      selector: '.roiRow',
                    },
                    {
                      title: 'Price and Date Purchased',
                      text: 'This shows the price of the stock on date you purchased it. This is a good inicator of how your investment has done since you initially purchased it.',
                      selector: '.priceAndDateRow',
                    },
                    {
                      title: 'Making a Transaction',
                      text: 'This form allows you to buy and sell stocks.',
                      selector: '.buySell',
                    },
                    {
                      title: 'Buying and Selling Stocks',
                      text: 'Here you select whether you want to buy or sell your stock.',
                      selector: '.tradeInputs',
                    },
                    {
                      title: 'Number of Shares',
                      text: 'Here you input how many shares you would like to buy or sell.',
                      selector: '.numOfShares',
                    },
                    {
                      title: 'Subtotal and New Bank Value',
                      text: 'The suntotal shows informs you how much money you will make or spend with this transaction. The new bank value informs you what your bank value will be after the transaction is complete.',
                      selector: '.bottomTwoRows',
                    },
                  ]}
                run={this.state.run} // or some other boolean for when you want to start it
                type={'continuous'}
                showOverlay={true}
                allowClicksThruHole={true}
                autoStart={this.state.run}
                disableOverlay={true}
                showSkipButton={true}
                callback={this.handleJoyrideCallback}
              />
              <button type="button" onClick={this.resetTour}>Reset Tour</button>
              <ModalTwo
                className="modal"
                overlayClassName="modal-overlay"
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="prototype Modal"
                show={this.state.showModal}
                onHide={this.close}
                ariaHideApp={false}
              >
                <h2 className="modal-title">Welcome!</h2>
                <div className="modal-content">Would you like to start the walkthrough tutorial?</div>
                <button onClick={this.yes} className="modal-button">Yes!</button>
                <button onClick={this.closeModal}>Later</button>
                <button onClick={this.never}>never again...</button>
              </ModalTwo>

                <div className='stockStats container'>
                    <h1>Stock Stats</h1>

                    <div className='row stockTickerBar'>
                        <div className='col-sm-6 col-md-6'>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 stockName'>
                                    <h1>{this.state.ticker}</h1>
                                </div>
                                <div className="stockPrice">
                                    <div className='col-sm-3'>
                                        <h2>PRICE</h2>
                                    </div>
                                    <div className='col-sm-3'>
                                        <h2>${this.state.price}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6'>
                            <div className='row'>
                                <div className='stockChange'>
                                    <div className='col-sm-4 changeValue'>
                                        <h2>CHANGE</h2>
                                    </div>
                                    {/* <div className='col-sm-4'>
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
                                    </div> */}
                                </div>
                                <div className='col-sm-2 stockWatch'>
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
                            <div className='row sharesOwned'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>SHARES OWNED</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>{this.state.totalShares}</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
                            <div className='row roiRow'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>ROI</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>${this.state.ROI}</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
                            <div className="priceAndDateRow">
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
                            <div className='col-sm-12 col-md-6 numOfShares'>
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
                        <div className='bottomTwoRows'>
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
                                    <h4>New Bank Value:</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 totalCalc'>
                                    <h4>${10000.00}</h4>
                                </div>
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