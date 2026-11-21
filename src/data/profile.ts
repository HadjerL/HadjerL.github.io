import type { Profile } from '../types/portfolio'

const cvPath = `${import.meta.env.BASE_URL}resume/`

export const profile: Profile = {
  username: 'HadjerL',
  links: {
    mail: 'kh_laissaoui@esi.dz',
    linkedin: 'https://www.linkedin.com/in/hadjer-laissaoui-13a420255/',
    medium: 'https://medium.com/@hadjerlais77',
    github: 'https://github.com/HadjerL',
  },
  cvUrls: {
    en: `${cvPath}cv_en.pdf`,
    fr: `${cvPath}cv_fr.pdf`,
  },
}
