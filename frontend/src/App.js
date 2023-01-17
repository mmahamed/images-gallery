import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import ImageCard from './components/ImageCard';
import Search from './components/Search';
import Welcome from './components/Welcome';
import Spinner from './components/Spinner';
import axios from 'axios';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

function App() {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSavedImages() {
      try {
        const res = await axios.get(`${API_URL}/images`);
        setImages(res.data || []);
        setLoading(false);
        console.log('effect');
        toast.success('Saved images downloaded');
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
    getSavedImages();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    // fetch(`${API_URL}/new-image?query=${word}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setImages([{ ...data, title: word }, ...images]);
    //     //Because we dont have any title properties in retrieved json so we add manually and set search term to it
    //   })
    //   .catch((err) => console.log(err));

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
      setWord('');
      toast.info(`New image ${word.toUpperCase()} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.status === 200) {
        // OR if (res.data?.deleted_id)
        toast.warn(
          `Image ${images
            .find((image) => image.id === id)
            .title.toUpperCase()} was deleted`
        );
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    console.log(typeof imageToBeSaved);
    imageToBeSaved.saved = true;
    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
        toast.info(`Image ${imageToBeSaved.title.toUpperCase()} was saved`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Header title="Images Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />
          <Container className="mt-4">
            {images.length === 0 ? (
              <Welcome />
            ) : (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, index) => (
                  <Col key={index} className="pb-3">
                    <ImageCard
                      image={image}
                      handleDelete={handleDeleteImage}
                      handleSave={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        transition={Flip}
      />
    </div>
  );
}

export default App;
