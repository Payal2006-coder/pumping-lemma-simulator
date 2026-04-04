export const LANGUAGES = [
  { id: 'anbn',      name: 'aⁿbⁿ',      tag: 'non-regular',       eg: 'aaabbb'  },
  { id: 'anb2n',     name: 'aⁿb²ⁿ',     tag: 'non-regular',       eg: 'aabbbb'  },
  { id: 'anbncn',    name: 'aⁿbⁿcⁿ',     tag: 'context-sensitive', eg: 'aabbcc'  },
  { id: 'equal01',   name: '0s = 1s',    tag: 'non-regular',       eg: '000111'  },
  { id: 'palindrome',name: 'palindrome', tag: 'non-regular',       eg: 'abacaba' },
  { id: 'anbm',      name: 'aⁿbᵐ',      tag: 'regular ✓',         eg: 'aaabbb'  },
]

export function isValid(lang, str) {
  switch (lang) {
    case 'anbn': {
      let i = 0
      while (i < str.length && str[i] === 'a') i++
      const a = i
      const rest = str.slice(i)
      return rest.split('').every(c => c === 'b') && a === rest.length
    }
    case 'anb2n': {
      let i = 0
      while (i < str.length && str[i] === 'a') i++
      const a = i
      const b = str.slice(i).split('').filter(c => c === 'b').length
      return i + b === str.length && b === 2 * a
    }
    case 'anbncn': {
      let i = 0
      while (i < str.length && str[i] === 'a') i++
      const a = i
      let b = 0; while (i < str.length && str[i] === 'b') { b++; i++ }
      let c = 0; while (i < str.length && str[i] === 'c') { c++; i++ }
      return i === str.length && a === b && b === c
    }
    case 'equal01': {
      let z = 0, o = 0
      for (const c of str) {
        if (c === '0') z++
        else if (c === '1') o++
        else return false
      }
      return z === o
    }
    case 'palindrome':
      return str === str.split('').reverse().join('')
    case 'anbm': {
      let i = 0
      while (i < str.length && str[i] === 'a') i++
      while (i < str.length && str[i] === 'b') i++
      return i === str.length
    }
    default:
      return false
  }
}

export function getExplanation(lang, str) {
  switch (lang) {
    case 'anbn': {
      const a = (str.match(/a/g) || []).length
      const b = (str.match(/b/g) || []).length
      return a === b ? `a(${a}) = b(${b}) — valid` : `a(${a}) ≠ b(${b}) — invalid`
    }
    case 'anb2n': {
      const a = (str.match(/a/g) || []).length
      const b = (str.match(/b/g) || []).length
      return b === 2 * a ? `b(${b}) = 2a(${2 * a}) — valid` : `b(${b}) ≠ 2·${a} — invalid`
    }
    case 'anbncn': {
      let i = 0
      while (i < str.length && str[i] === 'a') i++
      const a = i
      let b = 0; while (i < str.length && str[i] === 'b') { b++; i++ }
      let c = 0; while (i < str.length && str[i] === 'c') { c++; i++ }
      return `a=${a}, b=${b}, c=${c} → ${a === b && b === c ? 'valid' : 'invalid'}`
    }
    case 'equal01': {
      const z = (str.match(/0/g) || []).length
      const o = (str.match(/1/g) || []).length
      return `0s=${z}, 1s=${o} → ${z === o ? 'equal' : 'not equal'}`
    }
    case 'palindrome': {
      const rev = str.split('').reverse().join('')
      return str === rev ? 'is a palindrome' : `reversed: "${rev}"`
    }
    default:
      return ''
  }
}

export function generateSplits(word, p, lang) {
  const splits = []
  for (let i = 0; i <= p; i++) {
    for (let j = i + 1; j <= p && j <= word.length; j++) {
      const s = { x: word.slice(0, i), y: word.slice(i, j), z: word.slice(j) }
      s.fails = false
      for (let k = 0; k <= 4; k++) {
        if (!isValid(lang, s.x + s.y.repeat(k) + s.z)) { s.fails = true; break }
      }
      splits.push(s)
    }
  }
  return splits
}
