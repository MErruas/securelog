# No Phishy Business
Database Management Project

Introduction: 

This database is designed to store information about incident data with a dashboard. This information contains many details, such as timestamps, type of attacks, the machine the attack was initiated on, etc. Using the data within the database, we can make predictions on what types of attacks could happen. This would allow companies to calculate the risk involved when trying to minimize attacks happening to them.

The Security Problem: Cyber attacks are becoming more common and sophisticated and companies, organizations, and even individuals are struggling to deal with threats and notice vulnerabilities in their systems.


In 2024, there were significant increases in cyberattacks and their costs.
In Q3 it has been a 75% increase in loses reported by the FBI and a $16 Billion which was a 54% increase from the previous year in 2023.


<img width="965" height="871" alt="image" src="https://github.com/user-attachments/assets/f49bb0b7-a445-466b-a3e6-91527ebd977b" />



Schema:
Attached is a sql script to build the schema. Run this code in mysql workbench
basic_database_creation.sql

Server file:
Working on implementing database.js which has started implementing functions that will be interacting with the frontend and backend. 
To run server.js: node server.js 
It will connect to the database if the details in the create connection are accurate. Doesn't currently connect to frontend.

To run the website:
1. Navigate to main folder containing index.html, style.css, main.js
2. Run the command to start the server on an open port: python3 -m http.server 8000
3. Open browser and navigate to: http://localhost:8000

To run the database:
1. Install dependencies: npm install express mysql2 cors
2. Open second terminal
3. Run server command: node database.js
