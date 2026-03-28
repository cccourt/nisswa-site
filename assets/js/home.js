/* =========================================================
   HOME.JS — index.html only
   Handles: lake checker, autocomplete, results, map toggle,
            fleet preview reveal
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  const input       = document.getElementById('lake-input');
  const suggestions = document.getElementById('lake-suggestions');

  // ── LAKE DATA ────────────────────────────────────────────
  const LAKES = {
    "lower hay lake":        { display: "Lower Hay Lake",               fee: "free",  label: "Free Delivery" },
    "upper hay lake":        { display: "Upper Hay Lake",               fee: "free",  label: "Free Delivery" },
    "lower mission lake":    { display: "Lower Mission Lake",           fee: "free",  label: "Free Delivery" },
    "north long lake":       { display: "North Long Lake",              fee: "free",  label: "Free Delivery" },
    "sibley lake":           { display: "Sibley Lake",                  fee: "free",  label: "Free Delivery" },
    "pelican lake":          { display: "Pelican Lake",                 fee: "free",  label: "Free Delivery" },
    "gull lake":             { display: "Gull Lake",                    fee: "free",  label: "Free Delivery" },
    "nisswa lake":           { display: "Nisswa Lake",                  fee: "free",  label: "Free Delivery" },
    "clark lake":            { display: "Clark Lake",                   fee: "free",  label: "Free Delivery" },
    "lake hubert":           { display: "Lake Hubert",                  fee: "free",  label: "Free Delivery" },
    "round lake":            { display: "Round Lake",                   fee: "free",  label: "Free Delivery" },
    "lower cullen lake":     { display: "Lower Cullen Lake",            fee: "free",  label: "Free Delivery" },
    "middle cullen lake":    { display: "Middle Cullen Lake",           fee: "free",  label: "Free Delivery" },
    "east twin lake":        { display: "East Twin Lake",               fee: "free",  label: "Free Delivery" },
    "west twin lake":        { display: "West Twin Lake",               fee: "free",  label: "Free Delivery" },
    "edna lake":             { display: "Edna Lake",                    fee: "free",  label: "Free Delivery" },
    "lake edward":           { display: "Lake Edward",                  fee: "free",  label: "Free Delivery" },
    "gladstone lake":        { display: "Gladstone Lake",               fee: "free",  label: "Free Delivery" },
    "little pelican lake":   { display: "Little Pelican Lake",          fee: "free",  label: "Free Delivery" },
    "ossawinnamakee lake":   { display: "Ossawinnamakee Lake",          fee: "free",  label: "Free Delivery" },
    "silver lake":           { display: "Silver Lake",                  fee: "free",  label: "Free Delivery" },
    "lougee lake":           { display: "Lougee Lake",                  fee: "free",  label: "Free Delivery" },
    "breezy point":          { display: "Breezy Point Marina",          fee: "free",  label: "Free Delivery" },
    "wilderness resort":     { display: "Wilderness Resort",            fee: "free",  label: "Free Delivery" },
    "cross lake":            { display: "Cross Lake",                   fee: "100",   label: "$100 Delivery" },
    "horseshoe lake":        { display: "Horseshoe Lake",               fee: "100",   label: "$100 Delivery" },
    "clamshell lake":        { display: "Clamshell Lake",               fee: "100",   label: "$100 Delivery" },
    "kimble lake":           { display: "Kimble Lake",                  fee: "100",   label: "$100 Delivery" },
    "bass lake":             { display: "Bass Lake",                    fee: "100",   label: "$100 Delivery" },
    "red sand lake":         { display: "Red Sand Lake",                fee: "100",   label: "$100 Delivery" },
    "white sand lake":       { display: "White Sand Lake",              fee: "100",   label: "$100 Delivery" },
    "whipple lake":          { display: "Whipple Lake",                 fee: "100",   label: "$100 Delivery" },
    "gilbert lake":          { display: "Gilbert Lake",                 fee: "100",   label: "$100 Delivery" },
    "upper mission lake":    { display: "Upper Mission Lake",           fee: "100",   label: "$100 Delivery" },
    "clear lake":            { display: "Clear Lake",                   fee: "100",   label: "$100 Delivery" },
    "big trout lake":        { display: "Big Trout Lake",               fee: "100",   label: "$100 Delivery" },
    "army corp":             { display: "Army Corp Boat Launch",        fee: "100",   label: "$100 Delivery" },
    "quarterdeck":           { display: "Quarterdeck Resort",           fee: "100",   label: "$100 Delivery" },
    "sandy beach":           { display: "Sandy Beach Resort",           fee: "100",   label: "$100 Delivery" },
    "sylvan lake":           { display: "Sylvan Lake",                  fee: "200",   label: "$200 Delivery" },
    "dade lake":             { display: "Dade Lake",                    fee: "200",   label: "$200 Delivery" },
    "upper south long lake": { display: "Upper South Long Lake",        fee: "200",   label: "$200 Delivery" },
    "lower south long lake": { display: "Lower South Long Lake",        fee: "200",   label: "$200 Delivery" },
    "serpent lake":          { display: "Serpent Lake",                 fee: "200",   label: "$200 Delivery" },
    "rabbit lake":           { display: "Rabbit Lake",                  fee: "200",   label: "$200 Delivery" },
    "craguns":               { display: "Cragun's Resort",              fee: "200",   label: "$200 Delivery" },
    "maddens":               { display: "Madden's On Gull Lake",        fee: "200",   label: "$200 Delivery" },
    "kavanaughs":            { display: "Kavanaugh's Resort",           fee: "200",   label: "$200 Delivery" },
    "bay lake":              { display: "Bay Lake",                     fee: "300",   label: "$300 Delivery" },
    "farm island lake":      { display: "Farm Island Lake",             fee: "300",   label: "$300 Delivery" },
    "garrison":              { display: "Garrison Boat Access",         fee: "300",   label: "$300 Delivery" },
    "pine mountain lake":    { display: "Pine Mountain Lake",           fee: "300",   label: "$300 Delivery" },
    "big portage lake":      { display: "Big Portage Lake",             fee: "300",   label: "$300 Delivery" },
    "sanborn lake":          { display: "Sanborn Lake",                 fee: "300",   label: "$300 Delivery" },
    "pleasant lake":         { display: "Pleasant Lake",                fee: "300",   label: "$300 Delivery" },
    "birch lake":            { display: "Birch Lake",                   fee: "300",   label: "$300 Delivery" },
    "emily lake":            { display: "Emily Lake",                   fee: "300",   label: "$300 Delivery" },
    "shamineau lake":        { display: "Shamineau Lake",               fee: "300",   label: "$300 Delivery" },
    "lake alexander":        { display: "Lake Alexander",               fee: "300",   label: "$300 Delivery" },
    "fish trap lake":        { display: "Fish Trap Lake",               fee: "300",   label: "$300 Delivery" },
    "crow wing lake":        { display: "Crow Wing Lake",               fee: "300",   label: "$300 Delivery" }
  };

  const ACCESSES = {
    "gull lake": [
      { name: "Gull Lake, Gull Narrows, Public Water Access", fee: "free" },
      { name: "Gull Lake East Public Water Access",           fee: "free" }
    ],
    "nisswa lake": [
      { name: "Nisswa Lake Public Water Access", fee: "free" }
    ],
    "pelican lake": [
      { name: "Pelican Lake Jones Bay Public Water Access",         fee: "free" },
      { name: "Pelican Lake (NW) Public Water Access",              fee: "free" },
      { name: "Pelican Lake, Halverson Bay Public Water Access",    fee: "100"  }
    ],
    "north long lake": [
      { name: "North Long Lake Public Water Access",            fee: "free" },
      { name: "North Long Lake Merrifield Public Water Access", fee: "free" }
    ],
    "cross lake": [
      { name: "Cross Lake SW Public Water Access",  fee: "100" },
      { name: "Cross Lake East Public Access",      fee: "100" }
    ],
    "bay lake": [
      { name: "Bay Lake Public Water Access", fee: "300" }
    ],
    "sylvan lake": [
      { name: "Kavanaugh's Sylvan Lake Resort",    fee: "200" },
      { name: "Sylvan Lake Public Water Access",  fee: "200" }
    ],
    "hay lake": [
      { name: "Lower Hay Lake Public Water Access", fee: "free" },
      { name: "Upper Hay Lake Public Water Access", fee: "free" }
    ]
  };

  // ── HELPERS ──────────────────────────────────────────────
  function norm(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function badgeClass(fee) {
    return fee === 'free' ? 'free' : 'h';
  }

  function badgeLabel(fee) {
    return fee === 'free' ? 'Free' : '$' + fee + ' Delivery';
  }

  function findLake(raw) {
    const lo = raw.trim().toLowerCase();
    const n  = norm(lo);

    // Exact key match first
    if (LAKES[lo]) return LAKES[lo];

    // Fuzzy match
    const entry = Object.entries(LAKES).find(function (kv) {
      return kv[0].includes(lo) ||
             kv[1].display.toLowerCase().includes(lo) ||
             norm(kv[0]).includes(n) ||
             norm(kv[1].display).includes(n);
    });
    return entry ? entry[1] : null;
  }

  function findAccesses(raw) {
    const lo = raw.trim().toLowerCase();
    const n  = norm(lo);

    if (ACCESSES[lo]) return ACCESSES[lo];

    const entry = Object.entries(ACCESSES).find(function (kv) {
      return kv[0].includes(lo) || norm(kv[0]).includes(n);
    });
    return entry ? entry[1] : null;
  }

  function getLakeMatches(value) {
    const lo = value.trim().toLowerCase();
    const n  = norm(lo);
    if (!lo) return [];

    return Object.entries(LAKES).filter(function (kv) {
      return kv[0].includes(lo) ||
             kv[1].display.toLowerCase().includes(lo) ||
             norm(kv[0]).includes(n) ||
             norm(kv[1].display).includes(n);
    }).slice(0, 6);
  }

  // ── AUTOCOMPLETE ─────────────────────────────────────────
  function renderSuggestions(value) {
    if (!suggestions) return;
    const matches = getLakeMatches(value);

    if (!value.trim() || !matches.length) {
      suggestions.classList.remove('show');
      suggestions.innerHTML = '';
      return;
    }

    suggestions.innerHTML = matches.map(function (kv) {
      return '<button class="lake-suggestion-item" type="button" data-lake="' + kv[1].display + '">' +
               '<span>' + kv[1].display + '</span>' +
               '<span>' + kv[1].label + '</span>' +
             '</button>';
    }).join('');

    suggestions.classList.add('show');

    suggestions.querySelectorAll('.lake-suggestion-item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLake(this.getAttribute('data-lake'));
        suggestions.classList.remove('show');
      });
    });
  }

  // ── PUBLIC FUNCTIONS (called from inline onclick) ─────────
  window.setLake = function (name) {
    if (!input) return;
    input.value = name;
    document.querySelectorAll('.pill').forEach(function (p) {
      p.classList.toggle('on', p.textContent.trim().toLowerCase() === name.toLowerCase());
    });
    renderSuggestions(name);
    window.doCheck();
  };

  window.toggleMap = function () {
    var panel = document.getElementById('map-panel');
    if (!panel) return;
    panel.classList.toggle('show');
    if (panel.classList.contains('show')) {
      setTimeout(function () {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  window.closeMap = function () {
    var panel = document.getElementById('map-panel');
    if (panel) panel.classList.remove('show');
  };

  window.showFleet = function (lakeName, idx) {
    document.querySelectorAll('.ac').forEach(function (card, i) {
      card.classList.toggle('sel', i === idx);
    });

    var fleetLake = document.getElementById('fleet-lake');
    var fleet     = document.getElementById('fleet');

    if (fleetLake) fleetLake.textContent = lakeName;

    if (fleet) {
      fleet.className = '';
      void fleet.offsetWidth; // reflow for re-animation
      fleet.className = 'show';
      setTimeout(function () {
        fleet.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  window.doCheck = function () {
    var resultsEl = document.getElementById('results');
    var fleetEl   = document.getElementById('fleet');
    if (!input || !resultsEl) return;

    var raw         = input.value.trim();
    var match       = findLake(raw);
    var accesses    = findAccesses(raw);
    var displayName = match
      ? match.display
      : (raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : 'Unknown');

    // Not found
    if (!match && !accesses) {
      resultsEl.className = '';
      resultsEl.innerHTML = [
        '<div class="result-head">',
          '<div>',
            '<div class="s-label">// No Delivery Found</div>',
            '<div class="result-lake">Not In Our Area</div>',
          '</div>',
          '<div class="result-status">',
            '<span style="width:6px;height:6px;border-radius:50%;background:#f87171;display:inline-block"></span>',
            '&nbsp;Outside delivery zone',
          '</div>',
        '</div>',
        '<p style="font-family:\'DM Mono\',monospace;font-size:.7rem;letter-spacing:.12em;color:rgba(244,241,236,.5);line-height:2">',
          'We don\'t currently deliver to this lake.<br>',
          'Try: Gull Lake, Nisswa Lake, Pelican Lake, Cross Lake, Bay Lake, Sylvan Lake.',
        '</p>'
      ].join('');
      void resultsEl.offsetWidth;
      resultsEl.className = 'show';
      if (fleetEl) fleetEl.className = '';
      return;
    }

    // Build access cards HTML
    var cardsHTML;
    if (accesses) {
      cardsHTML = accesses.map(function (a, i) {
        var safeName = displayName.replace(/'/g, "\\'");
        return [
          '<div class="ac" id="ac' + i + '">',
            '<div class="ac-top">',
              '<div class="ac-name">' + a.name + '</div>',
              '<span class="badge ' + badgeClass(a.fee) + '">' + badgeLabel(a.fee) + '</span>',
            '</div>',
            '<div class="ac-btns">',
              '<button class="ac-btn" onclick="toggleMap()">View Map</button>',
              '<button class="ac-btn pri" onclick="showFleet(\'' + safeName + '\', ' + i + ')">See Rentals →</button>',
            '</div>',
          '</div>'
        ].join('');
      }).join('');
    } else {
      var safeName = displayName.replace(/'/g, "\\'");
      cardsHTML = [
        '<div class="ac">',
          '<div class="ac-top">',
            '<div class="ac-name">' + displayName + ' — Public Water Access</div>',
            '<span class="badge ' + (match ? badgeClass(match.fee) : 'h') + '">' +
              (match ? badgeLabel(match.fee) : '') + '</span>',
          '</div>',
          '<div class="ac-btns">',
            '<button class="ac-btn" onclick="toggleMap()">View Map</button>',
            '<button class="ac-btn pri" onclick="showFleet(\'' + safeName + '\', 0)">See Rentals →</button>',
          '</div>',
        '</div>'
      ].join('');
    }

    var accessCount = accesses
      ? accesses.length + ' access point' + (accesses.length > 1 ? 's' : '')
      : '1 access point';

    resultsEl.className = '';
    resultsEl.innerHTML = [
      '<div class="result-head">',
        '<div>',
          '<div class="s-label">// Delivery Available</div>',
          '<div class="result-lake">' + displayName + '</div>',
        '</div>',
        '<div class="result-status">',
          '<span class="live-dot"></span>',
          '&nbsp;' + accessCount + ' found',
        '</div>',
      '</div>',
      '<div class="access-grid">' + cardsHTML + '</div>',
      '<div id="map-panel">',
        '<iframe src="https://www.google.com/maps/d/u/0/embed?mid=1PRQp6qV-ajT8bqoY3w5LTWwkQ9Vlla0&ehbc=2E312F&noprof=1" allowfullscreen loading="lazy"></iframe>',
        '<div class="map-bar">',
          '<span>All delivery accesses · Nisswa Boat & Jet Ski</span>',
          '<button class="map-close" onclick="closeMap()">Close ×</button>',
        '</div>',
      '</div>'
    ].join('');

    void resultsEl.offsetWidth;
    resultsEl.className = 'show';
    if (fleetEl) fleetEl.className = '';

    setTimeout(function () {
      resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // ── INPUT EVENTS ─────────────────────────────────────────
  if (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        if (suggestions && suggestions.classList.contains('show')) {
          var first = suggestions.querySelector('.lake-suggestion-item');
          if (first) { e.preventDefault(); first.click(); return; }
        }
        window.doCheck();
      }
    });

    input.addEventListener('input', function (e) {
      var value = e.target.value.toLowerCase();
      document.querySelectorAll('.pill').forEach(function (p) {
        p.classList.toggle('on', p.textContent.trim().toLowerCase() === value);
      });
      renderSuggestions(e.target.value);
    });

    input.addEventListener('blur', function () {
      setTimeout(function () {
        if (suggestions) suggestions.classList.remove('show');
      }, 180);
    });

    input.addEventListener('focus', function () {
      renderSuggestions(input.value);
    });
  }

});
