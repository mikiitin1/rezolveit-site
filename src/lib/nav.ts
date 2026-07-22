// Single source of truth for nav / footer / routing data, keyed by locale.
// Wave-2 page authors: import what you need from here rather than
// re-typing labels — see PATTERN NOTES in the Wave-1 report for how to wire
// a new page's <Nav>/<Footer> altHref.

export type Locale = "en" | "he";

export interface LocalizedText {
  en: string;
  he: string;
}

/** Pick the string for the current locale. */
export function t(text: LocalizedText, lang: Locale): string {
  return text[lang];
}

/**
 * Build a same-locale route from a bare path segment ("itsm", "about", "").
 * Anchors (#pricing) and absolute URLs (https://...) pass through untouched.
 */
export function localePath(path: string, lang: Locale): string {
  if (path === "" || path === "/") return lang === "he" ? "/he/" : "/";
  if (path.startsWith("#") || /^https?:\/\//.test(path) || path.startsWith("mailto:")) return path;
  const clean = path.replace(/^\/+/, "");
  return lang === "he" ? `/he/${clean}` : `/${clean}`;
}

/** Home route for a locale ("/" or "/he/"). */
export function homeHref(lang: Locale): string {
  return lang === "he" ? "/he/" : "/";
}

/** The homepage's "#platform" infographic section, cross-linked from any page. */
export function platformAnchorHref(lang: Locale): string {
  return `${homeHref(lang)}#platform`;
}

// ---------------------------------------------------------------------------
// Routing map (per the brief): EN root, HE under /he.
// ITSM -> /itsm, EPM (SPM.dc.html source, labeled "EPM") -> /epm,
// Employee Center -> /employee-center, AI Assist -> /ai-assist, HR -> /hr,
// CMDB -> /cmdb, ITAM -> /itam, Security Ops -> /security-ops,
// About -> /about, Contact -> /contact,
// Privacy -> /privacy, Terms -> /terms, Cookies -> /cookies.
// ---------------------------------------------------------------------------

export interface ModuleItem {
  key: string;
  /** route segment, e.g. "itsm" -> /itsm or /he/itsm */
  path: string;
  /** product name — stays English in both locales, per content rules */
  title: string;
  /** acronym expansion / subtitle (English, empty string = none) */
  full: string;
  /** footer column label — literal English product name, both locales */
  footerLabel: string;
  /** nav dropdown blurb */
  navDesc: LocalizedText;
  /** hub-and-spoke infographic blurb */
  hubBlurb: LocalizedText;
  /** "platform cards" grid body copy */
  cardBody: LocalizedText;
  /** icon key, see src/lib/icons.ts */
  icon: string;
  /** position on the homepage hub-and-spoke ring */
  hubPos: { x: string; y: string };
}

export const modules: ModuleItem[] = [
  {
    key: "itsm",
    path: "itsm",
    title: "ITSM",
    full: "IT Service Management",
    footerLabel: "ITSM",
    navDesc: {
      en: "Incidents, problems, changes and SLA-aware queues",
      he: "תקלות, בעיות, שינויים ותורים מודעי-SLA",
    },
    hubBlurb: {
      en: "Incidents, problems, changes, catalog & knowledge on SLA-aware queues",
      he: "תקלות, בעיות, שינויים, קטלוג וידע בתורים מודעי-SLA",
    },
    cardBody: {
      en: "Incidents, problems, changes, catalog and knowledge — SLA-aware and role-based on every record.",
      he: "תקלות, בעיות, שינויים, קטלוג וידע — מודע-SLA ומבוסס-תפקיד בכל רשומה.",
    },
    icon: "target",
    hubPos: { x: "50%", y: "4%" },
  },
  {
    key: "epm",
    path: "epm",
    title: "EPM",
    full: "Enterprise Portfolio Management",
    footerLabel: "EPM",
    navDesc: {
      en: "Portfolios, demands, roadmaps, capacity and OKRs",
      he: "תיקים, דרישות, מפות דרכים, קיבולת ו-OKRs",
    },
    hubBlurb: {
      en: "Demands, portfolios, Gantt roadmaps, capacity & OKRs in one hierarchy",
      he: "דרישות, תיקים, מפות גאנט, קיבולת ו-OKRs בהיררכיה אחת",
    },
    cardBody: {
      en: "Portfolios to project tasks, demand scoring, Gantt roadmaps, capacity workbench and OKRs.",
      he: "מתיקים ועד משימות פרויקט, דירוג דרישות, מפות גאנט, שולחן קיבולת ו-OKRs.",
    },
    icon: "gantt",
    hubPos: { x: "82%", y: "18%" },
  },
  {
    key: "employee-center",
    path: "employee-center",
    title: "Employee Center",
    full: "",
    footerLabel: "Employee Center",
    navDesc: {
      en: "Branded self-service portal, customized without code",
      he: "פורטל שירות עצמי ממותג, מותאם ללא קוד",
    },
    hubBlurb: {
      en: "Branded self-service portal — catalog, tickets & knowledge search",
      he: "פורטל שירות עצמי ממותג — קטלוג, פניות וחיפוש ידע",
    },
    cardBody: {
      en: "A branded self-service portal — catalog, tickets, knowledge — customized entirely from the admin UI.",
      he: "פורטל שירות עצמי ממותג — קטלוג, פניות וידע — מותאם כולו מממשק הניהול.",
    },
    icon: "portal",
    hubPos: { x: "94%", y: "50%" },
  },
  {
    key: "ai-assist",
    path: "ai-assist",
    title: "AI Assist",
    full: "",
    footerLabel: "AI Assist",
    navDesc: {
      en: "Built-in AI with your own encrypted provider keys",
      he: "AI מובנה עם מפתחות ספק מוצפנים משלך",
    },
    hubBlurb: {
      en: "Summarize, draft & deflect with your own encrypted provider keys",
      he: "סיכום, ניסוח והסטה עם מפתחות ספק מוצפנים משלכם",
    },
    cardBody: {
      en: "Summarization, drafting and deflection everywhere, with your own encrypted provider keys.",
      he: "סיכום, ניסוח והסטת פניות בכל מקום, עם מפתחות ספק מוצפנים משלכם.",
    },
    icon: "sparkle",
    hubPos: { x: "82%", y: "82%" },
  },
  {
    key: "hr",
    path: "hr",
    title: "HR Service Management",
    full: "",
    footerLabel: "HR Service Management",
    navDesc: {
      en: "Onboarding journeys, HR cases and employee documents",
      he: "תהליכי קליטה, פניות משאבי אנוש ומסמכי עובדים",
    },
    hubBlurb: {
      en: "Onboarding journeys, confidential HR cases & document requests",
      he: "תהליכי קליטה, פניות HR חסויות ובקשות מסמכים",
    },
    cardBody: {
      en: "Onboarding and offboarding journeys, confidential HR cases and employee document requests.",
      he: "תהליכי קליטה ועזיבה, פניות HR חסויות ובקשות מסמכי עובדים.",
    },
    icon: "user",
    hubPos: { x: "50%", y: "96%" },
  },
  {
    key: "cmdb",
    path: "cmdb",
    title: "CMDB",
    full: "Configuration Management Database",
    footerLabel: "CMDB",
    navDesc: {
      en: "Configuration items, relationships and service maps",
      he: "פריטי תצורה, קשרים ומפות שירות",
    },
    hubBlurb: {
      en: "Configuration items, service maps & one-click impact analysis",
      he: "פריטי תצורה, מפות שירות וניתוח השפעה בלחיצה",
    },
    cardBody: {
      en: "Configuration items, business services and dependency maps linked to every record.",
      he: "פריטי תצורה, שירותים עסקיים ומפות תלות מקושרים לכל רשומה.",
    },
    icon: "nodes",
    hubPos: { x: "18%", y: "82%" },
  },
  {
    key: "itam",
    path: "itam",
    title: "ITAM",
    full: "IT Asset Management",
    footerLabel: "IT Asset Management",
    navDesc: {
      en: "Asset lifecycle, licenses, contracts and stockrooms",
      he: "מחזור חיי נכסים, רישיונות, חוזים ומחסנים",
    },
    hubBlurb: {
      en: "Asset lifecycle, license compliance, contracts & stockrooms",
      he: "מחזור חיי נכסים, ציות רישוי, חוזים ומחסנים",
    },
    cardBody: {
      en: "Hardware and software asset lifecycle, license compliance, contracts and stockrooms.",
      he: "מחזור חיי נכסי חומרה ותוכנה, ציות רישוי, חוזים ומחסנים.",
    },
    icon: "cube",
    hubPos: { x: "6%", y: "50%" },
  },
  {
    key: "security-ops",
    path: "security-ops",
    title: "Security Ops",
    full: "",
    footerLabel: "Security Ops",
    navDesc: {
      en: "Security incidents, vulnerability response and audit",
      he: "אירועי אבטחה, טיפול בחולשות וביקורת",
    },
    hubBlurb: {
      en: "Security incidents, CVE response & a tamper-evident audit trail",
      he: "אירועי אבטחה, טיפול ב-CVE ומסלול ביקורת חסין-שינוי",
    },
    cardBody: {
      en: "Security incident response, vulnerability queues and a tamper-evident audit trail.",
      he: "טיפול באירועי אבטחה, תורי חולשות ומסלול ביקורת חסין-שינוי.",
    },
    icon: "shield",
    hubPos: { x: "18%", y: "18%" },
  },
];

// ---------------------------------------------------------------------------
// Nav section labels (button text). Note: the HE source design leaves
// "Solutions" untranslated — reproduced faithfully, not a bug on our side.
// ---------------------------------------------------------------------------

export const navLabels = {
  solutions: { en: "Solutions", he: "Solutions" } as LocalizedText,
  platform: { en: "Platform", he: "פלטפורמה" } as LocalizedText,
  resources: { en: "Resources", he: "משאבים" } as LocalizedText,
  pricing: { en: "Pricing", he: "תמחור" } as LocalizedText,
  company: { en: "Company", he: "החברה" } as LocalizedText,
};

export interface PlatformFeature {
  title: LocalizedText;
  desc: LocalizedText;
}

/** "Platform" dropdown — 5 items, all anchor to the homepage #platform section. */
export const platformFeatures: PlatformFeature[] = [
  {
    title: { en: "Metadata engine", he: "מנוע מטא-דאטה" },
    desc: {
      en: "Tables, forms, workflows & security — all data, not code",
      he: "טבלאות, טפסים, תהליכים ואבטחה — הכול נתונים, לא קוד",
    },
  },
  {
    title: { en: "Admin Studio", he: "Admin Studio" },
    desc: {
      en: "Configure forms, fields, lists & workflows from the UI",
      he: "הגדרת טפסים, שדות, רשימות ותהליכים מהממשק",
    },
  },
  {
    title: { en: "Dashboards & reports", he: "לוחות ודוחות" },
    desc: { en: "Configurable report widgets per module", he: "ווידג׳טים של דוחות לכל מודול" },
  },
  {
    title: { en: "Secure by design", he: "מאובטח בתכנון" },
    desc: {
      en: "Row-level security, encrypted keys & a full audit trail",
      he: "אבטחה ברמת השורה, מפתחות מוצפנים ומסלול ביקורת מלא",
    },
  },
  {
    title: { en: "Sample data & sandboxes", he: "נתוני דוגמה וסביבות ניסוי" },
    desc: {
      en: "Spin up a working demo environment instantly",
      he: "הקימו סביבת דמו עובדת באופן מיידי",
    },
  },
];

export interface ResourceLink {
  title: LocalizedText;
  desc: LocalizedText;
  href: string;
  external?: boolean;
}

export const resourcesLinks: ResourceLink[] = [
  {
    title: { en: "Blog", he: "בלוג" },
    desc: {
      en: "What's shaping modern service management",
      he: "מה מעצב את ניהול השירות המודרני",
    },
    href: "#",
  },
  {
    title: { en: "Docs", he: "תיעוד" },
    desc: { en: "Admin guides, API reference, setup in days", he: "מדריכי מנהל, API והקמה בימים" },
    href: "https://docs.rezolveit.io",
    external: true,
  },
];

export interface CompanyLink {
  title: LocalizedText;
  desc: LocalizedText;
  path: string;
}

export const companyLinks: CompanyLink[] = [
  {
    title: { en: "About", he: "אודות" },
    desc: { en: "Who we are and what we believe", he: "מי אנחנו ובמה אנו מאמינים" },
    path: "about",
  },
  {
    title: { en: "Contact", he: "צור קשר" },
    desc: { en: "Talk to us or book a live demo", he: "דברו איתנו או הזמינו דמו חי" },
    path: "contact",
  },
];

export interface LegalLink {
  title: LocalizedText;
  path: string;
}

export const legalLinks: LegalLink[] = [
  { title: { en: "Privacy Policy", he: "מדיניות פרטיות" }, path: "privacy" },
  { title: { en: "Terms of Service", he: "תנאי שימוש" }, path: "terms" },
  { title: { en: "Cookie Policy", he: "מדיניות עוגיות" }, path: "cookies" },
];

export const bookDemoLabel: LocalizedText = { en: "Book a Demo", he: "הזמנת דמו" };
export const themeToggleTitle: LocalizedText = {
  en: "Toggle light / dark",
  he: "מצב בהיר / כהה",
};

export const footerBlurb: LocalizedText = {
  en: "All your service management, on one platform. Live in days, customized without code.",
  he: "כל ניהול השירות שלכם, על פלטפורמה אחת. פעילה תוך ימים, מותאמת ללא קוד.",
};

export const footerAddress: { en: string[]; he: string[] } = {
  en: ["Tel Aviv, Israel", "info@rezolveit.io"],
  he: ["תל אביב, ישראל", "info@rezolveit.io"],
};

export const copyright: LocalizedText = {
  en: "© RezolveIT 2026. All rights reserved.",
  he: "© RezolveIT 2026. כל הזכויות שמורות.",
};

export const cookieBanner = {
  text: {
    en: 'We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies.',
    he: 'אנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה ולנתח את תנועת האתר. בלחיצה על "אישור" אתם מסכימים לשימוש בעוגיות.',
  } as LocalizedText,
  accept: { en: "Accept", he: "אישור" } as LocalizedText,
  decline: { en: "Decline", he: "דחייה" } as LocalizedText,
};
