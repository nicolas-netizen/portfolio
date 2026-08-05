import { useState, useCallback } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative';
  category?: string;
  keywords?: string[];
}

interface ConversationMemory {
  previousQuestions: string[];
  userInterests: string[];
  conversationContext: string[];
  userMood: 'friendly' | 'professional' | 'curious' | 'casual';
  sessionTopics: string[];
}

interface UseAIChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
}

export const useAIChat = (): UseAIChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy el asistente de IA de Nicolas. Puedo ayudarte con información sobre sus proyectos, habilidades, experiencia y más. ¿En qué puedo ayudarte?',
      timestamp: new Date(),
      sentiment: 'positive',
      category: 'greeting'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationMemory, setConversationMemory] = useState<ConversationMemory>({
    previousQuestions: [],
    userInterests: [],
    conversationContext: [],
    userMood: 'friendly',
    sessionTopics: []
  });

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    // Analizar sentimiento y categoría del mensaje
    const sentiment = analyzeSentiment(message);
    const category = categorizeMessage(message);
    const keywords = extractKeywords(message);

    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date(),
      sentiment,
      category,
      keywords
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Actualizar memoria de conversación
      setConversationMemory(prev => {
        const newMemory = { ...prev };
        
        // Agregar pregunta anterior
        newMemory.previousQuestions.push(message);
        if (newMemory.previousQuestions.length > 10) {
          newMemory.previousQuestions = newMemory.previousQuestions.slice(-10);
        }
        
        // Actualizar intereses del usuario
        keywords.forEach(keyword => {
          if (!newMemory.userInterests.includes(keyword)) {
            newMemory.userInterests.push(keyword);
          }
        });
        
        // Actualizar contexto de conversación
        newMemory.conversationContext.push(`${category}: ${message}`);
        if (newMemory.conversationContext.length > 5) {
          newMemory.conversationContext = newMemory.conversationContext.slice(-5);
        }
        
        // Actualizar estado de ánimo
        if (sentiment === 'positive') {
          newMemory.userMood = 'friendly';
        } else if (sentiment === 'negative') {
          newMemory.userMood = 'professional';
        }
        
        // Actualizar temas de sesión
        if (!newMemory.sessionTopics.includes(category)) {
          newMemory.sessionTopics.push(category);
        }
        
        return newMemory;
      });
      
      // Obtener respuesta de IA inteligente con memoria
      const response = await getSmartResponse(message, conversationMemory);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        sentiment: 'positive',
        category: 'response'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('Error al procesar la solicitud. Por favor, intenta de nuevo.');
      console.error('AI Chat Error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [conversationMemory]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        role: 'assistant',
        content: '¡Hola! Soy el asistente de IA de Nicolas. Puedo ayudarte con información sobre sus proyectos, habilidades, experiencia y más. ¿En qué puedo ayudarte?',
        timestamp: new Date(),
        sentiment: 'positive',
        category: 'greeting'
      }
    ]);
    setConversationMemory({
      previousQuestions: [],
      userInterests: [],
      conversationContext: [],
      userMood: 'friendly',
      sessionTopics: []
    });
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat
  };
};

// Función para analizar el sentimiento del mensaje
const analyzeSentiment = (message: string): 'positive' | 'neutral' | 'negative' => {
  const lowerMessage = message.toLowerCase();
  
  const positiveWords = ['genial', 'excelente', 'increíble', 'fantástico', 'perfecto', 'bueno', 'me gusta', 'gracias', 'hola', 'hi', 'hello', 'wow', 'impresionante', 'increible'];
  const negativeWords = ['malo', 'terrible', 'horrible', 'odio', 'no me gusta', 'problema', 'error', 'falla', 'bug', 'lento', 'feo'];
  
  const positiveCount = positiveWords.filter(word => lowerMessage.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerMessage.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};

// Función para categorizar el mensaje
const categorizeMessage = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hola') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) return 'greeting';
  if (lowerMessage.includes('proyecto') || lowerMessage.includes('project')) return 'projects';
  if (lowerMessage.includes('habilidad') || lowerMessage.includes('skill') || lowerMessage.includes('tecnologia')) return 'skills';
  if (lowerMessage.includes('contacto') || lowerMessage.includes('contact') || lowerMessage.includes('email')) return 'contact';
  if (lowerMessage.includes('experiencia') || lowerMessage.includes('experience') || lowerMessage.includes('trabajo')) return 'experience';
  if (lowerMessage.includes('github') || lowerMessage.includes('repositorio')) return 'github';
  if (lowerMessage.includes('edad') || lowerMessage.includes('años') || lowerMessage.includes('viejo') || lowerMessage.includes('joven')) return 'personal';
  if (lowerMessage.includes('donde') || lowerMessage.includes('ubicacion') || lowerMessage.includes('vive')) return 'location';
  if (lowerMessage.includes('como es') || lowerMessage.includes('personalidad') || lowerMessage.includes('caracter')) return 'personality';
  if (lowerMessage.includes('ayuda') || lowerMessage.includes('help')) return 'help';
  
  return 'general';
};

// Función para extraer palabras clave
const extractKeywords = (message: string): string[] => {
  const lowerMessage = message.toLowerCase();
  const keywords: string[] = [];
  
  const techKeywords = ['react', 'typescript', 'javascript', 'node', 'flutter', 'unity', 'c#', 'python', 'mongodb', 'html', 'css', 'tailwind'];
  const projectKeywords = ['juntea', 'chapiri', 'goblin', 'nuevo mundo', 'portfolio', 'e-commerce', 'app', 'juego', 'web'];
  const skillKeywords = ['frontend', 'backend', 'full stack', 'desarrollo', 'programacion', 'coding'];
  
  [...techKeywords, ...projectKeywords, ...skillKeywords].forEach(keyword => {
    if (lowerMessage.includes(keyword)) {
      keywords.push(keyword);
    }
  });
  
  return keywords;
};


// Función principal para generar respuestas con IA simulada
const getSmartResponse = async (message: string, memory?: ConversationMemory): Promise<string> => {
  try {
    // Usar IA simulada local con memoria de conversación
    const response = await getLocalAIResponse(message, memory);
    return response;
  } catch (error) {
    console.log('AI failed, using fallback:', error);
    return getSmartFallbackResponse(message);
  }
};

// Función para obtener respuestas de IA simulada local (sin APIs externas)
const getLocalAIResponse = async (message: string, memory?: ConversationMemory): Promise<string> => {
  // Simular delay de API para parecer real
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  // Analizar el proyecto completo para generar respuestas inteligentes
  const projectAnalysis = await analyzeProjectData();
  
  // Generar respuestas dinámicas basadas en análisis del proyecto y memoria
  const aiPatterns = generateIntelligentPatterns(message, projectAnalysis, memory);
  const selectedPattern = aiPatterns[Math.floor(Math.random() * aiPatterns.length)];
  
  // Aplicar variaciones para parecer más natural
  const variations = [
    `${selectedPattern}`,
    `¡Excelente pregunta! ${selectedPattern}`,
    `Te cuento: ${selectedPattern.toLowerCase()}`,
    `Según mi análisis: ${selectedPattern.toLowerCase()}`,
    `Muy buena pregunta. ${selectedPattern}`,
    `Déjame explicarte: ${selectedPattern.toLowerCase()}`,
    `Perfecto, ${selectedPattern.toLowerCase()}`,
    `Claro, ${selectedPattern.toLowerCase()}`
  ];
  
  const finalResponse = variations[Math.floor(Math.random() * variations.length)];
  
  return enhanceAIResponse(finalResponse, message, memory);
};

// Función para obtener datos de GitHub en tiempo real
const getGitHubData = async () => {
  try {
    const { getGitHubHeaders } = await import('../config/github');
    
    const response = await fetch('https://api.github.com/users/nicolas-netizen', {
      headers: getGitHubHeaders()
    });
    
    if (!response.ok) {
      console.error('GitHub API Error:', response.status, response.statusText);
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }
    
    const userData = await response.json();
    
    const reposResponse = await fetch('https://api.github.com/users/nicolas-netizen/repos?sort=updated&per_page=10', {
      headers: getGitHubHeaders()
    });
    
    if (!reposResponse.ok) {
      console.error('GitHub API Error:', reposResponse.status, reposResponse.statusText);
      throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
    }
    
    const reposData = await reposResponse.json();
    
    return {
      user: userData,
      repos: reposData,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.log('GitHub API error, using cached data:', error);
    return null;
  }
};

// Función para analizar todos los datos del proyecto
const analyzeProjectData = async () => {
  // Intentar obtener datos de GitHub en tiempo real
  const gitHubData = await getGitHubData();
  
  return {
    // Información personal
    personal: {
      name: "Nicolas Paniagua",
      location: "Argentina",
      email: "nicolas.paniagua05f@gmail.com",
      linkedin: "linkedin.com/in/nicolas-paniagua-80150a256",
      github: "github.com/nicolas-netizen",
      age: "Joven desarrollador (empezó a programar a los 15 años)",
      languages: ["Español", "Inglés", "C#"],
      interests: ["Desarrollo de Juegos", "Videojuegos", "Resolución de Problemas", "Apps Móviles"]
    },
    
    // Proyectos completados
    projects: [
      {
        name: "Juntea",
        type: "App Móvil",
        description: "App móvil para gestión de eventos sociales",
        technologies: ["Flutter", "Dart", "Express", "MongoDB"],
        url: "https://triven.com.ar/",
        category: "mobile"
      },
      {
        name: "Academia Chapiri",
        type: "Plataforma Educativa",
        description: "Plataforma educativa moderna con sistema de gestión de cursos",
        technologies: ["React", "TypeScript", "Tailwind CSS"],
        url: "https://psico-olive.vercel.app/",
        category: "web"
      },
      {
        name: "El Ataque de los Goblins",
        type: "Videojuego",
        description: "Juego de defensa de torres donde debes proteger tu castillo",
        technologies: ["Unity", "C#"],
        url: "https://nico-pano00.itch.io/el-ataque-de-los-goblins",
        category: "gaming"
      },
      {
        name: "Mundo Nuevo E-commerce",
        type: "Plataforma E-commerce",
        description: "Plataforma de comercio electrónico full-stack",
        technologies: ["React", "Node.js", "Tailwind CSS", "Express", "MongoDB"],
        url: "https://nuevomundosolar.com/",
        category: "ecommerce"
      },
      {
        name: "GG Build",
        type: "E-commerce Gaming",
        description: "Plataforma web especializada en venta de PC gaming personalizadas con configurador de PC",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
        url: "https://gg-build.vercel.app/",
        category: "ecommerce"
      },
      {
        name: "SparkFound",
        type: "Sitio Web Corporativo",
        description: "Sitio web para SparkFound, un Centro de Operaciones de Seguridad de próxima generación (NG-SOC) de ciberseguridad",
        technologies: ["React", "TypeScript", "Tailwind CSS"],
        url: "https://www.sparkfound.tech/",
        category: "web"
      }
    ],
    
    // Habilidades técnicas
    technicalSkills: {
      frontend: ["React", "TypeScript", "JavaScript", "HTML5/CSS3", "Tailwind CSS"],
      backend: ["Node.js", "Python", "Express", "MongoDB"],
      mobile: ["Flutter", "Dart"],
      gaming: ["Unity", "C#"],
      tools: ["Git", "VS Code", "Visual Studio"],
      databases: ["MongoDB", "SQL Server"]
    },
    
      // Estadísticas
      stats: {
        completedProjects: 7,
        technologies: 16,
        activeProjects: 8,
        yearsExperience: 3,
        gameJams: "Múltiples participaciones",
        hackathons: "Múltiples participaciones"
      },
      
      // Datos de GitHub en tiempo real (si están disponibles)
      gitHub: gitHubData ? {
        followers: gitHubData.user.followers,
        publicRepos: gitHubData.user.public_repos,
        lastUpdated: gitHubData.lastUpdated,
        recentRepos: gitHubData.repos.slice(0, 5).map((repo: any) => ({
          name: repo.name,
          description: repo.description,
          language: repo.language,
          updated: repo.updated_at
        }))
      } : null
    };
  };

// Función para generar patrones inteligentes basados en análisis del proyecto y memoria
const generateIntelligentPatterns = (message: string, projectData: any, memory?: ConversationMemory): string[] => {
  const lowerMessage = message.toLowerCase();
  
  // Saludos con memoria
  if (lowerMessage.includes('hola') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
    const memoryContext = memory ? `Veo que ya hemos hablado sobre ${memory.sessionTopics.join(', ')}. ` : '';
    const interestContext = memory && memory.userInterests.length > 0 ? `Noto que te interesan ${memory.userInterests.slice(0, 3).join(', ')}. ` : '';
    
    return [
      `¡Hola! 👋 Soy el asistente de IA de ${projectData.personal.name}. ${memoryContext}${interestContext}He analizado todo su portfolio y puedo contarte sobre sus ${projectData.stats.completedProjects} proyectos, ${projectData.stats.technologies} tecnologías que domina, y su experiencia en desarrollo Full Stack. ¿En qué puedo ayudarte?`,
      `¡Qué gusto conocerte! Soy una IA especializada en el portfolio de ${projectData.personal.name}. ${memoryContext}He estudiado sus proyectos como ${projectData.projects[0].name}, ${projectData.projects[1].name}, y ${projectData.projects[2].name}. ¿Qué te interesa saber?`,
      `¡Saludos! Me presento como el asistente inteligente de ${projectData.personal.name}. ${memoryContext}He analizado su trabajo en ${projectData.technicalSkills.frontend.join(', ')}, ${projectData.technicalSkills.backend.join(', ')}, y desarrollo móvil con ${projectData.technicalSkills.mobile.join(', ')}. ¿En qué puedo ayudarte?`
    ];
  }
  
  // Preguntas sobre apariencia
  if (lowerMessage.includes('lindo') || lowerMessage.includes('guapo') || lowerMessage.includes('bonito') || lowerMessage.includes('atractivo') || lowerMessage.includes('monito')) {
    return [
      `${projectData.personal.name} es definitivamente atractivo profesionalmente. Su portfolio muestra ${projectData.stats.completedProjects} proyectos impresionantes, desde apps móviles como ${projectData.projects[0].name} hasta videojuegos como ${projectData.projects[2].name}. Su versatilidad técnica es muy atractiva.`,
      `Desde mi análisis del portfolio, puedo decir que ${projectData.personal.name} tiene un 'atractivo' técnico excepcional. Domina ${projectData.stats.technologies} tecnologías diferentes, ha participado en ${projectData.stats.gameJams} y ${projectData.stats.hackathons}. Eso es muy atractivo en el mundo tech.`,
      `Lo que encuentro más 'atractivo' de ${projectData.personal.name} es su diversidad: desarrolla en ${projectData.technicalSkills.frontend.join(', ')}, backend con ${projectData.technicalSkills.backend.join(', ')}, móvil con ${projectData.technicalSkills.mobile.join(', ')}, y gaming con ${projectData.technicalSkills.gaming.join(', ')}. Una combinación muy atractiva.`
    ];
  }
  
  // Preguntas sobre habilidades con respuestas creativas
  if (lowerMessage.includes('habilidad') || lowerMessage.includes('skill') || lowerMessage.includes('tecnologia')) {
    return [
      `${projectData.personal.name} domina un stack tecnológico impresionante: Frontend con ${projectData.technicalSkills.frontend.join(', ')}, Backend con ${projectData.technicalSkills.backend.join(', ')}, Móvil con ${projectData.technicalSkills.mobile.join(', ')}, y Gaming con ${projectData.technicalSkills.gaming.join(', ')}. En total, ${projectData.stats.technologies} tecnologías.`,
      `Sus habilidades abarcan desarrollo completo: Frontend (${projectData.technicalSkills.frontend.join(', ')}), Backend (${projectData.technicalSkills.backend.join(', ')}), Móvil (${projectData.technicalSkills.mobile.join(', ')}), Gaming (${projectData.technicalSkills.gaming.join(', ')}), y herramientas como ${projectData.technicalSkills.tools.join(', ')}.`,
      `El expertise técnico de ${projectData.personal.name} incluye ${projectData.stats.technologies} tecnologías: Frontend con ${projectData.technicalSkills.frontend.join(', ')}, Backend con ${projectData.technicalSkills.backend.join(', ')}, Bases de datos como ${projectData.technicalSkills.databases.join(', ')}, y desarrollo móvil/gaming.`,
      `¡Wow! 🤯 ${projectData.personal.name} es como un "Swiss Army Knife" del desarrollo: puede hacer de todo. Desde ${projectData.technicalSkills.frontend[0]} hasta ${projectData.technicalSkills.gaming[0]}, pasando por ${projectData.technicalSkills.backend[0]} y ${projectData.technicalSkills.mobile[0]}. ¡Es impresionante!`,
      `Te cuento algo genial: ${projectData.personal.name} no solo sabe programar, sino que domina ${projectData.stats.technologies} tecnologías diferentes. Es como tener un equipo completo de desarrolladores en una sola persona. 🚀`,
      `¿Sabías que ${projectData.personal.name} puede crear desde apps móviles hasta videojuegos? Su stack incluye ${projectData.technicalSkills.frontend.join(', ')}, ${projectData.technicalSkills.backend.join(', ')}, ${projectData.technicalSkills.mobile.join(', ')}, y ${projectData.technicalSkills.gaming.join(', ')}. ¡Es increíble!`
    ];
  }
  
  // Preguntas sobre proyectos con respuestas creativas
  if (lowerMessage.includes('proyecto') || lowerMessage.includes('project')) {
    return [
      `${projectData.personal.name} ha desarrollado ${projectData.stats.completedProjects} proyectos fascinantes: ${projectData.projects[0].name} (app móvil), ${projectData.projects[1].name} (plataforma educativa), ${projectData.projects[2].name} (videojuego), ${projectData.projects[3].name} (e-commerce), y más.`,
      `Sus proyectos demuestran versatilidad: ${projectData.projects[0].name} (móvil con Flutter), ${projectData.projects[1].name} (web con React), ${projectData.projects[2].name} (gaming con Unity), ${projectData.projects[3].name} (e-commerce full-stack). Cada uno con tecnologías diferentes.`,
      `El portfolio incluye: ${projectData.projects[0].name} (gestión de eventos), ${projectData.projects[1].name} (educación), ${projectData.projects[2].name} (tower defense), ${projectData.projects[3].name} (comercio electrónico). Proyectos muy diversos y completos.`,
      `¡Increíble! 🎯 ${projectData.personal.name} no se limita a un solo tipo de proyecto. Tiene ${projectData.projects[0].name} (app móvil), ${projectData.projects[1].name} (plataforma web), ${projectData.projects[2].name} (videojuego), y ${projectData.projects[3].name} (e-commerce). ¡Es como tener un desarrollador completo!`,
      `Te cuento algo genial: ${projectData.personal.name} puede crear desde apps móviles hasta videojuegos. Sus proyectos ${projectData.projects[0].name} y ${projectData.projects[2].name} lo demuestran. ¡Es impresionante la diversidad!`,
      `¿Sabías que ${projectData.personal.name} ha creado ${projectData.stats.completedProjects} proyectos diferentes? Desde ${projectData.projects[0].name} hasta ${projectData.projects[3].name}, cada uno con tecnologías únicas. ¡Es como tener un portfolio de ensueño!`
    ];
  }
  
  // Preguntas generales con respuestas creativas
  const creativeResponses = [
    `${projectData.personal.name} es un desarrollador Full Stack de ${projectData.personal.location} con ${projectData.stats.yearsExperience} años de experiencia. Ha completado ${projectData.stats.completedProjects} proyectos usando ${projectData.stats.technologies} tecnologías diferentes.`,
    `Como desarrollador, ${projectData.personal.name} destaca por su versatilidad: frontend (${projectData.technicalSkills.frontend.join(', ')}), backend (${projectData.technicalSkills.backend.join(', ')}), móvil (${projectData.technicalSkills.mobile.join(', ')}), gaming (${projectData.technicalSkills.gaming.join(', ')}).`,
    `El perfil de ${projectData.personal.name} combina experiencia técnica sólida (${projectData.stats.technologies} tecnologías) con creatividad (${projectData.stats.completedProjects} proyectos diversos). Sus proyectos muestran competencia técnica y visión innovadora.`,
    `¡Qué pregunta tan interesante! 🤔 ${projectData.personal.name} es como un "unicornio" en el desarrollo: domina ${projectData.stats.technologies} tecnologías diferentes, desde ${projectData.technicalSkills.frontend[0]} hasta ${projectData.technicalSkills.gaming[0]}. Es raro encontrar alguien tan versátil.`,
    `Te cuento algo genial sobre ${projectData.personal.name}: no solo programa, sino que crea experiencias completas. Sus ${projectData.stats.completedProjects} proyectos van desde apps móviles hasta videojuegos. ¡Es como tener un desarrollador completo en una sola persona!`,
    `¿Sabías que ${projectData.personal.name} es de esos desarrolladores que pueden hacer de todo? 🚀 Frontend, backend, móvil, gaming... Es como tener un equipo completo en una sola persona. Sus proyectos ${projectData.projects[0].name} y ${projectData.projects[2].name} lo demuestran.`
  ];
  
  // Agregar contexto de memoria si existe
  if (memory && memory.previousQuestions.length > 0) {
    const lastTopic = memory.sessionTopics[memory.sessionTopics.length - 1];
    creativeResponses.push(`Veo que ya hemos hablado sobre ${lastTopic}. ${projectData.personal.name} tiene mucho más que ofrecer en esa área y muchas otras. ¿Te interesa profundizar más?`);
  }
  
  return creativeResponses;
};

// Función para aprender de patrones y mejorar respuestas
const learnFromPatterns = (message: string, response: string, memory?: ConversationMemory): string => {
  if (!memory) return response;
  
  // Analizar si la respuesta fue efectiva basándose en el contexto
  const lowerMessage = message.toLowerCase();
  
  // Si el usuario hace preguntas similares, mejorar la respuesta
  const similarQuestions = memory.previousQuestions.filter(q => 
    q.toLowerCase().includes(lowerMessage.split(' ')[0]) || 
    q.toLowerCase().includes(lowerMessage.split(' ')[1])
  );
  
  if (similarQuestions.length > 0) {
    // Mejorar la respuesta con más contexto
    const followUps = [
      ' ¿Te gustaría saber más sobre algún aspecto específico?',
      ' ¿Hay algo más que te interese?',
      ' ¿Quieres que profundice en algún detalle?',
      ' ¿Te interesa conocer más sobre esto?'
    ];
    const followUp = followUps[Math.floor(Math.random() * followUps.length)];
    return `${response}${followUp}`;
  }
  
  // Si el usuario está en modo "curioso", dar más detalles
  if (memory.userMood === 'curious') {
    const detailedResponse = `${response} ¿Hay algo más específico que te gustaría saber? Puedo darte más detalles sobre cualquier aspecto.`;
    return detailedResponse;
  }
  
  // Si el usuario está en modo "profesional", ser más técnico
  if (memory.userMood === 'professional') {
    const technicalResponse = `${response} Desde una perspectiva técnica, puedo explicarte más detalles sobre la implementación si te interesa.`;
    return technicalResponse;
  }
  
  return response;
};

// Función para mejorar respuestas de IA
const enhanceAIResponse = (aiResponse: string, originalMessage: string, memory?: ConversationMemory): string => {
  const lowerMessage = originalMessage.toLowerCase();
  
  // Si es un saludo, hacer la respuesta más natural
  if (lowerMessage.includes('hola') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
    return `¡Hola! 👋 ${aiResponse} ¿En qué más puedo ayudarte?`;
  }
  
  // Si la respuesta es muy corta, expandirla
  if (aiResponse.length < 20) {
    return `${aiResponse} ¿Te gustaría saber más sobre algún aspecto específico del trabajo de Nicolas?`;
  }
  
  // Aplicar aprendizaje de patrones
  const learnedResponse = learnFromPatterns(originalMessage, aiResponse, memory);
  
  // Si la respuesta es coherente, usarla tal como está
  return learnedResponse;
};

// Función de fallback inteligente con respuestas contextuales
const getSmartFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Saludos y conversación casual
  if (lowerMessage.includes('hola') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
    return `¡Hola! 👋 Soy el asistente de IA de Nicolas. Me da mucho gusto saludarte. Puedo ayudarte con información sobre sus proyectos, habilidades, experiencia y más. ¿En qué puedo ayudarte hoy?`;
  }
  
  if (lowerMessage.includes('como estas') || lowerMessage.includes('como va') || lowerMessage.includes('que tal')) {
    return `¡Muy bien, gracias por preguntar! 😊 Estoy aquí para ayudarte con cualquier información sobre Nicolas y su trabajo. ¿Hay algo específico que te gustaría saber?`;
  }
  
  // Preguntas sobre apariencia física
  if (lowerMessage.includes('lindo') || lowerMessage.includes('guapo') || lowerMessage.includes('bonito') || lowerMessage.includes('atractivo') || lowerMessage.includes('monito')) {
    return `¡Qué pregunta tan interesante! 😊 Basándome en su portfolio, puedo decirte que Nicolas es un desarrollador muy talentoso y apasionado por su trabajo. Su creatividad y dedicación se reflejan en cada proyecto que ha creado. ¿Te interesa conocer más sobre sus habilidades técnicas o proyectos?`;
  }
  
  // Preguntas sobre habilidades
  if (lowerMessage.includes('habilidad') || lowerMessage.includes('skill') || lowerMessage.includes('tecnologia')) {
    return `Nicolas domina un stack tecnológico completo: React, TypeScript, Node.js, Flutter, Unity, C#, Python, MongoDB y más. Su versatilidad le permite trabajar en desarrollo web, móvil y de juegos. ¿Te interesa alguna tecnología específica?`;
  }
  
  // Preguntas sobre Nicolas
  if (lowerMessage.includes('quien es') || lowerMessage.includes('que hace')) {
    return `Nicolas Paniagua es un desarrollador Full Stack de Argentina. Es un profesional apasionado por la tecnología que ha trabajado en proyectos increíbles como aplicaciones móviles, plataformas e-commerce, videojuegos y este mismo portfolio. ¿Te interesa conocer más sobre algún aspecto específico de su trabajo?`;
  }
  
  if (lowerMessage.includes('edad') || lowerMessage.includes('años')) {
    return `Nicolas es un desarrollador joven y talentoso. Aunque no especifica su edad exacta en el portfolio, puedo ver que es un profesional con experiencia sólida en desarrollo Full Stack. Su portfolio muestra proyectos maduros y bien ejecutados. ¿Te gustaría saber más sobre su experiencia?`;
  }
  
  if (lowerMessage.includes('donde vive') || lowerMessage.includes('ubicacion')) {
    return `Nicolas vive en Argentina. Es un desarrollador Full Stack con una perspectiva global, siempre abierto a oportunidades y colaboraciones internacionales. ¿Te interesa conocer más sobre su trabajo o cómo contactarlo?`;
  }
  
  // Preguntas técnicas
  if (lowerMessage.includes('proyecto') || lowerMessage.includes('project')) {
    return `Nicolas ha desarrollado varios proyectos impresionantes: Juntea (app móvil de eventos), Chapiri (plataforma e-commerce), Goblin Attack (juego 2D), y este portfolio interactivo. Cada proyecto muestra diferentes habilidades y enfoques técnicos. ¿Quieres saber más sobre algún proyecto específico?`;
  }
  
  if (lowerMessage.includes('contacto') || lowerMessage.includes('contact') || lowerMessage.includes('email')) {
    return `Puedes contactar a Nicolas a través de su email: nicolas.paniagua05f@gmail.com, LinkedIn: linkedin.com/in/nicolas-paniagua-80150a256, o GitHub: github.com/nicolas-netizen. Está disponible para oportunidades y colaboraciones.`;
  }
  
  if (lowerMessage.includes('github') || lowerMessage.includes('repositorio')) {
    return `Nicolas tiene varios repositorios interesantes en GitHub: github.com/nicolas-netizen. Sus proyectos incluyen aplicaciones web, móviles, juegos y este mismo portfolio. ¿Quieres que te cuente sobre algún proyecto específico?`;
  }
  
  // Preguntas sobre personalidad
  if (lowerMessage.includes('como es') || lowerMessage.includes('personalidad') || lowerMessage.includes('caracter')) {
    return `Basándome en su portfolio, Nicolas es un desarrollador apasionado, técnicamente excelente, innovador y versátil. Combina excelencia técnica con soft skills excepcionales. Es el tipo de profesional que cualquier empresa querría tener en su equipo. ¿Te interesa conocer más sobre su metodología de trabajo?`;
  }
  
  // Preguntas sobre experiencia
  if (lowerMessage.includes('experiencia') || lowerMessage.includes('experience') || lowerMessage.includes('trabajo')) {
    return `Nicolas es un desarrollador Full Stack con experiencia diversa en desarrollo web empresarial, aplicaciones móviles nativas, videojuegos, infraestructura y e-commerce. Ha liderado equipos y mentorizado desarrolladores. ¿Te interesa conocer más detalles sobre algún aspecto específico?`;
  }
  
  // Preguntas sobre el portfolio
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('portafolio') || lowerMessage.includes('sitio')) {
    return `¡Estás usando el portfolio de Nicolas! 🎉 Este sitio web fue desarrollado con React, TypeScript, Tailwind CSS, Framer Motion y muchas tecnologías modernas. Incluye una terminal interactiva con IA, múltiples temas y diseño responsive. ¿Te gusta la experiencia?`;
  }
  
  // Preguntas de ayuda
  if (lowerMessage.includes('ayuda') || lowerMessage.includes('help')) {
    return `Puedo ayudarte con información sobre Nicolas: sus proyectos, habilidades, experiencia, personalidad, contacto y más. Solo pregúntame lo que necesites saber. ¿Por dónde empezamos?`;
  }
  
  // Respuesta genérica inteligente
  const genericResponses = [
    `Interesante pregunta sobre Nicolas. Es un desarrollador Full Stack muy talentoso con experiencia en múltiples tecnologías. ¿Te gustaría saber más sobre sus proyectos, habilidades o experiencia?`,
    `Buena pregunta. Nicolas es un desarrollador versátil con un portfolio impresionante. Puedo ayudarte con información sobre sus proyectos, habilidades técnicas, experiencia o cómo contactarlo. ¿Qué te interesa más?`,
    `Nicolas es un desarrollador talentoso con experiencia en React, Node.js, Flutter y Unity. ¿Quieres que te cuente sobre algún aspecto específico de su trabajo?`,
    `Puedo ayudarte con información detallada sobre Nicolas y su trabajo. ¿Te interesa conocer sus proyectos, habilidades, experiencia o cómo contactarlo?`
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
};