import React, {Component} from 'react'
import $ from 'jquery'
import Button from './Button'
import boardsStore from '../stores/boardsStore'
import './StarIcon.sass'

class StarIcon extends Component {

  static propTypes = {
    board: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props)
    this.starUnstarBoard = this.starUnstarBoard.bind(this)
    this.state = {
      starred: this.props.board.starred,
    }
  }

  starUnstarBoard(event) {
    event.stopPropagation()
    event.preventDefault()

    if (this.props.board.starred) {
      $.ajax({
        method: "POST",
        url: `/api/boards/${this.props.board.id}/unstar`
      }).then(() => {
        boardsStore.reload()
      })
    } else {
      $.ajax({
        method: "POST",
        url: `/api/boards/${this.props.board.id}/star`
      }).then(() => {
        boardsStore.reload()
      })
    }
    this.setState({ starred: !this.state.starred})
  }

  render(){
    const starred = this.state.starred ? <i className="fa fa-star-o star-active" aria-hidden="true"></i> : <i className="fa fa-star-o star-inactive" aria-hidden="true"></i>
    return <span className="StarIcon-Container" title="Click to star this board. It will show up at top of your boards list." onClick={this.starUnstarBoard}>
     {starred}
    </span>
  }
}

export default StarIcon
