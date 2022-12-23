import React, { Component } from 'react'

export default class Exhausted extends Component {
  render() {
    return (
      <div className="container text-center my-5">
        <h1>Daily API Quota Exhausted!</h1>
        <p>Try after 24 hours</p>
      </div>
    )
  }
}
