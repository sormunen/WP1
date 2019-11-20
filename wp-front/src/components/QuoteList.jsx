import React, { Component } from 'react'
import Quote from './Quote'
import Pagination from 'react-bootstrap/Pagination';
import { fetchAllQuotes, deleteQuoteWithId } from '../service/apiclient';

export default class QuoteList extends Component {
    
    constructor(props) {
        super(props);
        const queryString = require('query-string');    
        const params = queryString.parse(props.location.search);
        const page = params['page'] || 1;
        this.state = {quotes: [], pageinfo: {page: parseInt(page)-1, size: 3, pages: 0}}
    }
    componentDidMount() {
        this.fetchQuoteList();
    }

    fetchQuoteList = () => {
        fetchAllQuotes().then(quotes=> {
            const {pageinfo} = this.state;
            const div = Math.floor(quotes.length / pageinfo.size)
            pageinfo.pages = div + (quotes.length > div*pageinfo.size ? 1 : 0);
            this.setState({quotes});
        })
    }
    deleteQuote = id => {
        deleteQuoteWithId(id).then(response=> {
            if (response.status !== 200) {
                alert("Virhe pyynnössä, status: " + response.status);
            }
            this.fetchQuoteList();
        })
    }
    changePage = page => {
        const {pageinfo} = this.state;
        pageinfo.page = page;
        this.setState({pageinfo});
    }
    render() {
        const {page, size} = this.state.pageinfo;
        const quoteitems = this.state.quotes
        .sort(function(q1, q2){
            const author1last = q1.author.split(" ").slice(-1)[0].toLowerCase();
            const author2last = q2.author.split(" ").slice(-1)[0].toLowerCase();
            if (author1last === author2last) return 0;
            if (author1last > author2last) return 1;
            return -1;
      })
      .slice(page*size, page*size + size)
      .map((quote)=> {
            return <Quote {...this.props} deleteCallback={this.deleteQuote} quote={quote} key={quote.id}/>
        })
        return (
            <div className="QuoteList AppComponent">
                <div>
                <h2>QuoteList</h2>
                {quoteitems}
                </div>
                <div className="pagination">
                <PaginatePage {...this.props} {...this.state.pageinfo} change={this.changePage}/>
                </div>
            </div>
        )
    }
}

export const PaginatePage = ({page, pages, history, location, change}) => {
    const changepage = (page) => {
        history.push(`${location.pathname}?page=${page+1}`)
        change(page);
    }
    const items = [];
    for (let i =  0; i < pages ; ++i) {
        items.push(
            <Pagination.Item number={i} key={i} active={i === page} onClick={()=>changepage(i)}>
              {i+1}
            </Pagination.Item>,
          );
    }
    return (<div>
        <Pagination>{items}</Pagination>
        </div>)
}