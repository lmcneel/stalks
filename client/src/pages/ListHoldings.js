import React, {Component} from 'react';
import OwnedStock from '../components/OwnedStock';

/**
 * View Stocks Page
 */
class ListHoldings extends Component {
    /** Returns the Stock Search Component
     * @return {OwnedStock}
     */
    render() {
        return (
            <div>
                <div id="container"></div>
                <OwnedStock />
            </div>
        );
    }
}
export default ListHoldings;
