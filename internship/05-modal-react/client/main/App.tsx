import { isNumber } from 'lodash-es';

const ModalProvider = ({ children }) => {
  // Ваш код

  // Елемент с затемненным бэкграундом должен иметь атрибут `data-test='modalBg'`
  // когда затемнение активно.

  return <>{children}</>;
};

const Page = () => {
  // const { showModal } = useModal();
  const showModal: any = () => {};

  const showParentModal = () =>
    showModal(({ closeModal, modalNumber }) => (
      <div className="modal" data-test="parentModal">
        <h1>Родительская модалька</h1>

        {isNumber(modalNumber) && <div data-test="modalNumber">Номер окна: {modalNumber}</div>}

        <button className="btn" onClick={showChildModal} data-test="showChildModal">
          Открыть дочернюю модальку
        </button>

        <button className="btn" onClick={closeModal} data-test="closeModal">
          Закрыть
        </button>
      </div>
    ));

  const showChildModal = () =>
    showModal(({ closeModal, modalNumber }) => (
      <div className="modal" data-test="childModal">
        <h1>Дочерняя модалька</h1>

        {isNumber(modalNumber) && <div data-test="modalNumber">Номер окна: {modalNumber}</div>}

        <button className="btn" onClick={closeModal} data-test="closeModal">
          Закрыть
        </button>
      </div>
    ));

  return (
    <div>
      <button className="btn mb-5" onClick={showParentModal} data-test="showParentModal">
        Открыть родительскую модальку
      </button>

      <div className="invisible" style={{ height: 1200 }}>
        Страница со скроллом
      </div>
    </div>
  );
};

export const App = () => (
  <ModalProvider>
    <div className="min-h-screen bg-amber-400 p-5">
      <div className="bee mx-auto mb-10"></div>
      <div className="container text-zinc-800">
        <Page />
      </div>
    </div>
  </ModalProvider>
);
