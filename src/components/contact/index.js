import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'react-bootstrap';

import { sendMessage } from '../../store/thunks/thunks';
import { showToast } from '../utils/tool';

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { email: '', firstname: '', lastname: '', message: '' },
    validationSchema: Yup.object({
      email: Yup.string().required('Sorry an email is required'),
      firstname: Yup.string().required('Sorry your name is required'),
      lastname: Yup.string().required('Sorry a last name is required'),
      message: Yup.string()
        .required('Sorry, you need to have a message.')
        .max(500, 'Sorry the message is too long'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(sendMessage(values))
        .unwrap()
        .then((response) => {
          if (response) {
            resetForm();
            showToast('Success', 'Thank you, we will contact you back');
          }
        })
        .catch((err) => {
          showToast('Error', 'Sowee, try again later');
        });
    },
  });

  return (
    <>
      <h1>Contact Us</h1>
      <form className='mt-3' onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className='form-control'
            name='email'
            placeholder='email@example.com'
            {...formik.getFieldProps('email')}
          />
          {formik.errors.email && formik.touched.email ? (
            <Alert variant='danger'>{formik.errors.email}</Alert>
          ) : null}
        </div>
        <div className='form-group'>
          <label htmlFor='firstname'>First name</label>
          <input
            type='text'
            className='form-control'
            name='firstname'
            placeholder='Enter the firstname'
            {...formik.getFieldProps('firstname')}
          />
          {formik.errors.firstname && formik.touched.firstname ? (
            <Alert variant='danger'>{formik.errors.firstname}</Alert>
          ) : null}
        </div>
        <div className='form-group'>
          <label htmlFor='lastname'>Last name</label>
          <input
            type='text'
            className='form-control'
            name='lastname'
            placeholder='Enter the lastname'
            {...formik.getFieldProps('lastname')}
          />
          {formik.errors.lastname && formik.touched.lastname ? (
            <Alert variant='danger'>{formik.errors.lastname}</Alert>
          ) : null}
        </div>
        <div className='form-group mt-2'>
          <label htmlFor='message'>Message</label>
          <textarea
            className='form-control'
            name='message'
            rows={3}
            {...formik.getFieldProps('message')}
          />
          {formik.errors.message && formik.touched.message ? (
            <Alert variant='danger'>{formik.errors.message}</Alert>
          ) : null}
        </div>
        <button type='submit' className='btn btn-primary mt-2'>
          Send message
        </button>
      </form>
    </>
  );
};

export default Contact;
