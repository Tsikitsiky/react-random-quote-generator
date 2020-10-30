import React, { useEffect, useState } from 'react';
import RandomQuote from './qoute';
import { Link } from 'react-router-dom';
import OtherQuotes from './otherQuotes';
import {
	BrowserRouter as Router, Switch, Route
} from 'react-router-dom'

function App() {
    const [quote, setQuote] = useState([]);
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    return(
        <>
       <Router>
		<Switch>
			<Route path="/other">
				<OtherQuotes render= {
                    function() {
                        console.log(author);
                        const [quotes, setQotes] = useState([])
                        const api = `https://quote-garden.herokuapp.com/api/v2/authors/${author}/?page=1&limit=10`;
                        async function getQuotes() {
                            const res = await fetch(api);
                            const data = await res.json();
                            setQotes(data.quotes);
                        }

                        useEffect(() => {
                            getQuotes()
                        }, [])

                        console.log(quotes)
                        return(
                            <div>
                                <Link to="/">
                                    <button>random</button>
                                </Link>
                                <h1>{author}</h1>
                                <div>
                                    {quotes.map(quote => <p key={quote.id}>{quote.quoteText}</p>)}
                                </div>
                            </div>
                            
                        )
                    }
                } />
			</Route>
			<Route path="/">
				<RandomQuote render={
                    function() {
                        const API = 'https://quote-garden.herokuapp.com/api/v2/quotes/random';
                        async function getQuote() {
                            const res = await fetch(API);
                            const data = await res.json();
                            //console.log(data.quote)
                            setQuote(data.quote.quoteText);
                            setAuthor(data.quote.quoteAuthor);
                            setGenre(data.quote.quoteGenre);
                        }

                        useEffect(() => {
                            getQuote();
                        }, [])

                        function newQuote() {
                            getQuote()
                        }

                        //console.log(quote)
                        return(
                            <div>
                                <button onClick={newQuote}>random</button>
                                <p>{quote}</p>
                                <div className="button-next">
                                    <Link to="/other">
                                        <button value={author}>{author}</button>
                                    </Link>
                                    <br />
                                    <span>{genre}</span>
                                </div>
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