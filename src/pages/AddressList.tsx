import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';

type Address = {
  id: number;
  first_name: string;
  last_name: string;
  coordinate_mobile: string;
  coordinate_phone_number?: string;
  gender: string;
  address: string;
};

const AddressList = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          'https://stage.achareh.ir/api/karfarmas/address',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4', // Update the authorization token if necessary
            },
          }
        );
        setAddresses(response.data);
      } catch (err) {
        setError('خطا در دریافت آدرس‌ها. لطفا دوباره تلاش کنید.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <Loading />
        کمی صبر کنید .
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="information-container">
      <div className="header">آدرس‌های شما و مشخصات</div>

      {addresses.length === 0 ? (
        <div className="no-address">هیچ آدرسی یافت نشد.</div>
      ) : (
        <div className="card-grid">
          {addresses.map((address) => (
            <div className="card" key={address.id}>
              <div className="card__content">
                <div className="content__text">
                  <span className="title">نام</span>
                  <span className="text">{address.first_name}</span>
                </div>

                <div className="content__text">
                  <span className="title">نام خانوادگی</span>
                  <span className="text">{address.last_name}</span>
                </div>

                <div className="content__text">
                  <span className="title">شماره تلفن همراه</span>
                  <span className="text">{address.coordinate_mobile}</span>
                </div>

                <div className="content__text">
                  <span className="title">شماره تلفن ثابت</span>
                  <span className="text">
                    {address.coordinate_phone_number || '-'}
                  </span>
                </div>

                <div className="content__text">
                  <span className="title">جنسیت</span>
                  <span className="text">{address.gender || '-'}</span>
                </div>
                <hr className='content__line'/>
                <div className="content__text">
                  <span className="title">آدرس</span>
                  <span className="text">{address.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressList;
