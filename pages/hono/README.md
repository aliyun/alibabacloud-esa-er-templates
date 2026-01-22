# Hono + Vite + ESA Pages Template

A modern template project based on Hono + Vite + ESA Pages, combining the power of Static Site Generation (SSG) and Edge Functions.

## ✨ Features

- 🚀 **Vite SSG** - Static site generation with Vite for optimal performance
- ⚡ **ESA Edge Functions** - Support for dynamic routes and server-side rendering (SSR)
- 🎨 **Hono Framework** - Lightweight and high-performance web framework
- 📦 **TypeScript Support** - Full TypeScript type support

## 🛠️ Tech Stack

- [Hono](https://hono.dev/) - Lightweight web framework
- [Vite](https://vitejs.dev/) - Next-generation frontend build tool
- [@hono/vite-ssg](https://github.com/honojs/vite-plugins) - Vite SSG plugin for Hono
- [ESA Pages](https://esa.io/) - Edge computing platform

## 📁 Project Structure

```
hono-esa-template/
├── dist/              # Build output directory
│   ├── index.html
│   └── static/
│       └── style.css
├── public/            # Static assets directory
│   └── static/
│       └── style.css
├── src/               # Source code directory
│   ├── functions/     # ESA Edge Functions
│   │   ├── components/    # Components directory
│   │   │   └── SSRPage.jsx # SSR page component
│   │   ├── index.js   # Function entry point
│   │   ├── api.js     # API routes
│   │   └── ssr.js     # SSR routes
│   └── index.tsx      # Vite SSG page entry
├── esa.jsonc          # ESA configuration file
├── package.json       # Project configuration
├── vite.config.ts     # Vite configuration
└── tsconfig.json      # TypeScript configuration
```

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Build Project

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## 🛣️ Routing

### Static Page (`/`)

- **Path**: `/`
- **Type**: Static page
- **Generation**: Pre-rendered at build time by Vite SSG
- **Features**: Optimal performance and SEO optimization

### Dynamic Page (`/ssr/*`)

- **Path**: `/ssr/*`
- **Type**: Dynamic page
- **Handler**: Processed by ESA Edge Functions
- **Features**: Supports dynamic rendering based on user parameters, with server-side rendering (SSR) support
- **Example**: 
  - `/ssr/test` - Renders "Hello test - This is SSR Page!"

### API Endpoints (`/api/*`)

- **Path**: `/api/*`
- **Type**: RESTful API
- **Handler**: Processed by ESA Edge Functions
- **Features**: Returns JSON format responses for GET and POST requests
- **Endpoints**:
  - `GET /api/example` - Returns example data
  - `GET /api/example/:id` - Returns resource by ID
  - `POST /api/example` - Accepts JSON body and returns processed data

## ⚙️ Configuration

### ESA Configuration (`esa.jsonc`)

```jsonc
{
  "name": "hono-esa-template",
  "entry": "./src/functions/index.js",
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "assets": {
    "directory": "./dist",
    "notFoundStrategy": "404Page"
  }
}
```

## 📝 Development

1. **Static Page Development**: Edit `src/index.tsx` to generate static pages with Vite SSG
2. **Dynamic Route Development**: Edit files in `src/functions/` directory to implement ESA Edge Functions
3. **Styles**: Place style files in the `public/static/` directory

## 📄 License

MIT
