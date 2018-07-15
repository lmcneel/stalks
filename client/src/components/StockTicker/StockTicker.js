import React, {Component} from 'react';
import '../../assets/scss/_petfolio.scss';
import API from '../../utils/API';

/**
 * @class StockTicker
 */
class StockTicker extends Component {
    /**
     * Constructor function for setting state
     * @param {*} props
     */
    constructor(props) {
      super(props);
      this.state = {
        tickerText: 'Watchlist...StockA 2.35...StockB 4.15...StockC 1.28',
        tickerForApi: ['AAPL', 'AXP', 'CSCO'],
      };
    }
    /**
     * Setting state for ticker text
     */
      componentDidMount() {
        API.getTickerText().then(((r) => {
            if (r.data.length !== 0) {
              let ticker = 'Watchlist...';
              let tickerForApi = [];
              // lopp through user's data and pull out watched stock symbols to put into arr for next api call
              for (let i=0; i<r.data.length; i++) {
                tickerForApi.push((r.data[i]).uniqueStockSymbol);
              }
              this.setState({tickerForApi: tickerForApi});

              // if the user has watched stocks, get their prices
              if (tickerForApi !== []) {
                API.getWatchPrices(tickerForApi)
                  .then((r) => {
                    // loop through the nested obj and pull out stock symbol and price
                    for (let p in r.data) {
                      if (p !== undefined) {
                        ticker += p + ' ' + r.data[p].price + '...';
                      }
                    }
                    this.setState({tickerText: ticker});
                  });
              };
            };
          }));
      };

    /**
     * @return {*} Container
     */
    render() {
        return (
        <div className='stockticker'>
            <p>{this.state.tickerText}</p>
        </div>
        );
    }
};

export default StockTicker;
