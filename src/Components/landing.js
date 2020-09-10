import React from 'react'

const Landing = props => {
    console.log(props)
    return(
    <div class="grid-container">
    {props.paintings.map(painting =>
    <div class="grid-item">
    <div>{painting.name}</div>
    <img src={painting.url} alt={"Click here"} onClick={() => props.selectPainting(painting)}></img>
    <div>{painting.artist}, {painting.painted_in}.</div>
    <div>{painting.likes != null ? painting.likes : '0'}</div>
    <button onClick={() => props.likePainting(painting)}>Like</button>
    </div>
    )}
    </div>
    )
}

export default Landing