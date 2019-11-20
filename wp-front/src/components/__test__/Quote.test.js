import React from 'react';
import Quote from '../Quote';
import { shallow } from './EnzymeConfig'


it('näyttää oikeat asiat', () => {
    const quote = {
        id: 4,
        author: 'Mark Twain',
        quotetext: ".. first bit of beer."
      }
    const wrapper = shallow((<Quote quote={quote}/>));
    expect(wrapper.find('p')).toHaveLength(3);
    expect(wrapper.find('Button')).toHaveLength(2);
    expect(wrapper.contains(<p className="author">Mark Twain</p>)).toBe(true);
    expect(wrapper.contains(<p className="quotetext">.. first bit of beer.</p>)).toBe(true);
    expect(wrapper.containsMatchingElement(<span>{quote.id}</span>)).toBe(true);
})

