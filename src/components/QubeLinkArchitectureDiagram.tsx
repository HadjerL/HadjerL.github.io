import { useTranslation } from 'react-i18next'

export function QubeLinkArchitectureDiagram() {
  const { t } = useTranslation()
  const label = (name: string) => t(`caseStudies.qube.diagram.${name}`)

  return (
    <figure className="study-flow">
      <div role="img" aria-labelledby="qube-flow-title" aria-describedby="qube-flow-description">
        <p className="study-flow-title" id="qube-flow-title">{label('title')}</p>
        <div className="study-flow-map" aria-hidden="true">
          <div className="study-flow-node">{label('broker')}</div>
          <div className="study-flow-edge study-flow-mqtt"><span>↕</span>{' '}{label('exchange')}</div>
          <div className="study-flow-node study-flow-system">{label('firmware')}</div>
          <div className="study-flow-branches">
            <div className="study-flow-edge"><span>↓</span></div>
            <div className="study-flow-edge"><span>↓</span></div>
            <div className="study-flow-node">{label('outlet')}</div>
            <div className="study-flow-node">{label('connectionLed')}</div>
          </div>
          <p>{label('separateComponents')}</p>
          <div className="study-flow-branches">
            <div className="study-flow-node">{label('app')}</div>
            <div className="study-flow-node">{label('powerLed')}</div>
          </div>
        </div>
      </div>
      <figcaption id="qube-flow-description">{label('description')}</figcaption>
    </figure>
  )
}
