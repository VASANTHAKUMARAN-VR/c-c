/**
 * TEMPLATE: Page with SEO Implementation
 * Copy this template and customize for other pages
 */

import React from "react";
import SEO from "../../components/SEO";
import { getPageSEO } from "../../config/seoConfig";

const TemplatePage = () => {
  // Get SEO configuration for this page
  // Replace 'templatePage' with your page key from seoConfig.js
  const pageSEO = getPageSEO('home'); // Change this to your page key
  
  return (
    <>
      {/* SEO Component - Must be at the top of the component */}
      <SEO 
        title={pageSEO.title}
        description={pageSEO.description}
        keywords={pageSEO.keywords}
        url={pageSEO.url}
      />

      {/* Your page content below */}
      <div className="container">
        <h1>Page Title</h1>
        {/* Rest of your content */}
      </div>
    </>
  );
};

export default TemplatePage;

/**
 * STEP-BY-STEP IMPLEMENTATION:
 * 
 * 1. Add page configuration to src/config/seoConfig.js:
 *    pages: {
 *      pageKey: {
 *        title: 'Your Page Title - Campus to Career',
 *        description: 'Description of your page (150-160 chars)',
 *        keywords: 'keyword1, keyword2, keyword3',
 *        path: '/your-page-path',
 *      },
 *    }
 * 
 * 2. Import SEO and seoConfig in your page component
 * 
 * 3. Use getPageSEO with your page key
 * 
 * 4. Add SEO component at the top of the return statement
 * 
 * 5. Wrap main content in <> </> (Fragment)
 * 
 * TITLE GUIDELINES:
 * - Keep between 50-60 characters
 * - Include primary keyword
 * - Include brand name
 * - Be compelling
 * 
 * DESCRIPTION GUIDELINES:
 * - Keep between 150-160 characters
 * - Include primary keyword
 * - Be action-oriented
 * - Avoid duplicate descriptions
 * - Include call-to-action
 * 
 * KEYWORDS GUIDELINES:
 * - Use comma-separated keywords
 * - Include 3-5 main keywords
 * - Focus on relevant terms
 * - Avoid keyword stuffing
 */
