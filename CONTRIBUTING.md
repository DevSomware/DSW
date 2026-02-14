# Contributing to DSW

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/dsw.git`
3. Install dependencies: `npm install`
4. Setup Git hooks: `npm run prepare`
5. Create a new branch: `git checkout -b feature/your-feature-name`

## 📝 Development Workflow

### Before You Start

- Make sure you're working on the latest code: `git pull origin main`
- Create a descriptive branch name: `feature/add-login`, `fix/navbar-bug`, `docs/update-readme`

### During Development

1. **Write clean, readable code** following the project's TypeScript and ESLint rules
2. **Add tests** for new features or bug fixes
3. **Update documentation** if you're changing functionality
4. **Use absolute imports** with the `@/` prefix for cleaner imports

### Code Style

This project enforces code style automatically:

- **ESLint** checks code quality
- **Prettier** formats code consistently
- **Husky + lint-staged** runs checks before commits

Don't worry about formatting manually - just write code and the tools will help you!

### Testing

All new features should include tests:

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Check coverage
npm run test:coverage
```

## ✅ Commit Guidelines

### Commit Messages

Write clear, descriptive commit messages:

- ✅ Good: `feat: add user authentication`
- ✅ Good: `fix: resolve navbar overflow on mobile`
- ✅ Good: `docs: update installation instructions`
- ❌ Bad: `update code`
- ❌ Bad: `fixes`

### Commit Format

```
type: brief description

Optional longer description explaining what changed and why.
```

**Types:**

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 📤 Submitting Changes

### Pull Request Process

1. **Update your branch** with the latest main:

   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   ```

2. **Push your changes**:

   ```bash
   git push origin your-branch
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Description explaining what and why
   - Screenshots if UI changes
   - Reference to related issues

4. **Wait for review** - maintainers will review and may request changes

5. **CI checks must pass**:
   - ✅ Linting
   - ✅ Formatting
   - ✅ Tests
   - ✅ Build

### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing

How has this been tested?

## Screenshots (if applicable)

Add screenshots for UI changes
```

## 🐛 Reporting Bugs

### Before Reporting

1. Check if the bug has already been reported
2. Make sure you're using the latest version
3. Try to reproduce the bug in a clean environment

### Bug Report Template

```markdown
**Describe the bug**
Clear description of what the bug is

**To Reproduce**
Steps to reproduce:

1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable

**Environment:**

- OS: [e.g., Windows 11]
- Node version: [e.g., 20.10.0]
- Browser: [e.g., Chrome 120]
```

## 💡 Feature Requests

We welcome feature suggestions! Please:

1. Check if the feature has already been requested
2. Explain the use case and why it would be valuable
3. Provide examples if possible

## 📋 Code Review Process

Maintainers will review your PR and may:

- ✅ Approve and merge
- 💬 Request changes or ask questions
- ❌ Close if not aligned with project goals

Please be patient and responsive to feedback!

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help create a positive community

## ❓ Questions?

Feel free to open an issue with the `question` label if you need help!

---

Thank you for contributing! 🎉
