import AlertCus from "../ViewCustom/alertCustom"

export const sessionExpired = () => {
    AlertCus.Alert('Lỗi', 'errors.sessionExpired')
}

export const badRequest = () => {
    AlertCus.Alert('Lỗi', 'errors.badRequest')
}

export const serverError = () => {
    AlertCus.Alert('Lỗi', 'errors.serverError')
}

export const notFound = () => {
    AlertCus.Alert('Lỗi', 'errors.notFound')
}

export const notPermission = () => {
    AlertCus.Alert('Lỗi', 'errors.notPermission')
}

export const otherError = () => {
    AlertCus.Alert('Lỗi', 'errors.otherError')
}