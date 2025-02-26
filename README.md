# OpenSource Buddy - YOGI Template

A Next.js application template demonstrating how to build a modern, accessible web application that helps developers find and contribute to open source projects.

## Template Structure

```
.
├── .idx/
│   └── dev.nix.template    # Environment template (customize for your setup)
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── (features)/    # Feature-based routes
│   │   │   └── projects/  # Project search and filtering
│   │   └── page.tsx      # Home page
│   ├── components/        # React components
│   │   ├── features/     # Feature-specific components
│   │   └── ui/          # Reusable UI components
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript definitions
└── public/              # Static assets
```

## Features

### Project Search & Filter System
* Full-text search across project details
* Filter by contribution areas
* Filter by difficulty level
* Filter by programming language

### Modern UI Components
* Responsive layout
* Dark mode support
* Accessible design
* Interactive project cards

### Developer Experience
* TypeScript
* Next.js 13+ App Router
* Tailwind CSS
* ESLint configuration

## Setup in Your Environment

1. Create a new repository from this template
2. Copy `.idx/dev.nix.template` to `.idx/dev.nix`
3. Configure your environment variables in `.idx/dev.nix`
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

## Security Guidelines

### Environment Configuration
* Never commit `.idx/dev.nix` with real credentials
* Use environment variables for sensitive data
* Keep API keys in your local environment only

### Private Deployment
* Set up proper authentication
* Configure CORS policies
* Implement rate limiting
* Use secure database connections

## Customization

### Project Data
* Modify mock data in `src/app/(features)/projects/page.tsx`
* Connect to your private project database
* Add your organization's projects

### UI Customization
* Update colors in `tailwind.config.ts`
* Modify component styles
* Add your organization's branding

### Features
* Add authentication system
* Implement project tracking
* Add user profiles
* Customize contribution workflows

## Contributing

### Development Workflow
* Work in your private environment
* Test changes thoroughly
* Keep sensitive data in local files
* Update documentation as needed

### Security Best Practices
* Follow gitignore rules
* Use template files for sharing
* Keep credentials private
* Test in isolated environments
