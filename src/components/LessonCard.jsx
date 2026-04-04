import { useState } from 'react'
import PumpDemo from './PumpDemo'
import styles from './LessonCard.module.css'

export default function LessonCard({ lesson, isLocked, isDone, onComplete }) {
  const [open, setOpen] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState(null)
  const [shake, setShake] = useState(false)

  function handleToggle() {
    if (isLocked) return
    setOpen(v => !v)
  }

  function handleOption(idx) {
    if (answered) return
    if (idx === lesson.quiz.answer) {
      setSelected(idx)
      setAnswered(true)
      onComplete()
    } else {
      setSelected(idx)
      setShake(true)
      setTimeout(() => { setSelected(null); setShake(false) }, 1100)
    }
  }

  const cardClass = [
    styles.card,
    isDone   ? styles.done   : '',
    isLocked ? styles.locked : styles.unlocked,
  ].join(' ')

  return (
    <div className={cardClass}>
      {/* Header */}
      <div className={styles.head} onClick={handleToggle}>
        <div className={`${styles.icon} ${styles[lesson.iconColor]}`}>
          {lesson.icon}
        </div>
        <div className={styles.meta}>
          <h3>{lesson.title}</h3>
          <p>{lesson.sub}</p>
        </div>
        <span className={`${styles.badge} ${isDone ? styles.bdDone : isLocked ? styles.bdLock : styles.bdNew}`}>
          {isDone ? 'done' : isLocked ? 'locked' : 'new'}
        </span>
      </div>

      {/* Body */}
      {open && !isLocked && (
        <div className={styles.body}>
          {/* Lesson HTML content */}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />

          {/* Demo if present */}
          {lesson.demo && (
            <PumpDemo
              id={lesson.id}
              word={lesson.demo.word}
              xLen={lesson.demo.xLen}
              yLen={lesson.demo.yLen}
              label={lesson.demo.label}
            />
          )}

          {/* Quiz */}
          <div className={styles.quiz}>
            <div className={styles.quizQ}>// {lesson.quiz.question}</div>
            <div className={styles.quizOpts}>
              {lesson.quiz.options.map((opt, i) => {
                let cls = styles.opt
                if (answered && i === lesson.quiz.answer) cls += ' ' + styles.correct
                else if (selected === i && !answered)     cls += ' ' + styles.wrong
                if (shake && selected === i)              cls += ' ' + styles.shake
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => handleOption(i)}
                    disabled={answered}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
            <div className={`${styles.feedback} ${answered ? styles.fbOk : selected !== null ? styles.fbBad : ''}`}>
              {answered
                ? '✓ ' + lesson.quiz.explanation
                : selected !== null && !answered
                ? '✗ Not quite — try again!'
                : ''}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
