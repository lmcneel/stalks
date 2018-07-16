import React, {Component} from 'react';
import {Collapse, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Highcharts from 'highcharts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faChevronCircleDown} from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';
import PropTypes from 'prop-types';

const propTypes = {
    ticker: PropTypes.string,
};

/**
 * This component generates a single stock view component
 * @class ListSock
 */
class ListStock extends Component {
/**
 * @param {*} props
 */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.checkWatchList = this.checkWatchList.bind(this);
        // this.addToWatchlist = this.addToWatchlist.bind(this);
        // this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.charting = this.charting.bind(this);
        this.state = {
            ticker: this.props.ticker,
            price: 0,
            change: 0,
            value: '',
            selected: '',
            response: '',
            collapse: false,
            watched: false,
            eyeWatched: 'faEye',
        };
    }

/**
 * @public toggle function for reactstap <Collapse> onClick trigger
 */
    toggle() {
        this.setState({collapse: !this.state.collapse});
    };
/**
 * @public checkWatchList function will check if the current 'ticker' is listed in user watchlist
 * @param {*} ticker
 */
    checkWatchList(ticker) {
        // If in watchlist set [watched] to true
        API.getTickerText(ticker).then(((r) => {
            if (r.data.length !== 0) {
            let tempTicker = [];
            for (let i=0; i<r.data.length; i++) {
                tempTicker.push((r.data[i]).uniqueStockSymbol);
            }
            // console.log(tempTicker);
            if (tempTicker.includes(this.state.ticker)) {
              return this.setState({watched: true});
            } else {
              return this.setState({watched: false});
            };
            };
        }));
    }
/**
 * @public addToWatchlist function will add current 'ticker' to user watchlist from onClick
 * @param {*} ticker
 */
    addToWatchlist(ticker) {
        // API.addNewTicker(ticker)

        // Need to add to MySQL Watchlist
    }
/**
 * @public removeWatchlist function will remove current 'ticker' from user watchlist from onClick
 * @param {*} ticker
 */
    removeFromWatchlist() {
        // API.removeExistingTicer(ticker)

        // Need to remove from MySQL Watchlist

        }
/**
 * @public componentDidMount function will render the chart
 */
    componentDidMount() {
        this.charting({ticker: this.state.ticker});
        this.checkWatchList({ticker: this.state.ticker});
    };
/**
 * @public charting function assigns chart data from API
 * @param {*} ticker is the current ticker state
 */
     charting(ticker) {
        API.findQuotes(ticker)
            .then((res) => {
                // console.log(res.data);
                this.setState({
                    price: res.data.quote.latestPrice,
                    change: res.data.quote.changePercent,
                });
                const chartData = res.data.chart.map((day) => {
                    let dayArray = [];
                    dayArray.push(day.date);
                    dayArray.push(day.close);
                    return dayArray;
                });

                // const chartCategories = res.data.chart.map(day => {
                //     let dateArray = [];
                //     dateArray.push(day.date);
                //     return dateArray;
                // });

                Highcharts.chart(this.state.ticker, {
                    chart: {
                        spacingBottom: 20,
                        // plotBackgroundColor: '#DDDFE1',
                        // backgroundColor: '#DDDFE1',
                        height: null,
                    },
                    title: {
                        // text: `${this.state.ticker} Stock Price`
                        text: null,
                    },

                    xAxis: {
                        title: {text: 'Past 30 Days'},
                        // categories: chartCategories,
                        categories: null,
                        text: null,
                        lineColor: '#404850',
                        lineWidth: 2,
                    },
                    yAxis: {
                        title: null,
                        lineColor: '#404850',
                        lineWidth: 2,
                    },
                    legend: {
                        enabled: false,
                    },

                    series: [{
                        type: 'line',
                        color: '#0C425C',
                        name: this.state.ticker,
                        data: chartData,
                        marker: {enabled: true},
                        tooltip: {valueDecimals: 2},
                    }],
                });
            })
            .catch((err) => console.log(err));
    }

/**
 * @return {*} Will render stock view component
 */
    render() {
        // const { selectHintOnEnter } = this.state;
        return (
            <div>
                <div className='stockStats listStocks container'>
                    <div className='row stockTickerBarCollapse'>
                        <div className='col-sm-6 col-md-6'>
                            <div className='row'>
                                <div className='col-sm-2 col-md-3'>
                                    <FontAwesomeIcon
                                        // onclick={addToWatchlist}
                                        size='2x'
                                        icon={faChevronCircleDown}
                                        onClick={this.toggle}
                                    />
                                </div>
                                <div className='col-sm-4 col-md-3'>
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
                                <div className='col-sm-3 changeValue'>
                                    <h2>CHANGE</h2>
                                </div>
                                <div className='col-sm-3'>
                                    {this.state.change >= 0 ? (
                                        <div id='changeValuePositive'>
                                            <h2>{this.state.change.toFixed(2)}%</h2>
                                        </div>
                                    ) : (
                                            <div id='changeValueNegative'>
                                                <h2>{this.state.change.toFixed(2)}%</h2>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='col-sm-3'>
                                    <FontAwesomeIcon
                                        className={(this.state.watched ? `faEyeWatched`:`faEye`)}
                                        onClick={this.state.watched ?
                                        (this.removeFromWatchlist) : (this.addToWatchlist)}
                                        size='1x'
                                        icon={faEye} />
                                </div>
                                <div className='col-sm-3'>
                                    <Button
                                        className='buyBtn'
                                    >
                                        <Link
                                            to={'/trading/' + this.state.ticker}
                                        >
                                            BUY / SELL
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='collapseTop'>
                        <Collapse isOpen={this.state.collapse}>
                            <div className='row'>
                                <div className='col-sm-12 col-md-12 chartSection'>
                                    <div id= {this.state.ticker}>

                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div >
        );
    }
}
ListStock.propTypes = propTypes;
export default ListStock;
