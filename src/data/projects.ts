import type { Project } from '../types/portfolio'

const projectCatalog = [
  {
    id: 'lib',
    featured: true, petal: '#2DB5D0',
    technologies: ['Java', 'Spring Boot', 'React', 'JavaScript'],
    status: 'ongoingProfessional',
  },
  {
    id: 'wind',
    featured: true, petal: '#F05070',
    url: 'https://github.com/HadjerL/wind-turbine-simulator',
    technologies: ['Python', 'TensorFlow', 'MQTT', 'Jetson Nano'],
    status: 'completedGraduation',
    hasNote: true,
  },
  {
    id: 'qube',
    featured: true, petal: '#FFC857',
    url: 'https://github.com/HadjerL/sci-smart-switch',
    technologies: ['ESP8266', 'Arduino', 'MQTT', 'React Native'],
    status: 'completedTeam',
  },
  {
    id: 'gait',
    featured: true, petal: '#7BDFF2',
    technologies: [],
    status: 'ongoingAcademic',
  },
  {
    id: 'brace', petal: '#B48EF7',
    url: 'https://github.com/HadjerL/BracePy-compiler',
    technologies: ['C', 'Flex', 'Bison'],
  },
  {
    id: 'shop', petal: '#FF8FA8',
    technologies: [],
    status: 'client',
  },
  {
    id: 'att', petal: '#7BDFF2',
    technologies: ['React Native', 'Node.js', 'MySQL'],
    status: 'internship',
  },
] as const satisfies readonly Project[]

export type ProjectId = (typeof projectCatalog)[number]['id']
export const projects: readonly Project[] = projectCatalog
