import { ExpensesContent } from './view';
import { useEffect, useState } from 'react';
import { Singleton as Authorization } from '../../../auth';

const InitialInputs = {
  label: '',
  website: '',
  price: 0,
  period: 1,
  renewalDay: '',
  details: '',
};

export const Expenses = () => {
  const [currentInputs, setCurrentInputs] = useState(InitialInputs);
  const [expensesData, setExpensesData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const auth = Authorization.getInstance();

  useEffect(() => {
    (async function () {
      await getDataFromDB();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (name: string, value: string | number) => {
    if (name === 'name')
      return setCurrentInputs({ ...currentInputs, label: String(value) });

    return setCurrentInputs({ ...currentInputs, [name]: value });
  };

  const handleClear = () => {
    setCurrentInputs(InitialInputs);
  };

  const handleDeleteCard = async (id: string) => {
    setIsLoading(true);

    const access_token = auth.getProp('token');
    const email = auth.getProp('email');

    let defaultHeaders = {
      'Content-Type': 'application/json',
    };

    let URL = `${process.env.REACT_APP_SERVER_DOMAIN}/api/expenses/delete-expense`;

    let options = {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ id, email }),
    };

    try {
      await fetch(URL, options);

      await getDataFromDB();

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.error(error);
    }
  };

  const handlePostExpense = async () => {
    setIsLoading(true);

    const access_token = auth.getProp('token');
    const userEmail = auth.getProp('email');

    let defaultHeaders = {
      'Content-Type': 'application/json',
    };

    let URL = `${process.env.REACT_APP_SERVER_DOMAIN}/api/expenses/post-expense`;

    let options = {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        authorization: `Bearer ${access_token}`,
        'user-email': `${userEmail}`,
      },
      body: JSON.stringify(currentInputs),
    };

    try {
      const response = await fetch(URL, options);

      await response.json();

      await getDataFromDB();
      
      handleClear()
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.error(error);
    }
  };

  const getDataFromDB = async () => {
    setIsLoading(true);

    const access_token = auth.getProp('token');
    const userEmail = auth.getProp('email');

    let defaultHeaders = {
      'Content-Type': 'application/json',
    };

    let URL = `${process.env.REACT_APP_SERVER_DOMAIN}/api/expenses/get-expenses`;

    let options = {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        authorization: `Bearer ${access_token}`,
        'user-email': `${userEmail}`,
      },
    };

    try {
      const response = await fetch(URL, options);

      const data = await response.json();

      setExpensesData(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.error(error);
    }
  };

  const renderContent = () => {
    return (
      <div className="expenses-content-wrapper">
        <ExpensesContent
          handleInputChange={handleInputChange}
          handleSubmit={handlePostExpense}
          handleClear={handleClear}
          handleDeleteCard={handleDeleteCard}
          currentInputs={currentInputs}
          expensesData={expensesData}
          isLoading={isLoading}
        />
      </div>
    );
  };

  return renderContent();
};
