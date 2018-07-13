//The contents of this file should go on client side main pages
import React, { Component } from 'react';
import { Collapse, Button } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
// import BuySellButton from './BuySellButton';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faChevronCircleDown } from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';
import ListStock from '../ListStock';

let options = ['MMM','AOS','ABT','ABBV','ACN','ATVI','AYI','ADBE','AAP','AMD','AES','AET','AMG','AFL','A','APD','AKAM','ALK','ALB','ARE','ALXN','ALGN','ALLE','AGN','ADS','LNT','ALL','GOOGL','GOOG','MO','AMZN','AEE','AAL','AEP','AXP','AIG','AMT','AWK','AMP','ABC','AME','AMGN','APH','APC','ADI','ANDV','ANSS','ANTM','AON','APA','AIV','AAPL','AMAT','APTV','ADM','ARNC','AJG','AIZ','T','ADSK','ADP','AZO','AVB','AVY','BHGE','BLL','BAC','BAX','BBT','BDX','BRK.B','BBY','BIIB','BLK','HRB','BA','BKNG','BWA','BXP','BSX','BHF','BMY','AVGO','BF.B','CHRW','CA','COG','CDNS','CPB','COF','CAH','KMX','CCL','CAT','CBOE','CBRE','CBS','CELG','CNC','CNP','CTL','CERN','CF','SCHW','CHTR','CVX','CMG','CB','CHD','CI','XEC','CINF','CTAS','CSCO','C','CFG','CTXS','CME','CMS','KO','CTSH','CL','CMCSA','CMA','CAG','CXO','COP','ED','STZ','GLW','COST','COTY','CCI','CSRA','CSX','CMI','CVS','DHI','DHR','DRI','DVA','DE','DAL','XRAY','DVN','DLR','DFS','DISCA','DISCK','DISH','DG','DLTR','D','DOV','DWDP','DPS','DTE','DUK','DRE','DXC','ETFC','EMN','ETN','EBAY','ECL','EIX','EW','EA','EMR','ETR','EVHC','EOG','EQT','EFX','EQIX','EQR','ESS','EL','RE','ES','EXC','EXPE','EXPD','ESRX','EXR','XOM','FFIV','FB','FAST','FRT','FDX','FIS','FITB','FE','FISV','FLIR','FLS','FLR','FMC','FL','F','FTV','FBHS','BEN','FCX','GPS','GRMN','IT','GD','GE','GGP','GIS','GM','GPC','GILD','GPN','GS','GT','GWW','HAL','HBI','HOG','HRS','HIG','HAS','HCA','HCP','HP','HSIC','HES','HPE','HLT','HOLX','HD','HON','HRL','HST','HPQ','HUM','HBAN','HII','IDXX','INFO','ITW','ILMN','INCY','IR','INTC','ICE','IBM','IP','IPG','IFF','INTU','ISRG','IVZ','IPGP','IQV','IRM','JBHT','JEC','SJM','JNJ','JCI','JPM','JNPR','KSU','K','KEY','KMB','KIM','KMI','KLAC','KSS','KHC','KR','LB','LLL','LH','LRCX','LEG','LEN','LUK','LLY','LNC','LKQ','LMT','L','LOW','LYB','MTB','MAC','M','MRO','MPC','MAR','MMC','MLM','MAS','MA','MAT','MKC','MCD','MCK','MDT','MRK','MET','MTD','MGM','KORS','MCHP','MU','MSFT','MAA','MHK','TAP','MDLZ','MON','MNST','MCO','MS','MSI','MYL','NDAQ','NOV','NAVI','NKTR','NTAP','NFLX','NWL','NFX','NEM','NWSA','NWS','NEE','NLSN','NKE','NI','NBL','JWN','NSC','NTRS','NOC','NCLH','NRG','NUE','NVDA','ORLY','OXY','OMC','OKE','ORCL','PCAR','PKG','PH','PAYX','PYPL','PNR','PBCT','PEP','PKI','PRGO','PFE','PCG','PM','PSX','PNW','PXD','PNC','RL','PPG','PPL','PX','PFG','PG','PGR','PLD','PRU','PEG','PSA','PHM','PVH','QRVO','QCOM','PWR','DGX','RRC','RJF','RTN','O','RHT','REG','REGN','RF','RSG','RMD','RHI','ROK','COL','ROP','ROST','RCL','SPGI','CRM','SBAC','SCG','SLB','STX','SEE','SRE','SHW','SPG','SWKS','SLG','SNA','SO','LUV','SWK','SBUX','STT','SRCL','SYK','STI','SIVB','SYMC','SYF','SNPS','SYY','TROW','TTWO','TPR','TGT','TEL','FTI','TXN','TXT','BK','CLX','COO','HSY','MOS','TRV','DIS','TMO','TIF','TWX','TJX','TMK','TSS','TSCO','TDG','TRIP','FOXA','FOX','TSN','USB','UDR','ULTA','UAA','UA','UNP','UAL','UNH','UPS','URI','UTX','UHS','UNM','VFC','VLO','VAR','VTR','VRSN','VRSK','VZ','VRTX','VIAB','V','VNO','VMC','WMT','WBA','WM','WAT','WEC','WFC','WELL','WDC','WU','WRK','WY','WHR','WMB','WLTW','WYN','WYNN','XEL','XRX','XLNX','XL','XYL','YUM','ZBH','ZION','ZTS'];


class StockSearch extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            ticker: '',
            price: 0,
            change: 0,
            value: '',
            selected: '',
            response: '',
            collapse: false,
            watched: false,
            eyeWatched: 'faEye',
            DOW: ['AAPL', 'AXP', 'BA', 'CAT', 'CSCO', 'CVX', 'DIS', 'DWDP', 'GE', 'GS', 'HD', 'IBM', 'INTC', 'JNJ', 'JPM', 'KO', 'MCD', 'MMM', 'MRK', 'MSFT', 'NKE', 'PFE', 'PG', 'TRV', 'UNH', 'UTX', 'V', 'VZ', 'WMT', 'XOM'],
            Watchlist: 'AAPL',
            // List: [],
            // Lists: [],
            // selectHintOnEnter: true,
        }
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    };

    checkWatchList = () => {
         // If in watchlist set [watched] to true
        // API.getWatchListItem(ticker)
        //     .then(res => {
        //         console.log(res.data);
        //         if (res.data.ticker === this.state.ticker) {
        //             this.setState({ watched: !this.state.watched })
        //         } else {
        //             this.setState({ watched: this.state.watched })
        //         }
        //     })
        //     .catch(err => console.log(err))

        this.setState({ watched: this.state.watched })

        // return /this.state.watched = false;

    };

    addToWatchlist = (ticker) => {
        // Need to add to MySQL Watchlist, then check watch list
        // API.addWatchListItem(ticker)
        // .then(res => {

        //     // Code to add ticker to mySQL

        // })
        // .catch(err => console.log(err))
    }

    removeFromWatchlist = (ticker) => {
        // Need to remove from MySQL Watchlist, then check watch list
        // API.removeWatchListItem(ticker)
        // .then(res => {

        //     // Code to add ticker to mySQL

        // })
        // .catch(err => console.log(err))        
    }

    componentDidMount() {
        this.charting({ ticker: this.state.ticker });
    };

    // handleInputChange = event => {
    //     const { name, value } = event.target;
    //     this.setState({ [name]: value });
    // };

    handleTypeheadChange = event => {
        console.log(event)
        this.setState({ ticker: event[0] });
    };

    handleFormSubmit = event => {
        this.charting({ ticker: this.state.ticker });
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

    render() {
        return (
            <div>
                <div className='stockStats searchStockStats container'>
                    <div className='row searchBar'>
                        <div className='col-sm-4'>
                            <h1>SEARCH STOCKS</h1>
                        </div>
                        <div className='col-sm-4'>
                            <form>

                                <div className='row'>
                                    <div className='col-sm-10'>

                                        <Typeahead
                                            placeholder="Enter a ticker symbol..."
                                            name='ticker'
                                            onChange={(selected) => { this.handleTypeheadChange(selected) }}
                                            options={options}
                                            selected={this.state.selected}
                                        />

                                        {/* <Input
                                            type='string'
                                            name='ticker'
                                            value={this.state.ticker}
                                            onChange={this.handleInputChange}
                                            id='tickerSymbol'
                                        /> */}


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
                                        {...this.state.watched ? (this.state.eyeWatched = 'faEyeWatched') : (this.state.eyeWatched = 'faEye')}
                                        className={this.state.eyeWatched}
                                        onClick = {this.state.watched ? (this.removeFromWatchlist()) : (this.addToWatchlist()) }
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
                    {/* <hr> */}
                    <div className='collapseTop'>
                        <Collapse isOpen={this.state.collapse}>
                            <div className='row'>
                                <div className='col-sm-12 col-md-12 chartSection'>
                                    <div id='stockChart'>

                                    </div>
                                </div>
                                {/* <div className='col-sm-12 col-md-4 dataSection'>
                                    <div className='row'>
                                        <div className='col-sm-6 col-md-6 stockData'>
                                            <h4>SHARES OWNED</h4>
                                        </div>
                                        <div className='col-sm-6 col-md-6 stockData'>
                                            <h4>{this.state.totalShares}</h4>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-6 col-md-6 stockData'>
                                            <h4>ROI</h4>
                                        </div>
                                        <div className='col-sm-6 col-md-6 stockData'>
                                            <h4>${this.state.ROI}</h4>
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
                                </div> */}
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
                            <h2> Watchlist | DOW </h2>
                        </div>
                        <ListStock />
                        {/* {this.createList(this.createList(this.state.DOW))} */}
                    </div>
                </div>
            </div >
        )
    }
}

export default StockSearch;