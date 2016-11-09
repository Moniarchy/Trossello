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
    const { boards } = this.props
    let content

    if (!boards) {
      return <div className="BoardsDropdown-dropdown">
        <div className="BoardsDropdown-content">
          <div>Loading…</div>
        </div>
      </div>
    }

    let starredBoards = boards.filter(board => board.starred)
    let notStarredBoards = boards.filter(board => !board.starred)

    const renderBoard = board => (
      <Board key={board.id} board={board} onClick={this.props.close} />
    )

    starredBoards = starredBoards.map(renderBoard)
    notStarredBoards = notStarredBoards.map(renderBoard)

    if (starredBoards.length > 0) {
      starredBoards.unshift(
        <div key="header" className="BoardsDropdown-sidebar-header">
          Starred Boards
        </div>
      )
    }
    if (notStarredBoards.length > 0) {
      notStarredBoards.unshift(
        <div key="header" className="BoardsDropdown-sidebar-header">
          Personal Boards
        </div>
      )
    }

    var createBoardPopover = this.state.open ?
      <CreateBoardPopover
        ref="toggle"
        onClose={this.close}
        onSave={this.props.close}
      /> :
      null

    return <div className="BoardsDropdown-dropdown">
      <div className="BoardsDropdown-content">
        {starredBoards}
        {notStarredBoards}
        <Link onClick={this.toggle}>Create new board...</Link>
      </div>
      {createBoardPopover}
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
      <StarIcon board={board} store={boardStore} />
    </Link>
  </div>
}

export default createStoreProvider({
  as: 'boards',
  store: boardsStore,
  render: BoardsDropdown,
})
