import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.css';
import AsideUI from '../../components/dashboard/aside';
import Settings from '../../components/dashboard/settings/settings';
import axios from 'axios';
import { Context } from '../../context/context';

const SettingsRoute = () => {
  const { auth, dispatch } = useContext(Context);

  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res_ = await axios.get(`${process.env.USER_DASHBOARD_URL}`, {
          withCredentials: true,
        });
        setUser(res_.data.user);
        setNotification(res_.data.notification);
      } catch (err) {
        dispatch({ type: 'LOGOUT' });
        window.location.reload();
      }
    };
    auth === 'true'
      ? getUser()
      : setTimeout(() => window.location.replace('/login'), 4000);
  }, []);

  if (!user) {
    return (
      <div className={styles.redirect}>
        Checking for an authenticated session...
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.aside}>
          <AsideUI user={user} notification={notification} />
        </div>
        <div className={styles.main}>
          <Settings user={user} />
        </div>
      </div>
    </div>
  );
};

export default SettingsRoute;
