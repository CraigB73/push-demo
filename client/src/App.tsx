// import axios from 'axios';
import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client"



const socket = io('http://localhost:8000'); // Connect to the server


const App = () => {
  const [pushMessage, setPushMessage] = useState<string>('');
  const [notifications, setNotifications] = useState<string[]>([]);

  // Request notification permission when the component mounts
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    // Listen for notifications from the server
    socket.on('notification', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data.message]);
      // Show browser notification
      if (Notification.permission === 'granted') {
        new Notification('New Notification', {
          body: data.message,
          icon: 'https://example.com/icon.png', // Optional: Add an icon URL
        });
      }
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
    </div>
  );
};
export default App;