import { optionsVideo } from './data'

export default class Model {
    constructor() {
        this.view = null
    }

    setView(view) {
        this.view = view
    }

    loadImage(imageFile) {
        return new Promise((res, rej) => {
            const image = new Image()          

            image.onload = () => res(image)
            image.onerror = err => rej(err)

            image.src = URL.createObjectURL(imageFile)
        })
    }

    async getWebcam() {
        try {
            if (navigator.mediaDevices.getUserMedia) {
                return navigator.mediaDevices.getUserMedia(optionsVideo)
            } else {
                throw new Error('La webcam no esta disponible')
            }
        } catch (err) {
            throw err
        }
    }
}