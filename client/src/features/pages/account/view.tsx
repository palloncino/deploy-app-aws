import { IAccountProps } from './account-interfaces';
import { Button } from '../../button';
import { Spinner } from '../../spinner';
import { useEffect, useState } from 'react';
import { Singleton as Authentication } from '../../../auth';

export function AccountContent({
  handleDeleteAccount,
  clientId,
  isLoading,
}: IAccountProps) {
  const [image, setImage] = useState({ ...new Blob(), name: '' });
  const auth = Authentication.getInstance();

  const handleUploadImage = (event: any) => {
    setImage(event.target.files[0]);
  };

  const sendUploadedImage = () => {
    if (!image.name) return;

    const token = auth.getProp('token');

    const formData = new FormData();
    formData.append('image', image);

    fetch('http://localhost:8080/auth/uploadImage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  };

  return (
    <div className="account-information-container">
      <div className="account-information-container-1">
        <div className="account-information-container-1-title">
          <div className="account-information-container-1-title-tag">
            Account page
          </div>
        </div>
        <div className="account-information-container-1-informations">
          <div className="account-information-container-1-information">
            {clientId}
          </div>
        </div>
      </div>

      <div className="account-information-container-3">
        <h3>Change Profile image</h3>
        <input onChange={handleUploadImage} type="file" name="profile_image" />
        <button onClick={sendUploadedImage}>click</button>
        <img src="" alt="user avatar" />
      </div>

      <div className="account-information-container-2">
        <div className="account-information-container-2-buttons-container">
          <Button
            handleClick={handleDeleteAccount}
            customStyle={{ width: '150px' }}
            label={isLoading ? <Spinner /> : 'delete account'}
          />
        </div>
      </div>
    </div>
  );
}
