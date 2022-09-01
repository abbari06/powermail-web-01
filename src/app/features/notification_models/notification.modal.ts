export interface Notifications {
    key: string;
    end_date: string;
    is_active: boolean;
    message: string;
    priority: number;
    start_date: string;
    title: string;
    color: string;
}

export interface userNotification {

    user_id: string;
    dismissed_notifications: string[];
}