import React, { Component } from "react";

export default class Button extends Component {

    
      render() {
        const { handleLoadMore } = this.props
        return <button onClick={handleLoadMore} className="Button">Load more..</button>
      }
}