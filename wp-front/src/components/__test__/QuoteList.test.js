import React from 'react'
import QuoteList, {PaginatePage} from '../QuoteList'
import Quote from '../Quote'
import Pagination from 'react-bootstrap/Pagination'
import { shallow, mount } from './EnzymeConfig'
const apicalls = require('../../service/apiclient');

let promiseFetchAll, promiseDelete
const resp = [
  {
    id: 1,
    author: 'Benjamin Franklin',
    quotetext: 'An investment in knowledge pays the best interest.'
  },
  {
    id: 2,
    author: 'Herbert Spencer',
    quotetext: 'The great aim of education is not knowledge but action.'
  },
  {
    id: 3,
    author: 'Nelson Mandela',
    quotetext:
      'Education is the most powerful weapon which you can use to change the world.'
  },
  {
    id: 4,
    author: 'Mark Twain',
    quotetext: "Don't let schooling interfere with your education."
  },
  {
    id: 5,
    author: 'Albert Einstein',
    quotetext:
      'The difference between stupidity and genius is that genius has its limits.'
  }
]

beforeEach(() => {
  // Funktion mock toteutus
  const mockedPromiseFetch = () => Promise.resolve(resp)
  const mockedPromiseDelete = () => Promise.resolve()
  apicalls.fetchAllQuotes = () => {
    promiseFetchAll = Promise.resolve().then(mockedPromiseFetch)
    return promiseFetchAll
  }
  apicalls.deleteQuoteWithId = () => {
    promiseDelete = Promise.resolve().then(mockedPromiseDelete)
    return promiseDelete
  }
})

test('list renders ok', done => {
  // Renderöidään komponentti
  const wrapper = shallow(<QuoteList location={{}}/>)
  // Alussa, ennen datan "hakemista" Listan pitäisi olla tyhjä
  expect(wrapper.find('Quote')).toHaveLength(0)
  // Odotetaan että mock-funktiota kutsutaan, ja tehdään testit sen jälkeen
  promiseFetchAll.then(() => {
    wrapper.update()
    expect(wrapper.find('Quote')).toHaveLength(3); // sivutus käytössä
    done()
  })
})
test('list page 2 renders ok', done => {
    const wrapper = shallow(<QuoteList location={{search: "page=2"}}/>)
    promiseFetchAll.then(() => {
      wrapper.update()
      expect(wrapper.find('Quote')).toHaveLength(2); // sivutus käytössä
      done()
    })
  })
  test('pagination contains two buttons', done => {
    const wrapper = mount(<QuoteList location={{}}/>)
    promiseFetchAll.then(() => {
        wrapper.update()
        expect(wrapper.find(Pagination.Item)).toHaveLength(2);
        done()
      })  
  })

  test('renders multiple', done => {
      const quotes = [];
      for(let i = 1 ; i < 38 ; ++i) {
          const q = {id: i, author: "Dude"+i, quotetext: "Lorem ipsum " + i};
          quotes.push(q);
      }
    const mockedPromiseFetch = () => Promise.resolve(quotes)
    apicalls.fetchAllQuotes = () => {
      promiseFetchAll = Promise.resolve().then(mockedPromiseFetch)
      return promiseFetchAll
    }
  
    const wrapper = shallow(<QuoteList location={{search: "page=2"}}/>)
    promiseFetchAll.then(() => {
      wrapper.update()
      expect(wrapper.find('Quote')).toHaveLength(3); // sivutus käytössä
      expect(wrapper.find(Quote).get(0).props.quote.author).toEqual('Dude12');
      expect(wrapper.containsMatchingElement(<PaginatePage page={1}></PaginatePage>))
      done()
    })
  })
