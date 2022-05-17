import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from '../css/DetailPageUser.module.css';
import DetailPageComponent from './components/DetailPageComponent';
import { useParams } from 'react-router';
import { stringify } from 'querystring';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';

type Params = {
  id?: string;
  userId?: string;
};

const DetailPageUser = () => {
  const { id } = useParams<Params>();

  const [profile, setProfile] = useState<any>();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // call api get user by id
    const fetchUserById = async () => {
      setLoading(true);
      const res = await fetch('https://api.gearfocus.div4.pgtest.co/apiVendor/profile/detail', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
        },
        cache: 'no-store',
      });

      const json = await res.json();
      console.log(json);

      if (json?.data?.info) {
        setLoading(false);
        setProfile(json?.data?.info);
      }
    };
    fetchUserById();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={clsx(styles.detailPage)}>
        <div className={clsx(styles.detailPageComponent)}>
          {profile ? <DetailPageComponent profile={profile} setProfile={setProfile} /> : null}
        </div>
      </div>
    </>
  );
};

export default DetailPageUser;
