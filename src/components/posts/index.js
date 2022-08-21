import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { fetchPostById } from '../../store/thunks/thunks';
import { clearPostById } from '../../store/reducers/posts';
import Newsletter from '../utils/newsletter';

import { Spinner } from 'react-bootstrap';

const PostComponent = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispatch(fetchPostById(params.id));
  }, []);

  // clearing previous post prevents the flashing on load of next page
  useEffect(() => {
    return () => {
      dispatch(clearPostById());
    };
  }, []);

  return (
    <>
      {posts.postById ? (
        <div className='article_container'>
          <h1> {posts.postById.title}</h1>
          <div
            style={{ background: `url(${posts.postById.imagexl})` }}
            className='image'
          ></div>
          <div className='author'>
            Created by <span>{posts.postById.author} - </span>
            <Moment format='DD MMM'>{posts.postById.createdAt}</Moment>
          </div>
          <div className='mt-3 content'>
            <div
              dangerouslySetInnerHTML={{ __html: posts.postById.content }}
            ></div>
          </div>
        </div>
      ) : null}

      {posts.loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>loading...</span>
          </Spinner>
        </div>
      ) : null}
      <Newsletter />
    </>
  );
};

export default PostComponent;
