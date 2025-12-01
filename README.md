# No Phishy Business
Database Management Project

## Introduction

This database is designed to store information about incident data with a dashboard. This information contains many details, such as timestamps, type of attacks, severity levels, affected organizations, and geographic locations. Using the data within the database, we can analyze trends and patterns in cyber threats, helping companies calculate risk and minimize the likelihood of attacks.

## The Security Problem

Cyber attacks are becoming more common and sophisticated, and companies, organizations, and even individuals are struggling to deal with threats and notice vulnerabilities in their systems.

In 2024, there were significant increases in cyberattacks and their costs. In Q3 there was a **75% increase in losses** reported by the FBI and **$16 Billion** in total losses, which was a **54% increase** from the previous year in 2023.

<img width="965" height="871" alt="Cyber Attack Statistics" src="https://github.com/user-attachments/assets/f49bb0b7-a445-466b-a3e6-91527ebd977b" />

## Features

- Interactive world map with incident locations
- Real-time charts and analytics
- Advanced filtering by date, type, and severity
- Add, edit, and delete incidents
- Responsive design
- Dynamic data updates

## Prerequisites

Before running this project, you need to have the following installed:

- **Node.js**
- **MySQL**
- **Make** (see installation instructions below)

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

**Using Chocolatey** (Recommended)

1. Install Chocolatey (if you don't have it already):
   - Open PowerShell as Administrator
   - Run:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

   - Close and reopen PowerShell as Administrator

2. Install Make:

```powershell
choco install make
```

**Alternative: Using WSL (Windows Subsystem for Linux)**

```powershell
wsl --install
```

Then restart your computer and open Ubuntu - `make` will already be available.

### Verify Installation

```bash
make --version
```

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd securelog
```

2. Install dependencies:

```bash
npm install
```

3. Set up the MySQL database:

```bash
make setup-db
```

Follow the prompts to enter your MySQL password and configure the database. The setup will automatically:
- Create the database schema
- Import all incident data
- Configure the connection

## Running the Project

Start the server using Make:

```bash
make run
```

Or using Node directly:

```bash
node server-database.js
```

The application will be available at `http://localhost:3000`

## Usage

### Adding an Incident

1. Click the **"+ Add Incident"** button
2. Fill in the required fields:
   - **Date**: Select the incident date
   - **Type**: Choose the incident type (Phishing, Malware, DDoS, Ransomware, SQL Injection, Man-in-the-Middle)
   - **Severity**: Select severity level (Critical, High, Medium, Low)
   - **Organization**: Enter the affected organization name
   - **Country**: Select the country from the dropdown

3. Optional fields (use the format shown in placeholders):
   - **Response Time**: e.g., `2 hours`, `24 hours`
   - **Data Breached**: e.g., `5,000 records`, `1.2M records`
   - **Mitigation Strategy**: e.g., `VPN`, `Firewall`, `AI-based Detection`
   - **Affected Industry**: e.g., `Healthcare`, `Finance`, `Education`
   - **Financial Impact**: e.g., `$50,000`, `$2.5M`
   - **Latitude/Longitude**: Optional coordinates (auto-filled based on country if left empty)

### Filtering Data

- **Date Range**: Click the date range picker to filter by time period
- **Incident Type**: Use the dropdown to filter by specific threat types
- **Severity**: Click the severity pills to filter by severity level
- **Reset**: Click "Reset filters" to clear all filters and show all data

### Viewing Incident Details

- **Map View**: Hover over markers on the map to see incident summaries, click to view full details
- **Table View**: Click the info icon (ℹ️) in the Actions column to edit or delete incidents
- **Charts**: View trends over time, incident type distribution, and severity breakdown

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
    ├── incident_type_data.sql
    └── severity_levels_data.sql
```

## Database Schema

The database uses the following main table structure:

**INCIDENT Table:**
- `IncidentID` (Primary Key)
- `Date`
- `ThreatType`
- `SeverityLevel`
- `Company`
- `Country`
- `Latitude`, `Longitude`
- `ResponseTime`
- `DataBreached`
- `MitigationStrategy`
- `AffectedIndustry`
- `FinancialImpact`

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js
- **Maps**: jsVectorMap
- **Date Picker**: Flatpickr
- **Icons**: Font Awesome
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## API Endpoints

The server provides the following REST API endpoints:

- `GET /api/incidents` - Retrieve all incidents
- `POST /api/incidents` - Create a new incident
- `PUT /api/incidents/:id` - Update an existing incident
- `DELETE /api/incidents/:id` - Delete an incident

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT
