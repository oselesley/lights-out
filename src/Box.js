import './Box.css'
import React from 'react'
import Cell from './Cell'

class Box extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      board: this.createBoard().map(array => array.map(cell => (
      {
        id: cell,
        lights: Math.round(Math.random())
      }
    ))),
    hasWon: false
  }
    this.getCellId = this.getCellId.bind(this)
  }
  static defaultProps = {
    nRows: 5,
    nCols: 5
  }
  createBoard () {
    const board = []
    for (let i = 0; i < this.props.nRows;  i++) {
      console.log('in create board')
      board.push(Array.from({ length: this.props.nCols }).map((pos, index) => `${i}-${index}`))
    }
    return board
  }
  fetchAdjacentCells (id) {
    const iV = id.split('-').map(val => parseInt(val))
    const newIds = [`${iV[0] - 1}-${iV[1]}`, `${iV[0] + 1}-${iV[1]}`, `${iV[0]}-${iV[1] - 1}`, `${iV[0]}-${iV[1] + 1}` ]
    console.log(id)
    console.log(newIds)
    return newIds
  }
  getCellId (id) {
    // fetch adjacent ids and append the current id to the list, so we have a list of all cells to be flipped
    const adjacentIds = this.fetchAdjacentCells(id)
    adjacentIds.push(id)
    this.setState(state => {
      return { board: state.board.map(array => array.map(cell => {
        if (adjacentIds.includes(cell.id)) {
          console.log('includes', cell.id )
          return {
            id: cell.id, lights: cell.lights ? 0 : 1,
            hasWon: this.state.board.every(array => array.every(cell => cell.lights === 0))
          }
        } else {
          console.log('doesn\'t include', cell.id)
          return cell
        }
      })) }
    })
  }
  renderCell () {
    return this.state.board.map(array => array.map(cell => (
      <Cell
        key={cell.id}
        id={cell.id}
        getCellId={this.getCellId}
        lights={cell.lights}
        />
      )))
  }
  render () {
    if (this.state.hasWon) {
      return (
        <div className='Box'>
          <h2 className='neon'>You Won</h2>
        </div>
      )
    }
    const style = { gridTemplateColumns: `repeat(${this.props.nCols}, 2fr)`}
    // console.log(this.createBoard())
    // console.log(this.fetchAdjacentCells())
    return (
      <div className='Box'>
        <div className='Box-title'>
          <span className='neon'>Lights</span>
          <span className='flux'>out</span>
        </div>
        <div className='Box-cells' style={style}>
          { this.renderCell() }
        </div>
      </div>
    )
  }
}
export default Box

