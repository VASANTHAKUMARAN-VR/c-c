/**
 * SEO Configuration File
 * Define all SEO-related constants and metadata here
 */

export const SEO_CONFIG = {
  // Base URL (change based on environment)
  baseURL: import.meta.env.VITE_BASE_URL || 'https://campus-career.vercel.app',
  
  // Organization info
  organization: {
    name: 'Campus to Career',
    description: 'A platform connecting college students with job opportunities',
    url: 'https://campus-career.vercel.app',
    email: 'vasanthakumaranvr@gmail.com.com',
    phone: '+91 9791366139',
  },

  // Page-specific SEO data
  pages: {
    home: {
      title: 'Campus to Career - Connect Students with Opportunities',
      description: 'Campus to Career is a platform connecting college students with job opportunities from leading companies. Explore internships, job postings, and career guidance.',
      keywords: 'campus jobs, student placement, internship, job portal, college placement, career opportunities',
      path: '/',
    },
    signup: {
      title: 'Sign Up - Campus to Career',
      description: 'Create your account on Campus to Career and start your journey towards a successful career.',
      keywords: 'signup, register, create account, student registration, campus to career',
      path: '/signup',
    },
    student: {
      title: 'Student Dashboard - Campus to Career',
      description: 'Manage your student profile, view job postings, and apply for opportunities on Campus to Career.',
      keywords: 'student dashboard, job search, internship search, career opportunities',
      path: '/student',
    },
    company: {
      title: 'Company Dashboard - Campus to Career',
      description: 'Post job openings and internships, shortlist candidates, and manage recruitment on Campus to Career.',
      keywords: 'recruitment, job posting, hiring, talent acquisition, campus hiring',
      path: '/company',
    },
    college: {
      title: 'College Dashboard - Campus to Career',
      description: 'Manage student placements and approve job postings on Campus to Career.',
      keywords: 'college placement, student placement, campus recruitment',
      path: '/college',
    },
    profile: {
      title: 'My Profile - Campus to Career',
      description: 'Create and manage your student profile on Campus to Career.',
      keywords: 'student profile, resume, qualifications, skills',
      path: '/profile',
    },
    postPage: {
      title: 'Post Job Opening - Campus to Career',
      description: 'Post a new job opening or internship opportunity for students.',
      keywords: 'post job, job posting, internship posting, recruitment',
      path: '/post',
    },
  },

  // Open Graph defaults
  openGraph: {
    image: 'https://campus-career.vercel.app/og-image.png',
    imageWidth: 1200,
    imageHeight: 630,
    type: 'website',
  },

  // Twitter defaults
  twitter: {
    card: 'summary_large_image',
    creator: '@campustocareer',
  },

  // Search engine settings
  searchEngines: {
    googleSiteVerification: 'your-google-verification-code',
    bingSiteVerification: 'your-bing-verification-code',
  },
};

/**
 * Get page-specific SEO config
 * @param {string} pageName - Name of the page from SEO_CONFIG.pages
 * @returns {Object} - SEO configuration for that page
 */
export const getPageSEO = (pageName) => {
  const pageConfig = SEO_CONFIG.pages[pageName];
  if (!pageConfig) {
    return SEO_CONFIG.pages.home;
  }
  return {
    ...pageConfig,
    url: `${SEO_CONFIG.baseURL}${pageConfig.path}`,
  };
};

/**
 * Format title with branding
 * @param {string} title - Page title
 * @returns {string} - Formatted title
 */
export const formatTitle = (title) => {
  const baseBrand = 'Campus to Career';
  if (title.includes(baseBrand)) return title;
  return `${title} - ${baseBrand}`;
};

/**
 * JSON-LD Schema for Organization
 */
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': SEO_CONFIG.organization.name,
  'description': SEO_CONFIG.organization.description,
  'url': SEO_CONFIG.organization.url,
  'email': SEO_CONFIG.organization.email,
  'sameAs': [
    `https://twitter.com/${SEO_CONFIG.organization.social.twitter}`,
    `https://facebook.com/${SEO_CONFIG.organization.social.facebook}`,
    `https://linkedin.com/company/${SEO_CONFIG.organization.social.linkedin}`,
  ],
});

/**
 * JSON-LD Schema for WebSite
 */
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': SEO_CONFIG.organization.name,
  'description': SEO_CONFIG.organization.description,
  'url': SEO_CONFIG.organization.url,
  'potentialAction': {
    '@type': 'SearchAction',
    'target': {
      '@type': 'EntryPoint',
      'urlTemplate': `${SEO_CONFIG.organization.url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});
