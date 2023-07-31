import styles from '../styles/settings.module.css';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import { useState } from 'react';

const Settings = () => {
  const auth = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : ''); //to display the existing name
  const [password, setpassword] = useState(' ');
  const [confirmPassword, setconfirmPassword] = useState(' ');
  const [savingForm, setsavingForm] = useState(false);

  const { addToast } = useToasts(); //custom hook

  const clearForm = () => {
    setpassword(' ');
    setconfirmPassword(' ');
  };

  const updateProfile = async () => {
    setsavingForm(true);

    let error = false;
    if (!name || !password || !confirmPassword) {
      addToast('please fill all the fields', {
        appearance: 'error',
      });
      error = true;
    }

    if (password !== confirmPassword) {
      addToast('Password and confirm password does not match', {
        appearance: 'error',
      });
      error = true;
    }

    if (error) {
      return setsavingForm(false);
    }

    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    if (response.sucess) {
      setEditMode(false);
      setsavingForm(false);
      clearForm();
      return addToast('User updated successfully', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }

    setsavingForm(false);
  };

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
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldvalue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving Profile....' : 'Save Profile'}
            </button>

            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go Back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* The ${} syntax is used to interpolate the values and combine the two
      class names. */}
    </div>
  );
};

export default Settings;
