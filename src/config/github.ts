// Configuración de GitHub API
export const GITHUB_CONFIG = {
  // Token de GitHub para evitar rate limiting
  // Puedes crear un token en: https://github.com/settings/tokens
  // Solo necesita permisos de lectura pública
  TOKEN: import.meta.env.VITE_GITHUB_TOKEN || '',
  
  // Usuario de GitHub
  USERNAME: 'nicolas-netizen',
  
  // Headers para las peticiones
  HEADERS: {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-app',
  }
};

// Función para obtener headers con autenticación
export const getGitHubHeaders = () => {
  const headers: HeadersInit = {
    ...GITHUB_CONFIG.HEADERS,
  };
  
  // Debug: verificar si el token se está cargando
  console.log('GitHub Token loaded:', GITHUB_CONFIG.TOKEN ? 'YES' : 'NO');
  console.log('Token value:', GITHUB_CONFIG.TOKEN?.substring(0, 10) + '...');
  
  // Solo agregar token si está disponible
  if (GITHUB_CONFIG.TOKEN && GITHUB_CONFIG.TOKEN.length > 10) {
    headers['Authorization'] = `token ${GITHUB_CONFIG.TOKEN}`;
    console.log('Authorization header added');
  } else {
    console.log('No valid token found, using public API');
  }
  
  return headers;
};

// Datos mock para GitHub (temporal hasta que funcione la API)
export const MOCK_GITHUB_DATA = {
  user: {
    login: 'nicolas-netizen',
    name: 'Nicolas Paniagua',
    bio: 'Full Stack Developer | React, TypeScript, Node.js | Mobile & Game Developer',
    avatar_url: 'https://avatars.githubusercontent.com/u/12345678?v=4',
    public_repos: 6,
    followers: 18,
    following: 12,
    html_url: 'https://github.com/nicolas-netizen',
    created_at: '2020-01-01T00:00:00Z',
    updated_at: '2024-01-25T00:00:00Z'
  },
  repos: [
    {
      id: 1,
      name: 'portfolio',
      full_name: 'nicolas-netizen/portfolio',
      description: 'Mi portfolio personal desarrollado con React y TypeScript',
      html_url: 'https://github.com/nicolas-netizen/portfolio',
      stargazers_count: 5,
      forks_count: 2,
      language: 'TypeScript',
      updated_at: '2024-01-25T00:00:00Z'
    },
    {
      id: 2,
      name: 'ecommerce-app',
      full_name: 'nicolas-netizen/ecommerce-app',
      description: 'Aplicación de e-commerce con React y Node.js',
      html_url: 'https://github.com/nicolas-netizen/ecommerce-app',
      stargazers_count: 8,
      forks_count: 3,
      language: 'JavaScript',
      updated_at: '2024-01-20T00:00:00Z'
    },
    {
      id: 3,
      name: 'task-manager',
      full_name: 'nicolas-netizen/task-manager',
      description: 'Gestor de tareas con React y Firebase',
      html_url: 'https://github.com/nicolas-netizen/task-manager',
      stargazers_count: 3,
      forks_count: 1,
      language: 'TypeScript',
      updated_at: '2024-01-15T00:00:00Z'
    },
    {
      id: 9991,
      name: 'Juntea - Events App',
      full_name: 'nicolas-netizen/juntea-events',
      description: 'Mobile application for event management built with Flutter and Dart',
      html_url: 'https://github.com/nicolas-netizen/juntea-events',
      stargazers_count: 47,
      forks_count: 12,
      language: 'Dart',
      updated_at: '2024-01-15T00:00:00Z'
    },
    {
      id: 9992,
      name: 'Chapiri E-commerce',
      full_name: 'nicolas-netizen/chapiri-ecommerce',
      description: 'Full-stack e-commerce platform with React, Node.js and MongoDB',
      html_url: 'https://github.com/nicolas-netizen/chapiri-ecommerce',
      stargazers_count: 32,
      forks_count: 8,
      language: 'TypeScript',
      updated_at: '2023-11-20T00:00:00Z'
    },
    {
      id: 9993,
      name: 'Goblin Attack Game',
      full_name: 'nicolas-netizen/goblin-attack',
      description: '2D platformer game developed with Unity and C#',
      html_url: 'https://github.com/nicolas-netizen/goblin-attack',
      stargazers_count: 28,
      forks_count: 6,
      language: 'C#',
      updated_at: '2023-09-10T00:00:00Z'
    }
  ]
};
