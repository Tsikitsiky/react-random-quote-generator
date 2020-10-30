import React from 'react';
import OtherQuotes from './otherQuotes';


function RandomQuote(props) {
    return(
        <div>
            {props.render()}
        </div>
    )
}

export default RandomQuote