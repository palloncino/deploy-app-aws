import { Modal } from '../modal';

interface IEmailRegisterModal {
  handleCloseModal: () => void;
  handleEmailNext: () => void;
  handleInputChanged: (input: string, value: string) => void;
  emailValue: string;
  isLoading: boolean;
  error: string;
}

export const EmailRegisterModal = ({
  handleCloseModal,
  handleEmailNext,
  handleInputChanged,
  isLoading,
  emailValue,
  error,
}: IEmailRegisterModal) => {
  return (
    <Modal
      cancelCallback={handleCloseModal}
      nextCallback={handleEmailNext}
      label="👇 Register"
      fieldType="email"
      inputPlaceholder="test@example.com"
      handleInputChange={(e: any) =>
        handleInputChanged('email', e.target.value)
      }
      inputValue={emailValue}
      type="form"
      isLoading={isLoading}
      error={error}
    />
  );
};
