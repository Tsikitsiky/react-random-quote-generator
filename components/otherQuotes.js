import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

function OtherQuotes(props) {
    return(
        <div>
            {props.render()}
        </div>
    )
}

export default OtherQuotes