import React, {Component} from 'react'
import $ from 'jquery'
import Button from './Button'
import boardsStore from '../stores/boardsStore'
import boardStore from '../stores/boardStore'
import './StarIcon.sass'

class StarIcon extends Component {

  static propTypes = {
    board: React.PropTypes.object.isRequired,
    storeType: React.PropTypes.string.isRequired
  }

  constructor(props){
    super(props)
    this.toggleStar = this.toggleStar.bind(this)
  }

  toggleStar(event) {
    event.stopPropagation()
    event.preventDefault()
    let url = ""
    this.props.board.starred ? url = `/api/boards/${this.props.board.id}/unstar` :
    url = `/api/boards/${this.props.board.id}/star`  
    $.ajax({
      method: "POST",
      url: url
    }).then(() => {
      if (this.props.storeType === "boards") {
        boardsStore.reload()
      } else {
        boardStore.reload()
      }
    })
  }
 
  render(){
    const starred = this.props.board.starred ? <i className="fa fa-star-o star-active" aria-hidden="true"></i> : <i className="fa fa-star-o star-inactive" aria-hidden="true"></i>
    return <span className="StarIcon-Container" title="Click to star this board. It will show up at top of your boards list." onClick={this.toggleStar}>
     {starred}
    </span>
  }
}

export default StarIcon
