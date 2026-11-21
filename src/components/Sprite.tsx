/* ---------- pixel sprites: each string is a row, each letter a palette key ---------- */
const FLOWER = ['..ooo..', '.ooyoo.', '.oyyyo.', '.ooyoo.', '..ooo..', '...g...', '.G.g...', '.ggg.G.', '...ggg.', '...g...']
const MUSH = ['..rrrr..', '.rrwrrr.', 'rrrrrwrr', 'rwrrrrrr', '.wwwwww.', '..wss...', '..wss...']
const SUN = ['..yyyyy..', '.yyyyyyy.', 'yyyyyyyyy', 'yyyyyyyyy', 'yyyyyyyyy', 'yyyyyyyyy', 'yyyyyyyyy', '.yyyyyyy.', '..yyyyy..']
const MOON = ['..mmmm..', '.mmm....', 'mmm.....', 'mmm.....', 'mmm.....', 'mmm.....', '.mmm....', '..mmmm..']
const GARDENER = ['...hhhh...', '..hhhhhh..', '.hhhhhhhh.', '..ffffff..', '..fefeef..', '..ffffff..', '..bbbbbb..', '.bbbbbbbb.', '.fbbbbbbf.', '..bbbbbb..', '..dd..dd..']
const COLORS: Readonly<Record<string, string>> = { y: '#FFE066', g: '#5CB85C', G: '#2E7D32', w: '#fff', s: '#F3E0C2', m: '#FFE9A8', f: '#F1C27D', e: '#2B1D0E', b: '#4CAF50', d: '#7B4B2A', h: 'var(--ac)', r: 'var(--ac)' }

const SPRITES = { flower: FLOWER, mushroom: MUSH, sun: SUN, moon: MOON, gardener: GARDENER }

interface SpriteProps {
  name: keyof typeof SPRITES
  pal?: Readonly<Record<string, string>>
  scale?: number
  className?: string
}

export function Sprite({ name, pal = {}, scale = 5, className = '' }: SpriteProps) {
  const rows = SPRITES[name]
  const colors = { ...COLORS, ...pal }
  const rects = rows.flatMap((row, y) => [...row].map((pixel, x) => {
    const fill = colors[pixel]
    return fill ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" style={{ fill }} /> : null
  }))
  return (
    <svg className={className} width={rows[0].length * scale} height={rows.length * scale} viewBox={`0 0 ${rows[0].length} ${rows.length}`} shapeRendering="crispEdges" aria-hidden="true">{rects}</svg>
  )
}
