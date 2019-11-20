import React, { Component } from 'react'
import { fetchSingleTopic, deleteTopicWithId } from '../service/apiclient'
import { Link } from 'react-router-dom'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

export default class QuoteDetails extends Component {
  state = { topic: null }
  componentDidMount () {
    const id = this.props.match.params.id
    fetchSingleTopic(id).then(topic => {
      this.setState({ topic })
    }).catch(err=> {
        alert(`Error fetching topic: ${err.message}`)
    })
  }
  deleteMe = () => {
    deleteTopicWithId(this.state.topic.id).then(async response=>{
        if (response.status === 200) {
            window.alert("Deleted");
            this.props.history.push("/quotes");
        }
        else {
            const msge = await response.json();
            alert(`Something went wrong ${response.status} - ${response.statusText}`);
            console.error(msge);
        }
    })
  }

  render () {
    if (!this.state.topic) {
      return <p>Loading...</p>
    }
    const { id, title, detail, src } = this.state.topic
    return (
      <div>
        <h1>Topic #{id}</h1>
        <h3>Details</h3>
        <div>
          <p className='quotetext'>{title}</p>
          <p className='author'>{detail}</p>
          <p className='author'>{src}</p>
        </div>
        <ButtonGroup aria-label='Basic example'>
         
          <Button variant='danger' onClick={this.deleteMe}>Delete</Button>
        </ButtonGroup>
        <hr />
       
        
        <Link to='/quotes'>Back to all quotes</Link>
      </div>
    )
  }
}
