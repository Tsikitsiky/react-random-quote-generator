import React, { useEffect, useState } from 'react';
import RandomQuote from './qoute';
import { useParams , Link } from 'react-router-dom';
import OtherQuotes from './otherQuotes';
import {
	BrowserRouter as Router, Switch, Route
} from 'react-router-dom'

function App() {
    const [quote, setQuote] = useState([]);
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [quotes, setQotes] = useState([])
    const API = 'https://quote-garden.herokuapp.com/api/v2/quotes/random';
    const api = `https://quote-garden.herokuapp.com/api/v2/authors/${author}/?page=1&limit=10`;

    //fetch a random quote
    async function getQuote() {
        const res = await fetch(API);
        const data = await res.json();
        //console.log(data.quote)
        setQuote(data.quote.quoteText);
        setAuthor(data.quote.quoteAuthor);
        setGenre(data.quote.quoteGenre);
    }

    //fetch the quotes from an author
    async function getQuotes() {
        const res = await fetch(api);
        const data = await res.json();
        setQotes(data.quotes);
    }

    //refresh
    function newQuote() {
        getQuote();
        getQuotes();
    }

    return(
        <>
       <Router>
		<Switch>
			<Route path="/more-quotes-from-:author">
				<OtherQuotes render= {
                    function() {
                        console.log(author);
                        useEffect(() => {
                            getQuotes()
                        }, [])

                        console.log(quotes)
                        return(
                            <div>
                                <Link to="/">
                                    <button> Back</button>
                                </Link>
                                <button className="refresh" onClick={newQuote}>random</button>
                                <h1>{author}</h1>
                                <div>
                                    {quotes.map(quote => <p key={quote._id}>"{quote.quoteText}"</p>)}
                                </div>
                            </div>
                            
                        )
                    }
                } />
			</Route>
			<Route path="/">
				<RandomQuote render={
                    function() {
                        useEffect(() => {
                            getQuote();
                        }, [])

                        //console.log(quote)
                        return(
                            <div>
                                <button onClick={newQuote} className="refresh">random</button>
                                <p>"{quote}"</p>
                                <Link to={`/more-quotes-from-${author}`}>
                                    <div className="button-next">
                                        <p>{author}</p>
                                        <span>{genre}</span>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                } />
			</Route>
		</Switch>
	</Router>
        </>
    )
}

export default App