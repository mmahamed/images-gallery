import React from 'react';
import { Button, Container } from 'react-bootstrap';

const Welcome = () => {
  return (
    <Container
      style={{
        backgroundColor: '#eee',
        borderRadius: '5px',
        padding: '40px',
      }}
    >
      <h1>Images Gallery</h1>
      <p>
        This is a simple application that retrievs photos using Unsplash API. In
        order to start enter any search term in the input field ablove.
      </p>
      <p>
        <Button variant="primary" target="_blank" href="https://unsplash.com">
          Learn more
        </Button>
      </p>
    </Container>
  );
};
export default Welcome;
