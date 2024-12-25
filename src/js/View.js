import Form from './components/Form'
import Canvas from './components/Canvas'
import { $id } from './functions'

export default class View {
    constructor() {
        this.model = null
        this.form = new Form()
        this.canvas = new Canvas()
        this.video = $id('video')
        this.intervalWebcam = null

        this.form.onLoadImage(image => this.onLoadImage(image))
        this.form.onWebcam(() => this.onWebcam())
        this.video.addEventListener('loadedmetadata', () => this.video.play())
        this.canvas.onClick(color => this.onClick(color))
    }

    setModel(model) {
        this.model = model
    }

    async onLoadImage(image) {
        if (image === null) return
        else if (this.intervalWebcam !== null) clearInterval(this.intervalWebcam) // Reseteo el intervalo si existe

        try {
          const Image = await this.model.loadImage(image)

          // Pinto la imagen en el canvas
          this.canvas.render(Image, Image.width, Image.height)
        } catch (err) {
            console.error(err)
        }
    }

    async onWebcam() {
        // Reseteo el intervalo si existe y el input file
        if (this.intervalWebcam !== null) clearInterval(this.intervalWebcam)
        this.form.resetFile()

        try {
            // Cargo la webcam en el tag de video
            this.video.srcObject = await this.model.getWebcam()

            // Pinto la webcam en el canvas cada 20ms
            this.canvas.render(this.video, this.video.videoWidth, this.video.videoHeight)
            this.intervalWebcam = setInterval(() => this.canvas.render(this.video, this.video.videoWidth, this.video.videoHeight), 20)
        } catch (err) {
            console.error(err)
        }
    }

    onClick(color) {
        this.form.setColor(color)
    }
}