import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";

class LocalNotificationService {

    configure = onOpenNotification => {
        PushNotification.configure({
            onRegister: function(token) {
                console.log("[LocalNotificationService] onRegister: ", token);
            },
            onNotification: function(notification) {
                console.log("[LocalNotificationService] onNotification: ", notification);
                if(!notification.data) {
                    return
                }
                notification.userInteraction = true
                onOpenNotification(notification)

                if(Platform.OS === 'ios') {
                    // (required) Called when a remote is received or opened, or local notification is opened
                    notification.finish(PushNotificationIOS.FetchResult.NoData)
                }
            },

            // IOS Only (optional): default: all - Permission to register
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        })
    }

    createChannel = () => {
        PushNotification.createChannel(
            {
              channelId: "noti", // (required)
              channelName: "My channel", // (required)
              channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    unregister = () => {
        PushNotification.unregister()
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            // Android Only Properties
            ...this.buildAndroidNotification(id, title, message, data, options),
            // IOS and Android Properties
            ...this.buidIOSNotification(id, title, message, data, options),
            // IOS and Android Properties
            channelId: "noti",
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false // BOOLEAN: If the notification was opened by the user from notification
        })
    }

    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_notification",
            bigText: message || "",
            subText: title || "",
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high",
            data: data
        }
    }

    buidIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || "view",
            category: options.category || "",
            userInfo: {
                id: id,
                item: data
            }
        }
    }

    cancelAllLocalNotification = () => {
        if(Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications()
        } else {
            PushNotification.cancelAllLocalNotifications()
        }
    }

    removeDeliveriedNotificationByID = notificationId => {
        console.log("[LocalNotificationService] removeDeliveriedNotificationByID: ", notificationId);
        PushNotification.cancelLocalNotifications({ id: `${notificationId}` })
    }
}

export const localNotificationService = new LocalNotificationService()