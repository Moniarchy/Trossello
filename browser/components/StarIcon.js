import './StarIcon.sass'
import React, {Component} from 'react'
import $ from 'jquery'
import Icon from './Icon'

class StarIcon extends Component {

  static propTypes = {
    board: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props)
    this.toggleStar = this.toggleStar.bind(this)
  }

  toggleStar(event) {
    event.stopPropagation()
    event.preventDefault()
    let url = `/api/boards/${this.props.board.id}/${this.props.board.starred ? 'unstar' : 'star'}`
    $.ajax({
      method: "POST",
      url: url
    }).then(() => {
      this.props.store.reload()
    })
  }

  render(){
    const props = {
      type:      "star-o",
      className: "StarIcon-Container",
      title:     "Click to star this board. It will show up at top of your boards list.",
      onClick:    this.toggleStar,
      className: `StarIcon ${this.props.board.starred ? "StarIcon-starred" : "StarIcon-unstarred"}`
    }
    return <Icon {...props}/>
  }
}

export default StarIcon
