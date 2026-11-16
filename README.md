# Launcher TV « Salon »

Écran d'accueil web pour la Hisense 58E7Q (VIDAA), qu'on navigue à la télécommande.

- Modifier les apps : `apps.js` (nom, URL, couleur, icône).
- Navigation : flèches + OK. Fonctionne aussi à la souris dans un navigateur de PC.
- Aucune dépendance et aucun build : ce sont des fichiers statiques, en JavaScript ES5
  (le navigateur VIDAA 9 est un Chromium 111, les anciens modèles sont plus vieux).
- Touche Retour : la télécommande VIDAA envoie le code 8 (Backspace). Sur le launcher elle ne fait rien,
  pour éviter de quitter par erreur.

## Mise en ligne (GitHub Pages)

Repo public + Pages sur la branche `main`, dossier `/`. L'URL obtenue est du type `https://<compte>.github.io/tv-launcher/`.

## Installation sur la télé

Avec VidaaEdge (voir `LISEZMOI.md`) :

| Champ | Valeur |
|---|---|
| App ID | `salon` (lettres, chiffres, `.` `_` `-`) |
| App Name | `Salon` |
| App URL | l'adresse GitHub Pages |
| Icon URL | l'adresse GitHub Pages + `icon.png` (PNG 400×400) |

Redémarre ensuite la télé. **Ne vide pas le cache des applications** dans les paramètres :
d'après plusieurs utilisateurs, cela supprime aussi les apps ajoutées.

## Limites

- Le launcher apparaît comme une app dans la liste. Il ne remplace pas l'écran d'accueil Hisense.
- Certains sites refusent le navigateur de la télé ou le redirigent (en particulier `youtube.com/tv`,
  réservé aux télés reconnues). Si une app existe dans le store VIDAA, préfère-la.
- Un site en `http://` (Jellyfin, Home Assistant en local) s'ouvre bien depuis le launcher (c'est une
  navigation, pas un contenu mixte), mais certaines fonctions du site peuvent être limitées.
