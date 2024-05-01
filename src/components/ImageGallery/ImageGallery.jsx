import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import SearchBar from '../SearchBar/SearchBar';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';

export default class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: true,
      error: null,
      searchQuerryParam: 'all',
      pageNumber: 1,
      iconsPerPage: 12,
      selectedImg: null,
      isOpen: false,
    };
  }

  componentDidMount() {
    this.fetchImage();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuerryParam, submitted } = this.state;
    if (searchQuerryParam !== prevState.searchQuerryParam && submitted) {
      this.fetchImage();
      this.setState({ submitted: false });
    }
  }

  fetchImage = () => {
    const API_KEY = '43501408-f2ca706ad0af36d7ba8bbed94';
    const { searchQuerryParam, pageNumber, iconsPerPage } = this.state;
    const URL = `https://pixabay.com/api/?q=${searchQuerryParam}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${iconsPerPage}`;

    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        this.setState({ images: data.hits, loading: false });
      })
      .catch(error => {
        console.error('Error fetching data', error);
        this.setState({ error: error.message, loading: false });
      });
  };

  handleSearchInput = e => {
    this.setState({ searchQuerryParam: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ iconsPerPage: 12, pageNumber: 1, loading: true }, () => {
      this.fetchImage();
    });
  };

  handleLoadMore = () => {
    const { pageNumber, iconsPerPage } = this.state;
    this.setState(
      {
        pageNumber: pageNumber + 1,
        iconsPerPage: iconsPerPage + 12,
        loading: true,
      },
      () => {
        this.fetchImage();
      }
    );
  };

  handleSelectedImg = imageURL => {
    this.setState({ selectedImg: imageURL, isOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { images, loading, error, selectedImg, isOpen } = this.state;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <SearchBar
          handleSubmit={this.handleSubmit}
          handleSearchInput={this.handleSearchInput}
        />
        <ul className="ImageGallery">
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              handleSelectedImg={this.handleSelectedImg}
            />
          ))}
        </ul>
        <Button handleLoadMore={this.handleLoadMore} />
        {selectedImg && (
          <Modal
            imageURL={selectedImg}
            onClose={this.handleCloseModal}
            isOpen={isOpen}
          />
        )}
      </div>
    );
  }
}
