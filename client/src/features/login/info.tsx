import { Modal } from '../modal';

interface IInfoLoginModal {
  handleCloseModal: () => void;
  paragraphValue: string;
}

export const InfoLoginModal = ({
  handleCloseModal,
  paragraphValue,
}: IInfoLoginModal) => {
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
