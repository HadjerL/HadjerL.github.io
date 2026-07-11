import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      brandName: "Hadjer Laissaoui",
      engineeringMode: "✨ Engineering Mode",
      creativeAccent: "🎨 Creative Accent",
      badgeIntro: "Software Engineer @ ESI Algiers",
      heroTitle: "Building robust backend architectures with elegant client interfaces.",
      heroBio: "Passionate about full-stack development, applied AI, and systemic design. When I'm not writing clean code, I translate thoughts into technical blogs and digital sketches.",
      featuredWork: "Featured Engineering Work",
      techWriting: "Technical Writing",
      techWritingDesc: "I synthesize engineering concepts, frameworks, and architectural clean practices down into bite-sized technical insights on Medium.",
      readArticles: "Read Articles →",
      creativeOutlets: "Creative Outlets",
      creativeOutletsDesc: "Art keeps my systemic thinking balanced. Feel free to view my character sketches, line-arts, and personal illustrations over on my design page.",
      viewGallery: "View Art Gallery →",
      footerText: "© 2026 Hadjer Laissaoui. Made with React & Vite. Hosted via GitHub Pages."
    }
  },
  fr: {
    translation: {
      brandName: "Hadjer Laissaoui",
      engineeringMode: "✨ Mode Ingénierie",
      creativeAccent: "🎨 Accent Créatif",
      badgeIntro: "Ingénieur Logiciel @ ESI Alger",
      heroTitle: "Construire des architectures backend robustes avec des interfaces clients élégantes.",
      heroBio: "Passionné par le développement full-stack, l'IA appliquée et la conception systémique. Quand je n'écris pas de code propre, je traduis mes pensées en blogs techniques et croquis numériques.",
      featuredWork: "Travaux d'Ingénierie Récents",
      techWriting: "Rédaction Technique",
      techWritingDesc: "Je synthétise des concepts d'ingénierie, des frameworks et des pratiques architecturales propres sous forme de courtes analyses techniques sur Medium.",
      readArticles: "Lire les articles →",
      creativeOutlets: "Expressions Créatives",
      creativeOutletsDesc: "L'art équilibre ma pensée systémique. N'hésitez pas à regarder mes croquis de personnages, line-arts et illustrations sur ma page de design.",
      viewGallery: "Voir la galerie →",
      footerText: "© 2026 Hadjer Laissaoui. Fait avec React & Vite. Hébergé via GitHub Pages."
    }
  },
  ar: {
    translation: {
      brandName: "هاجر العيساوي",
      engineeringMode: "✨ الوضع الهندسي",
      creativeAccent: "🎨 لمسة إبداعية",
      badgeIntro: "مهندسة برمجيات @ المدرسة العليا للإعلام الآلي بالجزائر",
      heroTitle: "بناء بنى تحتية قوية للمصادر الخلفية مع واجهات مستخدم أنيقة.",
      heroBio: "شغوفة بتطوير الويب المتكامل (Full-Stack)، الذكاء الاصطناعي التطبيقي، والتصميم النظمي. عندما لا أكتب كوداً برمجياً نظيفاً، أحول أفكاري إلى مدونات تقنية ورسومات رقمية.",
      featuredWork: "أبرز الأعمال الهندسية",
      techWriting: "الكتابة التقنية",
      techWritingDesc: "أقوم بتبسيط المفاهيم الهندسية، إطارات العمل، والممارسات المعمارية النظيفة إلى مقالات تقنية موجزة على منصة Medium.",
      readArticles: "إقرأ المقالات ←",
      creativeOutlets: "المنافذ الإبداعية",
      creativeOutletsDesc: "الفن يحافظ على توازن تفكيري النظمي. تفضل بزيارة صفحة التصميم الخاصة بي لمشاهدة رسومات الشخصيات، الخطوط الفنية، والإيضاحات الشخصية.",
      viewGallery: "عرض معرض الفنون ←",
      footerText: "© 2026 هاجر العيساوي. صُنع بواسطة React و Vite. مستضاف عبر صفحات GitHub."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;