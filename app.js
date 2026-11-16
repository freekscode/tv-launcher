/*
 * Launcher TV : navigation à la télécommande (flèches + OK).
 * Écrit en JavaScript "ancien" (ES5) car le navigateur des télés VIDAA
 * n'est pas toujours récent.
 */
(function () {
  'use strict';

  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
  };
  var BACK_KEYS = [8, 27, 461, 10009]; // Retour selon les télécommandes

  var config = window.LAUNCHER_CONFIG || { title: 'Salon', rows: [] };
  var rows = config.rows.filter(function (row) {
    return row.apps && row.apps.length > 0;
  });
  var tileEls = []; // tileEls[ligne][colonne]
  var rowEls = [];
  var pos = { row: 0, col: 0 };
  var lastColByRow = [];

  // --- Rendu ---------------------------------------------------------------

  function render() {
    var container = document.getElementById('rows');
    var inner = document.createElement('div');
    inner.className = 'rows-inner';

    rows.forEach(function (row, r) {
      var rowEl = document.createElement('section');
      rowEl.className = 'row';

      var title = document.createElement('h2');
      title.className = 'row-title';
      title.textContent = row.title;
      rowEl.appendChild(title);

      var tilesWrap = document.createElement('div');
      tilesWrap.className = 'row-tiles';
      tileEls[r] = [];

      row.apps.forEach(function (app, c) {
        var tile = document.createElement('div');
        tile.className = 'tile';
        tile.style.backgroundColor = app.color || '#334';

        var icon = document.createElement('div');
        icon.className = 'tile-icon';
        icon.textContent = app.icon || app.name.charAt(0).toUpperCase();

        var name = document.createElement('div');
        name.className = 'tile-name';
        name.textContent = app.name;

        tile.appendChild(icon);
        tile.appendChild(name);
        tile.addEventListener('click', function () {
          pos = { row: r, col: c };
          updateFocus();
          openApp(app);
        });
        tilesWrap.appendChild(tile);
        tileEls[r].push(tile);
      });

      rowEl.appendChild(tilesWrap);
      inner.appendChild(rowEl);
      rowEls.push({ el: rowEl, tiles: tilesWrap });
      lastColByRow[r] = 0;
    });

    container.appendChild(inner);
    document.title = config.title || 'Salon';
  }

  // --- Focus et défilement -------------------------------------------------

  function updateFocus() {
    var focused = document.querySelector('.tile.focused');
    if (focused) focused.className = 'tile';
    var tile = tileEls[pos.row] && tileEls[pos.row][pos.col];
    if (!tile) return;
    tile.className = 'tile focused';
    lastColByRow[pos.row] = pos.col;
    scrollIntoView(tile);
  }

  function scrollIntoView(tile) {
    // Défilement vertical : garde la rangée active visible
    var container = document.getElementById('rows');
    var inner = container.firstChild;
    var rowEl = rowEls[pos.row].el;
    var maxOffset = Math.max(0, inner.scrollHeight - container.clientHeight);
    var offsetY = Math.min(rowEl.offsetTop - inner.offsetTop, maxOffset);
    inner.style.transform = 'translateY(' + -offsetY + 'px)';

    // Défilement horizontal : garde la tuile active dans l'écran
    var tilesWrap = rowEls[pos.row].tiles;
    var visibleWidth = container.clientWidth * 0.9;
    var tileRight = tile.offsetLeft + tile.offsetWidth;
    var offsetX = tileRight > visibleWidth ? tileRight - visibleWidth : 0;
    tilesWrap.style.transform = 'translateX(' + -offsetX + 'px)';
  }

  function move(dRow, dCol) {
    if (!rows.length) return;
    if (dRow !== 0) {
      var nextRow = pos.row + dRow;
      if (nextRow < 0 || nextRow >= rows.length) return;
      pos.row = nextRow;
      pos.col = Math.min(lastColByRow[nextRow] || 0, tileEls[nextRow].length - 1);
    } else {
      var nextCol = pos.col + dCol;
      if (nextCol < 0 || nextCol >= tileEls[pos.row].length) return;
      pos.col = nextCol;
    }
    updateFocus();
  }

  // --- Ouverture -----------------------------------------------------------

  function openApp(app) {
    if (!app || !app.url) return;
    window.location.href = app.url;
  }

  // --- Télécommande --------------------------------------------------------

  document.addEventListener('keydown', function (e) {
    var code = e.keyCode;
    if (code === KEY.LEFT) move(0, -1);
    else if (code === KEY.RIGHT) move(0, 1);
    else if (code === KEY.UP) move(-1, 0);
    else if (code === KEY.DOWN) move(1, 0);
    else if (code === KEY.ENTER) openApp(rows[pos.row] && rows[pos.row].apps[pos.col]);
    else if (BACK_KEYS.indexOf(code) !== -1) {
      // Sur l'écran d'accueil, Retour ne fait rien (évite de quitter par erreur)
    } else return;
    e.preventDefault();
  });

  // --- Horloge -------------------------------------------------------------

  var DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  var MONTHS = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
  ];

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function tick() {
    var now = new Date();
    var h = now.getHours();
    document.getElementById('clock').textContent = pad(h) + ':' + pad(now.getMinutes());
    document.getElementById('date').textContent =
      DAYS[now.getDay()] + ' ' + now.getDate() + ' ' + MONTHS[now.getMonth()];
    document.getElementById('greeting').textContent =
      h >= 5 && h < 18 ? 'Bonjour' : 'Bonsoir';
  }

  render();
  updateFocus();
  tick();
  setInterval(tick, 10000);
  window.addEventListener('resize', updateFocus);
})();
