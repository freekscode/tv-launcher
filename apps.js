/*
 * Configuration du launcher : c'est le seul fichier à modifier.
 *
 * Chaque rangée a un titre et une liste d'apps :
 *   name  : nom affiché
 *   url   : adresse ouverte quand on appuie sur OK
 *   color : couleur de la tuile (CSS)
 *   icon  : (optionnel) 1 à 3 caractères affichés sur la tuile, sinon l'initiale
 *
 * Les URL ci-dessous sont des exemples de versions web : certaines peuvent
 * refuser le navigateur de la télé. Remplace-les par ce que tu utilises.
 */
var LAUNCHER_CONFIG = {
  title: 'Salon',
  rows: [
    {
      title: 'Streaming',
      apps: [
        { name: 'YouTube', url: 'https://www.youtube.com/tv', color: '#c4302b', icon: '▶' },
        { name: 'Stremio', url: 'https://web.stremio.com', color: '#4b3a8f', icon: 'S' },
        { name: 'Twitch', url: 'https://www.twitch.tv', color: '#6441a5', icon: 'T' },
        { name: 'Arte', url: 'https://www.arte.tv/fr/', color: '#e2582c', icon: 'A' },
        { name: 'France.tv', url: 'https://www.france.tv', color: '#1f4fbf', icon: 'F' },
      ],
    },
    {
      title: 'Maison',
      apps: [
        { name: 'Jellyfin', url: 'http://192.168.1.10:8096', color: '#00a4dc', icon: 'J' },
        { name: 'Home Assistant', url: 'http://192.168.1.10:8123', color: '#18bcf2', icon: 'HA' },
        { name: 'Bbox', url: 'http://192.168.1.254', color: '#2d3e50', icon: 'B' },
      ],
    },
    {
      title: 'Infos',
      apps: [
        { name: 'Météo', url: 'https://www.meteofrance.com', color: '#2e7d32', icon: '☀' },
        { name: 'Actus', url: 'https://www.francetvinfo.fr', color: '#455a64', icon: 'i' },
      ],
    },
  ],
};
