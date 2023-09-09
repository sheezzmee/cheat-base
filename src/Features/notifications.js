import { cheatBase } from '../cheatBase.js';

class Notifications {
    /**
     * @param {string[]} textLines 
     * @param {Function} buttonYesListener 
     * @param {Function} buttonCloseListener 
     * @param {number} timeInMs 
     * @param {string} title 
     */
    alert = (
        textLines, 
        buttonYesListener = null, 
        buttonCloseListener = null, 
        timeInMs = 10000, 
        title = null
    ) => cheatBase.dispatch(new AddNotification_0(new Notification_0(
        new ArrayList(textLines),
        new Long(timeInMs, 0),
        new NotificationType('', 0),
        new NotificationType('', 0),
        buttonYesListener,
        buttonCloseListener,
        new NotificationType('', 0),
        title
    )));

    /**
     * @param {string[]} textLines 
     * @param {Function} buttonYesListener 
     * @param {Function} buttonCloseListener 
     * @param {number} timeInMs 
     * @param {string} title 
     */
    warning = (
        textLines, 
        buttonYesListener = null, 
        buttonCloseListener = null, 
        timeInMs = 10000, 
        title = null
    ) => cheatBase.dispatch(new AddNotification_0(new Notification_0(
        new ArrayList(textLines),
        new Long(timeInMs, 0),
        new NotificationType('', 1),
        new NotificationType('', 1),
        buttonYesListener,
        buttonCloseListener,
        new NotificationType('', 1),
        title
    )))

    /**
     * @param {string[]} textLines 
     * @param {Function} buttonYesListener 
     * @param {Function} buttonCloseListener 
     * @param {number} timeInMs 
     * @param {string} title 
     */
    info = (
        textLines, 
        buttonYesListener = null, 
        buttonCloseListener = null, 
        timeInMs = 10000, 
        title = null
    ) => cheatBase.dispatch(new AddNotification_0(new Notification_0(
        new ArrayList(textLines),
        new Long(timeInMs, 0),
        new NotificationType('', 2),
        new NotificationType('', 2),
        buttonYesListener,
        buttonCloseListener,
        new NotificationType('', 2),
        title
    )))
}

export const notifications = new Notifications;