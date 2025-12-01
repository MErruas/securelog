<div align="center">

# No Phishy Business

### Database Management Project

</div>

---

## Introduction

This database is designed to store information about incident data with a dashboard. This information contains many details, such as timestamps, type of attacks, severity levels, affected organizations, and geographic locations. Using the data within the database, we can analyze trends and patterns in cyber threats, helping companies calculate risk and minimize the likelihood of attacks.

---

## ⚠️ The Security Problem

Cyber attacks are becoming more common and sophisticated, and companies, organizations, and even individuals are struggling to deal with threats and notice vulnerabilities in their systems.

In 2024, there were significant increases in cyberattacks and their costs. In Q3 there was a **75% increase in losses** reported by the FBI and **$16 Billion** in total losses, which was a **54% increase** from the previous year in 2023.

<img width="965" height="871" alt="Cyber Attack Statistics" src="https://github.com/user-attachments/assets/f49bb0b7-a445-466b-a3e6-91527ebd977b" />

---

## Features

* Interactive world map with incident locations
* Real-time charts and analytics
* Advanced filtering by date, type, and severity
* Add, edit, and delete incidents
* Responsive design
* Dynamic data updates

---

## Requirements

Before running this project, you need to have the following installed:

* **Node.js**
* **MySQL**
* **Make** (see installation instructions below)

### Installing Make

If you get an error like `make: command not found`, follow the instructions for your operating system:

#### macOS

**Option 1: Xcode Command Line Tools** (Recommended)

```bash
xcode-select --install
```

A popup will appear - click "Install" and wait for it to complete.

**Option 2: Using Homebrew**

```bash
brew install make
```

#### Windows

**Step 1: Use Git Bash (Easiest - Recommended)**

If you have Git installed (most developers do), you already have Git Bash!

1. Open VS Code
2. Open the terminal (`` Ctrl+` `` or View → Terminal)
3. Click the dropdown arrow next to the `+` button in the terminal
4. Select **"Git Bash"**
5. Set it as default: Click dropdown → "Select Default Profile" → "Git Bash"

Done! Now you can run all `make` commands. Skip to the Installation section below.

**Step 2: Install Make with Chocolatey** (If you prefer)

1. Open PowerShell as **Administrator** (right-click → "Run as Administrator")

2. Copy and paste this command to install Chocolatey:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

3. Close and reopen PowerShell as Administrator

4. Install Make:

```powershell
choco install make
```

5. **Important:** Restart VS Code completely for the changes to take effect

**If you get errors:**

* **Error: "make: command not found"** → Use Git Bash instead (Step 1 above)
* **Error: "CreateProcess" or "printf not found"** → Use Git Bash instead
* Still having issues? See Windows Alternative Setup below

### Verify Installation

```bash
make --version
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/MErruas/securelog.git
cd securelog
```

---

## Running the Project

**Recommended: One Command Does Everything**

Run this single command to install dependencies, set up the database, and start the server:

```bash
make run
```

You'll be prompted to enter your MySQL password. The command automatically:
* Installs all dependencies
* Creates the database schema
* Imports all incident data
* Starts the server

The application will be available at `http://localhost:3000`

---

**Alternative Options:**

If you need to restart the server later (after initial setup):

```bash
node server-database.js
```

If `make` doesn't work on your system:

```bash
npm install
node server-database.js
```

> **Note:** You'll need to set up the database manually first (see Windows Alternative Setup below)

---

## Windows Alternative Setup

If the Makefile doesn't work and you don't want to use Git Bash, follow these manual steps:

**1. Install dependencies:**

```bash
npm install
```

**2. Setup the database manually:**

Open MySQL Workbench or MySQL command line and run these SQL files **in order**:

```bash
mysql -u root -p < data_files/basic_database_creation.sql
mysql -u root -p project < data_files/all_incidents_data.sql
```

Or in MySQL Workbench:
* First run: `data_files/basic_database_creation.sql`
* Then run: `data_files/all_incidents_data.sql`

**3. Start the server:**

```bash
node server-database.js
```

The application will be available at `http://localhost:3000`

---

## Project Structure

```
securelog/
├── index.html                 # Main dashboard interface
├── main.js                    # Frontend logic and data visualization
├── style.css                  # Styling and layout
├── server-database.js         # Backend API server
├── package.json               # Node.js dependencies
├── Makefile                   # Build and setup automation
└── data_files/                # SQL database setup files
    ├── basic_database_creation.sql
    ├── all_incidents_data.sql
    └── incident_type_data.sql
```

---

## Database Schema

The database uses the following main table structure:

**INCIDENT Table:**
* `IncidentID` (Primary Key)
* `Date`
* `ThreatType`
* `SeverityLevel`
* `Company`
* `Country`
* `Latitude`, `Longitude`
* `ResponseTime`
* `DataBreached`
* `MitigationStrategy`
* `AffectedIndustry`
* `FinancialImpact`
