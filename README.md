# DSW - Next.js Project

This is a modern [Next.js](https://nextjs.org) project configured with industry best practices for TypeScript development, code quality, testing, and deployment.

## 🚀 Features

- ⚡ **Next.js 16** - Latest Next.js with App Router
- 🔷 **TypeScript** - Strict TypeScript configuration for type safety
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS framework
- ✅ **ESLint + Prettier** - Code linting and formatting
- 🐶 **Husky + lint-staged** - Pre-commit hooks for code quality
- 🧪 **Jest + React Testing Library** - Comprehensive testing setup
- 📊 **Bundle Analyzer** - Analyze and optimize bundle size
- 🤖 **GitHub Actions** - Automated CI/CD pipeline
- 🗺️ **SEO Optimized** - Sitemap and robots.txt configuration
- 📁 **Absolute Imports** - Clean imports with `@/` prefix

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Setup Git hooks:

```bash
npm run prepare
```

4. Copy environment variables:

```bash
cp .env.example .env.local
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run analyze` - Analyze bundle size

## 🧪 Testing

This project uses Jest and React Testing Library for testing. Test files should be placed in the `__tests__` directory or co-located with components using the `.test.tsx` or `.spec.tsx` naming convention.

Run tests:

```bash
npm test
```

## 🎨 Code Quality

### ESLint

ESLint is configured with Next.js recommended rules and Prettier integration. Run:

```bash
npm run lint
```

### Prettier

Code formatting is enforced with Prettier. Format your code:

```bash
npm run format
```

### Pre-commit Hooks

Husky and lint-staged automatically run linting and formatting on staged files before each commit, ensuring consistent code quality.

## 📊 Bundle Analysis

Analyze your production bundle to identify optimization opportunities:

```bash
npm run analyze
```

## 🔄 CI/CD

GitHub Actions workflow automatically runs on push and pull requests:

- ✅ Code quality checks (ESLint, Prettier, TypeScript)
- ✅ Test suite with coverage
- ✅ Production build verification

## 🗺️ SEO

- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots.txt**: Auto-generated at `/robots.txt`

Update `NEXT_PUBLIC_BASE_URL` in your environment variables to configure the base URL.

## 📁 Project Structure

```
dsw/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   ├── sitemap.ts    # Sitemap configuration
│   └── robots.ts     # Robots.txt configuration
├── __tests__/        # Test files
├── public/           # Static assets
├── .github/          # GitHub Actions workflows
├── .husky/           # Git hooks
└── ...config files
```

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration with bundle analyzer
- `tsconfig.json` - TypeScript configuration with path aliases
- `eslint.config.mjs` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `jest.config.ts` - Jest configuration
- `tailwind.config.ts` - Tailwind CSS configuration

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Testing Library Documentation](https://testing-library.com/docs/)

## 🚀 Deploy

Deploy easily on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or follow [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for other platforms.
