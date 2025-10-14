'use strict';

/*
============================================
SAMPLE DATA
============================================
This is just placeholder data to test the dashboard. Later we will connect to the actual database using Node.js
*/

const incidents = [
  { id: 1,  date: "2024-08-28", type: "Phishing",   severity: "High",     org: "Organization-A", country: "US", lat: 37.7749,  lng: -122.4194, responseTime: "2 hours",    dataBreached: "5,000 records",    mitigationStrategy: "Password reset & 2FA",   affectedIndustry: "Healthcare",    financialImpact: "$50,000" },
  { id: 2,  date: "2024-09-02", type: "Malware",    severity: "Medium",   org: "Organization-B", country: "CA", lat: 43.6532,  lng: -79.3832,  responseTime: "4 hours",    dataBreached: "None",             mitigationStrategy: "System quarantine",      affectedIndustry: "Finance",       financialImpact: "$25,000" },
  { id: 3,  date: "2024-09-05", type: "DDoS",       severity: "Critical", org: "Organization-C", country: "DE", lat: 52.5200,  lng: 13.4050,   responseTime: "30 minutes", dataBreached: "N/A",              mitigationStrategy: "Traffic filtering",     affectedIndustry: "E-commerce",    financialImpact: "$150,000" },
  { id: 4,  date: "2024-09-09", type: "Phishing",   severity: "Low",      org: "Organization-D", country: "GB", lat: 51.5074,  lng: -0.1278,   responseTime: "6 hours",    dataBreached: "100 records",      mitigationStrategy: "User training",         affectedIndustry: "Education",     financialImpact: "$5,000" },
  { id: 5,  date: "2024-09-12", type: "Ransomware", severity: "Critical", org: "Organization-E", country: "IN", lat: 28.6139,  lng: 77.2090,   responseTime: "1 hour",     dataBreached: "50,000 records",   mitigationStrategy: "System restore",        affectedIndustry: "Manufacturing", financialImpact: "$500,000" },
  { id: 6,  date: "2024-09-16", type: "Phishing",   severity: "Medium",   org: "Organization-F", country: "US", lat: 40.7128,  lng: -74.0060,  responseTime: "3 hours",    dataBreached: "1,200 records",    mitigationStrategy: "Email filtering",       affectedIndustry: "Technology",    financialImpact: "$30,000" },
  { id: 7,  date: "2024-09-18", type: "Insider",    severity: "Low",      org: "Organization-G", country: "JP", lat: 35.6762,  lng: 139.6503,  responseTime: "12 hours",   dataBreached: "500 records",      mitigationStrategy: "Access revoked",        affectedIndustry: "Retail",        financialImpact: "$15,000" },
  { id: 8,  date: "2024-09-21", type: "Phishing",   severity: "High",     org: "Organization-H", country: "AE", lat: 25.2048,  lng: 55.2708,   responseTime: "1.5 hours",  dataBreached: "8,000 records",    mitigationStrategy: "Account lockdown",      affectedIndustry: "Finance",       financialImpact: "$75,000" },
  { id: 9,  date: "2024-09-25", type: "Malware",    severity: "Medium",   org: "Organization-I", country: "BR", lat: -23.5505, lng: -46.6333,  responseTime: "5 hours",    dataBreached: "None",             mitigationStrategy: "Antivirus update",      affectedIndustry: "Healthcare",    financialImpact: "$20,000" },
  { id: 10, date: "2024-09-27", type: "Phishing",   severity: "Low",      org: "Organization-J", country: "US", lat: 34.0522,  lng: -118.2437, responseTime: "8 hours",    dataBreached: "50 records",       mitigationStrategy: "Security awareness",    affectedIndustry: "Government",    financialImpact: "$8,000" },
  { id: 11, date: "2024-09-29", type: "DDoS",       severity: "High",     org: "Organization-K", country: "FR", lat: 48.8566,  lng: 2.3522,    responseTime: "45 minutes", dataBreached: "N/A",              mitigationStrategy: "CDN activation",        affectedIndustry: "Media",         financialImpact: "$100,000" },
  { id: 12, date: "2024-10-01", type: "Ransomware", severity: "Critical", org: "Organization-L", country: "AU", lat: -33.8688, lng: 151.2093,  responseTime: "2 hours",    dataBreached: "100,000 records",  mitigationStrategy: "Backup recovery",       affectedIndustry: "Energy",        financialImpact: "$1,000,000" }
];

// Country codes to full names
const countryNames = {
  AE: "UAE",
  AU: "Australia",
  BR: "Brazil",
  CA: "Canada",
  DE: "Germany",
  FR: "France",
  GB: "United Kingdom",
  IN: "India",
  JP: "Japan",
  US: "United States"
};

/*
============================================
HELPER FUNCTIONS
============================================
*/

// Convert date string to Date object
function parseISO(d) {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day);
}

// Get month key for grouping (format: YYYY-MM)
function monthKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// Format date for display (MM-DD-YYYY)
function fmtMDY(dateStr) {
  const d = parseISO(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}-${dd}-${d.getFullYear()}`;
}

// Get full country name from code
function fullCountry(code) {
  return countryNames[code] || code;
}

// Get color for severity level from CSS variables
function sevColor(sev) {
  const s = getComputedStyle(document.documentElement);
  if (sev === "Critical") return s.getPropertyValue('--sev-critical').trim();
  if (sev === "High") return s.getPropertyValue('--sev-high').trim();
  if (sev === "Medium") return s.getPropertyValue('--sev-med').trim();
  return s.getPropertyValue('--sev-low').trim();
}

// Get CSS class for severity badge
function badgeClass(sev) {
  if (sev === 'Critical') return 'badge sev-critical';
  if (sev === 'High') return 'badge sev-high';
  if (sev === 'Medium') return 'badge sev-med';
  return 'badge sev-low';
}

/*
============================================
GLOBAL VARIABLES
============================================
*/

// Store instances of map and charts
let vmap = null;
let fp = null;
let chartTime = null;
let chartTypes = null;
let chartSeverity = null;

// Current filtered data
let currentRows = [];
let pendingDateRange = null;

// Initial map view settings
const initialMapState = {
  scale: 1.2,
  x: 0.5,
  y: 0.45
};

/*
============================================
FILTER FUNCTIONS
============================================
*/

// Read current filter values from the UI
function readFilters() {
  const severity = (document.querySelector('input[name="severity"]:checked') || {}).value || 'all';
  const incidentType = document.getElementById('incidentType').value;
  let start = null, end = null;
  if (pendingDateRange && pendingDateRange.length === 2) {
    start = pendingDateRange[0];
    end = pendingDateRange[1];
  }
  return { severity, incidentType, start, end };
}

// Filter the data based on current settings
function filterData() {
  const { severity, incidentType, start, end } = readFilters();
  return incidents.filter(it => {
    const d = parseISO(it.date);
    if (start && d < start) return false;
    if (end && d > end) return false;
    if (severity !== 'all' && it.severity !== severity) return false;
    if (incidentType !== 'all' && it.type !== incidentType) return false;
    return true;
  });
}

/*
============================================
TABLE FUNCTIONS
============================================
*/

// Update the table with filtered data
function updateTable(rows) {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';
  
  // Sort by date (newest first)
  rows.slice().sort((a, b) => parseISO(b.date) - parseISO(a.date)).forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${fmtMDY(r.date)}</td>
      <td>${r.type}</td>
      <td><span class="${badgeClass(r.severity)}">${r.severity}</span></td>
      <td>${r.org}</td>
      <td>${fullCountry(r.country)}</td>
      <td>${r.responseTime}</td>
      <td>${r.dataBreached}</td>
      <td>${r.mitigationStrategy}</td>
      <td>${r.affectedIndustry}</td>
      <td>${r.financialImpact}</td>`;
    tbody.appendChild(tr);
  });
}

/*
============================================
CHART FUNCTIONS
============================================
*/

// Update all three charts with the filtered data
function updateCharts(rows) {
  // Chart 1: Line chart - incidents over time
  const byMonth = new Map();
  rows.forEach(r => {
    const k = monthKey(parseISO(r.date));
    byMonth.set(k, (byMonth.get(k) || 0) + 1);
  });
  const months = [...byMonth.keys()].sort();
  const counts = months.map(m => byMonth.get(m));
  
  if (chartTime) chartTime.destroy();
  chartTime = new Chart(document.getElementById('chartTime'), {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Incidents',
        data: counts,
        tension: 0.4,
        borderColor: '#61dafb',
        backgroundColor: 'rgba(97, 218, 251, .1)',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.5,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          ticks: { color: '#cfd2db', maxRotation: 0 },
          grid: { color: '#2a3042' }
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            callback: v => Number.isInteger(v) ? v : '',
            color: '#cfd2db'
          },
          grid: { color: '#2a3042' }
        }
      }
    }
  });
  document.getElementById('chartTimeTotal').textContent = `Total: ${rows.length}`;

  // Chart 2: Bar chart - incident types
  const byType = new Map();
  rows.forEach(r => byType.set(r.type, (byType.get(r.type) || 0) + 1));
  const typeLabels = [...byType.keys()];
  const typeValues = typeLabels.map(k => byType.get(k));
  
  if (chartTypes) chartTypes.destroy();
  chartTypes = new Chart(document.getElementById('chartTypes'), {
    type: 'bar',
    data: {
      labels: typeLabels,
      datasets: [{ label: 'By Type', data: typeValues, backgroundColor: '#61dafb' }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.5,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#cfd2db' }, grid: { display: false } },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            callback: v => Number.isInteger(v) ? v : '',
            color: '#cfd2db'
          },
          grid: { color: '#2a3042' }
        }
      }
    }
  });

  // Chart 3: Doughnut chart - severity breakdown
  const sCritical = rows.filter(r => r.severity === 'Critical').length;
  const sHigh = rows.filter(r => r.severity === 'High').length;
  const sMed = rows.filter(r => r.severity === 'Medium').length;
  const sLow = rows.filter(r => r.severity === 'Low').length;
  
  if (chartSeverity) chartSeverity.destroy();
  chartSeverity = new Chart(document.getElementById('chartSeverity'), {
    type: 'doughnut',
    data: {
      labels: ['Critical', 'High', 'Medium', 'Low'],
      datasets: [{
        data: [sCritical, sHigh, sMed, sLow],
        backgroundColor: ['#dc2626', '#f56565', '#f6ad55', '#31c48d']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.5,
      plugins: {
        legend: { labels: { color: '#cfd2db' }, position: 'bottom' }
      }
    }
  });
}

/*
============================================
MAP FUNCTIONS
============================================
*/

// Convert incidents to map markers
function rowsToMarkers(rows) {
  return rows.map(r => ({
    name: `${r.type} - ${r.severity}`,
    coords: [r.lat, r.lng],
    style: {
      initial: { fill: sevColor(r.severity), stroke: 'rgba(0, 0, 0, .5)', strokeWidth: 1, r: 8 },
      hover: { fill: sevColor(r.severity), stroke: 'rgba(0, 0, 0, .5)', strokeWidth: 1, r: 8 }
    }
  }));
}

// Force the marker colors to stay solid (no animation effects)
function forceMarkerColors(rows) {
  setTimeout(() => {
    const nodes = document.querySelectorAll('#map svg circle');
    nodes.forEach((c, i) => {
      if (rows[i]) {
        const col = sevColor(rows[i].severity);
        c.setAttribute('fill', col);
        c.style.fill = col;
        c.setAttribute('stroke', 'rgba(0, 0, 0, .5)');
        c.style.stroke = 'rgba(0, 0, 0, .5)';
        c.setAttribute('stroke-width', '1');
        c.style.strokeWidth = '1';
        c.setAttribute('r', '8');
        c.style.animation = 'none';
        c.style.filter = 'none';
      }
    });
  }, 60);
}

// Reset map to initial view
function resetMapView() {
  flipBack();
  renderMap(filterData());
}

// Render the world map with markers
function renderMap(rows) {
  currentRows = rows.slice();
  
  // Destroy old map if it exists
  if (vmap) {
    try { vmap.destroy(); } catch (_) {}
    vmap = null;
  }
  
  const mapEl = document.getElementById('map');
  mapEl.innerHTML = '';

  // Create new map
  vmap = new jsVectorMap({
    selector: '#map',
    map: 'world_merc',
    backgroundColor: 'transparent',
    draggable: true,
    zoomButtons: true,
    zoomOnScroll: false,
    zoomMax: 12,
    zoomMin: 1,
    zoomStep: 1.5,
    zoomAnimate: true,
    regionStyle: {
      initial: { fill: '#6b7482', fillOpacity: .85, stroke: 'none' },
      hover: { fillOpacity: .95, fill: '#7b8492' }
    },
    markers: rowsToMarkers(rows),
    onLoaded: function() { forceMarkerColors(rows); }
  });

  // Add click handlers
  if (vmap && vmap.on) {
    // When you click on a marker, show incident details
    vmap.on('markerClick', (e, idx) => {
      if (currentRows[idx]) showIncidentDetails(currentRows[idx]);
    });
    
    // When you click on a country, show all incidents in that country
    vmap.on('regionClick', (e, code) => {
      const list = currentRows.filter(x => x.country === code);
      if (list.length > 0) showCountryDetails(code, list);
    });
  }

  // Set the initial map position
  setTimeout(() => {
    if (vmap && vmap.setFocus) {
      try {
        vmap.setFocus({ scale: initialMapState.scale, x: initialMapState.x, y: initialMapState.y, animate: true });
      } catch (_) {}
    }
    forceMarkerColors(rows);
  }, 100);
}

/*
============================================
DETAIL PANEL FUNCTIONS
============================================
*/

// Flip to the detail side
function flipToDetails() {
  document.getElementById('mapFlip').classList.add('flipped');
}

// Flip back to the map side
function flipBack() {
  document.getElementById('mapFlip').classList.remove('flipped');
}

// Show details for a single incident
function showIncidentDetails(r) {
  const panel = document.getElementById('detailPanel');
  panel.innerHTML = `
    <h4 class="detail-title">Incident - ${r.type}</h4>
    <div class="detail-grid">
      <div><b>Date:</b> ${fmtMDY(r.date)}</div>
      <div><b>Severity:</b> <span class="${badgeClass(r.severity)}">${r.severity}</span></div>
      <div><b>Organization:</b> ${r.org}</div>
      <div><b>Country:</b> ${fullCountry(r.country)} (${r.country})</div>
      <div><b>Coordinates:</b> ${r.lat.toFixed(2)}, ${r.lng.toFixed(2)}</div>
      <div><b>ID:</b> ${r.id}</div>
    </div>`;
  flipToDetails();
}

// Show all incidents for a country
function showCountryDetails(code, list) {
  const panel = document.getElementById('detailPanel');
  if (!list.length) {
    panel.innerHTML = `<h4 class="detail-title">${code}</h4><div>No incidents in current filters.</div>`;
  } else {
    panel.innerHTML = `
      <h4 class="detail-title">${fullCountry(code)} - ${list.length} incident${list.length > 1 ? 's' : ''}</h4>
      <ul style="margin:8px 0 0 18px; padding:0;">
        ${list.map(r => `${fmtMDY(r.date)} - ${r.type} - <span class="${badgeClass(r.severity)}">${r.severity}</span> - ${r.org}`).map(li => `<li>${li}</li>`).join('')}
      </ul>`;
  }
  flipToDetails();
}

/*
============================================
REFRESH FUNCTION
============================================
*/

// Refresh everything when filters change
function refresh() {
  const rows = filterData();
  updateTable(rows);
  updateCharts(rows);
  renderMap(rows);
}

/*
============================================
INITIALIZATION
============================================
*/

// Run this when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Setup the date picker
  fp = flatpickr('#dateRange', {
    mode: 'range',
    dateFormat: 'm-d-Y',
    clickOpens: true,
    allowInput: false,
    onChange: (dates) => {
      if (dates.length === 2) {
        document.getElementById('dateApply').style.display = 'block';
        document.getElementById('dateClear').style.display = 'block';
      }
    }
  });

  // Apply button - when user clicks "See Results"
  document.getElementById('dateApply').addEventListener('click', () => {
    if (fp.selectedDates && fp.selectedDates.length === 2) {
      pendingDateRange = [
        new Date(fp.selectedDates[0].getFullYear(), fp.selectedDates[0].getMonth(), fp.selectedDates[0].getDate()),
        new Date(fp.selectedDates[1].getFullYear(), fp.selectedDates[1].getMonth(), fp.selectedDates[1].getDate())
      ];
      refresh();
    }
  });

  // Clear button - reset the date range
  document.getElementById('dateClear').addEventListener('click', () => {
    fp.clear();
    pendingDateRange = null;
    document.getElementById('dateApply').style.display = 'none';
    document.getElementById('dateClear').style.display = 'none';
    refresh();
  });

  // Listen for severity filter changes
  document.querySelectorAll('input[name="severity"]').forEach(el => {
    el.addEventListener('change', refresh);
  });

  // Listen for incident type changes
  document.getElementById('incidentType').addEventListener('change', refresh);

  // Reset all filters button
  document.getElementById('resetBtn').addEventListener('click', () => {
    fp.clear();
    pendingDateRange = null;
    document.getElementById('dateApply').style.display = 'none';
    document.getElementById('dateClear').style.display = 'none';
    const all = document.querySelector('input[name="severity"][value="all"]');
    if (all) all.checked = true;
    document.getElementById('incidentType').value = 'all';
    refresh();
  });

  // Reset map view button
  document.getElementById('resetView').addEventListener('click', resetMapView);

  // Close detail panel button
  document.getElementById('detailClose').addEventListener('click', flipBack);

  // Load everything for the first time
  refresh();
});