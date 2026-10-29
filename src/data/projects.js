// Proyectos reales y destacados de Javier Eduardo España Pacheco
// Basados en logros y soluciones de producción verificadas en su CV

export const featuredProjectsData = [
  {
    id: 'bam-cobranza-2026',
    title: {
      es: 'Optimización de Cobranza (1.er Lugar Hackatón BAM 2026 - Octubre)',
      en: 'Debt Collection Optimization (1st Place BAM Hackathon Oct 2026)'
    },
    description: {
      es: 'Solución end-to-end con resolvedor de direcciones de Guatemala y modelo LightGBM para priorización de llamadas por cliente, canal y horario. 92% de promesas de pago con solo el 30% de llamadas.',
      en: 'End-to-end solution featuring a Guatemala address resolver and LightGBM model prioritizing call center outreach by client, channel, and schedule. Captured 92% of payment promises with only 30% of calls.'
    },
    technologies: ['Python', 'LightGBM', 'Optuna', 'Data Science', 'FastAPI'],
    category: 'backend',
    award: '1.er Lugar Hackatón BAM 2026 (Octubre)',
    github: 'https://github.com/Javier-Espana',
    demo: null,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'bam-nlp-classifier-2026',
    title: {
      es: 'Clasificador de Servicio al Cliente en Tiempo Real (1.er Lugar Hackatón BAM 2026 - Abril)',
      en: 'Real-Time Customer Service NLP Classifier (1st Place BAM Hackathon Apr 2026)'
    },
    description: {
      es: 'Clasificación automática en tiempo real con benchmark de 5 encoders, modelo final Jina v5-nano y SVC Platt scaling. Worker en Docker y dashboard Grafana para detección de drift. Modelo en HuggingFace.',
      en: 'Real-time text classification benchmarking 5 encoders, final Jina v5-nano embeddings + Platt scaled SVC. Docker worker and Grafana dashboard for drift detection, versioned on HuggingFace.'
    },
    technologies: ['Python', 'Jina AI', 'Docker', 'Grafana', 'HuggingFace', 'Scikit-learn'],
    category: 'backend',
    award: '1.er Lugar Hackatón BAM 2026 (Abril)',
    github: 'https://github.com/Javier-Espana',
    demo: null,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'bam-forecasting-2025',
    title: {
      es: 'Sistema de Forecasting de Tarjetas de Crédito (2.º Lugar Hackatón BAM 2025)',
      en: 'Credit Card Forecasting System (2nd Place BAM Hackathon 2025)'
    },
    description: {
      es: 'Pipeline semanal con Apache Airflow y Docker Compose; feature engineering y modelos LightGBM optimizados con Optuna. Backtesting temporal, PostgreSQL y dashboard en Streamlit.',
      en: 'Weekly pipeline built with Apache Airflow and Docker Compose; Python feature engineering and Optuna-tuned LightGBM models. Temporal backtesting, PostgreSQL persistence, and Streamlit dashboard.'
    },
    technologies: ['Python', 'Apache Airflow', 'LightGBM', 'PostgreSQL', 'Streamlit', 'Docker'],
    category: 'backend',
    award: '2.º Lugar Hackatón BAM 2025',
    github: 'https://github.com/Javier-Espana',
    demo: null,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'optyma-crm',
    title: {
      es: 'CRM para Optyma Clínica Oftalmológica y Óptica',
      en: 'CRM for Optyma Ophthalmology & Optical Clinic'
    },
    description: {
      es: 'Aplicación web empresarial con backend en Go (Echo), frontend en Vue.js (Vite), PostgreSQL y Docker. Cuestionarios médicos dinámicos, almacenamiento MinIO/S3 y CI/CD con GitHub Actions.',
      en: 'Enterprise healthcare web app featuring Go (Echo) microservices, Vue.js (Vite) frontend, PostgreSQL, and Docker. Dynamic medical questionnaires, MinIO/S3 object storage, and GitHub Actions CI/CD.'
    },
    technologies: ['Go', 'Vue.js', 'PostgreSQL', 'Docker', 'MinIO/S3', 'GitHub Actions'],
    category: 'fullstack',
    award: 'Producción Clínica',
    github: 'https://github.com/Javier-Espana',
    demo: null,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    featured: true
  }
]
