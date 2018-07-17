import React, { Component } from 'react';
import { Input, Collapse, Button } from 'reactstrap';
// import {Typeahead} from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faChevronCircleDown } from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';
import ListStock from '../ListStock';
import Joyride from 'react-joyride';

const joyrideStockSearch = [
    {
        title: 'Stock Overview',
        text: 'On this page you can search for stocks to buy and sell. Just type in the stock name into the search bar to try it out!',
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
        text: 'Using the eye icon you can add stocks you own or just ones that you are interested in to your Watchlist. You can view Watchlist in the Stock Chart.',
        selector: '.stockWatch',
    },
    {
        title: 'View Your Watchlist',
        text: 'The stocks added to your Watchlist scroll here so you can keep an eye on the price per share and the percentage change. You can use this tool to decide when to buy new stocks or sell the ones you have.',
        selector: '.stockticker',
    },
    {
        title: 'DOW and Watchlist Views',
        text: 'Here you can toggle between the DOW listings and your Watchlist.',
        selector: '.listBtn',
    },
    {
        title: 'Click Here to Continue to the Transaction Page',
        selector: '.buyBtn',
        style: {
            footer: {
                display: 'none',
            },
        },
    },
];
/**
 * This component generates a single stock view component
 * @class StockSearch
 */
class StockSearch extends Component {
    /**
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.checkWatchList = this.checkWatchList.bind(this);
        // this.addToWatchlist = this.addToWatchlist.bind(this);
        // this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
        this.handleWatchlistSubmit = this.handleWatchlistSubmit.bind(this);
        this.handleDowlistSubmit = this.handleDowlistSubmit.bind(this);
        this.DowListComponent = this.DowListComponent.bind(this);
        this.WatchListComponent = this.WatchListComponent.bind(this);
        this.ListComponent = this.ListComponent.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.charting = this.charting.bind(this);
        this.state = {
            ticker: 'SLB',
            price: 0,
            change: 0,
            value: '',
            selected: '',
            response: '',
            collapse: false,
            showList: false,
            watched: false,
            eyeWatched: 'faEye',
            DOW: ['AAPL', 'AXP', 'BA', 'CAT', 'CSCO', 'CVX', 'DIS', 'DWDP', 'GE',
                'GS', 'HD', 'IBM', 'INTC', 'JNJ', 'JPM', 'KO', 'MCD', 'MMM', 'MRK',
                'MSFT', 'NKE', 'PFE', 'PG', 'TRV', 'UNH', 'UTX', 'V', 'VZ', 'WMT', 'XOM'],
            Watchlist: ['AAPL', 'SLB'],
            // List: [],
            // Lists: [],
            // selectHintOnEnter: true,
        };
        this.toggle = this.toggle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.resetTour = this.resetTour.bind(this);
    }
    /**
     * @public toggle function for reactstap <Collapse> onClick trigger
     */
    toggle() {
        this.setState({ collapse: !this.state.collapse });
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
                for (let i = 0; i < r.data.length; i++) {
                    tempTicker.push((r.data[i]).uniqueStockSymbol);
                }
                this.setState({ Watchlist: tempTicker });
                // console.log(r.data);
                // console.log(tempTicker);
                if (tempTicker.includes(this.state.ticker)) {
                    return this.setState({ watched: true });
                } else {
                    return this.setState({ watched: false });
                };
            };
        }));
    };
    /**
     * @public addToWatchlist function will add current 'ticker' to user watchlist from onClick
     */
    addToWatchlist() {
        // Need to add to MySQL Watchlist, then check watch list
        // API.addWatchListItem(ticker)
        // .then(res => {

        //     // Code to add ticker to mySQL

        // })
        // .catch(err => console.log(err))
    }
    /**
     * @public removeWatchlist function will remove current 'ticker' from user watchlist from onClick
     */
    removeFromWatchlist() {
        // Need to remove from MySQL Watchlist, then check watch list
        // API.removeWatchListItem(ticker)
        // .then(res => {

        //     // Code to add ticker to mySQL

        // })
        // .catch(err => console.log(err))
    }
    /**
     * @public handleWatchlist function will handle onClick for Watchlist/DOW toggle button
     */
    handleWatchlistSubmit() {
        this.setState({ showList: !this.state.showList });
    }
    /**
     * @public handleDOWlist function will handle onClick for Watchlist/DOW toggle button
     * @param {*} props is the current ticker state
     */
    handleDowlistSubmit() {
        this.setState({ showList: !this.state.showDowList });
    }
    /**
     * @public componentDidMount function will render the chart
     * @param {*} List is the current ticker state
     * @param {*} i indes for map
     * @return {*} div with ListStock component
     */
    DowListComponent(List, i) {
        return <div> {this.state.DOW.map((List, i) => <ListStock ticker={List}
            key={`dowlistComponent${i}`} />)} </div>;
    }
    /**
     * @public componentDidMount function will render the chart
     * @param {*} List is the current ticker state
     * @param {*} i indes for map
     * @return {*} div with ListStock component
     */
    WatchListComponent(List, i) {
        return <div> {this.state.Watchlist.map((List, i) => <ListStock ticker={List}
            key={`dowlistComponent${i}`} />)} </div>;
    }
    /**
     * @public ListComponent function will display correct list in component
     * @param {*} props is the current ticker state
     * @return {*} div function with ListStock component
     */
    ListComponent(props) {
        const listFlag = props.listFlag;
        if (listFlag) {
            return <this.WatchListComponent />;
        }
        return <this.DowListComponent />;
    }

    /**
     * @public componentDidMount function will render the chart
     */
    componentDidMount() {
        this.charting({ ticker: this.state.ticker });
        this.checkWatchList({ ticker: this.state.ticker });
    };

    /**
     * @public handleInputChange function for Search
     * @param {*} event
     */
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    // /**
    //  * @public handleTypeheadChange function for Typehead onClick
    //  * @param {*} event
    //  */
    //     handleTypeheadChange(event) {
    //         console.log(event);
    //         this.setState({ticker: event[0]});
    //     };

    /**
     * @public handleFormSubmit function for ticker search onClick
     * @param {*} event
     */
    handleFormSubmit(event) {
        this.charting({ ticker: this.state.ticker });
        this.checkWatchList({ ticker: this.state.ticker });
    };
    /**
     * @public charting function assigns chart data from API
     * @param {*} ticker is the current ticker state
     */
    charting(ticker) {
        API.findQuotes(ticker)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    price: res.data.quote.latestPrice,
                    change: res.data.quote.changePercent,
                    companyName: res.data.quote.companyName,
                    primaryExchange: res.data.quote.primaryExchange,
                    sector: res.data.quote.sector,
                });
                const chartData = res.data.chart.map((day) => {
                    let dayArray = [];
                    dayArray.push(day.date);
                    dayArray.push(day.close);
                    return dayArray;
                });

                // const chartCategories = res.data.chart.map((day) => {
                //     let dateArray = [];
                //     dateArray.push(day.date);
                //     return dateArray;
                // });

                Highcharts.chart('stockChart', {
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
                        title: { text: 'Past 30 Days' },
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
                        marker: { enabled: true },
                        tooltip: { valueDecimals: 2 },
                    }],
                });
            })
            .catch((err) => console.log(err));
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
     * resetTour function
     */
    resetTour() {
        console.dir(this);
        this.joyride.reset(true);
        this.setState({ run: true });
    }
    /**
     * @return {*} Will render stock view component
     */
    render() {
        return (
            <div>
                <Joyride
                    ref={(c) => (this.joyride = c)}
                    steps={joyrideStockSearch}
                    run={this.state.run} // or some other boolean for when you want to start it
                    type={'continuous'}
                    showOverlay={true}
                    allowClicksThruHole={true}
                    autoStart={this.state.run}
                    disableOverlay={true}
                    showSkipButton={true}
                    callback={this.handleJoyrideCallback}
                />
                <Button type='button' onClick={this.resetTour}>Take a Tour</Button>

                <div className='stockStats searchStockStats container'>
                    <div className='row searchBar'>
                        <div className='col-sm-4'>
                            <h1>SEARCH STOCKS</h1>
                        </div>
                        <div className='col-sm-4'>
                            <form>

                                <div className='row'>
                                    <div className='col-sm-10'>

                                        {/* <Typeahead
                                            placeholder="Enter a ticker symbol..."
                                            name='ticker'
                                            onChange={(selected) => {
                                                this.handleTypeheadChange(selected);
                                            }}
                                            options={options}
                                            selected={this.state.selected}
                                        /> */}

                                        <Input
                                            type='string'
                                            name='ticker'
                                            value={this.state.ticker}
                                            onChange={this.handleInputChange}
                                            id='tickerSymbol'
                                        />
                                    </div>
                                    <div className='col-sm-2'>


                                        <Button
                                            className='searchBtn'
                                            onClick={this.handleFormSubmit}
                                        >
                                            SEARCH
                                        </Button>


                                    </div>
                                </div>
                            </form>
                        </div>


                    </div>
                    <div>
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
                                    <div className='col-sm-4 col-md-3 stockName'>
                                        <h1>{this.state.ticker}</h1>
                                    </div>
                                    <div className='stockPrice'>
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
                                    </div>
                                    <div className='col-sm-3 stockWatch'>
                                        <FontAwesomeIcon
                                            className={(this.state.watched ? `faEyeWatched` : `faEye`)}
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
                    </div>
                    <div className='collapseTop'>
                        <Collapse isOpen={this.state.collapse}>
                            <div className='row'>
                                <div className='col-sm-12 col-md-12 chartSection'>
                                    <div className='row stockDetails'>
                                        <div className='col-sm-3'>
                                            <h3>{this.state.companyName}</h3>
                                        </div>
                                        <div className='col-sm-3'>
                                            <h3>Sector: {this.state.sector}</h3>
                                        </div>
                                        <div className='col-sm-6'>
                                            <h3>Primary Exchange: {this.state.primaryExchange}</h3>
                                        </div>
                                    </div>
                                    <div id='stockChart'>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
                <div className='stockStats searchStockStats container'>
                    <div className='container'>
                        <div className='row listBar'>
                            <div className='col-sm-4'>
                                <h1>VIEW STOCKS</h1>
                            </div>
                        </div>
                        <div className='row listBarNav'>
                            <div>
                                <Button
                                    className='listBtn'
                                    color='secondary'
                                    size='sm'
                                    onClick={this.handleWatchlistSubmit}
                                >
                                    {this.state.showList ? (
                                        'Watchlist'
                                    ) : (
                                            'DOW'
                                        )
                                    }
                                </Button>
                            </div>
                        </div>
                        <this.ListComponent listFlag={this.state.showList} />
                        {/* {this.state.Watchlist.map(List => <OwnedStock ticker={List} />)} */}
                    </div>
                </div>
            </div >
        );
    }
}

export default StockSearch;
