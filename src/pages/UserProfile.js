import { useParams, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import styles from '../styles/settings.module.css';
import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../api';
import { Loader } from '../components';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const Navigate = useNavigate();
  const auth = useAuth();

  console.log('userId', userId);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
        return Navigate('/');
      }
      setLoading(false);
    };
    getUser();
  }, [userId, Navigate, addToast]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user?.friends;

    if (friends) {
      const friendIds = friends.map((friend) => friend.to_user._id);
      const index = friendIds.indexOf(userId); //index of the current user id which i am looking at

      if (index !== -1) {
        //means we found the friend
        return true;
      }
    }

    return false;
  };

  const showAddFriendBtn = checkIfUserIsAFriend();
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/4140/4140047.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {showAddFriendBtn ? (
          <button className={`button ${styles.saveBtn}`}>Remove friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`}>Add friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
