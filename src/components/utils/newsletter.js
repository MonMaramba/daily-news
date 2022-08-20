import { useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { addToNewsletter } from '../../store/thunks/thunks';

import { showToast } from './tool';

const Newsletter = () => {
  const textInput = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value;

    dispatch(addToNewsletter({ email: value }))
      .unwrap()
      .then((response) => {
        if (response.newsletter === 'added') {
          showToast('SUCCESS', 'Yay!');
          textInput.current.value = '';
        } else {
          showToast('ERROR', 'Oh no...  you are there already');
        }
      });
  };

  return (
    <>
      <div className='newsletter_container'>
        <h1>Join our newsletter</h1>
        <div className='form'>
          <Form onSubmit={handleSubmit} className='mt-4'>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='EXAMPLE: youremail@gmail.com'
                name='email'
                ref={textInput}
              />
              <Button className='mt-2' variant='primary' type='submit'>
                Add me to the list
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
