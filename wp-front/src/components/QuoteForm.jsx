import React, { Component } from 'react'
import { postTopic } from '../service/apiclient'

export default class QuoteForm extends Component {
    state = {quotetext: '', author: ''}
    handleQuoteChange = (e) => {
        this.setState({quotetext: e.target.value})
    }
    handleNameChange = (e) => {
        this.setState({author: e.target.value})
    }
    handleCreateClick = e => {
        e.preventDefault();
        if (this.state.quotetext.trim() === '') {
          window.alert("Quote must contain text");
          return;
        }
        postTopic(this.state).then(response=> {
          // this.setState({quotetext: '', author: ''});
          this.props.history.push('/quotes');
        })
    }
  render () {
    return (
      <div className="QuoteForm AppComponent">
        <form>
          <p className="inputrow">
            <label htmlFor='form_quotetext'>Title</label>
            <textarea
              type='text'
              placeholder='Title'
              id='form_quotetext'
              value={this.state.quotetext}
              onChange={this.handleQuoteChange}
              required='required'
            />
          </p>
          <p className="inputrow">
            <label htmlFor='form_author'>Description</label>
            <input
              type='text'
              placeholder='Description'
              id='form_author'
              autoComplete='off'
              value={this.state.author}
              onChange={this.handleNameChange}
            />
          </p>
          <p className="buttonp">
            <input
              type='submit'
              value='Create'
              onClick={this.handleCreateClick}
            />
          </p>
        </form>
      </div>
    )
  }
}
