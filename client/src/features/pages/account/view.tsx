import { IAccountProps } from './account-interfaces';
import { Button } from '../../button'
import { Spinner } from '../../spinner'

export function AccountContent({ handleDeleteAccount, clientId, isLoading }: IAccountProps) {
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

      <div className="account-information-container-2">
        <div className="account-information-container-2-buttons-container">
          <Button handleClick={handleDeleteAccount} customStyle={{ width: '150px' }} label={isLoading ? <Spinner /> : "delete account" }/>
        </div>
      </div>
    </div>
  );
}
