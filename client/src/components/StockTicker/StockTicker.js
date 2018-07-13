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
      };
    }
    /**
     * Setting state for ticker text
     */
      componentDidMount() {
        API.getTickerText().then(((r) => {
          if (r.data.length !== 0) {
            let ticker = 'Watchlist...';
            for (let i=0; i<r.data.length; i++) {
              // API.findQuotes(r.data[i]).then(((r2) => {
              //   console.log(r2);
              // }));
              ticker += r.data[i].symbol + '...';
            }
            this.setState({tickerText: ticker});
            console.log(r.data);
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
