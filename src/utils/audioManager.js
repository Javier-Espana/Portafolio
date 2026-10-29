// Gestor de Audio Sintético (Web Audio API) y HTML5 Audio
// Centraliza el control de volumen y mute global de todo el portafolio

class AudioManager {
  constructor() {
    this.ctx = null
    this.initialized = false

    // Estado de mute global (persistido)
    const savedMute = typeof localStorage !== 'undefined' ? localStorage.getItem('audio_globally_muted') : null
    this.isGloballyMuted = savedMute !== null ? savedMute === 'true' : false
    this.uiMuted = this.isGloballyMuted

    // Reproductores HTML5 para música
    this.cinematicAudio = typeof Audio !== 'undefined' ? new Audio('/sounds/cinematic-theme.mp3') : null
    if (this.cinematicAudio) this.cinematicAudio.preload = 'auto'
    
    this.loopAudio = typeof Audio !== 'undefined' ? new Audio('/sounds/musica.mp3') : null
    if (this.loopAudio) {
      this.loopAudio.loop = true
      this.loopAudio.preload = 'auto'
    }

    this.listeners = new Set()
  }

  init() {
    if (this.initialized) return
    try {
      if (typeof window !== 'undefined') {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        if (AudioContextClass) {
          this.ctx = new AudioContextClass()
          this.initialized = true

          if (this.ctx.state === 'suspended') {
            const resumeAudio = () => {
              if (this.ctx && !this.isGloballyMuted) {
                this.ctx.resume()
              }
              document.removeEventListener('click', resumeAudio)
              document.removeEventListener('keydown', resumeAudio)
            }
            document.addEventListener('click', resumeAudio)
            document.addEventListener('keydown', resumeAudio)
          }
        }
      }
    } catch (e) {
      console.warn('AudioContext no disponible')
    }
  }

  subscribe(callback) {
    this.listeners.add(callback)
    callback(this.isGloballyMuted)
    return () => this.listeners.delete(callback)
  }

  notify() {
    this.listeners.forEach(cb => cb(this.isGloballyMuted))
  }

  toggleGlobalMute() {
    this.isGloballyMuted = !this.isGloballyMuted
    this.uiMuted = this.isGloballyMuted

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('audio_globally_muted', this.isGloballyMuted.toString())
    }

    if (this.isGloballyMuted) {
      this.stopAllAudio()
    }

    this.notify()
    return this.isGloballyMuted
  }

  setMute(state) {
    this.isGloballyMuted = !!state
    this.uiMuted = this.isGloballyMuted
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('audio_globally_muted', this.isGloballyMuted.toString())
    }
    if (this.isGloballyMuted) {
      this.stopAllAudio()
    }
    this.notify()
  }

  stopAllAudio() {
    if (this.cinematicAudio) {
      this.cinematicAudio.pause()
      this.cinematicAudio.currentTime = 0
    }
    if (this.loopAudio) {
      this.loopAudio.pause()
      this.loopAudio.currentTime = 0
    }
    if (this.ctx && this.ctx.state === 'running') {
      try {
        this.ctx.suspend()
      } catch (e) {}
    }
  }

  playCinematicTheme(onEndCallback) {
    if (this.isGloballyMuted) return

    if (this.loopAudio) {
      this.loopAudio.pause()
      this.loopAudio.currentTime = 0
    }
    
    if (this.cinematicAudio) {
      this.cinematicAudio.volume = 1
      this.cinematicAudio.play().catch(() => {})
      
      this.cinematicAudio.onended = () => {
        if (onEndCallback) onEndCallback()
      }
    }
  }

  stopCinematicTheme() {
    if (this.cinematicAudio) {
      this.cinematicAudio.pause()
      this.cinematicAudio.currentTime = 0
    }
  }

  playLoopMusic() {
    if (this.isGloballyMuted || !this.loopAudio) return
    this.loopAudio.volume = 0.4
    this.loopAudio.play().catch(() => {})
  }

  stopLoopMusic() {
    if (this.loopAudio) {
      this.loopAudio.pause()
    }
  }

  playTone(freq, type, duration, vol = 0.1) {
    if (this.isGloballyMuted || this.uiMuted || !this.ctx) return

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }

      const osc = this.ctx.createOscillator()
      const gainNode = this.ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

      gainNode.gain.setValueAtTime(vol, this.ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration)

      osc.connect(gainNode)
      gainNode.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + duration)
    } catch (e) {}
  }

  playHover() {
    if (this.isGloballyMuted) return
    if (!this.initialized) this.init()
    this.playTone(800, 'sine', 0.04, 0.02)
  }

  playClick() {
    if (this.isGloballyMuted) return
    if (!this.initialized) this.init()
    this.playTone(600, 'sine', 0.08, 0.04)
    setTimeout(() => this.playTone(800, 'sine', 0.1, 0.04), 40)
  }

  playTerminalOpen() {
    if (this.isGloballyMuted) return
    if (!this.initialized) this.init()
    this.playTone(300, 'square', 0.08, 0.02)
    setTimeout(() => this.playTone(150, 'square', 0.15, 0.02), 70)
  }

  playScramble() {
    if (this.isGloballyMuted || !this.ctx) return
    if (!this.initialized) this.init()
    try {
      const length = 0.15
      const bufferSize = this.ctx.sampleRate * length
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.015
      }
      const noise = this.ctx.createBufferSource()
      noise.buffer = buffer
      noise.connect(this.ctx.destination)
      noise.start()
    } catch (e) {}
  }
}

export const audioManager = new AudioManager()
