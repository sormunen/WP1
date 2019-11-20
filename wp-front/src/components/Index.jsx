import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import { deleteAllQuotes, resetQuotes } from '../service/apiclient';

export default function Index() {
    const [message, setMessage] = useState('')
    const clearServerDb = () => {
        deleteAllQuotes().then(()=>
        setMessage("Quotes emptied"))
    }
    const resetServerDb = () => {
        resetQuotes().then(()=>
        setMessage("Quotes reset"))
    }
    return (
        <div className="Index">
            <h1>Indeksisivu</h1>
            <p>Eipä juuri mitään tietoa, mutta saadaan vähän reititystä..</p>
            <p>Navigointi yläreunassa päästää oikeille sivuille, tai voit tehdä tästä</p>
            <ul>
            <li>Tietokannan tyhjentämisen <Button variant="warning" onClick={clearServerDb}>Tyhjennä</Button></li>
            <li>Tietokannan resetoinnin <Button variant="warning" onClick={resetServerDb}>Resetoi</Button></li>
            </ul>
            <p className="message">{message}</p>
        </div>
    )
}
