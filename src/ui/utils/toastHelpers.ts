export enum ToastDuration {
  TEN_SECONDS = 10000,
  FIVE_SECONDS = 5000
}
import {ToastOptions} from '~/src/app/Toast/domain/entities/ToastOptions'

export function showToast({
  action,
  className,
  closeOnSwipe = true,
  containerClass,
  context = null,
  duration = ToastDuration.FIVE_SECONDS,
  fitToScreen,
  fullWidth,
  icon = 'close',
  message = 'Info Toast',
  onComplete,
  position,
  singleton,
  theme = 'pe_toast',
  type = 'info'
}: ToastOptions) {
  const ToastAction = action || {
    icon: icon,
    text: '',
    onClick: (_e: any, toastObject: any) => {
      toastObject.goAway(0)
    }
  }

  if (context)
    context.$toasted.show(message, {
      action: ToastAction,
      className,
      closeOnSwipe,
      containerClass,
      duration,
      fitToScreen,
      fullWidth,
      onComplete,
      position,
      singleton,
      theme,
      type
    })
}
