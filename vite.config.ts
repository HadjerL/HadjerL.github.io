import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { caseStudies, caseStudyPath } from './src/data/caseStudies'

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: ['index.html', ...caseStudies.map((study) => `${caseStudyPath(study)}index.html`)],
    },
  },
})
