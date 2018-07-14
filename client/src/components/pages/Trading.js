import React, {Component} from 'react';
import TradingCenter from '../TradingCenter';

/**
 * Trading Page
 */
class Trading extends Component {
    /** Returns the Trading Center Component
     * @return {TradingCenter}
     */
    render() {
        return (
            <div>
                <div id="container"></div>
                <TradingCenter />
            </div>
        );
    }
}
export default Trading;
