import './BoardsDropdown.sass'
import React, { Component } from 'react'
import createStoreProvider from './createStoreProvider'
import boardsStore from '../stores/boardsStore'
import Link from './Link'
import CreateBoardPopover from './CreateBoardPopover'
import ToggleComponent from './ToggleComponent'
import StarIcon from './StarIcon'

class BoardsDropdown extends ToggleComponent {

  render() {
    const dropdown = this.state.open ?
      <Dropdown ref="toggle" boards={this.props.boards} close={this.close} /> :
      null
    return <div className="BoardsDropdown" >
      <button ref="button" className={this.props.className} onClick={this.toggle}>Boards</button>
      {dropdown}
    </div>
  }
}

class Dropdown extends ToggleComponent {
  render(){
    let starredBoards
    let personalBoards
    if (this.props.boards === null){
      personalBoards = <div>Loading. . .</div>
      starredBoards = ""
    }else{
      personalBoards = this.props.boards.map(board =>
        <Board key={board.id} board={board} onClick={this.props.close} />
        )
      starredBoards = this.props.boards.filter(board=> board.starred).map(board =>
    <Board key={board.id} board={board} onClick={this.props.close} />
      )
    }
    const personalHeaderToggler = personalBoards.length ? <div className="BoardsDropdown-sidebar-header">
      Personal Boards
  </div> : null
    const starHeaderToggler = starredBoards.length ? <div className="BoardsDropdown-sidebar-header">
      Starred Boards
  </div> : null
    return <div className="BoardsDropdown-dropdown">
      <div className="BoardsDropdown-content">
        {starHeaderToggler}
        {starredBoards}
        {personalHeaderToggler}
        {personalBoards}
        <Link onClick={this.toggle}>Create new board...</Link>
      </div>
      {this.state.open ?
        <CreateBoardPopover
          ref="toggle"
          onClose={this.close}
          onSave={this.props.close}
        /> :
        null
      }
    </div>
  }
}

const Board = ({board, onClick}) => {
  return <div className="BoardsDropdown-board">
    <span className="BoardsDropdown-background" style={{backgroundColor: board.background_color}}></span>
    <Link to={`/boards/${board.id}`} className="BoardsDropdown-link" onClick={onClick}>
      <span className="BoardsDropdown-thumbnail" style={{backgroundColor: board.background_color}}></span>
      <span className="BoardsDropdown-text">
        <span className="BoardsDropdown-title">{board.name}</span>
      </span>
<<<<<<< da90b15d662be8b08a894894dd05ac009d4cb64e
      <StarIcon board={board} storeType="boards" />
=======
      <span title="Click to star this board. It will show up at top of your boards list.">
      <StarButton board={board} />
      </span>
>>>>>>> Star works on board and board dropdown
    </Link>
  </div>
}

export default createStoreProvider({
  as: 'boards',
  store: boardsStore,
  render: BoardsDropdown,
})
