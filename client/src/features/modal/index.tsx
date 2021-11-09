import { Button } from '../button';
import { Spinner } from '../spinner';
interface IModalProps {
  cancelCallback: () => void;
  nextCallback: () => void;
  handleInputChange?: (value: any) => void;
  label?: string;
  fieldType?: string;
  inputPlaceholder?: string;
  inputValue?: string;
  type: 'form' | 'info';
  cancelLabel?: string;
  submitLabel?: string;
  paragraphValue?: string;
  isLoading?: boolean;
  error?: string;
}

export const Modal = ({
  cancelCallback,
  nextCallback,
  handleInputChange,
  label,
  fieldType,
  inputPlaceholder,
  inputValue,
  type,
  cancelLabel,
  submitLabel,
  paragraphValue,
  isLoading,
  error,
}: IModalProps) => {
  if (isLoading)
    return (
      <div className="custom-modal-container">
        <div className="spinner-container">
          <Spinner />
        </div>
      </div>
    );

  return (
    <>
      <div className="custom-modal-container">
        {type === 'form' && (
          <div className="custom-modal-form">
            <div className="custom-modal-form-box">
              <div className="custom-modal-form-box-label">{label}</div>
              <div className="custom-modal-form-box-input">
                <input
                  className="custom-modal-form-box-input-input"
                  placeholder={inputPlaceholder}
                  type={fieldType}
                  onChange={handleInputChange}
                  value={inputValue}
                />
              </div>
            </div>
            {error && (
              <div className="custom-modal-form-error-box">
                ⚠️
                <div className="custom-modal-form-error-box-error">{error}</div>
              </div>
            )}
          </div>
        )}

        {type === 'info' && (
          <div className="custom-modal-info">
            <h3>Info</h3>
            <p>{paragraphValue}</p>
          </div>
        )}

        <div className="custom-modal-buttons">
          <Button
            className="btn--150"
            handleClick={cancelCallback}
            label={cancelLabel ?? 'Cancel'}
          />
          {type === 'form' && (
            <Button
              className="btn--150"
              handleClick={nextCallback}
              label={submitLabel ?? 'Next'}
            />
          )}
        </div>
      </div>
      <div onClick={cancelCallback} className="custom-modal-overlay"></div>
    </>
  );
};
