import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import API from '../../utils/API';
import CollapseRow from '../CollapseRow'

const propTypes = {
    title: PropTypes.string,
    article: PropTypes.string,
    image: PropTypes.string,
    keywords: PropTypes.array,
    language: PropTypes.string,
    helpful: PropTypes.number

};

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
DocsList.propTypes = propTypes;
export default DocsList;