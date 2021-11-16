import { Modal } from '../modal';

interface IPasswordLoginModal {
  handleCloseModal: () => void;
  handlePasswordNext: () => void;
  handleInputChanged: (input: string, value: string) => void;
  passwordValue: string;
  isLoading: boolean;
  error: string;
}

export const PasswordLoginModal = ({
  handleCloseModal,
  handlePasswordNext,
  handleInputChanged,
  isLoading,
  passwordValue,
  error,
}: IPasswordLoginModal) => {
  return (
    <Modal
      cancelCallback={handleCloseModal}
      nextCallback={handlePasswordNext}
      label="🔐 Password"
      fieldType="password"
      inputPlaceholder=""
      handleInputChange={(e: any) =>
        handleInputChanged('password', e.target.value)
      }
      inputValue={passwordValue}
      type="form"
      isLoading={isLoading}
      error={error}
      cancelLabel="Back"
    />
  );
};
