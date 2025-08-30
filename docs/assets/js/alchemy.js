(() => {
  const symbols = [
    "☿","☉","☽","♀","♂","♃","♄","♅","♆","♇","♁", // planetary set (common fonts)
    "△","▽","⦿","⦾","⊙","⊕","⨀",                // geometric/occult-adjacent
    "🜁","🜂","🜃","🜄"                              // alchemical elements (fallback if supported)
  ];
  const COUNT = 72; // keep it light
  const field = document.createElement('div');
  field.className = 'alchemy-field';
  document.body.appendChild(field);

  const vw = () => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = () => Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const rnd = (min, max) => Math.random() * (max - min) + min;
  const pick = arr => arr[Math.floor(Math.random()*arr.length)];

  function place() {
    // clear on resize reflow
    field.innerHTML = '';
    for (let i = 0; i < COUNT; i++) {
      const span = document.createElement('span');
      span.className = 'alchemy-glyph';
      span.textContent = pick(symbols);

      // random position & style
      span.style.left = rnd(0, vw()) + 'px';
      span.style.top  = rnd(0, vh()) + 'px';
      span.style.fontSize = rnd(10, 22) + 'px';
      span.style.opacity  = rnd(0.06, 0.12).toFixed(2);

      // gentle drift variables
      span.style.setProperty('--rot', rnd(-180,180).toFixed(2) + 'deg');
      span.style.setProperty('--dx', (Math.random() < .5 ? -1 : 1) * rnd(6,14).toFixed(2) + 'px');
      span.style.setProperty('--dy', (Math.random() < .5 ? -1 : 1) * rnd(6,14).toFixed(2) + 'px');
      span.style.setProperty('--dur', rnd(28, 60).toFixed(2) + 's');

      // desync animations
      span.style.animationDelay = (-rnd(0, 20)).toFixed(2) + 's';

      field.appendChild(span);
    }
  }

  place();
  // reflow on resize (debounced)
  let t; window.addEventListener('resize', () => {
    clearTimeout(t); t = setTimeout(place, 250);
  });
})();
