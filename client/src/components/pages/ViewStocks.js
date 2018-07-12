import React, {Component} from 'react';
import StockSearch from '../StockSearch';

/**
 * View Stocks Page
 */
class ViewStocks extends Component {
    /** Returns the Stock Search Component
     * @return {StockSearch}
     */
    render() {
        return (
            <div>
                <div id="container"></div>
                <StockSearch />
            </div>
        );
    }
}
export default ViewStocks;