import { useEffect, useState } from 'react';
import { Button } from '../../button';
import { Spinner } from '../../spinner';
import { IExpensesProps, IExpenses } from './expenses-interfaces';
import { TypewriterComponent } from '../../typewriter';

const FORM_INPUTS_SCHEMA = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeholder: '',
  },
  {
    name: 'website',
    label: 'Website',
    type: 'text',
    required: false,
    placeholder: 'https://www.example.com',
  },
  {
    name: 'price',
    label: 'Price',
    type: 'number',
    required: true,
    placeholder: '',
  },
  {
    name: 'period',
    label: 'Period',
    type: 'select',
    required: true,
    placeholder: '',
    options: [
      {
        label: 'Monthly',
        value: 1,
      },
      {
        label: 'Annual',
        value: 2,
      },
    ],
  },
  {
    name: 'renewalDay',
    label: 'Renewal day',
    type: 'date',
    required: false,
    placeholder: '',
  },
  {
    name: 'details',
    label: 'Details',
    type: 'text',
    required: false,
    placeholder: '',
  },
];

export const ExpensesContent = ({
  handleInputChange,
  handleSubmit,
  handleClear,
  handleDeleteCard,
  expensesData,
  currentInputs,
  isLoading,
}: IExpensesProps) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    handleDefineTotal(expensesData);
  }, [expensesData]);

  // +-------------------------------------------------------------------+
  // | TOTAL                                                             |
  // +-------------------------------------------------------------------+

  const handleDefineTotal = (expenses: IExpenses) => {
    const ids = Object.keys(expenses);
    let _total = 0;

    const expensesArray: Array<any> = [];

    ids.forEach((id) => {
      expensesArray.push({ id: id, ...expenses[id] });
    });

    expensesArray.forEach(({ price, period }) => {
      const periodNumber = Number(period);
      const priceNumber = Number(price);

      if (periodNumber === 1) {
        // Monthly

        _total += priceNumber;
      } else if (periodNumber === 2) {
        // Annual

        const oneMonthOfAnnual = priceNumber / 12;

        _total += oneMonthOfAnnual;
      }
    });

    const cleanTotal = Number(_total.toFixed(2));

    setTotal(cleanTotal);
  };

  const renderSpinner = () => {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  };

  const handlePreSubmit = (event: any) => {
    event.preventDefault();
    handleSubmit();
  };

  // +-------------------------------------------------------------------+
  // | LIST CONTAINER                                                    |
  // +-------------------------------------------------------------------+

  const handleRenderExpenses = (expenses: IExpenses) => {
    const ids = Object.keys(expenses);

    const expensesArray: Array<any> = [];

    ids.forEach((id) => {
      expensesArray.push({ id: id, ...expenses[id] });
    });

    return (
      <div>
        <div>
          <div className="expenses-container-2-expenses-container-title">
            ⬇️ List of expenses ⬇️{' '}
          </div>
          <div className="expenses-container-2-expenses-container-select-container">
            <label htmlFor="sort-expenses-list">Sort list:&nbsp;</label>
            {/* TODO: make this select work */}
            <select disabled name="sort-expenses-list">
              <option value="0">none</option>
              <option value="1">Alpha Title</option>
              <option value="2">Prince</option>
            </select>
          </div>
        </div>
        <div>
          {expensesArray.map((item, index) => {
            const {
              id,
              label,
              website: url,
              price,
              renewalDay,
              period,
              details,
            } = item;
            return (
              <div
                key={index}
                className="expenses-container-2-expense-container"
              >
                <div className="expenses-container-2-expense-output expenses-container-2-expense-output--label">
                  {label}
                </div>
                {url && (
                  <div className="expenses-container-2-expense-output expenses-container-2-expense-output--website">
                    <a href={`${url}`} target="_blank">
                      Visit website ↗️
                    </a>
                  </div>
                )}
                <div
                  className={`expenses-container-2-expense-output expenses-container-2-expense-output--period expenses-container-2-expense-output--period${
                    period === 1 ? '-1' : '-2'
                  }`}
                >
                  {period === 1 ? 'Monthly' : 'Annual'}
                </div>
                {renewalDay && (
                  <div className="expenses-container-2-expense-output expenses-container-2-expense-output--renewal">
                    Renewal day: {renewalDay}
                  </div>
                )}
                {details && (
                  <div className="expenses-container-2-expense-output expenses-container-2-expense-output--description">
                    {details}
                  </div>
                )}
                <div className="expenses-container-2-expense-output expenses-container-2-expense-output--price">
                  - {Number(price).toFixed(2)} €
                </div>
                <div className="expenses-container-2-expense-buttons-container">
                  <Button
                    customStyle={{
                      width: '150px',
                      height: '30px',
                      fontSize: '.8rem',
                      border: 'none',
                      color: '#c37070',
                      background: 'transparent',
                    }}
                    handleClick={() => handleDeleteCard(id)}
                    label="❌ DELETE"
                  />
                  <Button
                    customStyle={{
                      width: '150px',
                      height: '30px',
                      fontSize: '.8rem',
                      background: 'transparent',
                    }}
                    handleClick={() => {}}
                    disabled={true} // TODO: modal
                    label="✏️ EDIT"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // +-------------------------------------------------------------------+
  // | FORM CONTAINER                                                    |
  // +-------------------------------------------------------------------+

  return (
    <>
      <div className="expenses-container-group center">
        <TypewriterComponent
          element_id="expenses-typewriter-paragraph"
          strings={[
            `With this form you can conviniently keep track of monthly expenses and subsciptions that perhaps you might not want to keep any more!`,
          ]}
        />
      </div>
      <div className="expenses-wrapper">
        <div className="expenses-container-1">
          <form onSubmit={(event) => handlePreSubmit(event)}>
            <div className="expenses-container-1-content">
              <div className="expenses-container-1-title-container">
                <div className="expenses-container-1-title-container-title-tag">
                  Monthly TOTAL € {total} 💸
                </div>
              </div>
              <div className="expenses-container-1-form-container">
                <div className="expenses-container-1-form-inputs-container">
                  {FORM_INPUTS_SCHEMA.map(
                    (
                      {
                        name,
                        label,
                        type,
                        required,
                        placeholder,
                        options = [],
                      },
                      index
                    ) => {
                      if (type === 'select') {
                        return (
                          <div
                            key={index}
                            className="expenses-container-1-form-input-container"
                          >
                            <label
                              className="expenses-container-1-form-input-label expenses-container-1-form-input-label-select"
                              htmlFor={name}
                            >
                              {label}
                            </label>
                            <select
                              name={name}
                              onChange={(e) =>
                                handleInputChange(name, e.target.value)
                              }
                              className="expenses-container-1-form-input-tag-input expenses-container-1-form-input-tag-input-select"
                              required={required}
                              placeholder={placeholder}
                            >
                              {options.map((option, index) => (
                                <option key={index} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        );
                      } else {
                        if (name === 'details') {
                          return (
                            <div
                              key={index}
                              className="expenses-container-1-form-input-container"
                            >
                              <label
                                className="expenses-container-1-form-input-label"
                                htmlFor={name}
                              >
                                {label}
                              </label>
                              <textarea
                                name={name}
                                onChange={(e) =>
                                  handleInputChange(name, e.target.value)
                                }
                                className="expenses-container-1-form-input-tag-input expenses-container-1-form-input-tag-input--textarea"
                                value={currentInputs['details']}
                                required={required}
                                placeholder={placeholder}
                              />
                            </div>
                          );
                        }
                        return (
                          <div
                            key={index}
                            className="expenses-container-1-form-input-container"
                          >
                            <label
                              className="expenses-container-1-form-input-label"
                              htmlFor={name}
                            >
                              {label}
                            </label>
                            <input
                              name={name}
                              onChange={(e) =>
                                handleInputChange(name, e.target.value)
                              }
                              className="expenses-container-1-form-input-tag-input"
                              type={type}
                              value={
                                currentInputs[name === 'name' ? 'label' : name]
                              }
                              required={required}
                              placeholder={placeholder}
                              disabled={
                                name === 'renewalDay' &&
                                Number(currentInputs.period) === 1
                              }
                            />
                          </div>
                        );
                      }
                    }
                  )}
                </div>
                <div className="expenses-container-1-form-buttons-container">
                  <Button
                    customStyle={{ width: '150px', height: '40px' }}
                    handleClick={handleClear}
                    label="🧹 CLEAR"
                  />
                  <Button
                    customStyle={{ width: '150px', height: '40px' }}
                    type="submit"
                    label={isLoading ? <Spinner /> : '⚡️ SAVE'}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="expenses-container-2">
          <div className="expenses-container-2-expenses-container">
            {Object.keys(expensesData).length ? (
              handleRenderExpenses(expensesData)
            ) : isLoading ? (
              renderSpinner()
            ) : (
              <div className="spinner-container">
                ⬅️ add one item to the list ✨
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
