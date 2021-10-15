import { Modal } from '../modal';

interface IEmailLoginModal {
  handleCloseModal: () => void;
  handleEmailNext: () => void;
  handleInputChanged: (input: string, value: string) => void;
  emailValue: string;
  isLoading: boolean;
  error: string;
}

export const EmailLoginModal = ({
  handleCloseModal,
  handleEmailNext,
  handleInputChanged,
  isLoading,
  emailValue,
  error,
}: IEmailLoginModal) => {
  return (
    <Modal
      cancelCallback={handleCloseModal}
      nextCallback={handleEmailNext}
      label="Login ➡️"
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
