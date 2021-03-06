import React, { Component } from 'react';
import { Layer, Feature } from 'react-mapbox-gl'
import { h3ToGeoBoundary, h3GetResolution } from 'h3-js'
import reverse from 'lodash/reverse'

class Hex extends Component {

  handleClick = hexagon => {
    const { address, onClick } = this.props
    onClick && onClick(Object.assign({}, hexagon, { address }))
  }

  render() {
    const { address, color, onHover, onHoverOff } = this.props

    const paint = {
      'fill-color': color || '#eeeeee',
      'fill-opacity': 0.3,
      'fill-outline-color': color || '#000000',
    }

    const coordinates = h3ToGeoBoundary(address).map(c => reverse(c))
    const resolution = h3GetResolution(address)

    return (
      <Layer
        type="fill"
        paint={paint}
        before="waterway-label"
      >
        <Feature
          className="Hexagon"
          coordinates={[coordinates]}
          properties={{
            class: this.props.mapClass || 'hexagon',
            type: 'hexagon',
            address,
            resolution
          }}
          onClick={this.handleClick}
          onMouseEnter={onHover}
          onMouseLeave={onHoverOff}
        />
      </Layer>
      
    )
  }
}

export default Hex
