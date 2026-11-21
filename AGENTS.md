# AGENTS.md — Portfolio Engineering Guidelines

## 1. Project Overview

This repository contains the personal portfolio website of Hadjer Laissaoui.

The portfolio showcases professional software engineering experience, applied AI, embedded systems, IoT, and academic projects.

Its primary purpose is to support applications for engineering internships and future full-time software engineering positions.

### Professional Positioning

**Software Engineer | Applied AI & Intelligent Systems**

The portfolio should appeal to recruiters and engineering teams working in:

- Backend and full-stack software engineering
- Applied AI and machine learning engineering
- Industrial AI and intelligent systems
- Embedded systems and IoT
- Robotics and cyber-physical systems

Do not position the owner exclusively as an AI researcher or academic.

### Primary Audience

Recruiters, hiring managers, software engineers, ML engineers, and technical leads.

Visitors should quickly understand:

1. Who the owner is professionally.
2. What engineering experience she has.
3. What systems and projects she has built.
4. What technical skills she can demonstrate.
5. How to contact her or access her CV.

### Internship Availability

March 15 – September 2027.

---

## 2. Technology Stack

The repository currently uses:

- React 19
- Vite
- Strict TypeScript and TSX
- CSS
- pnpm
- i18next / react-i18next
- ESLint
- GitHub Pages

This is an initial technology inventory, not a complete description of the current architecture.

Before making changes, inspect:

- `package.json`
- `vite.config.ts` and `tsconfig.json`
- `src/main.tsx` and `src/App.tsx`
- `src/components/`, `src/data/`, and `src/types/portfolio.ts`
- `src/index.css`
- `src/i18n/config.ts` and `public/locales/`
- `public/`
- Existing deployment configuration
- Existing project documentation

Determine the actual implementation and conventions before proposing a refactor.

Do not assume routing, testing, or CI/CD is already configured.

---

## 3. Source of Truth

The authoritative source for professional content is:

`docs/portfolio-content.md`

Read this file before adding or modifying:

- Professional biography
- Work experience
- Education
- Projects
- Technical skills
- Internship availability
- Contact information
- Project descriptions

### Content Accuracy Rules

Never invent or exaggerate:

- Employment history
- Responsibilities
- Technologies used
- Project results
- Evaluation metrics
- Publications
- Certifications
- Client impact
- Project completion status

If the content document does not contain sufficient information, ask for clarification.

Do not silently infer missing achievements from repository names, screenshots, or technical descriptions.

If the existing website conflicts with the content document, flag the discrepancy before making substantive changes.

### Confidentiality

Professional client projects and academic research may contain confidential information.

Do not publish private source code, internal screenshots, unpublished research details, client data, or restricted documentation without explicit approval.

The gait phase estimation project must remain a high-level description until further publication is authorized.

The wind turbine project must not advertise its original experimental performance figures as validated results. Its evaluation limitations should be presented accurately and constructively.

---

## 4. Product and Content Goals

The website should be professional, clear, visually engaging, and easy to navigate.

Prioritize technical credibility and evidence of engineering work over decorative elements.

### Recommended Information Hierarchy

1. Hero and professional introduction
2. Featured engineering projects
3. Professional experience
4. Technical skills
5. Education
6. Additional projects
7. Contact information

This hierarchy is a recommendation, not a mandatory page layout. Evaluate the existing design before changing it.

### Homepage

The homepage should communicate the most important information concisely.

Avoid displaying the entire content specification as long paragraphs.

Use short, meaningful descriptions and clear navigation to detailed content.

### Projects

Featured projects should provide:

- Project title and category
- Problem or motivation
- Solution or system overview
- Individual contributions
- Technologies used
- Engineering challenges or lessons
- Current status
- Relevant links and approved media

Detailed case studies may use dedicated pages.

Do not create separate pages for every minor academic exercise.

### Professional Experience

Emphasize concrete engineering responsibilities, system design, implementation, testing, and technical ownership.

Distinguish professional client work from academic and personal projects.

### Contact and CV

Make professional contact information and downloadable CVs easy to find.

Support French and English CVs when files are provided.

Do not invent missing CV assets or contact information.

---

## 5. Architecture and Extensibility

The architecture should be simple, modular, and maintainable.

### Core Principles

- Separate content from presentation.
- Prefer reusable components when repetition justifies them.
- Keep components focused on clear responsibilities.
- Avoid large monolithic JSX files.
- Prefer composition over unnecessary abstraction.
- Use clear naming conventions.
- Keep dependencies minimal.
- Follow existing code conventions where reasonable.

### Source Organization

```text
src/
├── App.tsx
├── main.tsx
├── components/
├── data/
│   ├── projects.ts
│   ├── career.ts
│   └── profile.ts
├── i18n/
│   └── config.ts
├── types/
│   └── portfolio.ts
├── index.css
└── assets/
```

Use `src/data/` for factual records and `public/locales/` for English and French copy. Public assets, including approved PDFs, live in `public/`. Keep new modules focused and add folders when they have files to organize.

### Content-Driven Components

Repeated content should be represented using structured data.

For example, projects should be added through a consistent data model rather than by duplicating JSX.

Use stable project identifiers and predictable content structures.

Keep presentation components independent of specific project details where practical.

### State Management

Prefer local React state and props for simple interactions.

Do not introduce Redux, Zustand, or another global state library without a demonstrated need.

### Routing

Evaluate whether the website benefits from dedicated project pages.

If routing is introduced, ensure compatibility with GitHub Pages and direct navigation to nested routes.

Avoid introducing a larger framework solely to obtain routing.

---

## 6. UI/UX and Visual Design

The portfolio should reflect an engineer who values both functionality and thoughtful design.

### Design Goals

- Professional but distinctive
- Modern and visually coherent
- Clean typography and readable content
- Clear visual hierarchy
- Responsive layouts
- Consistent spacing and component styling
- Subtle and purposeful interactions

Avoid generic template aesthetics and excessive visual effects.

### Preserve Existing Identity

Before redesigning the interface:

1. Inspect the current visual design.
2. Identify what works well.
3. Identify usability and consistency problems.
4. Propose improvements with clear reasoning.

Do not replace the entire design unless explicitly requested.

### Responsive Design

Support mobile, tablet, and desktop screen sizes.

Prevent horizontal overflow, broken layouts, unreadable text, and inaccessible controls.

### Accessibility

- Use semantic HTML.
- Ensure keyboard navigation.
- Provide visible focus indicators.
- Maintain sufficient color contrast.
- Provide meaningful alternative text for informative images.
- Respect reduced-motion preferences.
- Use accessible labels for interactive elements.
- Avoid interactions that depend exclusively on hover.

### Animations

Use animations only when they improve clarity or visual feedback.

Avoid unnecessary animation libraries and performance-heavy effects.

---

## 7. Internationalization

The portfolio supports English and French using i18next and react-i18next.

### Translation Resources

`src/i18n/config.ts` loads one translation namespace per language over HTTP. The static homepage fallback keeps contact links available during loading and complete translation failure.

Recommended structure:

```text
public/locales/
├── en/
│   └── translation.json
└── fr/
    └── translation.json
```

Use `i18next-http-backend` to load translation resources asynchronously.

Configure translation URLs using Vite's `import.meta.env.BASE_URL` to maintain compatibility with GitHub Pages.

For example:

```javascript
backend: {
  loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
}
```

These translation files are static assets served over HTTP. No backend API server is required.

### Implementation Rules

- Inspect the existing i18next configuration before making changes.
- Preserve the current language-switching behavior.
- Keep user-facing strings in translation resources rather than hardcoding them in JSX.
- Maintain English and French translations.
- Use consistent translation keys and namespaces.
- Organize translation files into multiple namespaces only when justified by content size or loading requirements.
- Ensure language changes update all visible content correctly.
- Provide a loading or fallback strategy when translations are not yet available.
- Handle missing translation resources gracefully.
- Ensure translation files are correctly served in production.
- Avoid introducing unnecessary language-detection or caching dependencies.

### Content Organization

Keep structured project and experience data separate from React presentation components.

Use stable identifiers to associate project data with translated content.

Avoid maintaining duplicated, inconsistent copies of project metadata across languages.

For example, project IDs, dates, technologies, and links can be stored in `src/data/projects.ts`, while project titles and descriptions are stored in the translation JSON files.

### Validation

When changing internationalization:

1. Verify English and French content.
2. Verify language switching.
3. Verify that translation resources load successfully.
4. Run `pnpm check:locales` and verify keys used by structured content.
5. Check production asset paths.
6. Verify behavior after a page refresh.
7. Ensure the implementation works with GitHub Pages.

Do not migrate the existing translation system until the current implementation has been inspected and the benefits of migration have been explained.

---

## 8. SEO and Discoverability

The portfolio should be discoverable and understandable to search engines and social platforms.

### Requirements

- Meaningful page titles and descriptions
- Appropriate heading hierarchy
- Open Graph metadata
- Valid canonical URLs
- Sitemap and robots configuration
- Descriptive links
- Appropriate image alternative text
- Correct social sharing previews

Preserve existing verification files and search-engine configuration.

Do not delete or modify Google verification files without explicit approval.

If dedicated project pages are introduced, review whether the chosen routing and rendering approach provides suitable metadata for each page.

Do not claim that client-side metadata updates alone guarantee search-engine or social-preview support.

---

## 9. Performance

The portfolio should remain lightweight and fast.

Prioritize:

- Optimized images
- Appropriate image dimensions
- Lazy loading for noncritical media
- Minimal JavaScript bundles
- Avoiding unnecessary dependencies
- Preventing layout shifts
- Efficient rendering

Measure performance before making major optimization changes.

Do not introduce complex caching or infrastructure for a small static website.

---

## 10. Code Quality

### React and TypeScript

- Use functional React components.
- Follow the existing TSX conventions and type component props and shared data.
- Keep components readable.
- Avoid unnecessary effects and state.
- Prefer descriptive names.
- Avoid duplicated logic.
- Keep event handling understandable.
- Use React hooks according to the Rules of Hooks.

Keep strict TypeScript checks enabled and use narrowing for nullable and external values.

### CSS

- Preserve a consistent styling approach.
- Prefer reusable design tokens for repeated values.
- Avoid unnecessary global selectors.
- Remove unused styles only after verifying they are no longer needed.
- Ensure styling changes do not break other sections.

Do not introduce a CSS framework without justification and approval.

### Dependencies

Before adding a dependency:

1. Explain what problem it solves.
2. Check whether the existing stack can solve the problem adequately.
3. Consider bundle size and maintenance cost.
4. Obtain approval for significant architectural additions.

Use pnpm consistently. GitHub Actions builds with Node.js 22 and pnpm 10.11.0.

---

## 11. Testing and Validation

Before considering a task complete, perform the checks relevant to the changes.

### Minimum Checks

- Run `pnpm typecheck` and `pnpm lint`.
- Run `pnpm build`, which runs type checking and translation key checks before Vite emits the production files.
- Check for broken imports.
- Check asset paths.
- Check translation completeness.
- Verify that the modified functionality works.
- Review responsive behavior when UI changes are involved.

Inspect `package.json` to identify the correct commands.

Do not assume that a test suite already exists.

### Additional Validation

When appropriate:

- Add tests for nontrivial logic.
- Check keyboard accessibility.
- Verify navigation and routing.
- Check GitHub Pages compatibility.
- Inspect browser console errors if a browser environment is available.

Never claim that checks passed unless they were actually executed successfully.

Report checks that could not be performed.

---

## 12. Deployment and Git Safety

The portfolio is hosted using GitHub Pages.

Preserve the existing deployment workflow.

Before changing build configuration, routing, or asset paths, inspect the actual hosting setup.

### Git Rules

- Do not force-push.
- Do not rewrite Git history.
- Do not delete branches.
- Do not commit or push unless explicitly requested.
- Do not include generated build artifacts unless required by the deployment workflow.
- Avoid unrelated changes.
- Preserve uncommitted user changes.

Never expose credentials, tokens, or private configuration.

---

## 13. Codex Working Process

### Step 1 — Understand

Before implementing substantial changes:

- Inspect the relevant files.
- Read the content specification when content is involved.
- Identify existing conventions.
- Understand dependencies and potential side effects.

### Step 2 — Plan

For substantial changes, explain:

- The problem being solved
- The proposed solution
- The files likely to change
- Architectural decisions
- Potential risks or trade-offs

Wait for approval before major refactors, redesigns, dependency changes, or deployment modifications.

For small, explicitly requested changes, proceed without unnecessary approval cycles.

### Step 3 — Implement

- Make focused, incremental changes.
- Preserve existing functionality.
- Avoid unrelated refactoring.
- Prefer simple, understandable solutions.
- Follow the approved plan.

### Step 4 — Validate

Run the appropriate checks and inspect the result.

Do not treat a successful build as proof that the UI behaves correctly.

### Step 5 — Report

At the end of each task, provide:

1. Summary of changes
2. Files modified
3. Validation performed
4. Any remaining issues
5. Recommended next steps, if relevant

Keep reports concise and technically useful.

---

## 14. Decision-Making Principles

When choosing between possible implementations, prioritize:

1. Correctness
2. Content accuracy
3. Maintainability
4. Accessibility
5. User experience
6. Performance
7. Visual polish

Do not sacrifice correctness or maintainability for unnecessary visual complexity.

Prefer solutions appropriate for a personal portfolio rather than enterprise-scale infrastructure.

The objective is a well-engineered, credible, professional website—not a demonstration of how many technologies can be added.

---

## 15. Definition of Done

A task is complete when:

- The requested functionality or content is implemented.
- Existing behavior is preserved unless a change was intentional.
- The implementation follows repository conventions.
- Relevant checks have passed or limitations are documented.
- The result works in the supported languages.
- No unapproved confidential information has been published.
- No unrelated changes were introduced.
- The implementation is understandable and maintainable.

If any condition is unmet, explain it clearly rather than claiming completion.