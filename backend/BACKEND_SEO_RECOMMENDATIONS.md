# Backend SEO Recommendations

## Overview
While frontend handles most SEO, the backend should also be optimized. Here are key recommendations for your Node.js/Express backend.

## 1. **Enable Compression**

Add gzip compression to reduce file sizes:

```javascript
// In server.js
const compression = require('compression');
app.use(compression());
```

Install: `npm install compression`

## 2. **Set Security Headers**

```javascript
// In server.js
const helmet = require('helmet');
app.use(helmet());
```

Install: `npm install helmet`

## 3. **Add Rate Limiting**

Prevent abuse and improve performance:

```javascript
// In server.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

Install: `npm install express-rate-limit`

## 4. **Serve Robots.txt from Backend**

```javascript
// In server.js
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /uploads/
Disallow: /api/
Crawl-delay: 1
Sitemap: https://campus-career.vercel.app/sitemap.xml`);
});
```

## 5. **Serve Sitemap from Backend (Dynamic)**

```javascript
// In server.js
app.get('/sitemap.xml', (req, res) => {
  res.type('text/xml');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://campus-career.vercel.app/</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
  <!-- Add more URLs dynamically from database -->
</urlset>`;
  res.send(sitemap);
});
```

## 6. **Add JSON-LD Endpoints**

Provide structured data for API responses:

```javascript
// In company routes
router.get('/api/companies/:id/schema', async (req, res) => {
  const company = await Company.findById(req.params.id);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': company.name,
    'description': company.description,
    'url': company.website,
  };
  res.json(schema);
});
```

## 7. **Optimize Database Queries**

```javascript
// Use indexes for frequently queried fields
// In College.js, Company.js, etc.
const collegeSchema = new Schema({
  name: {
    type: String,
    index: true // Add index for faster searches
  },
  email: {
    type: String,
    unique: true,
    index: true
  }
});
```

## 8. **Add Caching**

```javascript
// In server.js
const redis = require('redis');
const client = redis.createClient();

app.get('/api/companies', async (req, res) => {
  // Check cache first
  client.get('companies', async (err, data) => {
    if (data) {
      return res.json(JSON.parse(data));
    }
    
    // Get from DB if not cached
    const companies = await Company.find();
    
    // Cache for 1 hour
    client.setex('companies', 3600, JSON.stringify(companies));
    res.json(companies);
  });
});
```

## 9. **Enable CORS Properly**

```javascript
// Already done, but ensure it's correct
app.use(cors({
  origin: [
    "https://campus-career.vercel.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

## 10. **Add Request Logging**

```javascript
// Use morgan for request logging
const morgan = require('morgan');
app.use(morgan('combined')); // For file logging
```

Install: `npm install morgan`

## 11. **Optimize API Responses**

```javascript
// Return only necessary fields
router.get('/api/companies', async (req, res) => {
  const companies = await Company.find()
    .select('name email description website') // Only needed fields
    .limit(20) // Pagination
    .skip((req.query.page - 1) * 20);
  
  res.json({
    success: true,
    data: companies,
    total: await Company.countDocuments()
  });
});
```

## 12. **Add Proper Error Handling**

```javascript
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
```

## 13. **Enable HTTPS**

Already done on Vercel, but ensure:
- All API calls use HTTPS
- Set secure cookies: `res.cookie('token', token, { secure: true, httpOnly: true })`

## 14. **Add API Documentation**

Create Swagger/OpenAPI documentation:

```javascript
// npm install swagger-ui-express swagger-jsdoc
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
```

## 15. **Monitor Performance**

```javascript
// Add response time monitoring
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});
```

## Recommended Packages to Install

```bash
npm install compression helmet express-rate-limit morgan redis
```

## Updated server.js Example

```javascript
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// CORS
app.use(cors({
  origin: ["https://campus-career.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Connect DB
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const forgetRoutes = require("./routes/forgetRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/auth", companyRoutes);
app.use("/api/auth", noticeRoutes);
app.use("/api/auth", forgetRoutes);

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// SEO Routes
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, '../frontend/public/robots.txt'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## Backend SEO Checklist

- [ ] Add compression middleware
- [ ] Add helmet for security headers
- [ ] Add rate limiting
- [ ] Serve robots.txt from backend
- [ ] Optimize database queries with indexes
- [ ] Add response time monitoring
- [ ] Implement caching strategy
- [ ] Add request logging
- [ ] Optimize API response payloads
- [ ] Enable HTTPS (already done on Vercel)
- [ ] Add error handling
- [ ] Document API with Swagger
- [ ] Monitor performance
- [ ] Add monitoring/logging service

## Performance Targets

- Page load time: < 3 seconds
- API response time: < 200ms
- Mobile usability: 90+ score
- SEO score: 90+ score
- Core Web Vitals: All green

Use these tools to monitor:
- Google PageSpeed Insights
- GTmetrix
- Lighthouse
- New Relic or DataDog

---

These backend optimizations will significantly improve your SEO and overall website performance!
