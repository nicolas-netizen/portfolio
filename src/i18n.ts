import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Navigation
          "nav.home": "Home",
          "nav.about": "About",
          "nav.skills": "Skills",
          "nav.projects": "Projects",
          "nav.contact": "Contact",

          // Hero section
          "hero.greeting": "Hi, I'm",
          "hero.role": "Full Stack Developer",
          "hero.description": "Passionate about creating innovative web solutions",
          "hero.cta": "Get in touch",

          // About section
          "about.title": "About Me",
          "about.description": "I'm a passionate software developer with expertise in modern web technologies. Currently working as a Field Engineer N1, I combine technical knowledge with practical problem-solving skills.",
          "about.experience": "Years of Experience",
          "about.projects": "Projects Completed",
          "about.clients": "Happy Clients",
          "about.downloadCv": "Download CV",
          "about.personalDetails": "Personal Details",
          "about.birthday": "Birthday",
          "about.phone": "Phone",
          "about.email": "Email",
          "about.location": "Location",
          "about.funFact": "Fun Facts",
          "about.funFact1": "I started coding at 15",
          "about.funFact2": "I love solving puzzles",
          "about.funFact3": "I speak 2 languages",
          "about.interests": "Interests",
          "about.interest1": "Web Development",
          "about.interest2": "Game Development",
          "about.interest3": "AI & Machine Learning",
          "about.interest4": "Mobile Development",

          // Skills section
          "skills.title": "My Skills",
          "skills.technicalTitle": "Technical Skills",
          "skills.softTitle": "Soft Skills",
          "skills.javascript": "JavaScript",
          "skills.htmlcss": "HTML/CSS",
          "skills.react": "React",
          "skills.nodejs": "Node.js",
          "skills.typescript": "TypeScript",
          "skills.python": "Python",
          "skills.csharp": "C#",
          "skills.communication": "Communication",
          "skills.teamwork": "Teamwork",
          "skills.problemSolving": "Problem Solving",
          "skills.adaptability": "Adaptability",
          "skills.creativity": "Creativity",
          "skills.timeManagement": "Time Management",
          "skills.conflictResolution": "Conflict Resolution",

          // Projects section
          "projects.title": "My Projects",
          "projects.viewMore": "View More",
          "projects.viewLess": "View Less",
          "projects.playDemo": "Play Demo",
          "projects.watchVideo": "Watch Video",
          "projects.viewSourceCode": "View Source Code",
          "projects.goblinAttack.title": "The Goblin Attack",
          "projects.goblinAttack.description": "An exciting Tower Defense game developed with Unity 3D and C#.",
          "projects.webPresentation.title": "Web Page Presentation",
          "projects.webPresentation.description": "A React web system with database for advanced management.",
          "projects.portfolio.title": "Windows Forms App",
          "projects.portfolio.description": "Creating a Windows Forms application in C# like a pro: following best practices and generating the database from Visual Studio.",
          "projects.technologies": "Technologies Used",
          "projects.tech.unity": "Unity 3D",
          "projects.tech.csharp": "C#",
          "projects.tech.react": "React",
          "projects.tech.node": "Node.js",
          "projects.tech.sql": "SQL Server",
          "projects.tech.winforms": "Windows Forms",

          // Contact section
          "contact.title": "Contact Me",
          "contact.description": "Feel free to reach out to me for any questions or opportunities!",
          "contact.name": "Your Name",
          "contact.email": "Your Email",
          "contact.message": "Your Message",
          "contact.send": "Send Message",
          "contact.success": "Message sent successfully!",
          "contact.error": "Error sending message. Please try again."
        }
      },
      es: {
        translation: {
          // Navigation
          "nav.home": "Inicio",
          "nav.about": "Sobre mí",
          "nav.skills": "Habilidades",
          "nav.projects": "Proyectos",
          "nav.contact": "Contacto",

          // Hero section
          "hero.greeting": "Hola, soy",
          "hero.role": "Desarrollador Full Stack",
          "hero.description": "Apasionado por crear soluciones web innovadoras",
          "hero.cta": "Contáctame",

          // About section
          "about.title": "Sobre Mí",
          "about.description": "Soy un desarrollador de software apasionado con experiencia en tecnologías web modernas. Actualmente trabajo como Field Engineer N1, combinando conocimientos técnicos con habilidades prácticas de resolución de problemas.",
          "about.experience": "Años de Experiencia",
          "about.projects": "Proyectos Completados",
          "about.clients": "Clientes Satisfechos",
          "about.downloadCv": "Descargar CV",
          "about.personalDetails": "Datos Personales",
          "about.birthday": "Fecha de Nacimiento",
          "about.phone": "Teléfono",
          "about.email": "Correo",
          "about.location": "Ubicación",
          "about.funFact": "Datos Curiosos",
          "about.funFact1": "Empecé a programar a los 15",
          "about.funFact2": "Me encanta resolver puzzles",
          "about.funFact3": "Hablo 2 idiomas",
          "about.interests": "Intereses",
          "about.interest1": "Desarrollo Web",
          "about.interest2": "Desarrollo de Juegos",
          "about.interest3": "IA & Machine Learning",
          "about.interest4": "Desarrollo Móvil",

          // Skills section
          "skills.title": "Mis Habilidades",
          "skills.technicalTitle": "Habilidades Técnicas",
          "skills.softTitle": "Habilidades Blandas",
          "skills.javascript": "JavaScript",
          "skills.htmlcss": "HTML/CSS",
          "skills.react": "React",
          "skills.nodejs": "Node.js",
          "skills.typescript": "TypeScript",
          "skills.python": "Python",
          "skills.csharp": "C#",
          "skills.communication": "Comunicación",
          "skills.teamwork": "Trabajo en Equipo",
          "skills.problemSolving": "Resolución de Problemas",
          "skills.adaptability": "Adaptabilidad",
          "skills.creativity": "Creatividad",
          "skills.timeManagement": "Gestión del Tiempo",
          "skills.conflictResolution": "Resolución de Conflictos",

          // Projects section
          "projects.title": "Mis Proyectos",
          "projects.viewMore": "Ver Más",
          "projects.viewLess": "Ver Menos",
          "projects.playDemo": "Jugar Demo",
          "projects.watchVideo": "Ver Video",
          "projects.viewSourceCode": "Ver Código Fuente",
          "projects.goblinAttack.title": "El Ataque de los Goblins",
          "projects.goblinAttack.description": "Un emocionante juego Tower Defense desarrollado con Unity 3D y C#.",
          "projects.webPresentation.title": "Presentación Web",
          "projects.webPresentation.description": "Un sistema web React con base de datos para gestión avanzada.",
          "projects.portfolio.title": "Aplicación Windows Forms",
          "projects.portfolio.description": "Creando una aplicación de Windows Forms en C# como un pro: siguiendo las mejores prácticas y generando la base de datos desde Visual Studio.",
          "projects.technologies": "Tecnologías Utilizadas",
          "projects.tech.unity": "Unity 3D",
          "projects.tech.csharp": "C#",
          "projects.tech.react": "React",
          "projects.tech.node": "Node.js",
          "projects.tech.sql": "SQL Server",
          "projects.tech.winforms": "Windows Forms",

          // Contact section
          "contact.title": "Contáctame",
          "contact.description": "¡No dudes en contactarme para cualquier pregunta u oportunidad!",
          "contact.name": "Tu Nombre",
          "contact.email": "Tu Email",
          "contact.message": "Tu Mensaje",
          "contact.send": "Enviar Mensaje",
          "contact.success": "¡Mensaje enviado con éxito!",
          "contact.error": "Error al enviar el mensaje. Por favor, intenta de nuevo."
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
