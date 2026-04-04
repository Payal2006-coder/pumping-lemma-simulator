import { useState, useEffect } from 'react'
import styles from './PumpDemo.module.css'

function isAnBn(str) {
  let i = 0
  while (i < str.length && str[i] === 'a') i++
  const a = i
  const rest = str.slice(i)
  return rest.split('').every(c => c === 'b') && a === rest.length
}

export default function PumpDemo({ id, word, xLen, yLen, label }) {
  const [k, setK] = useState(1)

  const x = word.slice(0, xLen)
  const y = word.slice(xLen, xLen + yLen)
  const z = word.slice(xLen + yLen)
  const pumped = x + y.repeat(k) + z
  const valid = isAnBn(pumped)
  const aCount = (pumped.match(/a/g) || []).length
  const bCount = (pumped.match(/b/g) || []).length

  let delay = 0
  const blocks = []
  for (const c of x) blocks.push({ c, type: 'x', d: delay++ })
  for (let r = 0; r < k; r++) for (const c of y) blocks.push({ c, type: 'y', d: delay++ })
  for (const c of z) blocks.push({ c, type: 'z', d: delay++ })

  return (
    <div className={styles.demo}>
      <div className={styles.label}>{label}</div>
      <div className={styles.blocks} key={k}>
        {blocks.map((b, i) => (
          <span
            key={i}
            className={`${styles.block} ${styles[b.type]}`}
            style={{ animationDelay: `${b.d * 28}ms` }}
          >
            {b.c}
          </span>
        ))}
      </div>
      <div className={styles.kRow}>
        <button className={styles.kBtn} onClick={() => setK(v => Math.max(0, v - 1))}>−</button>
        <span className={styles.kLabel}>k =</span>
        <span className={styles.kNum}>{k}</span>
        <button className={styles.kBtn} onClick={() => setK(v => Math.min(5, v + 1))}>+</button>
      </div>
      <div className={`${styles.result} ${valid ? styles.ok : styles.bad}`}>
        {valid
          ? `✓ "${pumped}" ∈ L  (a=${aCount}, b=${bCount} — equal)`
          : `✗ "${pumped}" ∉ L  (a=${aCount} ≠ b=${bCount})`}
      </div>
    </div>
  )
}
