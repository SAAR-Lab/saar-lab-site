// Contenu bilingue SAAR Lab (hors publications, qui vivent dans publications.md).
// Partagé client + serveur (aucun accès fs ici).

export type Lang = 'en' | 'fr';

export const SCHOLAR = 'https://scholar.google.com/citations?user=L0bmwGIAAAAJ&hl=fr';

// Type d'art par axe de recherche (canvas).
export const ART: Record<string, string> = {
  lang: 'wave', vision: 'grid', edge: 'pulse', health: 'orbit', agri: 'grid', ethics: 'orbit',
};

// [key, art, { en:[title,desc], fr:[title,desc] }]
export const AREAS: [string, string, { en: [string, string]; fr: [string, string] }][] = [
  ['lang', 'wave', { en: ['Language', 'Models for African languages: translation, understanding and generation in Swahili, Yoruba, Hausa, Wolof, Lingala and more.'], fr: ['Langage', 'Modèles pour les langues africaines : traduction, compréhension et génération en swahili, yoruba, haoussa, wolof, lingala…'] }],
  ['vision', 'grid', { en: ['Computer vision', 'Detection, segmentation and recognition for agriculture, health and cities.'], fr: ['Vision par ordinateur', 'Détection, segmentation et reconnaissance pour l’agriculture, la santé et les villes.'] }],
  ['edge', 'pulse', { en: ['Efficient & edge AI', 'Pruning, quantisation and distillation so models run offline on low-power devices.'], fr: ['IA efficiente & edge', 'Élagage, quantification et distillation pour des modèles hors ligne sur appareils modestes.'] }],
  ['health', 'orbit', { en: ['Health', 'Imaging assistance and contactless vital-sign monitoring for underserved regions.'], fr: ['Santé', 'Aide à l’imagerie et mesure sans contact des signes vitaux pour les régions mal desservies.'] }],
  ['agri', 'grid', { en: ['Agriculture', 'Crop disease detection and yield forecasting from field imagery and sensor data.'], fr: ['Agriculture', 'Détection des maladies et prévision des rendements à partir d’images et de capteurs.'] }],
  ['ethics', 'orbit', { en: ['Responsible AI', 'Privacy, federated learning, synthetic data and evaluation for fair, safe models.'], fr: ['IA responsable', 'Confidentialité, apprentissage fédéré, données synthétiques et évaluation pour des modèles sûrs et équitables.'] }],
];

export const areaLabel = (key: string, lang: Lang): string =>
  (AREAS.find((a) => a[0] === key) || ['', '', { en: ['Research', ''], fr: ['Recherche', ''] }] as any)[2][lang][0];

export interface Person {
  g: 'lead' | 'res';
  n: string;
  photo?: string;
  scholar?: string;
  tags: string[];
  r: { en: string; fr: string };
  b: { en: string; fr: string };
}

export const PEOPLE: Person[] = [
  { g: 'lead', n: 'Vincess Dongmo', photo: 'https://synthi-ai.org/founder/image1.jpeg', scholar: SCHOLAR, tags: ['Machine learning', 'Computer vision', 'Robotics'], r: { en: 'Founder & Lab Director', fr: 'Fondateur & directeur du Lab' }, b: { en: 'Leads research in machine learning, computer vision and robotics, with applications in health, agriculture and smart cities.', fr: 'Dirige la recherche en apprentissage automatique, vision et robotique, appliquée à la santé, l’agriculture et aux villes.' } },
  { g: 'res', n: 'Fokam Melvin', tags: ['Neural networks', 'NLP'], r: { en: 'Machine learning researcher', fr: 'Chercheur en apprentissage automatique' }, b: { en: 'Master’s in Machine Learning. Works on neural networks and natural language processing.', fr: 'Master en machine learning. Travaille sur les réseaux de neurones et le traitement du langage.' } },
  { g: 'res', n: 'Michael Johnson', tags: ['Robotics', 'Embedded vision'], r: { en: 'Robotics engineer', fr: 'Ingénieur robotique' }, b: { en: 'Autonomous systems and human-robot interaction, embedded systems and real-time computer vision.', fr: 'Systèmes autonomes et interaction humain-robot, systèmes embarqués et vision temps réel.' } },
  { g: 'res', n: 'Kemi Steve Christian', tags: ['Design', 'HCI'], r: { en: 'Research design & founding engineer', fr: 'Design de recherche & ingénieur fondateur' }, b: { en: 'Designs the interfaces and tools through which research reaches users.', fr: 'Conçoit les interfaces et outils par lesquels la recherche atteint les utilisateurs.' } },
  { g: 'res', n: 'Gaëlle Tamho', tags: ['UX research'], r: { en: 'UX researcher', fr: 'Chercheuse UX' }, b: { en: 'Studies how people use AI products, to make complex models usable.', fr: 'Étudie l’usage des produits d’IA pour rendre les modèles complexes utilisables.' } },
];

export interface Role {
  k: 'res' | 'eng' | 'int';
  team: string;
  t: { en: string; fr: string };
  d: { en: string; fr: string };
  req: { en: string[]; fr: string[] };
}

export const ROLES: Role[] = [
  { k: 'res', team: 'Language', t: { en: 'Research Scientist, African Language Models', fr: 'Chercheur·se, modèles de langues africaines' }, d: { en: 'Design and train models for translation, understanding and generation in low-resource African languages, and publish the results.', fr: 'Concevoir et entraîner des modèles de traduction, compréhension et génération pour les langues africaines peu dotées, et publier les résultats.' }, req: { en: ['PhD or equivalent research experience in NLP or ML', 'Publications at major venues (ACL, EMNLP, NeurIPS…)', 'Interest in multilingual and low-resource settings'], fr: ['Doctorat ou expérience de recherche équivalente en NLP ou ML', 'Publications dans des conférences majeures (ACL, EMNLP, NeurIPS…)', 'Intérêt pour le multilingue et les langues peu dotées'] } },
  { k: 'eng', team: 'Efficiency', t: { en: 'ML Engineer, Edge AI', fr: 'Ingénieur·e ML, Edge AI' }, d: { en: 'Compress and deploy models on low-power devices: quantisation, pruning, distillation and on-device evaluation.', fr: 'Compresser et déployer des modèles sur appareils peu puissants : quantification, élagage, distillation et évaluation embarquée.' }, req: { en: ['Strong Python and PyTorch', 'Experience with ONNX, TFLite or similar runtimes', 'Mobile or embedded deployment experience'], fr: ['Très bonne maîtrise de Python et PyTorch', 'Expérience avec ONNX, TFLite ou équivalent', 'Expérience de déploiement mobile ou embarqué'] } },
  { k: 'res', team: 'Vision', t: { en: 'Research Scientist, Computer Vision', fr: 'Chercheur·se, vision par ordinateur' }, d: { en: 'Detection and segmentation research for agriculture and health imagery, from dataset design to publication.', fr: 'Recherche en détection et segmentation pour l’imagerie agricole et médicale, de la conception des données à la publication.' }, req: { en: ['PhD or equivalent in computer vision', 'Experience building datasets and benchmarks', 'Publication record'], fr: ['Doctorat ou équivalent en vision par ordinateur', 'Expérience de création de jeux de données et benchmarks', 'Publications'] } },
  { k: 'int', team: 'All areas', t: { en: 'Research Intern', fr: 'Stagiaire de recherche' }, d: { en: 'Three to six months on a research project with a mentor, aimed at a paper, dataset or open-source release.', fr: 'Trois à six mois sur un projet de recherche avec un mentor, en vue d’un article, d’un jeu de données ou d’un code ouvert.' }, req: { en: ['Master’s or PhD student in ML, CS or related field', 'Solid coding skills', 'Curiosity and rigour'], fr: ['Étudiant·e en master ou doctorat en ML, informatique ou domaine proche', 'Bonnes compétences en programmation', 'Curiosité et rigueur'] } },
];

export const T = {
  en: {
    langSwitch: 'FR', nav: ['Research', 'Publications', 'People', 'Join'], read: 'Read the paper', featured: 'Featured research',
    hero: { eyebrow: 'SAAR Lab · SYNTHI-AI Advanced Research', title: 'Advancing intelligence through research.', lead: 'SAAR Lab is the research arm of SYNTHI-AI. We study language, vision and efficient learning, publish our work openly, and turn it into models that serve the people who need them most.', a: 'Explore publications', b: 'Google Scholar' },
    areas: { eyebrow: 'Research areas', title: 'Six directions. One question: does it work where it matters?', lead: 'Our agenda starts from real constraints: scarce data, many languages, intermittent connectivity and modest hardware.', n: (n: number) => n + (n === 1 ? ' publication' : ' publications') },
    pubs: { eyebrow: 'Publications', title: 'Our work.', allLink: 'All publications', search: 'Search by title or author', all: 'All', empty: 'No publication matches this search.', scholar: 'Full list on Google Scholar' },
    princ: { title: 'How we do research.', items: [{ k: 'Open', t: 'Published and shared.', d: 'Papers, code and datasets released whenever possible, so others can reproduce and build on our work.' }, { k: 'Grounded', t: 'Built from local data.', d: 'Benchmarks and datasets collected with the communities, languages and institutions we study.' }, { k: 'Responsible', t: 'Safe by design.', d: 'Privacy, fairness and evaluation are part of every project, from the first experiment.' }] },
    people: { eyebrow: 'People', title: 'A lab of researchers and engineers.', lead: 'SAAR Lab brings together researchers in machine learning, language and vision, working with universities and partners across Africa and beyond.', allLink: 'Meet the team', role: 'Founder & Lab Director', bio: 'Leads research in machine learning, computer vision and robotics, with applications in health, agriculture and smart cities.' },
    pp: { title: 'Publications', lead: 'Papers, articles, datasets and code from SAAR Lab, by research area and year.', all: 'All types', back: 'All publications', abstract: 'Abstract', related: 'Related work', open: 'Open publication', cite: 'Copy citation', copied: 'Copied', count: (n: number) => n + (n === 1 ? ' result' : ' results'), scholarNote: 'The complete, up-to-date list of our papers and citations is on Google Scholar.' },
    pg: { lead: 'Lab leadership', res: 'Researchers & engineers', ctaTitle: 'Want to work with us?', ctaText: 'We are hiring researchers, engineers and interns, and welcome academic collaborations.', cta: 'Join SAAR Lab' },
    jp: { title: 'Do research that reaches people.', lead: 'Join a lab where papers become products, in languages, fields and clinics that AI has rarely served.', seeRoles: 'See open roles', rolesTitle: 'Open roles', filters: ['All', 'Research', 'Engineering', 'Internships'], apply: 'Apply by email',
      sch: { k: 'Fellowship', d: 'A programme for master’s and PhD students working on AI for underserved contexts.', cta: 'Express interest', items: [{ t: 'Mentorship', d: 'A SAAR Lab researcher follows your work.' }, { t: 'Compute & data', d: 'Access to compute and to our datasets.' }, { t: 'Publication', d: 'Support to submit to major venues.' }, { t: 'Path to hire', d: 'A route to a research role at SYNTHI-AI.' }] },
      howTitle: 'How we hire', steps: [['Application', 'Send your CV, publications or code by email.'], ['Conversation', 'A first call about your work and interests.'], ['Technical', 'A research talk or a practical exercise.'], ['Decision', 'An answer within two weeks of the last step.']] },
    join: { eyebrow: 'Work with us', allLink: 'Open roles and programmes', title: 'Research is better together.', items: [['Partnerships', 'Universities & institutes', 'Joint research projects, co-supervised theses and shared datasets.', 'Propose a collaboration', 'Research partnership'], ['Fellowship', 'SAAR Scholars', 'Support for PhD and master’s students working on AI for underserved contexts.', 'Express interest', 'SAAR Scholars'], ['Careers', 'Researchers & engineers', 'Research scientists, ML engineers and interns, in Douala and remote.', 'Send your profile', 'Careers SAAR Lab']] },
    foot: { line: 'SAAR Lab · SYNTHI-AI, Inc. · Delaware, USA · Douala, Cameroon', privacy: 'Privacy' },
  },
  fr: {
    langSwitch: 'EN', nav: ['Recherche', 'Publications', 'Équipe', 'Rejoindre'], read: 'Lire l’article', featured: 'Recherche à la une',
    hero: { eyebrow: 'SAAR Lab · SYNTHI-AI Advanced Research', title: 'Faire progresser l’intelligence par la recherche.', lead: 'SAAR Lab est le pôle recherche de SYNTHI-AI. Nous étudions le langage, la vision et l’apprentissage efficient, publions nos travaux ouvertement et les transformons en modèles au service de ceux qui en ont le plus besoin.', a: 'Voir les publications', b: 'Google Scholar' },
    areas: { eyebrow: 'Axes de recherche', title: 'Six directions. Une question : est-ce que ça marche là où ça compte ?', lead: 'Notre programme part de contraintes réelles : données rares, langues multiples, connectivité intermittente et matériel modeste.', n: (n: number) => n + (n === 1 ? ' publication' : ' publications') },
    pubs: { eyebrow: 'Publications', title: 'Nos travaux.', allLink: 'Toutes les publications', search: 'Rechercher par titre ou auteur', all: 'Tout', empty: 'Aucune publication ne correspond.', scholar: 'Liste complète sur Google Scholar' },
    princ: { title: 'Notre façon de faire de la recherche.', items: [{ k: 'Ouverte', t: 'Publiée et partagée.', d: 'Articles, code et jeux de données publiés dès que possible, pour être reproduits et prolongés.' }, { k: 'Ancrée', t: 'Construite sur des données locales.', d: 'Benchmarks et données collectés avec les communautés, langues et institutions étudiées.' }, { k: 'Responsable', t: 'Sûre par conception.', d: 'Confidentialité, équité et évaluation font partie de chaque projet, dès la première expérience.' }] },
    people: { eyebrow: 'Équipe', title: 'Un labo de chercheurs et d’ingénieurs.', lead: 'SAAR Lab réunit des chercheurs en apprentissage automatique, langage et vision, en lien avec des universités et partenaires en Afrique et au-delà.', allLink: 'Voir l’équipe', role: 'Fondateur & directeur du Lab', bio: 'Dirige la recherche en apprentissage automatique, vision par ordinateur et robotique, appliquée à la santé, l’agriculture et aux villes intelligentes.' },
    pp: { title: 'Publications', lead: 'Articles, publications, jeux de données et code de SAAR Lab, par axe et par année.', all: 'Tous les types', back: 'Toutes les publications', abstract: 'Résumé', related: 'Travaux liés', open: 'Ouvrir la publication', cite: 'Copier la citation', copied: 'Copié', count: (n: number) => n + (n === 1 ? ' résultat' : ' résultats'), scholarNote: 'La liste complète et à jour de nos articles et citations est sur Google Scholar.' },
    pg: { lead: 'Direction du Lab', res: 'Chercheurs & ingénieurs', ctaTitle: 'Envie de travailler avec nous ?', ctaText: 'Nous recrutons chercheurs, ingénieurs et stagiaires, et accueillons les collaborations académiques.', cta: 'Rejoindre SAAR Lab' },
    jp: { title: 'Une recherche qui atteint les gens.', lead: 'Rejoignez un labo où les articles deviennent des produits, dans des langues, champs et cliniques que l’IA a rarement servis.', seeRoles: 'Voir les postes', rolesTitle: 'Postes ouverts', filters: ['Tous', 'Recherche', 'Ingénierie', 'Stages'], apply: 'Postuler par e-mail',
      sch: { k: 'Bourse', d: 'Un programme pour les masterants et doctorants qui travaillent sur l’IA en contextes peu servis.', cta: 'Manifester son intérêt', items: [{ t: 'Mentorat', d: 'Un chercheur de SAAR Lab suit vos travaux.' }, { t: 'Calcul & données', d: 'Accès au calcul et à nos jeux de données.' }, { t: 'Publication', d: 'Accompagnement pour soumettre aux grandes conférences.' }, { t: 'Recrutement', d: 'Une voie vers un poste de recherche chez SYNTHI-AI.' }] },
      howTitle: 'Notre recrutement', steps: [['Candidature', 'Envoyez CV, publications ou code par e-mail.'], ['Échange', 'Un premier appel sur vos travaux et intérêts.'], ['Technique', 'Une présentation de recherche ou un exercice pratique.'], ['Décision', 'Une réponse sous deux semaines après la dernière étape.']] },
    join: { eyebrow: 'Collaborer', allLink: 'Postes et programmes', title: 'La recherche avance mieux ensemble.', items: [['Partenariats', 'Universités & instituts', 'Projets communs, thèses co-encadrées et jeux de données partagés.', 'Proposer une collaboration', 'Partenariat de recherche'], ['Bourses', 'SAAR Scholars', 'Soutien aux doctorants et masterants travaillant sur l’IA en contextes peu servis.', 'Manifester son intérêt', 'SAAR Scholars'], ['Carrières', 'Chercheurs & ingénieurs', 'Chercheurs, ingénieurs ML et stagiaires, à Douala et à distance.', 'Envoyer son profil', 'Carrieres SAAR Lab']] },
    foot: { line: 'SAAR Lab · SYNTHI-AI, Inc. · Delaware, USA · Douala, Cameroun', privacy: 'Confidentialité' },
  },
} as const;

export type Dict = (typeof T)['en'];

// Génère une citation BibTeX pour une publication.
export function bibtex(p: { id: string; type: string; title: { en: string }; authors: string; date: string; venue: string }): string {
  const year = (String(p.date).match(/\d{4}/) || ['—'])[0];
  const kind = p.type === 'Preprint' ? '@misc{' : '@inproceedings{';
  return `${kind}dongmo_${p.id},\n  title  = {${p.title.en}},\n  author = {${p.authors}},\n  year   = {${year}},\n  note   = {${p.venue}}\n}`;
}
