import React, {Component} from 'react'
import $ from 'jquery'
import Button from './Button'
import boardsStore from '../stores/boardsStore'

class StarButton extends Component {

  static propTypes = {
    board: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props)
    this.starUnstarBoard = this.starUnstarBoard.bind(this)
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
  }


  render(){
    const starred = this.props.board.starred ? <i className="fa fa-star" aria-hidden="true"></i> : <i className="fa fa-star-o" aria-hidden="true"></i>
    return <Button onClick={this.starUnstarBoard}>
     {starred}
    </Button>
  }
}

export default StarButton
