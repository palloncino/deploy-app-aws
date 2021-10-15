import { Modal } from '../modal';

interface IInfoRegisterModal {
  handleCloseModal: () => void;
  paragraphValue: string;
}

export const InfoRegisterModal = ({
  handleCloseModal,
  paragraphValue,
}: IInfoRegisterModal) => {
  return (
    <Modal
      cancelCallback={handleCloseModal}
      nextCallback={handleCloseModal}
      type="info"
      cancelLabel="OK"
      paragraphValue={paragraphValue}
    />
  );
};
