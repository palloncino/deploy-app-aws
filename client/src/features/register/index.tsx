import { useState } from 'react';
import { EmailRegisterModal } from './email';
import { PasswordRegisterModal } from './password';
import { InfoRegisterModal } from './info';
import { Button } from '../button';
import { Singleton as Authentication } from '../../auth';

interface IModalProp {
  setOpenModals: (key: string, value: boolean) => void;
  isOpen: boolean;
}

export const Register = ({ setOpenModals, isOpen }: IModalProp) => {
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function validateEmail(email: string) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  function validatePassword(password: string) {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,35}$/;
    return regex.test(String(password).toLowerCase());
  }

  const handleEmailNext = async (): Promise<void> => {
    const isValidEmail = validateEmail(formData.email);

    if (isValidEmail) {
      const auth = Authentication.getInstance();

      setIsAuthLoading(true);

      const emailExists = await auth.emailAlreadyExists(formData.email);

      setIsAuthLoading(false);

      if (!emailExists) {
        setFormData({ email: formData.email, password: '' });
        setError('');
        setStep(2);
      } else {
        setFormData({ email: '', password: '' });
        setError('email already in use'); // TODO: dispatch error banner
      }
    } else {
      setFormData({ email: '', password: '' });
      setError('invalid email');
    }
  };

  const handlePasswordNext = async (): Promise<void> => {
    const isValidPassword = validatePassword(formData.password);

    if (isValidPassword) {
      setFormData({ email: formData.email, password: formData.password });

      try {
        setIsAuthLoading(true);

        const auth = Authentication.getInstance();

        const response = await auth.signUp(formData);

        const message = response?.message ?? false;

        if (message) {
          setMessage(message);
          setStep(3);
          return;
        } else {
          setStep(0);
          return;
        }
      } catch (error: any) {
        setStep(4);
        throw new Error(error); // TODO: dispatch error banner
      } finally {
        setIsAuthLoading(false);
      }
    } else {
      setFormData({ email: formData.email, password: '' });
      setError('password invalid');
    }
  };

  const handleInputChanged = (input: string, value: string) => {
    setFormData({ ...formData, [input]: value });
  };

  const handleCloseModal = () => {
    setStep(1);
    setOpenModals('register', false);
  };

  const handleGoBack = () => {
    setError('');
    const previousStep = Number(step - 1);
    setStep(previousStep);
  };

  const handleOpenModal = () => {
    setOpenModals('register', true);
    setStep(1);
    setError('');
    setOpenModals('register', true);
  };

  const handleStep = () => {
    switch (step) {
      case 1:
        return (
          <EmailRegisterModal
            handleCloseModal={handleCloseModal}
            handleEmailNext={handleEmailNext}
            handleInputChanged={handleInputChanged}
            emailValue={formData.email ?? ''}
            isLoading={isAuthLoading}
            error={error}
          />
        );

      case 2:
        return (
          <PasswordRegisterModal
            handleCloseModal={handleGoBack}
            handlePasswordNext={handlePasswordNext}
            handleInputChanged={handleInputChanged}
            passwordValue={formData.password ?? ''}
            isLoading={isAuthLoading}
            error={error}
          />
        );

      case 3:
        return (
          <InfoRegisterModal
            handleCloseModal={handleCloseModal}
            paragraphValue={message}
          />
        );

      case 0:
        return (
          <InfoRegisterModal
            handleCloseModal={handleCloseModal}
            paragraphValue={'Registration unsuccesful, please try again'}
          />
        );
    }
  };

  return (
    <div className="register-content-container">
      <Button
        customStyle={{ width: '150px', marginRight: '10px' }}
        handleClick={handleOpenModal}
        label="REGISTER"
      />
      {isOpen && handleStep()}
    </div>
  );
};
