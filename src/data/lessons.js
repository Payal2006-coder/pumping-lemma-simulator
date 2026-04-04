export const LESSONS = [
  {
    id: 'L0',
    icon: '?',
    iconColor: 'ic-blue',
    title: 'What is a regular language?',
    sub: 'Foundation',
    content: `
      <p>A <strong>regular language</strong> is any language a finite automaton (DFA) can recognize —
      a machine with only finite memory. It remembers only its <strong>current state</strong>,
      not the full history of input.</p>
      <div class="fbox">
        <span class="fb">DFA</span> &nbsp;→&nbsp; finite memory &nbsp;→&nbsp; <span class="fg">Regular Language</span>
      </div>
      <p>Example: "all strings over {a,b} ending in 'ab'" is regular. But "equal number of
      a's and b's" is <strong>not</strong> — you'd need infinite memory to count.</p>
    `,
    quiz: {
      question: 'What can a DFA store between reading characters?',
      options: ['Its current state only', 'Full input history', 'Count of every symbol', 'Nested brackets'],
      answer: 0,
      explanation: 'Correct! Only the current state — finite memory.',
    },
  },
  {
    id: 'L1',
    icon: '∞',
    iconColor: 'ic-purple',
    title: 'The pumping lemma — intuition',
    sub: 'Core concept + demo',
    content: `
      <p>If L is regular, any sufficiently long string w ∈ L can be split into
      <strong>three parts</strong> and the middle part can be repeated any number of
      times — the result always stays in L.</p>
      <div class="fbox">
        w = <span class="fb">x</span> · <span class="fg">y</span> · <span class="fr">z</span>
        &nbsp;&nbsp;⟹&nbsp;&nbsp;
        <span class="fb">x</span><span class="fg">y<sup>k</sup></span><span class="fr">z</span> ∈ L
        &nbsp; for all k ≥ 0
      </div>
      <p>The <span style="color:var(--green)">green y</span> is the "pump". If pumping ever
      <em>breaks</em> membership in L, the language cannot be regular.</p>
    `,
    demo: { word: 'aaabbb', xLen: 1, yLen: 2, label: 'Pump y (the green "aa") and watch a/b counts diverge' },
    quiz: {
      question: 'If xy²z ∉ L for some valid split, what does it imply?',
      options: ['L must be regular', 'w is not in L', 'L might NOT be regular', 'k must be 0'],
      answer: 2,
      explanation: 'Right! Finding a pump that breaks membership is evidence L is not regular.',
    },
  },
  {
    id: 'L2',
    icon: '3',
    iconColor: 'ic-green',
    title: 'The three conditions',
    sub: 'Must memorize these',
    content: `
      <p>The lemma says: if L is regular with pumping length p, any w ∈ L with |w| ≥ p
      has a split w = xyz satisfying:</p>
      <div class="clist">
        <div class="citem"><div class="cnum">1</div>
          <div class="ctxt"><strong>|xy| ≤ p</strong> — the split point falls within the first p characters</div>
        </div>
        <div class="citem"><div class="cnum">2</div>
          <div class="ctxt"><strong>|y| ≥ 1</strong> — y is non-empty (otherwise pumping changes nothing)</div>
        </div>
        <div class="citem"><div class="cnum">3</div>
          <div class="ctxt"><strong>xy<sup>k</sup>z ∈ L</strong> for all k ≥ 0 — pumping must keep the string in L</div>
        </div>
      </div>
    `,
    quiz: {
      question: 'What does xy⁰z equal?',
      options: ['xyz (unchanged)', 'x + z (y removed)', 'x alone', 'empty string'],
      answer: 1,
      explanation: 'Correct! y⁰ = empty string, so xy⁰z = xz — y is removed entirely.',
    },
  },
  {
    id: 'L3',
    icon: '✗',
    iconColor: 'ic-amber',
    title: 'Proof by contradiction',
    sub: 'The strategy',
    content: `
      <p>To prove L is NOT regular, use contradiction:</p>
      <div class="clist">
        <div class="citem"><div class="cnum">1</div>
          <div class="ctxt"><strong>Assume</strong> L is regular with pumping length p</div>
        </div>
        <div class="citem"><div class="cnum">2</div>
          <div class="ctxt"><strong>Pick</strong> a string w ∈ L with |w| ≥ p strategically</div>
        </div>
        <div class="citem"><div class="cnum">3</div>
          <div class="ctxt"><strong>For every</strong> valid split w = xyz, show some xy<sup>k</sup>z ∉ L</div>
        </div>
        <div class="citem"><div class="cnum">4</div>
          <div class="ctxt"><strong>Contradiction!</strong> So L is not regular.</div>
        </div>
      </div>
      <div class="fbox">Classic pick: w = <span class="fa">a<sup>p</sup>b<sup>p</sup></span> for L = {aⁿbⁿ}</div>
    `,
    quiz: {
      question: "Why pick w = aᵖbᵖ for L = aⁿbⁿ?",
      options: ['It is easy to write', "Forces y to be all a's", "Has no b's", 'It is the shortest'],
      answer: 1,
      explanation: "Yes! Since |xy| ≤ p and w starts with p a's, y must lie in the a-block only.",
    },
  },
  {
    id: 'L4',
    icon: '★',
    iconColor: 'ic-red',
    title: 'Classic example: aⁿbⁿ',
    sub: 'Full proof walkthrough',
    content: `
      <p>L = { aⁿbⁿ | n ≥ 1 }. Assume regular, pumping length p.
      Pick <strong>w = aᵖbᵖ</strong>.</p>
      <p>Since |xy| ≤ p, y must be within the first p characters — all a's.
      So <strong>y = aʲ</strong> for some j ≥ 1.</p>
      <div class="fbox">
        xy²z = a<span class="fb">^(p+j)</span> b<span class="fr">^p</span>
        &nbsp;→&nbsp; <span class="fr">more a's than b's!</span>
      </div>
      <p>xy²z ∉ L. Contradiction — L is NOT regular!</p>
    `,
    demo: { word: 'aaaabbbb', xLen: 2, yLen: 2, label: 'Pump y="aa" — a-count grows but b-count stays fixed' },
    quiz: {
      question: 'After pumping y = aʲ twice (k=2), the string has...',
      options: ["Equal a's and b's", "More a's than b's", "More b's than a's", 'Same length'],
      answer: 1,
      explanation: "Exactly! We added j more a's but b-count stayed at p — so a's > b's, not in L.",
    },
  },
]
