import React, { Component } from 'react';
import { Col } from 'reactstrap';
class GameTips extends Component{
    constructor(props){
        super(props);
        this.state = {
            tips: null
        }
    }

    componentWillMount(){
        this.getTips();
    }

    getTips(){
        // Will change to api
        this.setState({ tips : true});
    }

    toggleTip(){
        this.setState({ tips : !this.state.tips});
    }
    render(){
        return(
          
                <Col className="userProfile-game-tips">
                    Press to toggle on/off game tips
                    <div className="userProfile-switch-container">
                    <label>
                        <input
                            ref="switch"
                            checked={this.state.tips}
                            onChange={this.toggleTip.bind(this)}
                            className="userProfile-switch"
                            type="checkbox"
                        />
                        <div>
                            <span className="labels label-off"> Off </span>
                            <span className="labels label-on"> On </span>
                            <div />
                        </div>
                    </label>
                    </div>
                </Col>
          
        )
    }
};


export default GameTips;