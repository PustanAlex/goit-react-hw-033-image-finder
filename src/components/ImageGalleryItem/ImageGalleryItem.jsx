import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  handleClick = () => {
    const { image, handleSelectedImg } = this.props;
    handleSelectedImg(image.webformatURL);
  };

  render() {
    const { image } = this.props;

    return (
      <li className="ImageGalleryItem">
        <img
          className='ImageGalleryItem-image'
          src={image.webformatURL}
          alt={image.tags}
          onClick={this.handleClick} 
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
