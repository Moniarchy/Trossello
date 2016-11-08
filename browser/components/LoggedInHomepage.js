import './LoggedInHomepage.sass'
import React, { Component } from 'react'
import createStoreProvider from './createStoreProvider'
import boardsStore from '../stores/boardsStore'
import Layout from './Layout'
import Link from './Link'
import StarIcon from './StarIcon'

const LoggedInHomepage = (props) => {
  const { boards } = props
  return <Layout className="LoggedInHomepage">
    <StarredBoards boards={boards} />
  <div className="LoggedInHomepage-BoardListHeading">
      All Boards
  </div>
    <AllBoards boards={boards} />
  </Layout>
}

export default createStoreProvider({
  as: 'boards',
  store: boardsStore,
  render: LoggedInHomepage,
})

const AllBoards = ({boards}) => {
  if (!boards) return null
  const elements = boards.map(board =>
    <Board key={board.id} board={board} />
  )
  return <div className="LoggedInHomepage-Boards">
    {elements}
  </div>
}

const StarredBoards = ({boards}) => {
  if (!boards) return null
  const elements = boards.filter(board=> board.starred).map(board =>
    <Board key={board.id} board={board} />
  )
  const starHeaderToggler = elements.length ? <div className="LoggedInHomepage-BoardListHeading">
      Starred Boards
  </div> : null
  return  <div className="LoggedInHomepage-StarredBoards">
    {starHeaderToggler}
    {elements}
  </div>
}
// class Board extends Component {
//   static propTypes = {
//     board: React.PropTypes.object.isRequired
//   }
//   render() {
//     const style = {
//       backgroundColor: this.props.board.background_color
//     }
//     return  <Link style={style} to={`/boards/${this.props.board.id}`} className="LoggedInHomepage-Board">
//       <div className="LoggedInHomepage-Board-Contents">
//         {this.props.board.name}
//         <StarIcon board={this.props.board}  />
//       </div>
//     </Link>
//   }

// }

const Board = ({board}) => {

    const style = {
      backgroundColor: board.background_color
    }
    return  <Link style={style} to={`/boards/${board.id}`} className="LoggedInHomepage-Board">
      <div className="LoggedInHomepage-Board-Contents">
        {board.name}
        <StarIcon board={board}  />
      </div>
    </Link>
}


