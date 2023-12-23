import { useContext} from "react"
import { NotificationContext } from "../utils/notificationProvider";

export const useNotifications = () => {

    const { addNoti } = useContext(NotificationContext);

    return { addNoti }
}