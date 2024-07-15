import * as Notifications from 'expo-notifications';

export const services = {
    setup: async () => {
        const { status: initialStatus } = await Notifications.getPermissionsAsync();
        let permissionStatus = initialStatus;

        if (permissionStatus !== 'granted') {
            const { status: requiredStatus } = await Notifications.requestPermissionsAsync();
            permissionStatus = requiredStatus;
        }

        if (permissionStatus === 'granted') {
            await Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true,
                }),
            });

            await Notifications.setNotificationCategoryAsync('count', [
                {
                    identifier: 'delete',
                    buttonTitle: 'Remove',
                    options: {
                        isDestructive: true,
                        opensAppToForeground: true
                    }
                }
            ])

        } else {
            console.log('Permission not granted');
        }
    },
    schedule: (title, body, data, triggerTime) => {
        return Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                data: { id: data.id },
                categoryIdentifier: 'count'
            },
            trigger: {
                seconds: triggerTime
            }
        });
    },

    cancel: async (id) => {
        await Notifications.cancelScheduledNotificationAsync(id).then(() => {
            console.log('Notification cancelled', id);
        });
    },
}