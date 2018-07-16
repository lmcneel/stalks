import React, {Component} from 'react';
import UserProfile from '../components/UserProfile';

/**
 * User Settings  Page
 */
class UserSettings extends Component {
    /** Returns the User Settings/Profile Component
     * @return {UserProfile}
     */
    render() {
        return (
            <div>
                <div id="container"></div>
                <UserProfile />
            </div>
        );
    }
}
export default UserSettings;
