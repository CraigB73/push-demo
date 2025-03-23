import styles from "./pushModal.module.css"

interface PushModalProps {
  onClose: () => void
  message: string | null
}

const PushModal = ({ onClose, message }: PushModalProps ) => {
 if (!message) return null;
  return (
    <div className={styles.modalOverlayStyle}>
      <div className={styles.modalStyle}>
        <h2>Notification</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PushModal;
