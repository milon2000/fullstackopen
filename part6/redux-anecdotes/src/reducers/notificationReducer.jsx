import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const setNotificationAction = (state, action) => action.payload
const clearNotifiationAction = (state, action) => state = ''

const notificationSlice = createSlice({
    name: 'notifiations',
    initialState,
    reducers: {
        setNotification: setNotificationAction,
        clearNotifiation: clearNotifiationAction
    }
})

export const { setNotification, clearNotifiation} =
notificationSlice.actions

export default notificationSlice.reducer

            