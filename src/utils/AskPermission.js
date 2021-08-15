const { PermissionsAndroid, ToastAndroid } = require("react-native");

export const requestPermissions = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ])

        if(
            granted['PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE'] === 'denied' ||
            granted['PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE'] === 'denied'
        ) {
            ToastAndroid.show('We can not proceed without permissions', ToastAndroid.LONG)
            requestPermissions();
        }

    } catch (error) {
        console.log(error)
    }
}