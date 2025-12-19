import express from 'express';
import Notification from '../models/Notification.js';
import { verifyAdminToken, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get notifications for admin
router.get('/admin', verifyAdminToken, async (req, res) => {
  try {
    const notifications = await Notification.find({
      adminId: req.userId || req.body.adminId,
      type: { $in: ['payment_submitted', 'payment_received'] }
    })
      .populate('bookingId', 'guestName roomId totalPrice')
      .populate('paymentId', 'transactionId paymentMethod')
      .sort({ createdAt: -1 })
      .limit(50);
    
    const unreadCount = await Notification.countDocuments({
      adminId: req.userId || req.body.adminId,
      isRead: false,
      type: { $in: ['payment_submitted', 'payment_received'] }
    });

    res.json({ notifications, unreadCount });
  } catch (error) {
    console.error('Error fetching admin notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

// Get notifications for user
router.get('/user', verifyToken, async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.userId,
      type: { $in: ['booking_confirmed', 'booking_status_updated', 'booking_cancelled'] }
    })
      .populate('bookingId', 'guestName roomId status')
      .sort({ createdAt: -1 })
      .limit(50);
    
    const unreadCount = await Notification.countDocuments({
      userId: req.userId,
      isRead: false,
      type: { $in: ['booking_confirmed', 'booking_status_updated', 'booking_cancelled'] }
    });

    res.json({ notifications, unreadCount });
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

// Mark notification as read
router.put('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.json(notification);
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ message: 'Error updating notification' });
  }
});

// Mark all notifications as read
router.put('/user/read-all', verifyToken, async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.userId, isRead: false },
      { isRead: true, updatedAt: Date.now() }
    );
    
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error updating notifications:', error);
    res.status(500).json({ message: 'Error updating notifications' });
  }
});

// Delete notification
router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Error deleting notification' });
  }
});

export default router;
