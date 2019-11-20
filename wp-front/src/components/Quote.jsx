import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../Quote.css';

export default class Quote extends Component {
    poistaminut = () => {
        this.props.deleteCallback(this.props.topic.id);
    }
    showDetails = () => {
        this.props.history.push(`${this.props.match.url}/${this.props.topic.id}`);
    }
    render() {
        const {id, author, topictext} = this.props.topic;
        return (
            <div className="Quote">
                <span className="quoteid">{id}</span>
                <p className="quotetext">{topictext}</p>
                <p className="author">{author}</p>
                <p><Button type="button" className="btn" variant="danger" onClick={this.poistaminut}>Delete</Button> 
                <Button type="button" className="btn" variant="primary" onClick={this.showDetails}>Näytä tiedot</Button>
                </p>
            </div>
        )
    }
}
