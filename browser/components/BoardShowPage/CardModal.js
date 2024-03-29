import React, { Component } from 'react'
import Link from '../Link'
import Icon from '../Icon'
import Form from '../Form'
import Card from './Card'
import Button from '../Button'
import ToggleComponent from '../ToggleComponent'
import ConfirmationButton from '../ConfirmationButton'
import boardStore from '../../stores/boardStore'
import './CardModal.sass'
import $ from 'jquery'

export default class CardModal extends Component {
  static propTypes = {
    card: React.PropTypes.object.isRequired,
    list: React.PropTypes.object.isRequired,
    board: React.PropTypes.object.isRequired,
    onClose: React.PropTypes.func.isRequired,
  }
  static contextTypes = {
    session: React.PropTypes.object.isRequired
  }
  constructor(props){
    super(props)
    this.state = {
      editingDescription: false,
      editingName: false,
    }
  }

  descriptionOnBlur(event) {
    const { card } = this.props
    const description = {
      description: this.refs.description.value,
    }
    event.preventDefault()
    this.updateDescription(description)
  }

  render(){
    const { session } = this.context
    const { card, list } = this.props

    return <div className="CardModal">
      <div onClick={this.props.onClose} className="CardModal-shroud">
      </div>
      <div className="CardModal-stage">
        <div className="CardModal-window">
          <div className="CardModal-body">
            <div className="CardModal-content">
              <div className="CardModal-content-icon">
                <Icon type="window-maximize" size='2'/>
              </div>
              <div className="CardModal-content-copy">
                <div className="CardModal-content-title">
                  <CardName card={card} />
                </div>
                <div className="CardModal-content-list">
                  <span className="CardModal-content-list-title">
                    in list {list.name}
                  </span>
                  <span className="CardModal-content-list-eye">
                    <Icon size="1" type="eye"  />
                  </span>
                </div>
                <div className="CardModal-description">
                  <CardDescription card={card} />
                </div>
              </div>
            </div>
            <div className="CardModal-comments">
              <div className="CardModal-comments-icon">
                <Icon size="2" type="comment-o"/>
              </div>
              <div className="CardModal-comments-content">
                <span className="CardModal-comments-title">
                  Add Comment:
                </span>
              </div>
            </div>
            <div className="CardModal-comments">
              <div className="CardModal-comments-imgcontain">
                <img className="CardModal-comments-userimage" src={session.user.avatar_url}></img>
              </div>
              <Form className="CardModal-comments-Form">
                <div className="CardModal-comments-Form-content">
                  <textarea
                    className="CardModal-comments-Form-input"
                    ref="comment"
                    placeholder='Write a comment...'
                  />
                </div>
                <input type="submit" className="CardModal-comments-submit" value="Send"/>
              </Form>
            </div>
          </div>
          <Controls card={card} closeModal={this.props.onClose} />
        </div>
      </div>
    </div>
  }
}

const Controls = ({card, closeModal}) => {
  return <div className="CardModal-controls">
    <div className="CardModal-controls-title">Add</div>
    <Button><Icon type="user" /> Members</Button>
    <div className="CardModal-controls-title">Actions</div>
    <ArchiveCardButton card={card} onArchive={closeModal}/>
  </div>
}

class ArchiveCardButton extends Component {
  static propTypes = {
    card: React.PropTypes.object.isRequired,
    onArchive: React.PropTypes.func.isRequired,
  }
  constructor(props){
    super(props)
    this.archiveCard = this.archiveCard.bind(this)
  }
  archiveCard(){
    $.ajax({
      method: "POST",
      url: `/api/cards/${this.props.card.id}/archive`
    }).then(() => {
      boardStore.reload()
      this.props.onArchive()
    })
  }
  render(){
    return <ConfirmationButton
      onConfirm={this.archiveCard}
      buttonName="Archive"
      title='Archive Card?'
      message='Are you sure you want to archive this card?'
    >
      <Icon type="archive" /> Archive
    </ConfirmationButton>
  }
}

class CardName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.card.content
    }
    this.setValue = this.setValue.bind(this)
    this.updateName = this.updateName.bind(this)
  }

  setValue(event) {
    this.setState({value: event.target.value})
  }

  updateName(){
    const card = this.props.card
    $.ajax({
      method: 'post',
      url: `/api/cards/${card.id}`,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({content: this.state.value}),
    }).then(() => {
      boardStore.reload()
    })
  }

  render() {
    return <input
      type="text"
      value={this.state.value}
      onChange={this.setValue}
      onBlur={this.updateName}
    />
  }
}

class CardDescription extends ToggleComponent {
  constructor(props) {
    super(props)
    this.state.value = this.props.card.description || ''
    this.setValue = this.setValue.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.cancel = this.cancel.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentDidMount(){
    this.focusTextarea()
  }

  componentDidUpdate(prevProps, prevState){
    if (!prevState.open) this.focusTextarea()
  }

  focusTextarea(){
    if (this.state.open) this.refs.textarea.focus()
  }

  setValue(event) {
    this.setState({value: event.target.value})
  }

  onKeyDown(event) {
    const { card } = this.props
    if (event.metaKey && event.key === "Enter") {
      event.preventDefault()
      this.updateDescription()
    }
    if (event.key === "Escape") {
      event.preventDefault()
      this.close()
    }
  }

  updateDescription(event){
    if (event) event.preventDefault()
    const card = this.props.card
    $.ajax({
      method: 'post',
      url: `/api/cards/${card.id}`,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({description: this.state.value}),
    }).then(() => {
      boardStore.reload()
      this.close()
    })
  }

  cancel(event){
    event.preventDefault()
    this.close()
  }

  render() {
    if (this.state.open){
      return <Form onSubmit={this.updateDescription}>
        <textarea className="CardModal-description-textarea"
          ref="textarea"
          onKeyDown={this.onKeyDown}
          value={this.state.value}
          onChange={this.setValue}
        />
        <div className="CardModal-description-controls">
          <Button submit type="primary">Save</Button>
          <Button type="invisible" onClick={this.cancel}>
            <Icon type="times" />
          </Button>
        </div>
      </Form>
    }
    if (this.state.value === ""){
      return <Link onClick={this.open} className="CardModal-description">
        <Icon type="align-justify" /> Edit the description
      </Link>
    }
    return <div>
      <div>Description <Link onClick={this.open}>Edit</Link></div>
      <pre>{this.props.card.description}</pre>
    </div>
  }
}
