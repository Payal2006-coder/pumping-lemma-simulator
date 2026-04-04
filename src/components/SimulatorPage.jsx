import { useState } from 'react'
import { LANGUAGES, isValid, getExplanation, generateSplits } from '../utils/languages'
import styles from './SimulatorPage.module.css'

export default function SimulatorPage({ onGoLearn }) {
  const [lang, setLang]       = useState('anbn')
  const [word, setWord]       = useState('aaabbb')
  const [p, setP]             = useState(3)
  const [splits, setSplits]   = useState([])
  const [selected, setSelected] = useState(null)
  const [k, setK]             = useState(1)
  const [proof, setProof]     = useState(null)

  function handleLang(id, eg) {
    setLang(id); setWord(eg)
    setSplits([]); setSelected(null); setProof(null)
  }

  function handleGenerate() {
    const s = generateSplits(word, p, lang)
    setSplits(s); setSelected(null); setProof(null)
  }

  function handleAutoProve() {
    let s = splits
    if (!s.length) { s = generateSplits(word, p, lang); setSplits(s) }
    setProof(s.every(sp => sp.fails) ? 'proved' : 'inconclusive')
  }

  function handleSelect(sp) {
    setSelected(sp); setK(1)
    setTimeout(() => {
      document.getElementById('pump-explorer')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 50)
  }

  // Pump calculation
  const pumped    = selected ? selected.x + selected.y.repeat(k) + selected.z : ''
  const pumpValid = selected ? isValid(lang, pumped) : false
  const expl      = selected ? getExplanation(lang, pumped) : ''

  // Build char blocks
  let delay = 0
  const blocks = []
  if (selected) {
    for (const c of selected.x) blocks.push({ c, type: 'x', d: delay++ })
    for (let r = 0; r < k; r++) for (const c of selected.y) blocks.push({ c, type: 'y', d: delay++ })
    for (const c of selected.z) blocks.push({ c, type: 'z', d: delay++ })
  }

  const xyLen = selected ? selected.x.length + selected.y.length : 0

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.title}>Pumping Lemma <span>Simulator</span></div>
            <div className={styles.sub}>// prove a language is not regular</div>
          </div>
          <button className="nav-btn ghost" onClick={onGoLearn}>← Back to lessons</button>
        </div>

        {/* Language selector */}
        <div className={styles.panel}>
          <div className={styles.ph}>
            <span className={styles.dr}/><span className={styles.dy}/><span className={styles.dg}/>
            &nbsp;select_language.cfg
          </div>
          <div className={styles.langGrid}>
            {LANGUAGES.map(l => (
              <button
                key={l.id}
                className={`${styles.lBtn} ${lang === l.id ? styles.lBtnActive : ''}`}
                onClick={() => handleLang(l.id, l.eg)}
              >
                <span className={styles.lName}>{l.name}</span>
                <span className={styles.lTag}>{l.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input row */}
        <div className={styles.twoCol}>
          <div className={styles.panel}>
            <div className={styles.ph}>
              <span className={styles.dr}/><span className={styles.dy}/><span className={styles.dg}/>
              &nbsp;input_string.txt
            </div>
            <div className={styles.field}>
              <label>String w</label>
              <input
                className={styles.input}
                value={word}
                onChange={e => setWord(e.target.value)}
                placeholder="e.g. aaabbb"
              />
            </div>
          </div>
          <div className={styles.panel}>
            <div className={styles.ph}>
              <span className={styles.dr}/><span className={styles.dy}/><span className={styles.dg}/>
              &nbsp;pumping_length.cfg
            </div>
            <div className={styles.field}>
              <label>Pumping length p</label>
              <input
                className={styles.input}
                type="number"
                value={p}
                min={1} max={20}
                onChange={e => setP(parseInt(e.target.value) || 3)}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.panel}>
          <div className={styles.ph}>
            <span className={styles.dr}/><span className={styles.dy}/><span className={styles.dg}/>
            &nbsp;actions.sh
          </div>
          <div className={styles.btnRow}>
            <button className={`${styles.btn} ${styles.btnBlue}`} onClick={handleGenerate}>
              Generate Splits
            </button>
            <button className={`${styles.btn} ${styles.btnGreen}`} onClick={handleAutoProve}>
              Auto-Prove
            </button>
          </div>
          {proof === 'proved' && (
            <div className={`${styles.proof} ${styles.proofOk}`}>
              ✓ PROVED: Language is NOT regular — every valid split breaks under pumping
            </div>
          )}
          {proof === 'inconclusive' && (
            <div className={`${styles.proof} ${styles.proofWarn}`}>
              ⚠ Inconclusive — some splits survive pumping with this string
            </div>
          )}
        </div>

        {/* Splits grid */}
        {splits.length > 0 && (
          <div className={styles.panel}>
            <div className={styles.ph}>
              <span className={styles.dr}/><span className={styles.dy}/><span className={styles.dg}/>
              &nbsp;valid_splits.out &nbsp;
              <span className={styles.cnt}>({splits.length} splits)</span>
            </div>
            <div className={styles.splitsGrid}>
              {splits.map((sp, i) => (
                <div
                  key={i}
                  className={`${styles.sc} ${sp.fails ? styles.scFail : styles.scPass} ${selected === sp ? styles.scSel : ''}`}
                  onClick={() => handleSelect(sp)}
                >
                  <span className={`${styles.scBadge} ${sp.fails ? styles.scBadgeFail : styles.scBadgePass}`}>
                    {sp.fails ? 'fails' : 'passes'}
                  </span>
                  <div className={styles.scLbl}>x</div>
                  <div className={`${styles.scV} ${styles.vx}`}>{sp.x || 'ε'}</div>
                  <div className={styles.scLbl}>y</div>
                  <div className={`${styles.scV} ${styles.vy}`}>{sp.y}</div>
                  <div className={styles.scLbl}>z</div>
                  <div className={`${styles.scV} ${styles.vz}`}>{sp.z || 'ε'}</div>
                </div>
              ))}
            </div>
            <div className={styles.legend}>
              <div className={styles.legItem}><div className={`${styles.legSq} ${styles.legX}`}/>x prefix</div>
              <div className={styles.legItem}><div className={`${styles.legSq} ${styles.legY}`}/>y pump</div>
              <div className={styles.legItem}><div className={`${styles.legSq} ${styles.legZ}`}/>z suffix</div>
            </div>
          </div>
        )}

        {/* Pump Explorer */}
        {selected && (
          <div className={styles.panel} id="pump-explorer">
            <div className={styles.ph}>
              <span className={styles.dr}/><span className={styles.dy}/><span className={styles.dg}/>
              &nbsp;pump_explorer.sh — watch y repeat as k changes
            </div>
            <div className={styles.pexp}>

              {/* XYZ chips */}
              <div className={styles.chips}>
                <div className={styles.chip}>
                  <label>x prefix</label>
                  <div className={`${styles.chipV} ${styles.vx}`}>{selected.x || 'ε'}</div>
                </div>
                <div className={styles.chip}>
                  <label>y pump</label>
                  <div className={`${styles.chipV} ${styles.vy}`}>{selected.y}</div>
                </div>
                <div className={styles.chip}>
                  <label>z suffix</label>
                  <div className={`${styles.chipV} ${styles.vz}`}>{selected.z || 'ε'}</div>
                </div>
              </div>

              {/* Animated blocks */}
              <div className={styles.animBox}>
                <div className={styles.animLbl}>xy<sup>k</sup>z — full pumped string</div>
                <div className={styles.pblocks} key={`${k}-${selected.y}`}>
                  {blocks.map((b, i) => (
                    <span
                      key={i}
                      className={`${styles.pb} ${styles['pb' + b.type]}`}
                      style={{ animationDelay: `${b.d * 22}ms` }}
                    >
                      {b.c}
                    </span>
                  ))}
                  {blocks.length === 0 && <span className={styles.eps}>ε</span>}
                </div>

                <div className={styles.animLbl}>y copies — each repetition of y</div>
                <div className={styles.yCopies} key={`yc-${k}`}>
                  {k === 0
                    ? <span className={styles.eps}>y⁰ = ε (y removed completely)</span>
                    : Array.from({ length: k }, (_, r) => (
                        <span key={r} style={{ display: 'contents' }}>
                          {r > 0 && <span className={styles.plus}>+</span>}
                          <span
                            className={styles.yCopy}
                            style={{ animationDelay: `${r * 90}ms` }}
                          >
                            copy {r + 1}: &quot;{selected.y}&quot;
                          </span>
                        </span>
                      ))
                  }
                </div>
              </div>

              {/* k slider */}
              <div className={styles.kRow}>
                <span className={styles.kLbl}>k =</span>
                <input
                  type="range" min={0} max={6} step={1} value={k}
                  className={styles.kSlider}
                  onChange={e => setK(parseInt(e.target.value))}
                />
                <span className={styles.kDisp}>{k}</span>
              </div>

              {/* Condition badges */}
              <div className={styles.condBadges}>
                <span className={`${styles.cb} ${xyLen <= p ? styles.cbOk : styles.cbBad}`}>
                  |xy| = {xyLen} {xyLen <= p ? '≤' : '>'} p={p}
                </span>
                <span className={`${styles.cb} ${selected.y.length > 0 ? styles.cbOk : styles.cbBad}`}>
                  |y| = {selected.y.length} {selected.y.length > 0 ? '≥ 1' : '= 0 ⚠'}
                </span>
              </div>

              {/* Result */}
              <div className={styles.resRow}>
                <span className={styles.resStr}>{pumped || 'ε'}</span>
                <span className={`${styles.resBadge} ${pumpValid ? styles.rbOk : styles.rbBad}`}>
                  {pumpValid ? '∈ L' : '∉ L'}
                </span>
              </div>

              {/* Explanation */}
              {expl && <div className={styles.expl}>// {expl}</div>}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
