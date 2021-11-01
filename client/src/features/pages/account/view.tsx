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
            Account information
          </div>
        </div>
        <div className="account-information-container-1-informations">
        <div className="account-information-container-1-information">
            {clientId}
          </div>
        </div>
      </div>

      <div className="account-information-container-3">
        <div className="account-information-container-3-title-tag" style={{ marginBottom: '10px' }}>
          Change Profile Image
        </div>
        <div className="account-information-container-3-information-container">
          <div className="account-information-container-3-inputs-container" >
            <input onChange={handleUploadImage} type="file" name="profile_image"/>
            <Button
            handleClick={sendUploadedImage}
            customStyle={{ width: '150px', marginBottom: '10px' }}
            label={isLoading ? <Spinner /> : 'Set image'}
          />
          </div>
          <img src={getAvatarUrl()} alt="user avatar" />
        </div>
      </div>

      <div className="account-information-container-2">
        <div className="account-information-container-2-buttons-container">
          <div className="account-information-container-2-title-tag" style={{ marginBottom: '10px' }}>
            Erease data
          </div>
          <Button
            handleClick={handleDeleteAccount}
            customStyle={{ width: '150px', margin: '0 auto' }}
            label={isLoading ? <Spinner /> : 'delete account'}
          />
        </div>
      </div>
    </div>
  );
}
