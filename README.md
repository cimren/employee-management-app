# Employee Management Application

A web application in order to help the HR staff to manage the company's employee information. The application is built with Lit 3.x, LitElement, and Lit HTML. It uses modern JavaScript (ES modules) and Rollup for building. It also uses ESLint and Prettier for code formatting and a Web Dev Server for development.

## Features

- Lit 3.x
- Modern JavaScript (ES modules)
- Rollup for building
- ESLint and Prettier for code formatting
- Web Dev Server for development
- Testing setup
- Modern and clean UI
- Responsive design
- CSS custom properties for theming

## Getting Started

After cloning the project:

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build the project
npm run build

# Run tests
npm test

# Run linting
npm run lint

#Install @lit/localize-tools command-line interface to update the localization files
npm i -D @lit/localize-tools

# To generate XLIFF files for localization
lit-localize extract

# To output a localized version of the strings and templates
lit-localize build
```

## Project Structure

```
employee-management-app/
├── src/
│   ├── components/
│   │   └── header/
│   │   |   └── app-header
│   │   |   |   └── app-header.js
│   │   |   └── page-header
│   │   |   │   └── page-header.js
│   │   ├── pages/
│   │   │   └── home
│   │   │   │   └── home-page.js
│   │   │   └── employees
│   │   │   │   └── employees-page.js
│   │   │   └── employee-form
│   │   │   │   └── employee-form-page.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── store/
│   │   ├── index.js
│   │   └── my-app.js
│   ├── data/
│   ├── generated/
│   ├── pages/
│   ├── store/
│   ├── styles/
│   ├── utils/
│   ├── index.js
│   ├── localization.js
│   ├── my-app.js
├── translations/
|── .eslintignore
|── .eslintrc.json
|── .gitignore
├── index.html
├── lit-localize.json
├── package-lock.json
├── package.json
├── README.md
├── rollup.config.js
```

## Development

The project uses modern web development tools and practices:

- **Lit**: For building web components
- **Rollup**: For bundling
- **ESLint & Prettier**: For code quality and formatting
- **Web Dev Server**: For development with hot reloading

## Browser Support

The project uses modern JavaScript features and is designed to work in modern browsers that support:

- ES Modules
- Web Components
- Custom Elements
- Shadow DOM
