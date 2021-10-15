import { Modal } from '../modal';

interface IPasswordRegisterModal {
  handleCloseModal: () => void;
  handlePasswordNext: () => void;
  handleInputChanged: (input: string, value: string) => void;
  passwordValue: string;
  isLoading: boolean;
  error: string;
}

export const PasswordRegisterModal = ({
  handleCloseModal,
  handlePasswordNext,
  handleInputChanged,
  isLoading,
  passwordValue,
  error,
}: IPasswordRegisterModal) => {
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
      cancelLabel="BACK"
    />
  );
};
