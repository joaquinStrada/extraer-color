import { $, $id, convertRgbToHex } from '../functions'
import { allowedExtensions } from '../data'

export default class Form {
    constructor() {
        this.app = $id('app')
        this.alertForm = $id('alert-form')
        this.txtAlert = $id('txt-alert')
        this.inputImage = $id('input-image')
        this.txtBtnImage = $id('txt-btn-image')
        this.btnWebcam = $id('btn-webcam')
        this.color = $id('color')
        this.optionHex = $id('option-hex')
        this.optionRgb = $id('option-rgb')
        this.inputColor = $id('input-color')
        this.alertCopy = $id('alert-copy')
        this.callbackImage = file => {}

        this.app.addEventListener('submit', e => e.preventDefault())
        this.optionHex.addEventListener('change', () => this.onChangeOption())
        this.optionRgb.addEventListener('change', () => this.onChangeOption())
        this.app.reset()
    }

    showAlert(message) {
        this.txtAlert.innerText = message
        this.alertForm.classList.contains('show') ||
        this.alertForm.classList.add('show')
    }

    hideAlert() {
        this.alertForm.classList.contains('show') &&
        this.alertForm.classList.remove('show')
    }

    onLoadImage(callback) {
        if (callback !== null) this.callbackImage = callback

        this.inputImage.addEventListener('change', () => {
            if (this.inputImage.files.length === 0) return this.callbackImage(null)

            // Obtenemos la extension
            const { name } = this.inputImage.files[0]
            const ext = String(name.split('.').pop()).trim().toLowerCase()

            // validamos la extension
            if (!allowedExtensions.includes(ext)) {
                this.showAlert('Extension no soportada')
                this.txtBtnImage.innerText = "Cargar imagen"
                return this.callbackImage(null)
            }

            // Desactivamos la alerta, mostramos el nombre del archivo y respondemos todo correcto
            this.hideAlert()
            this.txtBtnImage.innerText = name
            this.callbackImage(this.inputImage.files[0])
        })
    }

    onWebcam(callback) {
        this.btnWebcam.addEventListener('click', e => callback(e))
    }

    setColor(color) {
        this.color.style.background = `rgb(${color.red}, ${color.green}, ${color.blue})`
        this.onChangeOption()
    }

    onChangeOption() {
        if (this.optionHex.checked) {
            this.inputColor.value = convertRgbToHex(this.color.style.background)
        } else if (this.optionRgb.checked) {
            this.inputColor.value = this.color.style.background
        }
    }

    resetFile() {
        // Obtenemos el padre
        const parent = this.inputImage.parentNode

        // Eliminamos el input image
        parent.removeChild(this.inputImage)

        // Creamos el nuevo input image
        const inputImage = document.createElement('input')
        inputImage.setAttribute('type', 'file')
        inputImage.setAttribute('class', 'input-image')
        inputImage.setAttribute('id', 'input-image')

        // Seteamos el evento
        this.inputImage = inputImage
        this.onLoadImage(null)

        // Añadimos el elemento al DOM
        parent.insertBefore(this.inputImage, $('.text-btn-image', parent))
        
        // Reseteo el txt file
        this.txtBtnImage.innerText = 'Cargar imagen'
    }
}