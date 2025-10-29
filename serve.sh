#!/bin/bash

# Script simple para servir el proyecto con Python
# Úsalo temporalmente mientras se resuelven problemas de instalación

echo "🚀 Iniciando servidor de desarrollo simple..."
echo ""
echo "📝 NOTA: Este es un servidor temporal."
echo "   Para el servidor completo con Vite, ejecuta: npm install && npm run dev"
echo ""
echo "🌐 Abriendo en: http://localhost:8000"
echo ""
echo "⚠️  Presiona Ctrl+C para detener el servidor"
echo ""

# Verificar si Python 3 está disponible
if command -v python3 &> /dev/null
then
    python3 -m http.server 8000
elif command -v python &> /dev/null
then
    python -m http.server 8000
else
    echo "❌ Error: Python no está instalado"
    echo "   Instala Python o ejecuta: npm install && npm run dev"
    exit 1
fi
