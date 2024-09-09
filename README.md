# Resonanc-e

# Project Name

## Description

Ce projet est une application web complète avec un backend en [NestJS](https://nestjs.com/), un frontend en [React](https://reactjs.org/), et une base de données [PostgreSQL](https://www.postgresql.org/). L'application permet aux utilisateurs de s'inscrire, de se connecter et de gérer des événements dans un calendrier interactif.

## Prérequis

- [Node.js](https://nodejs.org/) (v14+)
- [PostgreSQL](https://www.postgresql.org/) (v12+)
- [Git](https://git-scm.com/)

### Installation sous Windows / Linux

1. Clonez le repository et installez les dépendances :

```bash
git clone https://github.com/Willix-IT/Resonanc-e.git
cd Resonanc-e
```

### Backend

```bash
cd Backend
npm install
```

- Créez un fichier .env dans le dossier Backend avec le contenu suivant

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

- Créez une base de données PostgreSQL avec le nom your_db_name. Utilisez pgAdmin si nécessaire.

- Vous pouvez lancer le back avec npm start

### Frontend

Dans un autre terminal :

```bash
cd Frontend
npm install
```

- Assurez-vous que l'API dans api.ts pointe vers votre backend local

```javascript
const API_URL = "http://localhost:3000";
```

- Lancez le Frontend

```bash
npm start
```

## Utilisation

- Accédez à http://localhost:3001 pour voir l'application.
- Inscrivez-vous, connectez-vous et gérez vos événements.
