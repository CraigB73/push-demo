

interface PushModalProps {
  onClose: () => void
  message: string | null
}

const PushModal = ({ onClose, message }: PushModalProps ) => {
  if (!message) return null;
  return (
    <div className="modalOverlayStyle">
      <div className="modalStyle">
        <h2>Notification</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PushModal;
