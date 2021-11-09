import { useState } from 'react';
import { EmailLoginModal } from './email';
import { PasswordLoginModal } from './password';
import { InfoLoginModal } from './info';
import { Button } from '../button';
import { Singleton as Authentication } from '../../auth';
import { setAuthentication } from '../../auth/authSlice';
import { useDispatch } from 'react-redux';

interface IModalProp {
  setOpenModals: (key: string, value: boolean) => void;
  isOpen: boolean;
}

export const Login = ({ setOpenModals, isOpen }: IModalProp) => {
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

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

      if (emailExists) {
        const isEmailVerified = await auth.checkIsEmailVerified(formData.email);

        if (isEmailVerified) {
          setFormData({ email: formData.email, password: '' });
          setError('');
          setIsAuthLoading(false);
          setStep(2);
        } else {
          setIsAuthLoading(false);
          setFormData({ email: '', password: '' });
          setError('Email need to be verified, check your inbox.');
        }
      } else {
        setIsAuthLoading(false);
        setFormData({ email: '', password: '' });
        setError('Email not found, did you mean to register?');
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
        const auth = Authentication.getInstance();

        setIsAuthLoading(true);

        const response = await auth.signIn(formData);
        const json = await response.json();

        // ok
        const token = json.token ?? false;
        const email = json.email ?? false;

        // invalid password
        const message = json.message ?? false;

        if (email && token) {
          const res = await auth.getUserData(token);

          const { data } = await res.json();

          const user = data.Item;

          dispatch(setAuthentication());
          auth.setProp('token', token);
          auth.setProp('email', email);
          if (user.avatar_url) {
            auth.setProp('avatar_url', user.avatar_url);
          }

          return;
        } else if (message) {
          setError(message);
        }
      } catch (error: any) {
        setStep(4);
        throw new Error(error);
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
    setOpenModals('login', false);
  };

  const handleGoBack = () => {
    setError('');
    const previousStep = Number(step - 1);
    setStep(previousStep);
  };

  const handleOpenModal = () => {
    setStep(1);
    setError('');
    setOpenModals('login', true);
  };

  const handleStep = () => {
    switch (step) {
      case 1:
        return (
          <EmailLoginModal
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
          <PasswordLoginModal
            handleCloseModal={handleGoBack}
            handlePasswordNext={handlePasswordNext}
            handleInputChanged={handleInputChanged}
            passwordValue={formData.password ?? ''}
            isLoading={isAuthLoading}
            error={error}
          />
        );

      case 0:
        return (
          <InfoLoginModal
            handleCloseModal={handleCloseModal}
            paragraphValue={'Login unsuccesful, please try again'}
          />
        );
    }
  };

  return (
    <div className="Login-content-container">
      <Button
        handleClick={handleOpenModal}
        label="LOGIN"
      />
      {isOpen && handleStep()}
    </div>
  );
};
