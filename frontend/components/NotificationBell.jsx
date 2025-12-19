import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const NotificationBell = ({ userType = 'user' }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    // Connect to Socket.io
    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem(userType === 'admin' ? 'adminToken' : 'token');
        const endpoint = userType === 'admin' ? '/api/notifications/admin' : '/api/notifications/user';

        const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    newSocket.on('connect', () => {
      console.log('Connected to server');

      // Join appropriate room
      if (userType === 'admin') {
        newSocket.emit('join-admin', 'admin-user');
      } else {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user._id) {
          newSocket.emit('join-user', user._id);
        }
      }
    });

    // Listen for notifications
    newSocket.on('admin-notification', (notification) => {
      if (userType === 'admin') {
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
      }
    });

    newSocket.on('user-notification', (notification) => {
      if (userType === 'user' && notification.userId === JSON.parse(localStorage.getItem('user') || '{}')._id) {
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
      }
    });

    fetchNotifications();

    return () => newSocket.close();
  }, [userType]);

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/${notificationId}/read`, {
        method: 'PUT'
      });

      setNotifications(prev => prev.map(n =>
        n._id === notificationId ? { ...n, isRead: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/${notificationId}`, {
        method: 'DELETE'
      });

      setNotifications(prev => prev.filter(n => n._id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s',
          fontSize: '14px'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        🔔 Notifications
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            background: '#ef4444',
            color: 'white',
            fontSize: '12px',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div style={{
          position: 'absolute',
          right: '0',
          marginTop: '8px',
          width: '320px',
          background: 'white',
          border: '2px solid #d9cfe5',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(74, 58, 82, 0.15)',
          zIndex: '50',
          maxHeight: '384px',
          overflowY: 'auto'
        }}>
          <div style={{
            padding: '16px',
            borderBottom: '2px solid #e8dff0'
          }}>
            <h3 style={{
              fontWeight: '700',
              color: '#4a3a52',
              margin: '0',
              fontSize: '16px'
            }}>
              🔔 Notifications
            </h3>
          </div>

          {notifications.length === 0 ? (
            <div style={{
              padding: '16px',
              textAlign: 'center',
              color: '#6b5b72'
            }}>
              No notifications
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  style={{
                    padding: '16px',
                    borderBottom: '2px solid #e8dff0',
                    background: notification.isRead ? 'white' : 'rgba(74, 58, 82, 0.05)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = notification.isRead ? '#f5f3f8' : 'rgba(74, 58, 82, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = notification.isRead ? 'white' : 'rgba(74, 58, 82, 0.05)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ flex: '1' }}>
                      <h4 style={{
                        fontWeight: '600',
                        color: '#4a3a52',
                        margin: '0 0 8px 0',
                        fontSize: '14px'
                      }}>
                        {notification.title}
                      </h4>
                      <p style={{
                        fontSize: '13px',
                        color: '#6b5b72',
                        margin: '8px 0'
                      }}>
                        {notification.message}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: '#9b8aa8',
                        margin: '8px 0 0 0'
                      }}>
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNotification(notification._id)}
                      style={{
                        marginLeft: '8px',
                        color: '#ef4444',
                        background: 'none',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        padding: '0',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#dc2626'}
                      onMouseLeave={(e) => e.target.style.color = '#ef4444'}
                    >
                      ✕
                    </button>
                  </div>
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      style={{
                        marginTop: '8px',
                        fontSize: '12px',
                        background: 'linear-gradient(135deg, #4a3a52 0%, #6b5b72 100%)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 4px 12px rgba(74, 58, 82, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      ✓ Mark as Read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
