# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Feature Generation

This project includes a feature generation script to quickly scaffold new features with the proper structure.

To create a new feature:
```bash
bun run new:feature <feature-name>
```

To create a new feature with a Zustand store:
```bash
bun run new:feature <feature-name> --store
```

This will create the following structure in `src/features/<FeatureName>/`:
- `components/` - React components for the feature
- `hooks/` - Custom hooks for the feature
- `pages/` - Contains the main page component `<FeatureName>Page.tsx`
- `repository/` - Contains the repository file `<FeatureName>Repository.ts`
- `types/` - TypeScript type definitions for the feature
- `store/` - (Optional) Zustand store files when using the `--store` option

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Docker Configuration

This project includes Docker configuration for containerized deployment. The setup includes:

- Multi-stage Dockerfile for optimized builds
- Nginx server to serve the React application
- Docker Compose configuration for easy deployment
- Proper .dockerignore file to exclude unnecessary files

### Building and Running with Docker

To build and run the application using Docker:

1. Build the image:
   ```bash
   docker build -t dashboard-analysis .
   ```

2. Run the container:
   ```bash
   docker run -p 80:80 dashboard-analysis
   ```

Alternatively, you can use Docker Compose:

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

The application will be available at `http://localhost`

### Production Deployment

The Docker image is optimized for production use with:
- Gzip compression enabled
- Proper caching headers for static assets
- Security headers
- Support for client-side routing (React Router)