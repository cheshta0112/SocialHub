import PropTypes from 'prop-types';
import { Comment, Loader, FriendsList, CreatePost, Post } from '../components';
import styles from '../styles/home.module.css';
import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {/* to have multiple post */}
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

//adding properties
Home.propTypes = {
  //add objects
  posts: PropTypes.array.isRequired, //define all the props which this home components will get
};

export default Home;
