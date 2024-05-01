import React, { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickOutside)
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickOutside = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  }

  render() {
    const { imageURL, isOpen } = this.props;

    return (
      <>
        {isOpen && (
          <div className="Overlay">
            <div className="Modal">
              <img src={imageURL} alt="Selected Image" />
            </div>
          </div>
        )}
      </>
    );
  }
}
