import React from 'react'
import LoaderGraph from "../image/loading.gif";

export default function Loader({title}) {
    return (
        <div>
            <img src={LoaderGraph}/>
            {title && <span>{title}</span>}
        </div>
    )
}
