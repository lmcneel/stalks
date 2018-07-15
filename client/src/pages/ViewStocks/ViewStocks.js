import React, {Component} from 'react';
import StockSearch from '../../components/StockSearch';
// import ListStock from '../components/ListStock';

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
                {/* <ListStock /> */}
            </div>
        );
    }
}
export default ViewStocks;
