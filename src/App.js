
import React, { Component } from 'react'
import Landing from './Components/landing'

class App extends Component {
  state = {
    paintings: [],
    displayed: []
  }

  getpaintings(){
    fetch('http://localhost:3000/crud')
      .then(response => response.json())
      .then(paintings => this.setState({
        paintings: paintings,
        displayed: paintings}))
      .catch(err => console.log(err))
  }

  selectPainting = (p) => {
    debugger
    let selected = [this.state.paintings.find(paint => paint.id === p.id)]
    this.setState({
      displayed: selected
    })
  }

  goBack = () => {
    this.setState({
      displayed: this.state.paintings
    })
  }

  likePainting = (p) => {
    debugger
    let count = p.likes != null ? p.likes + 1 : 1
      fetch('http://localhost:3000/crud', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: p.id,
        likes: count
      })
    })
      .then(response => response.json())
      .then(item => {
        this.updateCount(p, count)
      })
      .catch(err => console.log(err))
    }

  updateCount = (p, c) => {
    debugger
    let updatedPaintings = this.changeVotes(p.id, c)
    this.setState({
      displayed: updatedPaintings
    })
  }

changeVotes = ( id, likes ) => {
   for (var i in this.state.displayed) {
     if (this.state.displayed[i].id === id) {
        this.state.displayed[i].likes = likes;
        break;
     }
   }
   return this.state.displayed
}


  componentDidMount(){
    this.getpaintings()
  }

render(){
    return (

      <div>
      <Landing paintings={this.state.displayed} selectPainting={this.selectPainting} likePainting={this.likePainting}/>
      {this.state.displayed.length === 1 ? <button onClick={this.goBack}>Go back to all paintings.</button> : null}
      </div>
    )
}
}

export default App