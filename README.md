# Jamify - Tableau Kanban Gamifié (StudyQuest)

Jamify est un widget FigJam qui transforme la gestion de projet en une expérience ludique pour les équipes étudiantes. Les étudiants peuvent suivre leurs tâches tout en gagnant des points d'expérience (XP) et en progressant dans les niveaux !

## Fonctionnalités

**Profils Étudiants**
- Génération automatique d'un profil par étudiant (selon les paramètres du professeur)
- Nom et classe modifiables
- Avatars évolutifs basés sur la classe et le niveau
- Barre de progression XP vers le prochain niveau
- État synchronisé en temps réel entre tous les collaborateurs

**Système de Gamification**
- Gagnez des XP en créant, déplaçant et terminant des tâches
- Montez de niveau au fur et à mesure de votre progression
- Les avatars et titres évoluent automatiquement selon la classe et le niveau

**Tableau Kanban**
- Trois colonnes de workflow : **À faire**, **En cours**, **Terminé**
- Créez des tâches avec un niveau de priorité, un titre, une description et un étudiant assigné
- Niveaux de priorité codés par couleur (faible, moyen, élevé)
- Déplacez les tâches entre les colonnes avec une interaction par clic
- État partagé et collaboratif pour le travail en groupe
- Ajoutez de nouvelles tâches directement dans n'importe quelle colonne

**Récompenses XP**
- +10 XP pour la création d'une nouvelle tâche
- +5 XP pour le déplacement d'une tâche
- +20 XP pour la complétion d'une tâche (passage à Terminé)

**Espace d'idéation**
- Zone optionnelle pour le brainstorming et la création de post-its avec identification de l'utilisateur
- Modification ou suppression des post-its possible

**Configuration Professeur**
- Le professeur peut définir le nombre d'étudiants, le contexte du projet et les règles
- Configuration modifiable à tout moment

**Exportation des données**
- Bouton (en développement) pour exporter les statistiques du projet au format Excel

---

## Comment Utiliser

### Exécuter le Widget

1. Ouvrez **FigJam**
2. Allez dans **Widgets → Développement → Importer un widget depuis un manifest**
3. Sélectionnez le fichier `manifest.json` de ce dossier
4. Le widget apparaîtra dans votre fichier FigJam

### Interagir avec le Widget

**Déplacer les Tâches :**
- Cliquez sur le buton 'avancer' une carte de tâche pour la faire passer par les statuts :
  - À faire → En cours → Terminé → À faire (cycle)
- Vous gagnez des XP à chaque déplacement de tâche

**Ajouter des Tâches :**
- Cliquez sur le bouton "+ Ajouter une tâche" en bas de n'importe quelle colonne
- Une nouvelle tâche sera créée avec des valeurs par défaut
- Les tâches sont automatiquement synchronisées entre tous les utilisateurs du widget

**Monter de Niveau :**
- Chaque 100 XP vous fait monter d'un niveau
- Une notification apparaît lorsque vous montez de niveau
- La barre de progression montre votre avancement

---

## Personnalisation

Vous pouvez modifier le code du widget pour personnaliser :

**Récompenses XP** (lignes 22-26) :
```typescript
const XP_REWARDS = {
  ADD_ISSUE: 10,
  MOVE_ISSUE: 5,
  COMPLETE_ISSUE: 20,
};
```

**XP par Niveau** (ligne 28) :
```typescript
const XP_PER_LEVEL = 100;
```

**Tâches par Défaut** (lignes 290-315) :
Mettez à jour le tableau initial des tâches dans la fonction `KanbanWidget`.

Dans `widget-src/profile-constants.ts`, vous pouvez personnaliser les éléments du profil :

**Classes** (ligne 9) :
```typescript
export const CLASSES = ['Rôdeur', 'Mage', 'Barde', 'Alchimiste'] as const;
```

**Titres de Classe** (lignes 12-33) :
```typescript
export const CLASS_TITLES: Record<ClassName, [string, string, string]> = {
  'Rôdeur': [
    'Apprenti du Sablier',
    'Maître des Horloges',
    'Stratège du Temps',
  ],
  ...
```

**Images de Classe** (lignes 7 et 35-56) :
Les images sont récupérées depuis la branche `gh-pages` de ce dépôt. Pour plus de détails sur la modification des images de profil, consultez le README dans la branche `gh-pages` : [Lien vers la branche gh-pages](https://github.com/ets-cfuhrman-pfe/jamify/tree/gh-pages).


```typescript
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/ets-cfuhrman-pfe/jamify@gh-pages/img';
```
```typescript
export const CLASS_LEVEL_IMAGE_MAP: Record<ClassName, Record<1 | 2 | 3, string>> = {
  'Rôdeur': {
    1: `${CDN_BASE}/Ranger_1.png`,
    2: `${CDN_BASE}/Ranger_2.png`,
    3: `${CDN_BASE}/Ranger_3.png`,
  },
  ...
```

---

## Détails Techniques

### Construit Avec
- API Widget FigJam
- TypeScript
- esbuild

### Différences Clés avec React

Ce widget a été converti depuis une application web React. Différences principales :

| React                       | Widget FigJam                       |
| --------------------------- | ----------------------------------- |
| `<div>`                     | `<AutoLayout>`                      |
| `className`                 | Props en ligne (fill, stroke, etc.) |
| `useState`                  | `useSyncedState`                    |
| `toast.success()`           | `figma.notify()`                    |
| Couleurs CSS                | Objets RGB `{ r, g, b }`            |
| Drag & Drop                 | Cycle par clic                      |
| Opérateur spread `{...obj}` | `Object.assign({}, obj)`            |

### Structure des Fichiers
```
widget-figjam/
├── manifest.json           # Configuration du widget
├── package.json            # Dépendances et scripts de build
├── widget-src/
│   ├── code.tsx            # Section profil du widget
│   ├── widget.tsx          # Layout principal du widget
│   ├── postit.tsx          # Composant Post-it pour l'idéation
│   ├── teacher.tsx         # Interface de configuration professeur
│   ├── profile-constants.ts# Fichier de configuration des profils étudiants
│   ├── tsconfig.json       # Configuration TypeScript pour widget-src
│   └── kanban board/
│       ├── AddIssueDialog.tsx
│       ├── CharacterProfile.tsx
│       ├── KanbanBoard.tsx
│       ├── KanbanColumn.tsx
│       ├── IssueCard.tsx
│       ├── constants.ts
│       ├── types.ts
│       ├── tsconfig.json
└── dist/                   # Widget compilé (généré)
  └── code.js
```

### Construction

```bash
# Installer les dépendances
cd widget-figjam
npm install

# Build une fois
npm run build

# Mode watch pour le développement (rebuild automatique à chaque modification)
npm run watch
```

---

## Limitations

Les widgets ne supportent pas l'interface HTML :
- Pas de drag-and-drop (remplacé par le cycle par clic)
- Pas d'effets hover
- Pas de barre de progression
- Pas de dropdown classique

Autres limitations de Figma :
- Les éléments ne peuvent être initiés qu'au début
- Impossible de suivre dynamiquement les sessions utilisateur à cause des limitations de l'API Figma
- Performances limitées :
  - Importation directe de nombreuses photos impossible (nécessité de les récupérer externes)
  - Utilisation intensive de `useSyncedState`, requêtes et algorithmes complexes ralentit le widget

---

## Améliorations Futures

Améliorations potentielles :
- Badges de réussite
- Suivi des séries (streaks)
- Classements d'équipe
- Exportation des données de progression
- Configuration du projet externe

---

## Support

Pour toute question ou problème, consultez :
- [Documentation API Widget FigJam](https://www.figma.com/widget-docs/)
- Guide de conversion fourni avec ce projet

---