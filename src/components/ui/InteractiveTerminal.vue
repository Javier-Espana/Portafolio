<template>
  <transition name="terminal-slide">
    <div v-if="isOpen" class="terminal-overlay" @click.self="closeTerminal">
      <div class="terminal-window">
        <!-- Window Header -->
        <div class="terminal-header">
          <div class="terminal-buttons">
            <span class="btn-close" @click="closeTerminal"></span>
            <span class="btn-min"></span>
            <span class="btn-max"></span>
          </div>
          <div class="terminal-title">javi@portafolio: ~</div>
        </div>
        
        <!-- Terminal Body -->
        <div class="terminal-body" ref="terminalBody" @click="focusInput">
          <div v-for="(line, index) in history" :key="index" class="terminal-line" :class="line.type">
            <span v-if="line.type === 'input'" class="prompt">javi@portafolio:~$</span>
            <span v-html="line.text"></span>
          </div>
          
          <div class="terminal-input-line">
            <span class="prompt">javi@portafolio:~$</span>
            <input 
              ref="commandInput"
              v-model="currentCommand" 
              type="text" 
              class="terminal-input"
              @keydown.enter="handleCommand"
              @keydown.up.prevent="historyUp"
              @keydown.down.prevent="historyDown"
              spellcheck="false"
              autocomplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { audioManager } from '../../utils/audioManager'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const router = useRouter()
const { t } = useI18n()

const terminalBody = ref(null)
const commandInput = ref(null)

const currentCommand = ref('')
const history = ref([
  { type: 'output', text: 'Bienvenido al modo interactivo de Javier España.' },
  { type: 'output', text: 'Escribe <span class="highlight">help</span> para ver los comandos disponibles.' }
])

const commandHistory = ref([])
const historyPointer = ref(-1)

const closeTerminal = () => {
  emit('close')
}

const focusInput = () => {
  if (commandInput.value) {
    commandInput.value.focus()
  }
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    audioManager.playTerminalOpen()
    nextTick(() => {
      focusInput()
      scrollToBottom()
    })
  }
})

const scrollToBottom = () => {
  if (terminalBody.value) {
    terminalBody.value.scrollTop = terminalBody.value.scrollHeight
  }
}

const historyUp = () => {
  if (commandHistory.value.length === 0) return
  if (historyPointer.value < commandHistory.value.length - 1) {
    historyPointer.value++
    currentCommand.value = commandHistory.value[commandHistory.value.length - 1 - historyPointer.value]
  }
}

const historyDown = () => {
  if (historyPointer.value > 0) {
    historyPointer.value--
    currentCommand.value = commandHistory.value[commandHistory.value.length - 1 - historyPointer.value]
  } else if (historyPointer.value === 0) {
    historyPointer.value = -1
    currentCommand.value = ''
  }
}

const handleCommand = () => {
  const cmd = currentCommand.value.trim()
  if (!cmd) return

  // Add to UI history
  history.value.push({ type: 'input', text: cmd })
  
  // Add to command history
  commandHistory.value.push(cmd)
  historyPointer.value = -1

  currentCommand.value = ''

  processCommand(cmd.toLowerCase())
  
  nextTick(() => {
    scrollToBottom()
  })
}

const processCommand = (cmd) => {
  const args = cmd.split(' ')
  const mainCmd = args[0]

  switch(mainCmd) {
    case 'help':
      history.value.push({ type: 'output', text: `
Comandos disponibles:<br>
  <span class="highlight">help</span>       - Muestra este mensaje<br>
  <span class="highlight">whoami</span>     - Muestra mi biografía<br>
  <span class="highlight">skills</span>     - Lista mis habilidades técnicas<br>
  <span class="highlight">projects</span>   - Redirige a la página de proyectos<br>
  <span class="highlight">clear</span>      - Limpia la terminal<br>
  <span class="highlight">exit</span>       - Cierra la terminal<br>
  <span class="highlight">sudo</span>       - Privilegios de administrador
      `})
      break
    
    case 'whoami':
      history.value.push({ type: 'output', text: t('hero.subtitle') })
      break
    
    case 'skills':
      history.value.push({ type: 'output', text: `
[Frontend]: Vue.js, React, HTML/CSS, Tailwind<br>
[Backend]:  Node.js, Python, Java, C++<br>
[Database]: PostgreSQL, MongoDB, Redis<br>
[DevOps]:   Docker, Linux, AWS, CI/CD
      `})
      break

    case 'projects':
      history.value.push({ type: 'output', text: 'Iniciando secuencia de salto... Redirigiendo a /projects' })
      setTimeout(() => {
        closeTerminal()
        router.push('/projects')
      }, 1000)
      break

    case 'clear':
      history.value = []
      break

    case 'exit':
      closeTerminal()
      break

    case 'sudo':
      if (args[1] === 'rm' && args[2] === '-rf' && args[3] === '/') {
        history.value.push({ type: 'error', text: 'Permiso denegado. Estuviste a punto de borrar todo el portafolio. ¡Buen intento!' })
      } else {
        history.value.push({ type: 'error', text: 'javi is not in the sudoers file. This incident will be reported.' })
      }
      break

    case 'ls':
      history.value.push({ type: 'output', text: '<span style="color:#6C63FF">src</span>  <span style="color:#6C63FF">public</span>  index.html  package.json  vite.config.js' })
      break

    default:
      history.value.push({ type: 'error', text: `Comando no encontrado: ${mainCmd}. Escribe 'help' para ver los comandos.` })
  }
}
</script>

<style scoped>
.terminal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.terminal-window {
  width: 100%;
  max-width: 800px;
  height: 60vh;
  min-height: 400px;
  background: rgba(10, 10, 15, 0.95);
  border: 1px solid rgba(108, 99, 255, 0.3);
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.terminal-header {
  height: 40px;
  background: rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  position: relative;
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.btn-close, .btn-min, .btn-max {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.btn-close { background: #FF5F56; }
.btn-min { background: #FFBD2E; }
.btn-max { background: #27C93F; }

.btn-close:hover { filter: brightness(0.8); }

.terminal-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

.terminal-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  font-family: var(--font-mono);
  font-size: 0.95rem;
  line-height: 1.6;
  color: #E2E8F0;
  display: flex;
  flex-direction: column;
}

.terminal-line {
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.prompt {
  color: #27C93F;
  margin-right: 0.75rem;
  font-weight: bold;
}

.terminal-line.error {
  color: #FF5F56;
}

.highlight {
  color: var(--accent-cyan);
}

.terminal-input-line {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #E2E8F0;
  font-family: var(--font-mono);
  font-size: 0.95rem;
  outline: none;
  padding: 0;
}

/* Animations */
.terminal-slide-enter-active,
.terminal-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.terminal-slide-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}

.terminal-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

@media (max-width: 600px) {
  .terminal-overlay { padding: 1rem; }
  .terminal-window { height: 80vh; }
}
</style>
