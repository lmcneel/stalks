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
                    text="Find all the small details here. Read our documentation to get detailed coverage on each aspect of the game, grouped by page, and organized by importance."
                    buttonLink="/docs"
                    buttonText="Read the Docs"
                />
            </div>
            <div className="HelpLanding">
                <HelpCard
                    title="Forum"
                    text="The forum is a great place to ask questions, seek advice, and connect with other players. Use categories to filter your results."
                    buttonLink="/forum"
                    buttonText="Ask a Question"
                />
            </div>
            {/* <div className="HelpLanding">
                <HelpCard
                    title="Tutorial"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                     do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                     nisi ut aliquip ex ea commodo consequat."
                    buttonLink="/trading"
                    buttonText="Start the Tutorial"
                />
            </div> */}
            </Container>
    );
    }
}
export default HelpLanding;
