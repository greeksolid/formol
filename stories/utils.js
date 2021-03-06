import { withState } from 'storybook4-state'
import { boolean, number, select } from '@storybook/addon-knobs'

import Formol from '../src'
import { diff } from '../src/utils/object'

export const withStateForm = (form, initial) =>
  withState({ transient: initial, item: initial })(({ store }) => {
    const delay = number('Fake delay (ms)', null, {}, 'form')
    return form({
      onSubmit: async (item, transient, names) => {
        await new Promise(resolve => setTimeout(resolve, delay))
        const oldItem = store.state.item || {}
        store.set({ item, diff: diff(item, oldItem, names) })
      },
      onChange: transient => store.set({ transient }),
      item: store.state.item,
      transient: store.state.transient,
      readOnly: boolean('Form read only', false, 'form'),
      i18n: select('I18n', Object.keys(Formol.i18n), 'en', 'form'),
    })
  })
