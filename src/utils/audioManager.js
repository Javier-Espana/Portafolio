// Gestor de Audio Sintético (Web Audio API) y HTML5 Audio
// Centraliza el control de volumen, fade in/out y mute global de todo el portafolio

class AudioManager {
  constructor() {
    this.ctx = null
    this.initialized = false

    // Estado de mute global (persistido)
    const savedMute = typeof localStorage !== 'undefined' ? localStorage.getItem('audio_globally_muted') : null
    this.isGloballyMuted = savedMute !== null ? savedMute === 'true' : false
    this.uiMuted = this.isGloballyMuted

    // Niveles de volumen ajustados (60% del volumen original para una escucha equilibrada)
    this.cinematicVolume = 0.6 // 60% del máximo original (1.0)
    this.loopVolume = 0.25      // Volumen suave ambiental

    // Estado de reproducción y modos
    this.currentMode = 'normal' // 'normal' | 'cinematic'
    this.cinematicThemeEnded = false
    this.wasCinematicPlaying = false
    this.wasLoopPlaying = false

    // Reproductores HTML5 para música
    this.cinematicAudio = typeof Audio !== 'undefined' ? new Audio('/sounds/cinematic-theme.mp3') : null
    if (this.cinematicAudio) {
      this.cinematicAudio.preload = 'auto'
      this.cinematicAudio.volume = this.cinematicVolume
    }
    
    this.loopAudio = typeof Audio !== 'undefined' ? new Audio('/sounds/musica.mp3') : null
    if (this.loopAudio) {
      this.loopAudio.loop = true
      this.loopAudio.preload = 'auto'
      this.loopAudio.volume = this.loopVolume
    }

    this.fadeAnimFrames = new Map()
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

  // Fade Out suave y progresivo
  fadeOutAudio(audio, duration = 1200, callback) {
    if (!audio) return
    if (this.fadeAnimFrames.has(audio)) {
      cancelAnimationFrame(this.fadeAnimFrames.get(audio))
    }

    const startVol = audio.volume
    const startTime = performance.now()

    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / duration)
      audio.volume = Math.max(0, startVol * (1 - progress))

      if (progress < 1) {
        const frameId = requestAnimationFrame(step)
        this.fadeAnimFrames.set(audio, frameId)
      } else {
        this.fadeAnimFrames.delete(audio)
        if (callback) callback()
      }
    }
    const frameId = requestAnimationFrame(step)
    this.fadeAnimFrames.set(audio, frameId)
  }

  // Fade In suave
  fadeInAudio(audio, targetVolume, duration = 1200) {
    if (!audio || this.isGloballyMuted) return
    if (this.fadeAnimFrames.has(audio)) {
      cancelAnimationFrame(this.fadeAnimFrames.get(audio))
    }

    audio.volume = 0
    audio.play().catch(() => {})
    const startTime = performance.now()

    const step = (now) => {
      if (this.isGloballyMuted) return
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / duration)
      audio.volume = Math.min(targetVolume, targetVolume * progress)

      if (progress < 1) {
        const frameId = requestAnimationFrame(step)
        this.fadeAnimFrames.set(audio, frameId)
      } else {
        this.fadeAnimFrames.delete(audio)
      }
    }
    const frameId = requestAnimationFrame(step)
    this.fadeAnimFrames.set(audio, frameId)
  }

  toggleGlobalMute() {
    this.isGloballyMuted = !this.isGloballyMuted
    this.uiMuted = this.isGloballyMuted

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('audio_globally_muted', this.isGloballyMuted.toString())
    }

    if (this.isGloballyMuted) {
      // Guardar estados antes de pausar
      if (this.cinematicAudio && !this.cinematicAudio.paused) {
        this.cinematicAudio.pause()
        this.wasCinematicPlaying = true
      } else {
        this.wasCinematicPlaying = false
      }

      if (this.loopAudio && !this.loopAudio.paused) {
        this.loopAudio.pause()
        this.wasLoopPlaying = true
      } else {
        this.wasLoopPlaying = false
      }

      if (this.ctx && this.ctx.state === 'running') {
        try { this.ctx.suspend() } catch (e) {}
      }
    } else {
      // REANUDAR SONIDO AL DESMUTEAR
      if (this.ctx && this.ctx.state === 'suspended') {
        try { this.ctx.resume() } catch (e) {}
      }

      if (this.currentMode === 'cinematic') {
        if (this.cinematicThemeEnded) {
          // Si ya terminó la principal, se reanuda la secundaria
          this.playLoopMusic()
        } else {
          // Reanudar la música cinematográfica en su posición
          if (this.cinematicAudio) {
            this.cinematicAudio.volume = this.cinematicVolume
            this.cinematicAudio.play().catch(() => {})
          }
        }
      } else {
        // En modo normal de la web
        if (this.wasLoopPlaying || this.currentMode === 'normal') {
          this.playLoopMusic()
        }
      }
    }

    this.notify()
    return this.isGloballyMuted
  }

  setMute(state) {
    if (this.isGloballyMuted === !!state) return
    this.toggleGlobalMute()
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
    this.currentMode = 'cinematic'
    this.cinematicThemeEnded = false

    if (this.loopAudio) {
      this.loopAudio.pause()
      this.loopAudio.currentTime = 0
    }
    
    if (this.cinematicAudio) {
      this.cinematicAudio.volume = this.cinematicVolume
      this.cinematicAudio.currentTime = 0
      
      this.cinematicAudio.onended = () => {
        this.cinematicThemeEnded = true
        // Al terminar en full experience, pasa en automático a la música ambiental en bucle
        if (!this.isGloballyMuted) {
          this.playLoopMusic({ fadeIn: true })
        }
        if (onEndCallback) onEndCallback()
      }

      if (!this.isGloballyMuted) {
        this.cinematicAudio.play().catch(() => {})
      }
    }
  }

  // Salir de la Full Experience
  exitCinematicMode() {
    this.currentMode = 'normal'

    // Si ya había terminado la principal y la ambiental estaba sonando:
    // "y ahí sí, cuando presionas salir se mantiene la música"
    if (this.cinematicThemeEnded) {
      if (!this.isGloballyMuted && this.loopAudio && this.loopAudio.paused) {
        this.playLoopMusic()
      }
      return
    }

    // Si todavía estaba sonando la música cinematográfica:
    // "para que la música no se pare en seco, ponle un fade out suave y progresivo.
    // Una vez salgas de la full experience siempre se tiene que poner la otra música"
    if (this.cinematicAudio && !this.cinematicAudio.paused && !this.isGloballyMuted) {
      this.fadeOutAudio(this.cinematicAudio, 1200, () => {
        this.cinematicAudio.pause()
        this.cinematicAudio.currentTime = 0
      })
      this.playLoopMusic({ fadeIn: true })
    } else {
      if (this.cinematicAudio) {
        this.cinematicAudio.pause()
        this.cinematicAudio.currentTime = 0
      }
      if (!this.isGloballyMuted) {
        this.playLoopMusic({ fadeIn: true })
      }
    }
  }

  stopCinematicTheme() {
    if (this.cinematicAudio) {
      this.cinematicAudio.pause()
      this.cinematicAudio.currentTime = 0
    }
  }

  playLoopMusic(options = {}) {
    if (this.isGloballyMuted || !this.loopAudio) return

    if (options.fadeIn) {
      this.fadeInAudio(this.loopAudio, this.loopVolume, 1500)
    } else {
      this.loopAudio.volume = this.loopVolume
      this.loopAudio.play().catch(() => {})
    }
  }

  stopLoopMusic() {
    if (this.loopAudio) {
      this.loopAudio.pause()
    }
  }

  playTone(freq, type, duration, vol = 0.08) {
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
    // Deshabilitado: sin efectos molestos de sonido al pasar el cursor
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
