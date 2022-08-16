import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchPosts } from '../../store/thunks/thunks';

const HomePosts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts({ page: 1, order: 'desc', limit: 6 }));
  }, []);

  return <>Home Posts</>;
};

export default HomePosts;
