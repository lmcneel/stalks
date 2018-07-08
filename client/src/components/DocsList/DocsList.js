import React, { Component } from 'react';
import API from '../../utils/API';
import CollapseRow from '../CollapseRow'

class DocsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            docs: []
        };
    }

    componentDidMount() {
        this.loadDocs();
    };

    loadDocs = () => {
        API.getDocs()
            .then(res =>
                this.setState({
                    docs: res.data
                }),

        )
            .catch(err => console.log(err));

    };

    render() {
        return (
            <div>

                {this.state.docs.map(docs => (
                    <CollapseRow
                        key={docs._id}
                        title={docs.title}
                        article={docs.article}
                        url={docs.url}
                    />
                ))}
            </div>
        );
    }
}
export default DocsList;