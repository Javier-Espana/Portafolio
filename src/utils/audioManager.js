// Gestor de Audio Sintético (Web Audio API)
// Genera sonidos premium sin requerir archivos externos.

class AudioManager {
  constructor() {
    this.ctx = null
    this.uiMuted = true // UI sounds apagados por defecto
    this.initialized = false
    
    // Reproductores HTML5 para música
    this.cinematicAudio = new Audio('/sounds/Main Theme (NO TOCAR).mp3')
    this.cinematicAudio.preload = 'auto'
    
    this.loopAudio = new Audio('/sounds/musica.mp3')
    this.loopAudio.loop = true
    this.loopAudio.preload = 'auto'
  }

  init() {
    if (this.initialized) return
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)()
      this.initialized = true
      
      // Manejar la política de autoplay (requiere que el usuario interactúe con la página primero)
      if (this.ctx.state === 'suspended') {
        const resumeAudio = () => {
          this.ctx.resume()
          document.removeEventListener('click', resumeAudio)
          document.removeEventListener('keydown', resumeAudio)
        }
        document.addEventListener('click', resumeAudio)
        document.addEventListener('keydown', resumeAudio)
      }
    } catch (e) {
      console.warn('AudioContext no soportado en este navegador')
      this.muted = true
    }
  }

  toggleUIMute() {
    this.uiMuted = !this.uiMuted
    return this.uiMuted
  }

  enableUIAudio() {
    this.uiMuted = false
  }

  // --- Música y Temas ---

  playCinematicTheme(onEndCallback) {
    if (this.loopAudio) {
      this.loopAudio.pause()
      this.loopAudio.currentTime = 0
    }
    
    this.cinematicAudio.volume = 1
    this.cinematicAudio.play().catch(e => console.warn('Autoplay bloqueado:', e))
    
    this.cinematicAudio.onended = () => {
      if (onEndCallback) onEndCallback()
    }
  }

  stopCinematicTheme() {
    this.cinematicAudio.pause()
    this.cinematicAudio.currentTime = 0
  }

  playLoopMusic() {
    this.loopAudio.volume = 0
    this.loopAudio.play().catch(e => console.warn('Autoplay bloqueado:', e))
    
    // Fade in
    let vol = 0
    const fade = setInterval(() => {
      vol += 0.05
      if (vol >= 0.5) {
        this.loopAudio.volume = 0.5 // Volumen moderado para fondo
        clearInterval(fade)
      } else {
        this.loopAudio.volume = vol
      }
    }, 100)
  }

  playTone(freq, type, duration, vol = 0.1) {
    if (this.uiMuted || !this.ctx) return

    const osc = this.ctx.createOscillator()
    const gainNode = this.ctx.createGain()

    osc.type = type
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

    gainNode.gain.setValueAtTime(vol, this.ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration)

    osc.connect(gainNode)
    gainNode.connect(this.ctx.destination)

    osc.start()
    osc.stop(this.ctx.currentTime + duration)
  }

  // --- Sonidos Específicos de UI ---

  playHover() {
    if (!this.initialized) this.init()
    // Sonido sutil tipo "tic" de cristal
    this.playTone(800, 'sine', 0.05, 0.03)
  }

  playClick() {
    if (!this.initialized) this.init()
    // Sonido de confirmación moderno (acorde doble)
    this.playTone(600, 'sine', 0.1, 0.05)
    setTimeout(() => this.playTone(800, 'sine', 0.15, 0.05), 50)
  }

  playTerminalOpen() {
    if (!this.initialized) this.init()
    // Sonido futurista al abrir terminal
    this.playTone(300, 'square', 0.1, 0.02)
    setTimeout(() => this.playTone(150, 'square', 0.2, 0.02), 80)
  }

  playScramble() {
    if (!this.initialized) this.init()
    // Ruido electrónico rápido para el efecto de texto
    const length = 0.2
    const bufferSize = this.ctx.sampleRate * length
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.02
    }
    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer
    noise.connect(this.ctx.destination)
    noise.start()
  }
}

export const audioManager = new AudioManager()
