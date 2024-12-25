import { $id } from '../functions'

export default class Canvas {
    constructor() {
        this.canvas = $id('canvas')
        this.isRender = false
    }

    render(image, width, height) {
        // Seteo las dimensiones del canvas
        this.canvas.setAttribute('width', width)
        this.canvas.setAttribute('height', height)

        // Pinto la imagen
        this.canvas.getContext('2d').drawImage(image, 0, 0, width, height)

        // Aviso que la imagen esta lista
        this.isRender = true
    }

    onClick(callback) {
        this.canvas.addEventListener('mousedown', e => {
            if (!this.isRender) return

            // Obtenemos la posicion del mouse
            const { top, left } = this.canvas.getBoundingClientRect()
            const x = e.clientX - left
            const y = e.clientY - top

            // Obtenemos el color del canvas
            const { data } = this.canvas.getContext('2d').getImageData(x, y, 1, 1)
            
            return callback({
                red: data[0],
                green: data[1],
                blue: data[2]
            })
        })
    }
}