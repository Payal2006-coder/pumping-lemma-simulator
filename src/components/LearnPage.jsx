import { useState } from 'react'
import LessonCard from './LessonCard'
import { LESSONS } from '../data/lessons'
import styles from './LearnPage.module.css'

export default function LearnPage({ onGoSim }) {
  const [done, setDone] = useState(new Set())

  function markDone(id) {
    setDone(prev => new Set([...prev, id]))
  }

  const total = LESSONS.length
  const completed = done.size
  const pct = (completed / total) * 100

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.tag}>CS Theory — Interactive Course</div>
          <h1 className={styles.h1}>
            <span className={styles.c1}>Pumping</span>
            <br />
            <span className={styles.c2}>Lemma</span>
          </h1>
          <p className={styles.sub}>
            Learn why some languages can't be regular — through animations,
            puzzles, and interactive proofs.
          </p>
        </div>

        {/* XP Bar */}
        <div className={styles.xpWrap}>
          <div className={styles.xpFill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.xpLabel}>{completed} / {total} lessons complete</div>

        {/* Progress dots */}
        <div className={styles.dots}>
          {LESSONS.map((l, i) => {
            const isDone = done.has(l.id)
            const isCur  = i === completed
            return (
              <div
                key={l.id}
                className={`${styles.dot} ${isDone ? styles.dotDone : isCur ? styles.dotCur : ''}`}
              />
            )
          })}
        </div>

        {/* Lesson cards */}
        <div>
          {LESSONS.map((l, i) => {
            const isDone   = done.has(l.id)
            const isLocked = i > 0 && !done.has(LESSONS[i - 1].id)
            return (
              <LessonCard
                key={l.id}
                lesson={l}
                isDone={isDone}
                isLocked={isLocked}
                onComplete={() => markDone(l.id)}
              />
            )
          })}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <button className="nav-btn" onClick={onGoSim}>
            Open Simulator →
          </button>
        </div>

      </div>
    </div>
  )
}
