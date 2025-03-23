// import axios from 'axios';
import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client"
import PushModal from "./component/PushModal";




const socket = io('http://localhost:8000'); // Connect to the server


const App = () => {
  const [pushMessage, setPushMessage] = useState<string>('');
  const [notifications, setNotifications] = useState<string[]>([]);
  const [modalMessage, setModalMessage] = useState<string | null>(null); 

  useEffect(() => {
    socket.on('notification', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data.message]);
      setModalMessage(data.message); // Set the modal message
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  const handleOnSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTimeout(() => {
      socket.emit('pushNotification', { message: pushMessage });
      setPushMessage('');
    }, 500);
  };

  const closeModal = () => {
    setModalMessage(null); // Close the modal
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Socket.io Push Notification</h1>
      <form onSubmit={handleOnSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="pushNotification">Push Notification</label>
        <textarea
          id="pushNotification"
          value={pushMessage}
          onChange={e => setPushMessage(e.target.value)}
          rows={4}
        />
        <button type="submit">Push Message</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h2>Notifications</h2>
        {notifications.map((notification, index) => (
          <div key={index} style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc' }}>
            {notification}
          </div>
        ))}
      </div>
        <PushModal message ={modalMessage} onClose={closeModal}/>
  
    </div>
  );
};
export default App;