import axiosInstance from './axiosInstance';

export async function fetchNotifications() {
  try {
    const response = await axiosInstance.get('notifications');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    throw error;
  }
}
