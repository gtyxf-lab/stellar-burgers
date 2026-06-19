import { ModalOverlayUI } from '@ui';
import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { FC, memo } from 'react';
import styles from './modal.module.css';
import { TModalUIProps } from './type';
export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children, ...props }) => (
    <>
      <div {...props} className={styles.modal} data-cy='modal'>
        <div className={styles.header}>
          <h3 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h3>
          <button
            className={styles.button}
            type='button'
            onClick={onClose}
            data-cy='modal-close'
          >
            <CloseIcon type='primary' />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} data-cy='modal-overlay' />
    </>
  )
);
