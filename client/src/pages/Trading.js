import React, {Component} from 'react';
import TradingCenter from '../components/TradingCenter';

/**
 * Trading Page
 */
class Trading extends Component {
    /** Render  */
    render() {
        /** Return */
        return (
            <div>
                <div id="container"></div>
                <TradingCenter />
            </div>
        );
    }
}
export default Trading;
