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
      tickerForApi: [],
      };
    }
    /**
     * Setting state for ticker text
     */
      componentDidMount() {
        API.getTickerText().then(((r) => {
            if (r.data.length !== 0) {
              let ticker = 'Watchlist...';
              let tempTicker = [];
              for (let i=0; i<r.data.length; i++) {
                // API.findQuotes(r.data[i]).then(((r2) => {
                //   console.log(r2);
                // }));
                ticker += r.data[i].uniqueStockSymbol + '...';
                tempTicker.push((r.data[i]).uniqueStockSymbol);
              }
              this.setState({tickerText: ticker});
              this.setState({tickerForApi: tempTicker});
              // console.log(r.data);
              console.log(tempTicker);
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
