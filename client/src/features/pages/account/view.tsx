import { IAccountProps } from './account-interfaces';
import { Button } from '../../button';
import { Spinner } from '../../spinner';
import { useState } from 'react';
import { Singleton as Authentication } from '../../../auth';

export function AccountContent({
  handleDeleteAccount,
  clientId,
  isLoading,
}: IAccountProps) {
  const [image, setImage] = useState({ ...new Blob(), name: '' });
  const auth = Authentication.getInstance();

  const getAvatarUrl = () => {
    const src = auth.getProp('avatar_url');
    if (src) {
      return String(src);
    }
  };

  const handleUploadImage = (event: any) => {
    setImage(event.target.files[0]);
  };

  const sendUploadedImage = async () => {
    if (!image.name) return;

    const token = auth.getProp('token');

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8080/auth/uploadImage', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status == 200) {
        const data = await response.json();
        auth.setProp('avatar_url', data.image_url);
      }
    } catch (error) {
      console.log(error);
    }
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
        <img src={getAvatarUrl()} alt="user avatar" />
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
