import './Icon.sass'
import React, { Component } from 'react'

const Sizes = ['fa-sm','','fa-lg','fa-2x','fa-3x','fa-4x','fa-5x']

const Icon = (props) => {
  let size = Number(props.size)
  if (isNaN(size)) size = 1
  const typeClassname = props.type ? `fa-${props.type}` : ''
  const iProps = Object.assign({}, props)
  delete iProps.type
  delete iProps.size
  iProps.className = `Icon fa ${typeClassname} ${Sizes[size]} ${props.className||''}`
  return <i {...iProps}>{props.children}</i>
}

export default Icon
