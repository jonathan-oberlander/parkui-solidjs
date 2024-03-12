import { createToaster } from '@ark-ui/solid'
import { XIcon } from 'lucide-solid'
import { IconButton } from '~/components/ui'
import * as Toast from '~/components/ui/toast'

export const [Toaster, toast] = createToaster({
  placement: 'bottom-end',
  pauseOnInteraction: true,
  render(toast) {
    return (
      <Toast.Root animation="drawer-in-right">
        <Toast.Title>{toast().title}</Toast.Title>
        <Toast.Description>{toast().description}</Toast.Description>
        <Toast.CloseTrigger asChild>
          <IconButton size="sm" variant="link">
            <XIcon />
          </IconButton>
        </Toast.CloseTrigger>
      </Toast.Root>
    )
  },
})
