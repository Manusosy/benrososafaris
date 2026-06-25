import { create } from 'zustand';

export type EnquiryNotification = {
  body: string;
  createdAt: string;
  enquiryId: string;
  enquiryType: string;
  id: string;
  read: boolean;
  title: string;
};

type EnquiryNotificationState = {
  addNotification: (notification: Omit<EnquiryNotification, 'id' | 'read'>) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  notifications: EnquiryNotification[];
  unreadCount: () => number;
};

export const useEnquiryNotificationStore = create<EnquiryNotificationState>((set, get) => ({
  notifications: [],

  addNotification: (notification) =>
    set((state) => {
      const exists = state.notifications.some((item) => item.enquiryId === notification.enquiryId);
      if (exists) return state;

      return {
        notifications: [
          {
            ...notification,
            id: crypto.randomUUID(),
            read: false
          },
          ...state.notifications
        ].slice(0, 50)
      };
    }),

  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((item) => ({ ...item, read: true }))
    })),

  unreadCount: () => get().notifications.filter((item) => !item.read).length
}));
