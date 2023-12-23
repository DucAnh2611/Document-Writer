import { createContext, useState } from "react";
import { Notification } from "../Component/Notification";
import { createPortal } from 'react-dom';

const TIME_NOTIFICATION_SECOND = 2.5;

export const NotificationContext = createContext();

export default function NotificationProvider({children}) {
    
    const [notifications, SetNotifications] = useState();

    const addNoti = (type, message) => {

        SetNotifications({
            id: new Date().toISOString(), 
            type: type.toLowerCase(), 
            message
        });
    }

    const remove = (id) => {
        SetNotifications(null);
    }

    const StackNotification = () => 
    createPortal(<div className="notification_container">
        {
            notifications && 
                <Notification 
                key={notifications.id}
                time={TIME_NOTIFICATION_SECOND}
                remove={remove}
                noti={notifications}
                />
        }
    </div>, document.body);

        
    return (
        <NotificationContext.Provider value={{addNoti}}>
            <StackNotification/>
            {children}
        </NotificationContext.Provider>
    )
}