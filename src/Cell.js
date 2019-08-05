import './Cell.css'
import React from 'react'

class Cell extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.props.getCellId(this.props.id)
  }
  render () {
    return (
      <div className={`Cell ${this.props.lights ? 'lightsOn' : 'lightsOff'}`}
        id={this.props.id}
        onClick={this.handleClick}
      />

    )
  }
}

export default Cell
