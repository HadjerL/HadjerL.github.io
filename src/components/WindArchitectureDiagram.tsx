import { useTranslation } from 'react-i18next'

function FlowArrow({ twoWay = false }: { twoWay?: boolean }) {
  return (
    <svg width="18" height="28" viewBox="0 0 18 28" aria-hidden="true" focusable="false">
      <path
        d={twoWay ? 'M9 3v22m-5-17 5-5 5 5m-10 12 5 5 5-5' : 'M9 3v22m-5-5 5 5 5-5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

export function WindArchitectureDiagram() {
  const { t } = useTranslation()
  const label = (name: string) => t(`caseStudies.wind.diagram.${name}`)

  return (
    <figure className="study-flow">
      <div role="img" aria-labelledby="wind-flow-title" aria-describedby="wind-flow-description">
        <p className="study-flow-title" id="wind-flow-title">{label('title')}</p>
        <div className="study-flow-map" aria-hidden="true">
          <div className="study-flow-node">{label('source')}</div>
          <FlowArrow />
          <div className="study-flow-node">{label('simulator')}</div>
          <div className="study-flow-edge study-flow-mqtt"><FlowArrow /><span>{label('publish')}</span></div>
          <div className="study-flow-node">{label('broker')}</div>
          <div className="study-flow-edge study-flow-mqtt"><FlowArrow /><span>{label('stream')}</span></div>
          <div className="study-flow-node study-flow-system">
            <strong>{label('web')}</strong>
            <div className="study-flow-branches">
              <span>{label('dashboard')}</span>
              <span>{label('administration')}</span>
            </div>
          </div>
          <div className="study-flow-branches study-flow-api">
            <div className="study-flow-edge"><FlowArrow twoWay /><span>{label('inferenceExchange')}</span></div>
            <div className="study-flow-edge"><FlowArrow twoWay /><span>{label('lifecycleExchange')}</span></div>
          </div>
          <div className="study-flow-node study-flow-system">
            <strong>{label('edge')}</strong>
            <div className="study-flow-branches">
              <span>{label('inference')}</span>
              <span>{label('lifecycle')}</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption id="wind-flow-description">{label('description')}</figcaption>
    </figure>
  )
}
