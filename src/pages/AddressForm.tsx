import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormData = {
  first_name?: string;
  last_name: string;
  coordinate_mobile: string;
  coordinate_phone_number?: string;
  address: string;
  gender: 'آقا' | 'خانم';
};

const ClearableInput = ({ field, error }) => {
  const handleClear = () => {
    field.onChange('');
  };

  return (
    <div className="input-container">
      <input
        {...field}
        placeholder={field.placeholder}
        className={error ? 'input-error' : ''}
      />
      {field.value && (
        <span className="clear-icon" onClick={handleClear}>
          <img src="/cancel.svg" alt="cancel" />
        </span>
      )}
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};

const AddressForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ shouldUnregister: false });
  const navigate = useNavigate();
  const [userData, setUserData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setUserData(data);
    navigate('/map', { state: { userData: data } });
  };

  return (
    <div className="address-container">
      <h1 className="title">ثبت آدرس</h1>
      <form id="addressForm" onSubmit={handleSubmit(onSubmit)}>
        <h3>لطفا مشخصات و آدرس خود را وارد کنید</h3>
        <div className="grid-container">
          <div className="grid-item-half">
            <label htmlFor="first_name">نام (اختیاری)</label>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <ClearableInput
                  field={{ ...field, placeholder: 'مثال: محمد رضا' }}
                  error={errors.first_name}
                />
              )}
            />
          </div>

          <div className="grid-item-half">
            <label htmlFor="last_name">نام خانوادگی</label>
            <Controller
              name="last_name"
              control={control}
              rules={{
                required: 'نام خانوادگی الزامی است',
                minLength: {
                  value: 3,
                  message: 'نام خانوادگی باید دارای ۳ کاراکتر باشد',
                },
              }}
              render={({ field }) => (
                <ClearableInput
                  field={{ ...field, placeholder: 'مثال: رضایی' }}
                  error={errors.last_name}
                />
              )}
            />
          </div>

          <div className="grid-item-half">
            <label htmlFor="coordinate_mobile">شماره تلفن همراه</label>
            <Controller
              name="coordinate_mobile"
              control={control}
              rules={{
                required: 'شماره موبایل الزامی است',
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: 'شماره وارد شده صحیح نمی‌باشد',
                },
              }}
              render={({ field }) => (
                <ClearableInput
                  field={{ ...field, placeholder: 'مثال: 09123456789' }}
                  error={errors.coordinate_mobile}
                />
              )}
            />
          </div>

          <div className="grid-item-half">
            <label htmlFor="coordinate_phone_number">
              شماره تلفن ثابت (اختیاری)
            </label>
            <Controller
              name="coordinate_phone_number"
              control={control}
              render={({ field }) => (
                <ClearableInput
                  field={{ ...field, placeholder: 'مثال: 02123456789' }}
                  error={errors.coordinate_phone_number}
                />
              )}
            />
          </div>

          <div className="grid-item-full">
            <label htmlFor="address">آدرس</label>
            <Controller
              name="address"
              control={control}
              rules={{
                required: 'آدرس الزامی است',
                minLength: {
                  value: 3,
                  message: 'آدرس باید حداقل ۳ کاراکتر باشد',
                },
              }}
              render={({ field }) => (
                <ClearableInput
                  field={{ ...field, placeholder: 'آدرس' }}
                  error={errors.address}
                />
              )}
            />
          </div>

          <div className="grid-item-full radio-group">
            <label>جنسیت:</label>
            <div className="gender">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <>
                    <input type="radio" {...field} value="male" id="male" />
                    <label htmlFor="male">آقا</label>
                    <input type="radio" {...field} value="female" id="female" />
                    <label htmlFor="female">خانم</label>
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </form>

      <footer className="footer-button">
        <button type="submit" form="addressForm">
          ثبت و ادامه
        </button>
      </footer>
    </div>
  );
};

export default AddressForm;
