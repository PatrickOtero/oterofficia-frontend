import { useContext } from "react";
import { NotificationContext } from "../../../contexts/notifications";

export const useNotifications = () => useContext(NotificationContext);
