import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * SEO Component - Manages page-specific meta tags
 * Usage: <SEO title="Page Title" description="Page description" />
 */
const SEO = ({
  title = "Campus to Career - Connect Students with Opportunities",
  description = "Campus to Career is a platform connecting college students with job opportunities from leading companies.",
  keywords = "campus jobs, student placement, internship, job portal, college placement",
  image = "https://campus-career.vercel.app/og-image.png",
  url = "https://campus-career.vercel.app",
  author = "Campus to Career",
  type = "website",
  twitterHandle = "@campustocareer"
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={twitterHandle} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
