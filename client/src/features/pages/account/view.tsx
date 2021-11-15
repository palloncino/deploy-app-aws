import { IAccountProps } from './account-interfaces';
import { Button } from '../../button';
import { Spinner } from '../../spinner';
import { useState } from 'react';
import { Singleton as Authentication } from '../../../auth';
import { Logout } from '../../logout';
import { NONAME } from 'dns';

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
      <div className="account-information-container__box account-information-container-1">
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

      <div className="account-information-container__box account-information-container-2">
        <div
          className="account-information-container-3-title-tag"
          style={{ marginBottom: '10px' }}
        >
          Change Profile Image
        </div>
        <div className="account-information-container-3-information-container">
          <div className="account-information-container-3__img-container">
            <img src={getAvatarUrl()} alt="user avatar" />
          </div>
          <div className="account-information-container-3-inputs-container">
            <input
              onChange={handleUploadImage}
              type="file"
              name="profile_image"
            />
            <Button
              handleClick={sendUploadedImage}
              className="btn btn__default"
              customStyle={{ maxWidth: '150px', marginBottom: '10px' }}
              label={isLoading ? <Spinner /> : 'Save'}
            />
          </div>
        </div>
        <div>
          NOTE: after you click save, you won't see any changes, please re login to get the image.
        </div>
      </div>

      <div className="account-information-container__box account-information-container-3">
        <div className="account-information-container-3-buttons-container">
          <div
            className="account-information-container-3-title-tag"
            style={{ marginBottom: '10px' }}
          >
            See you later!
          </div>
          <Logout />
        </div>
      </div>

      <div className="account-information-container__box account-information-container-4">
        <div className="account-information-container-2-buttons-container">
          <div
            className="account-information-container-2-title-tag"
            style={{ marginBottom: '10px' }}
          >
            Delete Account
          </div>
          
          <Button
            handleClick={handleDeleteAccount}
            className="btn btn__danger-button btn--w150"
            label={isLoading ? <Spinner /> : 'Delete now'}
          />
        </div>
      </div>
    </div>
  );
}
