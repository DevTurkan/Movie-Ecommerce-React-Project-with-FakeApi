import { notification, Button } from 'antd'
import './notification.scss'

export const Notify = (message: string) => {
  notification.open({
    message: message,
    duration: 3,
    placement: 'topRight',
    className: '',
    top: 87,
  })
}
