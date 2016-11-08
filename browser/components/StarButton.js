import React, {Component} from 'react'
import Icon from '../Icon'
import Button from '../Button'

class StarButton extends Component {

  static propTypes = {
    board: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props)
    this.starBoard = this.starBoard.bind(this)
  }

  starBoard(){
    $.ajax({
      method: "POST",
      url: `/api/boards/${this.props.board.id}/star`
    }).then(() => {
      boardsStore.reload()
    })
  }

  starred(){
    (this.board.starred)?"Unstar" : "Star"
  }

  render(){
    return <Button onClick={this.starBoard}>
    <Icon type="star" /> {starred}
    </Button>
  }
}

export default StarButton
