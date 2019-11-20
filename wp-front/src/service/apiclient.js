const url = '/api/topics';

export const fetchAllTopics = () => {
    return fetch(url)
    .then(resp=>resp.json())
}

export const fetchSingleTopic = (id) => {
    return fetch(`${url}/${id}`)
    .then(response => response.json());
}

export const postTopic = (topic) => {
    return fetch(url,  {
          method: 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify(topic)
      })
  }

  export const deleteTopicWithId = (id) => {
    return fetch(`${url}/${id}`,  {
        method: 'DELETE'
    })
  }
  
  export const updateTopics = () => {
    return fetch('/api/reset',  {
        method: 'put'
    })
  }

  export const deleteAllTopics = () => {
    return fetch(url,  {
        method: 'DELETE'
    })
  }
 