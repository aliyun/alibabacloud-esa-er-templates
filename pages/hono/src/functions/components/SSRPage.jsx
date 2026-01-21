import { html } from 'hono/html';

export const SSRPage = ({ name, timestamp }) => {
  return html`
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SSR Page - ${name}</title>
        <link href="/static/style.css" rel="stylesheet" />
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: #fff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            color: #333;
          }
          
          .container {
            max-width: 800px;
            width: 100%;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            padding: 2.5rem;
            text-align: center;
          }
          
          .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          }
          
          .header p {
            font-size: 1.1rem;
            opacity: 0.9;
          }
          
          .content {
            padding: 3rem 2.5rem;
          }
          
          .greeting {
            text-align: center;
            margin-bottom: 2rem;
          }
          
          .greeting h2 {
            font-size: 2rem;
            color: #1f2937;
            margin-bottom: 0.5rem;
          }
          
          .greeting .name {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0 0.5rem;
          }
          
          .info-card {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            border-left: 4px solid #2563eb;
          }
          
          .info-card h3 {
            font-size: 1rem;
            color: #6b7280;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 600;
          }
          
          .info-card p {
            font-size: 1.1rem;
            color: #1f2937;
            font-weight: 500;
          }
          
          .badge {
            display: inline-block;
            background: #eff6ff;
            color: #2563eb;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 600;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
          }
          
          .footer {
            background: #f8f9fa;
            padding: 1.5rem 2.5rem;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 0.9rem;
          }
          
          .footer a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
          }
          
          .footer a:hover {
            text-decoration: underline;
          }
          
          .back-button {
            display: inline-block;
            margin-top: 1.5rem;
            padding: 0.875rem 2rem;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.2s ease;
            box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
          }
          
          .back-button:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(37, 99, 235, 0.3);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 Server-Side Rendering</h1>
            <p>Dynamic page rendered by ESA Edge Functions</p>
          </div>
          
          <div class="content">
            <div class="greeting">
              <h2>Hello, <span class="name">${name}</span>!</h2>
              <p style="color: #6b7280; font-size: 1.1rem;">This is a dynamically rendered SSR page</p>
            </div>
            
            <div class="info-card">
              <h3>Page Type</h3>
              <p>
                <span class="badge">Dynamic Page</span>
                <span class="badge">SSR Enabled</span>
                <span class="badge">Edge Function</span>
              </p>
            </div>
            
            <div class="info-card">
              <h3>Route Parameter</h3>
              <p>
                <code style="background: #e5e7eb; padding: 0.25rem 0.5rem; border-radius: 4px; font-family: 'Fira Code', monospace;">:name</code>
                = <strong>${name}</strong>
              </p>
            </div>
            
            <div class="info-card">
              <h3>Rendered At</h3>
              <p>${timestamp}</p>
            </div>
            
            <div style="text-align: center;">
              <a href="/" class="back-button">← Back to Home</a>
            </div>
          </div>
          
          <div class="footer">
            <p>
              Built with <strong>Hono</strong> + <strong>ESA Edge Functions</strong> | <a href="/">Template Project</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};
