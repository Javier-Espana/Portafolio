// Configuración
const GITHUB_USERNAME = "Javier-Espana"; // Cambia por tu usuario real
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;

// Utilidad: fetch con caché local
async function fetchWithCache(url) {
    const cacheKey = `github_${btoa(url)}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        try {
            return JSON.parse(cached);
        } catch (e) {
            localStorage.removeItem(cacheKey);
        }
    }
    const response = await fetch(url);
    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
}

// Elementos DOM
const reposElement = document.getElementById('repos').querySelector('.stat__value');
const starsElement = document.getElementById('stars').querySelector('.stat__value');
const languagesElement = document.getElementById('languages').querySelector('.stat__value');

// Valores de ejemplo por defecto
if (reposElement) reposElement.textContent = '12';
if (starsElement) starsElement.textContent = '48';
if (languagesElement) languagesElement.textContent = '6';

// 1. Obtener stats básicos
async function getBasicStats() {
    try {
        const data = await fetchWithCache(API_URL);
        reposElement.textContent = data.public_repos;
        // Puedes personalizar aquí: mostrar followers, etc.
        starsElement.textContent = data.followers; // Ejemplo: seguidores
        animateValue(reposElement, 0, data.public_repos, 2000);
        animateValue(starsElement, 0, data.followers, 2000);
        return data.repos_url;
    } catch (error) {
        console.error("Error fetching GitHub data:", error);
    }
}

// 2. Obtener lenguajes de todos los repositorios y crear gráfico
async function getLanguages(reposUrl) {
    try {
        // Mostrar loader
        const loader = document.getElementById('chart-loader');
        if (loader) loader.style.display = 'flex';
        const repos = await fetchWithCache(`${reposUrl}?per_page=100`);
        const languageBytes = {};
        let totalBytes = 0;
        for (const repo of repos) {
            if (!repo.fork) {
                const langData = await fetchWithCache(repo.languages_url);
                Object.entries(langData).forEach(([lang, bytes]) => {
                    languageBytes[lang] = (languageBytes[lang] || 0) + bytes;
                    totalBytes += bytes;
                });
            }
        }
        // Ordenar y seleccionar top 7 (ajusta aquí el número de lenguajes)
        const topLanguages = Object.entries(languageBytes)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 7);
        // Crear gráfico de barras
        createLanguageChart(topLanguages, totalBytes);
        // Ocultar loader
        if (loader) loader.style.display = 'none';
        // Actualizar UI de lenguajes
        const languages = new Set(Object.keys(languageBytes));
        languagesElement.textContent = languages.size;
        animateValue(languagesElement, 0, languages.size, 2000);
        // Para el radar
        return processForRadar(topLanguages, totalBytes);
    } catch (error) {
        console.error("Error fetching languages:", error);
        const loader = document.getElementById('chart-loader');
        if (loader) loader.style.display = 'none';
    }
}

function createLanguageChart(languages, totalBytes) {
    const chartContainer = document.getElementById('languages-chart');
    if (!chartContainer) return;
    chartContainer.innerHTML = '';

    // Configuración de altura máxima (ajusta este valor según prefieras)
    const MAX_BAR_HEIGHT = 150; // píxeles

    languages.forEach(([lang, bytes]) => {
        const percentage = Math.round((bytes / totalBytes) * 100);
        const barHeight = (percentage / 100) * MAX_BAR_HEIGHT;

        const barContainer = document.createElement('div');
        barContainer.className = 'bar-container';

        const barWrapper = document.createElement('div');
        barWrapper.className = 'bar-wrapper';

        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = '0px'; // Inicia en 0 para animación
        bar.style.backgroundColor = getLanguageColor(lang);

        const percentageLabel = document.createElement('div');
        percentageLabel.className = 'bar-percentage';
        percentageLabel.textContent = `${percentage}%`;

        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = lang;

        bar.appendChild(percentageLabel);
        barWrapper.appendChild(bar);
        barContainer.appendChild(barWrapper);
        barContainer.appendChild(label);
        chartContainer.appendChild(barContainer);

        // Animación después de un pequeño delay
        setTimeout(() => {
            bar.style.height = `${barHeight}px`;
        }, 100);
    });
}

function processForRadar(languages, totalBytes) {
    return languages.map(([lang, bytes]) => {
        const percentage = Math.round((bytes / totalBytes) * 100);
        return {
            name: lang,
            category: "github",
            level: percentage,
            color: getLanguageColor(lang)
        };
    });
}

// 3. Animación de conteo
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 4. Colores por lenguaje (puedes ampliar este objeto)
function getLanguageColor(language) {
    const colors = {
        JavaScript: '#F7DF1E',
        Python: '#3776AB',
        HTML: '#E34F26',
        CSS: '#1572B6',
        Java: '#007396',
        TypeScript: '#3178C6',
        PHP: '#777BB4',
        Ruby: '#CC342D',
        C: '#555555',
        'C++': '#00599C',
        'C#': '#239120',
        Swift: '#FA7343',
        Kotlin: '#F18E33',
        Go: '#00ADD8',
        Rust: '#DEA584',
        Shell: '#89E051',
        Dart: '#00B4AB',
        SCSS: '#C6538C',
        Vue: '#42b883',
        Svelte: '#FF3E00',
        Solidity: '#363636',
        SQL: '#e38c00',
        default: '#00F7FF'
    };
    return colors[language] || colors.default;
}

// 5. Integración con el radar existente
async function integrateGitHubData() {
    const reposUrl = await getBasicStats();
    const githubSkills = await getLanguages(reposUrl);
    
    // Añadir habilidades al radar
    const radar = document.getElementById('radar-3d');
    if (githubSkills && radar) { // Añade verificación de radar
        githubSkills.forEach(skill => {
            const point = document.createElement('div');
            point.className = 'skill-point github';
            point.style.color = skill.color;
            point.style.transform = `translate3d(
                ${Math.random() * 300 - 150}px,
                ${(skill.level / 100) * 200 - 100}px,
                ${Math.random() * 200 - 100}px
            )`;
            point.dataset.tooltip = `${skill.name}\nUso: ${skill.level}%`;
            radar.appendChild(point);
        });
    }
}
// Inicialización
document.addEventListener('DOMContentLoaded', integrateGitHubData);