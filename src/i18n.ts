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
          "skills.technicalTitle": "Technologies I Use",
          "skills.softTitle": "Soft Skills",
          "skills.javascript": "JavaScript",
          "skills.htmlcss": "HTML5/CSS3",
          "skills.react": "React",
          "skills.nodejs": "Node.js",
          "skills.typescript": "TypeScript",
          "skills.python": "Python",
          "skills.csharp": "C#",
          "skills.tailwind": "Tailwind CSS",
          "skills.git": "Git",
          "skills.vscode": "VS Code",
          "skills.visualstudio": "Visual Studio",
          "skills.unity": "Unity",
          "skills.communication": "Communication",
          "skills.teamwork": "Teamwork",
          "skills.problemSolving": "Problem Solving",
          "skills.adaptability": "Adaptability",
          "skills.creativity": "Creativity",
          "skills.timeManagement": "Time Management",

          // Timeline section
          "timeline.title": "My Journey",
          "timeline.education": "Education",
          "timeline.experience": "Experience",
          "timeline.present": "Present",
          "timeline.items": {
            "technicalDegree": {
              "title": "IT Technical Degree",
              "institution": "Instituto San Judas Tadeo",
              "date": "2016 - 2023",
              "description": "Completed IT Technical Degree with focus on software development and system administration."
            },
            "gamedev": {
              "title": "Game Developer",
              "institution": "Unity Projects",
              "date": "2023 - 2024",
              "description": "Developed interactive games using Unity and C#, implementing advanced gameplay mechanics and user interfaces."
            },
            "fullstack": {
              "title": "Full Stack Developer",
              "institution": "Modern Shop Project",
              "date": "2024 - Present",
              "description": "Working as a Full Stack Developer using React, TypeScript, and modern web technologies."
            }
          },

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
          "projects.modernShop.title": "Modern Shop React",
          "projects.modernShop.description": "A modern e-commerce platform built with React, TypeScript and Tailwind CSS. Features a responsive design, dynamic product catalog and shopping cart functionality. Check out the source code on GitHub!",
          "projects.nuevoMundo.title": "New World E-Commerce Platform",
          "projects.nuevoMundo.description": "A comprehensive full-stack e-commerce platform developed with cutting-edge technologies. The project offers a modern and intuitive shopping experience, allowing users to explore a dynamic product catalog, perform advanced searches, manage their shopping cart, and complete transactions securely.",
          "projects.technologies": "Technologies Used",
          "projects.tech.unity": "Unity 3D",
          "projects.tech.csharp": "C#",
          "projects.tech.react": "React",
          "projects.tech.node": "Node.js",
          "projects.tech.sql": "SQL Server",
          "projects.tech.winforms": "Windows Forms",
          "projects.tech.tailwind": "Tailwind CSS",
          "projects.tech.typescript": "TypeScript",
          "projects.tech.python": "Python",
          "projects.tech.express": "Express",
          "projects.tech.mongodb": "MongoDB",

          // Testimonials section
          "testimonials.title": "What People Say",
          "testimonials.subtitle": "Feedback from colleagues and clients",
          "testimonials.items": {
            "colleague1": {
              "name": "Alex Martinez",
              "role": "Senior Developer",
              "text": "Nicolas is an exceptional developer with great attention to detail. His ability to solve complex problems and create elegant solutions is remarkable."
            },
            "colleague2": {
              "name": "Maria Garcia",
              "role": "Project Manager",
              "text": "Working with Nicolas has been a great experience. He's proactive, dedicated, and always delivers high-quality work on time."
            },
            "client1": {
              "name": "Carlos Rodriguez",
              "role": "Client",
              "text": "Nicolas developed an excellent solution for our needs. His technical expertise and professional approach made the project a success."
            }
          },

          // GitHub section
          "github.title": "GitHub Activity",
          "github.subtitle": "My open source contributions",
          "github.repos": "Popular Repositories",
          "github.contributions": "Contributions",
          "github.viewProfile": "View GitHub Profile",
          
          // Blog section
          "blog.title": "Technical Blog",
          "blog.subtitle": "Sharing knowledge and experiences",
          "blog.readMore": "Read More",
          "blog.viewAll": "View All Posts",

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
          "skills.technicalTitle": "Tecnologías que Uso",
          "skills.softTitle": "Habilidades Blandas",
          "skills.javascript": "JavaScript",
          "skills.htmlcss": "HTML5/CSS3",
          "skills.react": "React",
          "skills.nodejs": "Node.js",
          "skills.typescript": "TypeScript",
          "skills.python": "Python",
          "skills.csharp": "C#",
          "skills.tailwind": "Tailwind CSS",
          "skills.git": "Git",
          "skills.vscode": "VS Code",
          "skills.visualstudio": "Visual Studio",
          "skills.unity": "Unity",
          "skills.communication": "Comunicación",
          "skills.teamwork": "Trabajo en Equipo",
          "skills.problemSolving": "Resolución de Problemas",
          "skills.adaptability": "Adaptabilidad",
          "skills.creativity": "Creatividad",
          "skills.timeManagement": "Gestión del Tiempo",

          // Timeline section
          "timeline.title": "Mi Trayectoria",
          "timeline.education": "Educación",
          "timeline.experience": "Experiencia",
          "timeline.present": "Presente",
          "timeline.items": {
            "technicalDegree": {
              "title": "Técnico en Informática",
              "institution": "Instituto San Judas Tadeo",
              "date": "2016 - 2023",
              "description": "Completé el título de Técnico en Informática con enfoque en desarrollo de software y administración de sistemas."
            },
            "gamedev": {
              "title": "Desarrollador de Videojuegos",
              "institution": "Proyectos Unity",
              "date": "2023 - 2024",
              "description": "Desarrollé juegos interactivos usando Unity y C#, implementando mecánicas de juego avanzadas e interfaces de usuario."
            },
            "fullstack": {
              "title": "Desarrollador Full Stack",
              "institution": "Modern Shop Project",
              "date": "2024 - Presente",
              "description": "Trabajando como Desarrollador Full Stack utilizando React, TypeScript y tecnologías web modernas."
            }
          },

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
          "projects.modernShop.title": "Modern Shop React",
          "projects.modernShop.description": "Una plataforma de comercio electrónico moderna construida con React, TypeScript y Tailwind CSS. Cuenta con un diseño responsive, catálogo de productos dinámico y funcionalidad de carrito de compras. ¡Mira el código fuente en GitHub!",
          "projects.nuevoMundo.title": "Nuevo Mundo E-Commerce",
          "projects.nuevoMundo.description": "Una plataforma de comercio electrónico integral desarrollada con tecnologías de vanguardia. El proyecto ofrece una experiencia de compra moderna e intuitiva, permitiendo a los usuarios explorar un catálogo de productos dinámico, realizar búsquedas avanzadas, gestionar su carrito de compras y completar transacciones de manera segura.",
          "projects.technologies": "Tecnologías Utilizadas",
          "projects.tech.unity": "Unity 3D",
          "projects.tech.csharp": "C#",
          "projects.tech.react": "React",
          "projects.tech.node": "Node.js",
          "projects.tech.sql": "SQL Server",
          "projects.tech.winforms": "Windows Forms",
          "projects.tech.tailwind": "Tailwind CSS",
          "projects.tech.typescript": "TypeScript",
          "projects.tech.python": "Python",
          "projects.tech.express": "Express",
          "projects.tech.mongodb": "MongoDB",

          // Testimonials section
          "testimonials.title": "Lo Que Dicen",
          "testimonials.subtitle": "Comentarios de colegas y clientes",
          "testimonials.items": {
            "colleague1": {
              "name": "Alex Martinez",
              "role": "Desarrollador Senior",
              "text": "Nicolas es un desarrollador excepcional con gran atención al detalle. Su capacidad para resolver problemas complejos y crear soluciones elegantes es notable."
            },
            "colleague2": {
              "name": "Maria Garcia",
              "role": "Project Manager",
              "text": "Trabajar con Nicolas ha sido una gran experiencia. Es proactivo, dedicado y siempre entrega trabajo de alta calidad a tiempo."
            },
            "client1": {
              "name": "Carlos Rodriguez",
              "role": "Cliente",
              "text": "Nicolas desarrolló una excelente solución para nuestras necesidades. Su experiencia técnica y enfoque profesional hicieron del proyecto un éxito."
            }
          },

          // GitHub section
          "github.title": "Actividad en GitHub",
          "github.subtitle": "Mis contribuciones open source",
          "github.repos": "Repositorios Populares",
          "github.contributions": "Contribuciones",
          "github.viewProfile": "Ver Perfil de GitHub",
          
          // Blog section
          "blog.title": "Blog Técnico",
          "blog.subtitle": "Compartiendo conocimiento y experiencias",
          "blog.readMore": "Leer Más",
          "blog.viewAll": "Ver Todos los Posts",

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
