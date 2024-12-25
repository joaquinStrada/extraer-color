import { config, library, dom } from '@fortawesome/fontawesome-svg-core'
import { faImage, faEye, faCopy } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import '../css/styles.css'

import Model from './Model'
import View from './View'

// Configuramos los iconos
config.mutateApproach = 'sync'

library.add(faImage)
library.add(faEye)
library.add(faCopy);
library.add(faXmark)

dom.watch()

// Initializing app
document.addEventListener('DOMContentLoaded', () => {
    const model = new Model()
    const view = new View()

    model.setView(view)
    view.setModel(model)
})