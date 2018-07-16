import React, {Component} from 'react';
import HelpCard from '../HelpCard/index';
import {Container} from 'reactstrap';
/**
 * Class App
 */
class HelpLanding extends Component {
    /**
     * Render function for App Component
     * @return {JSX}
     */
    render() {
        return (
            <Container>
            <div className="HelpLanding">
                <HelpCard
                    title="Documentation"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                     minim veniam, quis nostrud exercitation ullamco laboris
                     nisi ut aliquip ex ea commodo consequat. "
                    buttonLink="/docs"
                    buttonText="Read the Docs"
                />
            </div>
            <div className="HelpLanding">
                <HelpCard
                    title="Forum"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. "
                    buttonLink="/forum"
                    buttonText="Ask a Question"
                />
            </div>
            <div className="HelpLanding">
                <HelpCard
                    title="Tutorial"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                     do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                     nisi ut aliquip ex ea commodo consequat."
                    buttonLink="/trading"
                    buttonText="Start the Tutorial"
                />
            </div>
            </Container>
    );
    }
}
export default HelpLanding;
