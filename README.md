# BlohshHub💚

**BlohshHub** is a fan-made web app all about **Billie Eilish** — created by fan, for fans.  
It features tour info, album era switching,billie-themed wordle and a comment section for fan interactions.

## 🎸 Features

- **Custom Tour API** – Serves Billie’s show info from `shows.json`
- **Era Switcher** – Explore each Billie album visually
- **Comment Wall** – Leave and read messages from other fans
- **Billie Wordle Game** – A special Billie-themed word puzzle
- **Favourites** – Save your favourite songs
- **User Roles**:
  - `User`: post and read comments
  - `Admin`: edit/delete comments


## 🛠️ Tech Stack

- **Frontend**: Angular + TypeScript + CSS
- **Backend**: .NET (C#) using ASP.NET Core
- **Database**: MySQL
- **Auth**: Simple role-based system

## Run the Project

1. MySQL Database Setup

- Open MySQL Workbench
- Create a new database called: `blohsh`
- Open the file: `db/blohshSchema.sql`
- Copy the entire contents of the file
- Paste it into a new SQL tab in MySQL Workbench
- Run the query to create the tables
- Open: `blohsh-backend/appsettings.json`
- Find the `"ConnectionStrings"` section and update this line:
  
```json
"DefaultConnection": "server=localhost;user=root;password=yourpassword;database=blohsh"
````

2. In one terminal, run the backend:

```bash
cd blohsh-backend
dotnet run
````
3. In another terminal, run the frontend:

```bash
cd frontend
npm install
npm start

