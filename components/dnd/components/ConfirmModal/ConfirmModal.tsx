import React, {PropsWithChildren} from 'react';
import styles from './ConfirmModal.module.css';

interface Props {
  onConfirm(): void;
  onDeny(): void;
}

export const ConfirmModal = ({
  onConfirm,
  onDeny,
  children,
}: PropsWithChildren<Props>) => (
  <div className={styles.ConfirmModal}>
    <h1 className={styles.h1}>{children}</h1>
    <div>
      <button onClick={onConfirm} className={styles.button}>Yes</button>
      <button onClick={onDeny} className={styles.button}>No</button>
    </div>
  </div>
);
