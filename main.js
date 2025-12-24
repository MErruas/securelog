'use strict';

/*
============================================
Settings for the app
============================================
*/

const API_BASE = 'http://localhost:3000/api';
const ITEMS_PER_PAGE = 100;

// Mapping country codes to real names
const countryNames = {
  AF: "Afghanistan",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua And Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia And Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo, The Democratic Republic Of The",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Cote D'ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  TP: "East Timor",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GN: "Guinea",
  GW: "Guinea-bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island And Mcdonald Islands",
  VA: "Holy See (vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran, Islamic Republic Of",
  IQ: "Iraq",
  IE: "Ireland",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JO: "Jordan",
  KZ: "Kazakstan",
  KE: "Kenya",
  KI: "Kiribati",
  KP: "Korea, Democratic People's Republic Of",
  KR: "Korea, Republic Of",
  KV: "Kosovo",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libyan Arab Jamahiriya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macau",
  MK: "Macedonia, The Former Yugoslav Republic Of",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia, Federated States Of",
  MD: "Moldova, Republic Of",
  MC: "Monaco",
  MN: "Mongolia",
  MS: "Montserrat",
  ME: "Montenegro",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  AN: "Netherlands Antilles",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestinian Territory, Occupied",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russia",
  RW: "Rwanda",
  SH: "Saint Helena",
  KN: "Saint Kitts And Nevis",
  LC: "Saint Lucia",
  PM: "Saint Pierre And Miquelon",
  VC: "Saint Vincent And The Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome And Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia And The South Sandwich Islands",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard And Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan, Province Of China",
  TJ: "Tajikistan",
  TZ: "Tanzania, United Republic Of",
  TH: "Thailand",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad And Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks And Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "United States Minor Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Viet Nam",
  VG: "Virgin Islands, British",
  VI: "Virgin Islands, U.s.",
  WF: "Wallis And Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe"
};

// Where each country is on the map
const countryCoords = {
  AF: { lat: 33.9391, lng: 67.7100 },
  AL: { lat: 41.1533, lng: 20.1683 },
  DZ: { lat: 28.0339, lng: 1.6596 },
  AS: { lat: -14.2710, lng: -170.1322 },
  AD: { lat: 42.5063, lng: 1.5218 },
  AO: { lat: -11.2027, lng: 17.8739 },
  AI: { lat: 18.2206, lng: -63.0686 },
  AQ: { lat: -75.2509, lng: -0.0714 },
  AG: { lat: 17.0608, lng: -61.7964 },
  AR: { lat: -38.4161, lng: -63.6167 },
  AM: { lat: 40.0691, lng: 45.0382 },
  AW: { lat: 12.5211, lng: -69.9683 },
  AU: { lat: -25.2744, lng: 133.7751 },
  AT: { lat: 47.5162, lng: 14.5501 },
  AZ: { lat: 40.1431, lng: 47.5769 },
  BS: { lat: 25.0343, lng: -77.3963 },
  BH: { lat: 26.0667, lng: 50.5577 },
  BD: { lat: 23.6850, lng: 90.3563 },
  BB: { lat: 13.1939, lng: -59.5432 },
  BY: { lat: 53.7098, lng: 27.9534 },
  BE: { lat: 50.5039, lng: 4.4699 },
  BZ: { lat: 17.1899, lng: -88.4976 },
  BJ: { lat: 9.3077, lng: 2.3158 },
  BM: { lat: 32.3078, lng: -64.7505 },
  BT: { lat: 27.5142, lng: 90.4336 },
  BO: { lat: -16.2902, lng: -63.5887 },
  BA: { lat: 43.9159, lng: 17.6791 },
  BW: { lat: -22.3285, lng: 24.6849 },
  BV: { lat: -54.4208, lng: 3.3464 },
  BR: { lat: -14.2350, lng: -51.9253 },
  IO: { lat: -6.3432, lng: 71.8765 },
  BN: { lat: 4.5353, lng: 114.7277 },
  BG: { lat: 42.7339, lng: 25.4858 },
  BF: { lat: 12.2383, lng: -1.5616 },
  BI: { lat: -3.3731, lng: 29.9189 },
  KH: { lat: 12.5657, lng: 104.9910 },
  CM: { lat: 7.3697, lng: 12.3547 },
  CA: { lat: 56.1304, lng: -106.3468 },
  CV: { lat: 16.0021, lng: -24.0131 },
  KY: { lat: 19.3133, lng: -81.2546 },
  CF: { lat: 6.6111, lng: 20.9394 },
  TD: { lat: 15.4542, lng: 18.7322 },
  CL: { lat: -35.6751, lng: -71.5430 },
  CN: { lat: 35.8617, lng: 104.1954 },
  CX: { lat: -10.4475, lng: 105.6904 },
  CC: { lat: -12.1642, lng: 96.8710 },
  CO: { lat: 4.5709, lng: -74.2973 },
  KM: { lat: -11.8750, lng: 43.8722 },
  CG: { lat: -0.2280, lng: 15.8277 },
  CD: { lat: -4.0383, lng: 21.7587 },
  CK: { lat: -21.2367, lng: -159.7777 },
  CR: { lat: 9.7489, lng: -83.7534 },
  CI: { lat: 7.5400, lng: -5.5471 },
  HR: { lat: 45.1000, lng: 15.2000 },
  CU: { lat: 21.5217, lng: -77.7812 },
  CY: { lat: 35.1264, lng: 33.4299 },
  CZ: { lat: 49.8175, lng: 15.4730 },
  DK: { lat: 56.2639, lng: 9.5018 },
  DJ: { lat: 11.8251, lng: 42.5903 },
  DM: { lat: 15.4150, lng: -61.3710 },
  DO: { lat: 18.7357, lng: -70.1627 },
  TP: { lat: -8.8742, lng: 125.7275 },
  EC: { lat: -1.8312, lng: -78.1834 },
  EG: { lat: 26.8206, lng: 30.8025 },
  SV: { lat: 13.7942, lng: -88.8965 },
  GQ: { lat: 1.6508, lng: 10.2679 },
  ER: { lat: 15.1794, lng: 39.7823 },
  EE: { lat: 58.5953, lng: 25.0136 },
  ET: { lat: 9.1450, lng: 40.4897 },
  FK: { lat: -51.7963, lng: -59.5236 },
  FO: { lat: 61.8926, lng: -6.9118 },
  FJ: { lat: -17.7134, lng: 178.0650 },
  FI: { lat: 61.9241, lng: 25.7482 },
  FR: { lat: 46.2276, lng: 2.2137 },
  GF: { lat: 3.9339, lng: -53.1258 },
  PF: { lat: -17.6797, lng: -149.4068 },
  TF: { lat: -49.2804, lng: 69.3486 },
  GA: { lat: -0.8037, lng: 11.6094 },
  GM: { lat: 13.4432, lng: -15.3101 },
  GE: { lat: 42.3154, lng: 43.3569 },
  DE: { lat: 51.1657, lng: 10.4515 },
  GH: { lat: 7.9465, lng: -1.0232 },
  GI: { lat: 36.1408, lng: -5.3536 },
  GR: { lat: 39.0742, lng: 21.8243 },
  GL: { lat: 71.7069, lng: -42.6043 },
  GD: { lat: 12.1165, lng: -61.6790 },
  GP: { lat: 16.2650, lng: -61.5510 },
  GU: { lat: 13.4443, lng: 144.7937 },
  GT: { lat: 15.7835, lng: -90.2308 },
  GN: { lat: 9.9456, lng: -9.6966 },
  GW: { lat: 11.8037, lng: -15.1804 },
  GY: { lat: 4.8604, lng: -58.9302 },
  HT: { lat: 18.9712, lng: -72.2852 },
  HM: { lat: -53.0818, lng: 73.5042 },
  VA: { lat: 41.9029, lng: 12.4534 },
  HN: { lat: 15.2000, lng: -86.2419 },
  HK: { lat: 22.3193, lng: 114.1694 },
  HU: { lat: 47.1625, lng: 19.5033 },
  IS: { lat: 64.9631, lng: -19.0208 },
  IN: { lat: 20.5937, lng: 78.9629 },
  ID: { lat: -0.7893, lng: 113.9213 },
  IR: { lat: 32.4279, lng: 53.6880 },
  IQ: { lat: 33.2232, lng: 43.6793 },
  IE: { lat: 53.1424, lng: -7.6921 },
  IT: { lat: 41.8719, lng: 12.5674 },
  JM: { lat: 18.1096, lng: -77.2975 },
  JP: { lat: 36.2048, lng: 138.2529 },
  JO: { lat: 30.5852, lng: 36.2384 },
  KZ: { lat: 48.0196, lng: 66.9237 },
  KE: { lat: -0.0236, lng: 37.9062 },
  KI: { lat: -3.3704, lng: -168.7340 },
  KP: { lat: 40.3399, lng: 127.5101 },
  KR: { lat: 35.9078, lng: 127.7669 },
  KV: { lat: 42.6026, lng: 20.9030 },
  KW: { lat: 29.3117, lng: 47.4818 },
  KG: { lat: 41.2044, lng: 74.7661 },
  LA: { lat: 19.8563, lng: 102.4955 },
  LV: { lat: 56.8796, lng: 24.6032 },
  LB: { lat: 33.8547, lng: 35.8623 },
  LS: { lat: -29.6099, lng: 28.2336 },
  LR: { lat: 6.4281, lng: -9.4295 },
  LY: { lat: 26.3351, lng: 17.2283 },
  LI: { lat: 47.1660, lng: 9.5554 },
  LT: { lat: 55.1694, lng: 23.8813 },
  LU: { lat: 49.8153, lng: 6.1296 },
  MO: { lat: 22.1987, lng: 113.5439 },
  MK: { lat: 41.6086, lng: 21.7453 },
  MG: { lat: -18.7669, lng: 46.8691 },
  MW: { lat: -13.2543, lng: 34.3015 },
  MY: { lat: 4.2105, lng: 101.9758 },
  MV: { lat: 3.2028, lng: 73.2207 },
  ML: { lat: 17.5707, lng: -3.9962 },
  MT: { lat: 35.9375, lng: 14.3754 },
  MH: { lat: 7.1315, lng: 171.1845 },
  MQ: { lat: 14.6415, lng: -61.0242 },
  MR: { lat: 21.0079, lng: -10.9408 },
  MU: { lat: -20.3484, lng: 57.5522 },
  YT: { lat: -12.8275, lng: 45.1662 },
  MX: { lat: 23.6345, lng: -102.5528 },
  FM: { lat: 7.4256, lng: 150.5508 },
  MD: { lat: 47.4116, lng: 28.3699 },
  MC: { lat: 43.7384, lng: 7.4246 },
  MN: { lat: 46.8625, lng: 103.8467 },
  MS: { lat: 16.7425, lng: -62.1874 },
  ME: { lat: 42.7087, lng: 19.3744 },
  MA: { lat: 31.7917, lng: -7.0926 },
  MZ: { lat: -18.6657, lng: 35.5296 },
  MM: { lat: 21.9162, lng: 95.9560 },
  NA: { lat: -22.9576, lng: 18.4904 },
  NR: { lat: -0.5228, lng: 166.9315 },
  NP: { lat: 28.3949, lng: 84.1240 },
  NL: { lat: 52.1326, lng: 5.2913 },
  AN: { lat: 12.2260, lng: -69.0601 },
  NC: { lat: -20.9043, lng: 165.6180 },
  NZ: { lat: -40.9006, lng: 174.8860 },
  NI: { lat: 12.8654, lng: -85.2072 },
  NE: { lat: 17.6078, lng: 8.0817 },
  NG: { lat: 9.0820, lng: 8.6753 },
  NU: { lat: -19.0544, lng: -169.8672 },
  NF: { lat: -29.0408, lng: 167.9547 },
  MP: { lat: 17.3308, lng: 145.3847 },
  NO: { lat: 60.4720, lng: 8.4689 },
  OM: { lat: 21.4735, lng: 55.9754 },
  PK: { lat: 30.3753, lng: 69.3451 },
  PW: { lat: 7.5150, lng: 134.5825 },
  PS: { lat: 31.9522, lng: 35.2332 },
  PA: { lat: 8.5380, lng: -80.7821 },
  PG: { lat: -6.3150, lng: 143.9555 },
  PY: { lat: -23.4425, lng: -58.4438 },
  PE: { lat: -9.1900, lng: -75.0152 },
  PH: { lat: 12.8797, lng: 121.7740 },
  PN: { lat: -24.7036, lng: -127.4393 },
  PL: { lat: 51.9194, lng: 19.1451 },
  PT: { lat: 39.3999, lng: -8.2245 },
  PR: { lat: 18.2208, lng: -66.5901 },
  QA: { lat: 25.3548, lng: 51.1839 },
  RE: { lat: -21.1151, lng: 55.5364 },
  RO: { lat: 45.9432, lng: 24.9668 },
  RU: { lat: 61.5240, lng: 105.3188 },
  RW: { lat: -1.9403, lng: 29.8739 },
  SH: { lat: -15.9650, lng: -5.7089 },
  KN: { lat: 17.3578, lng: -62.7830 },
  LC: { lat: 13.9094, lng: -60.9789 },
  PM: { lat: 46.9419, lng: -56.2711 },
  VC: { lat: 12.9843, lng: -61.2872 },
  WS: { lat: -13.7590, lng: -172.1046 },
  SM: { lat: 43.9424, lng: 12.4578 },
  ST: { lat: 0.1864, lng: 6.6131 },
  SA: { lat: 23.8859, lng: 45.0792 },
  SN: { lat: 14.4974, lng: -14.4524 },
  RS: { lat: 44.0165, lng: 21.0059 },
  SC: { lat: -4.6796, lng: 55.4920 },
  SL: { lat: 8.4606, lng: -11.7799 },
  SG: { lat: 1.3521, lng: 103.8198 },
  SK: { lat: 48.6690, lng: 19.6990 },
  SI: { lat: 46.1512, lng: 14.9955 },
  SB: { lat: -9.6457, lng: 160.1562 },
  SO: { lat: 5.1521, lng: 46.1996 },
  ZA: { lat: -30.5595, lng: 22.9375 },
  GS: { lat: -54.4296, lng: -36.5879 },
  ES: { lat: 40.4637, lng: -3.7492 },
  LK: { lat: 7.8731, lng: 80.7718 },
  SD: { lat: 12.8628, lng: 30.2176 },
  SR: { lat: 3.9193, lng: -56.0278 },
  SJ: { lat: 77.5536, lng: 23.6703 },
  SZ: { lat: -26.5225, lng: 31.4659 },
  SE: { lat: 60.1282, lng: 18.6435 },
  CH: { lat: 46.8182, lng: 8.2275 },
  SY: { lat: 34.8021, lng: 38.9968 },
  TW: { lat: 23.6978, lng: 120.9605 },
  TJ: { lat: 38.8610, lng: 71.2761 },
  TZ: { lat: -6.3690, lng: 34.8888 },
  TH: { lat: 15.8700, lng: 100.9925 },
  TG: { lat: 8.6195, lng: 0.8248 },
  TK: { lat: -9.2002, lng: -171.8484 },
  TO: { lat: -21.1790, lng: -175.1982 },
  TT: { lat: 10.6918, lng: -61.2225 },
  TN: { lat: 33.8869, lng: 9.5375 },
  TR: { lat: 38.9637, lng: 35.2433 },
  TM: { lat: 38.9697, lng: 59.5563 },
  TC: { lat: 21.6940, lng: -71.7979 },
  TV: { lat: -7.1095, lng: 177.6493 },
  UG: { lat: 1.3733, lng: 32.2903 },
  UA: { lat: 48.3794, lng: 31.1656 },
  AE: { lat: 23.4241, lng: 53.8478 },
  GB: { lat: 55.3781, lng: -3.4360 },
  US: { lat: 37.0902, lng: -95.7129 },
  UM: { lat: 19.3000, lng: 166.6000 },
  UY: { lat: -32.5228, lng: -55.7658 },
  UZ: { lat: 41.3775, lng: 64.5853 },
  VU: { lat: -15.3767, lng: 166.9592 },
  VE: { lat: 6.4238, lng: -66.5897 },
  VN: { lat: 14.0583, lng: 108.2772 },
  VG: { lat: 18.4207, lng: -64.6400 },
  VI: { lat: 18.3358, lng: -64.8963 },
  WF: { lat: -13.7688, lng: -177.1561 },
  EH: { lat: 24.2155, lng: -12.8858 },
  YE: { lat: 15.5527, lng: 48.5164 },
  ZM: { lat: -13.1339, lng: 27.8493 },
  ZW: { lat: -19.0154, lng: 29.1549 }
};

function populateCountryDropdown() {
  const select = document.getElementById('incidentCountry');
  if (!select) return;

  // Keep the first "Select Country" option
  select.innerHTML = '<option value="">Select Country</option>';

  // Sort countries by name
  const sortedCountries = Object.entries(countryNames).sort((a, b) => a[1].localeCompare(b[1]));

  sortedCountries.forEach(([code, name]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    select.appendChild(option);
  });
}

/*
============================================
Variables I need everywhere
============================================
*/

let allIncidents = [];
let currentRows = [];
let vmap = null;
let fp = null;
let chartTime = null;
let chartTypes = null;
let chartSeverity = null;
let pendingDateRange = null;
let currentPage = 1;
let isEditMode = false;
let editingIncidentId = null;
let isPinned = false;
let pinnedIncident = null;

const initialMapState = {
  scale: 1.2,
  x: 0.5,
  y: 0.45
};

/*
============================================
Helpful little functions
============================================
*/

function parseISO(d) {
  if (!d) return new Date();
  const parts = d.split('-');
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function monthKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function fmtMDY(dateStr) {
  if (!dateStr) return '';
  const d = parseISO(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}-${dd}-${d.getFullYear()}`;
}

function fullCountry(code) {
  return countryNames[code] || code;
}

function sevColor(sev) {
  const s = getComputedStyle(document.documentElement);
  if (sev === 'Critical') return s.getPropertyValue('--sev-critical').trim();
  if (sev === 'High') return s.getPropertyValue('--sev-high').trim();
  if (sev === 'Medium') return s.getPropertyValue('--sev-med').trim();
  return s.getPropertyValue('--sev-low').trim();
}

function badgeClass(sev) {
  if (sev === 'Critical') return 'badge sev-critical';
  if (sev === 'High') return 'badge sev-high';
  if (sev === 'Medium') return 'badge sev-med';
  return 'badge sev-low';
}

/*
============================================
Talking to the backend
============================================
*/

async function fetchIncidents() {
  try {
    const response = await fetch(`${API_BASE}/incidents`);
    if (!response.ok) throw new Error('Failed to fetch incidents');
    const data = await response.json();
    allIncidents = data.map(inc => ({
      ...inc,
      date: inc.date ? inc.date.split('T')[0] : inc.date,
      lat: parseFloat(inc.lat) || (countryCoords[inc.country]?.lat || 0),
      lng: parseFloat(inc.lng) || (countryCoords[inc.country]?.lng || 0)
    }));
    refresh();
  } catch (error) {
    console.error('Error fetching incidents:', error);
    showNotification('Error loading incidents', 'error');
    // Initialize map even if data fails to load
    allIncidents = [];
    refresh();
  }
}

async function createIncident(data) {
  try {
    const response = await fetch(`${API_BASE}/incidents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create incident');
    await fetchIncidents();
    showNotification('Incident added successfully!', 'success');
  } catch (error) {
    console.error('Error creating incident:', error);
    showNotification('Error adding incident', 'error');
    throw error;
  }
}

async function updateIncident(id, data) {
  try {
    const response = await fetch(`${API_BASE}/incidents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update incident');
    await fetchIncidents();
    showNotification('Incident updated successfully!', 'success');
  } catch (error) {
    console.error('Error updating incident:', error);
    showNotification('Error updating incident', 'error');
    throw error;
  }
}

async function deleteIncident(id) {
  if (!confirm('Are you sure you want to delete this incident?')) return;

  try {
    const response = await fetch(`${API_BASE}/incidents/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete incident');
    await fetchIncidents();
    showNotification('Incident deleted successfully!', 'success');
  } catch (error) {
    console.error('Error deleting incident:', error);
    showNotification('Error deleting incident', 'error');
  }
}

/*
============================================
Showing popups
============================================
*/

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#31c48d' : '#dc2626'};
    color: ${type === 'success' ? '#000' : '#fff'};
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/*
============================================
Filtering the data
============================================
*/

function readFilters() {
  const severityEl = document.querySelector('input[name="severity"]:checked');
  const severity = severityEl ? severityEl.value : 'all';
  const incidentType = document.getElementById('incidentType').value;
  let start = null, end = null;
  if (pendingDateRange && pendingDateRange.length === 2) {
    start = pendingDateRange[0];
    end = pendingDateRange[1];
  }
  return { severity, incidentType, start, end };
}

function filterData() {
  const { severity, incidentType, start, end } = readFilters();
  return allIncidents.filter(it => {
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
Making the table work
============================================
*/

function updateTable(rows) {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';

  // Sort by date (newest first)
  const sorted = rows.slice().sort((a, b) => parseISO(b.date) - parseISO(a.date));

  // Pagination
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const pageRows = sorted.slice(startIdx, endIdx);

  pageRows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${fmtMDY(r.date)}</td>
      <td>${r.type}</td>
      <td><span class="${badgeClass(r.severity)}">${r.severity}</span></td>
      <td>${r.org}</td>
      <td>${fullCountry(r.country)}</td>
      <td>${r.responseTime || 'N/A'}</td>
      <td>${r.dataBreached || 'N/A'}</td>
      <td>${r.mitigationStrategy || 'N/A'}</td>
      <td>${r.affectedIndustry || 'N/A'}</td>
      <td>${r.financialImpact || 'N/A'}</td>
      <td style="text-align: center;">
        <button class="action-btn" onclick="editIncident(${r.id})" title="Edit/Delete Incident">
          <i class="fas fa-info-circle"></i>
        </button>
      </td>`;
    tbody.appendChild(tr);
  });

  updatePagination(sorted.length);
}

function updatePagination(totalItems) {
  const pagination = document.getElementById('pagination');
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  let html = `
    <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">‹ Prev</button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += `<span style="color: var(--muted);">...</span>`;
    }
  }

  html += `
    <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Next ›</button>
  `;

  pagination.innerHTML = html;

  // Render chart pagination (synced)
  const chartPaginationHtml = `
    <button class="chart-page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">‹ Prev</button>
    <span style="font-size: 12px; color: var(--muted); align-self: center;">Page ${currentPage} of ${totalPages}</span>
    <button class="chart-page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Next ›</button>
  `;

  const timePag = document.getElementById('chartTimePagination');
  if (timePag) timePag.innerHTML = chartPaginationHtml;

  const typePag = document.getElementById('chartTypesPagination');
  if (typePag) typePag.innerHTML = chartPaginationHtml;
}

function changePage(page) {
  currentPage = page;
  updateTable(currentRows);

  // Calculate page rows for charts
  const sorted = currentRows.slice().sort((a, b) => parseISO(b.date) - parseISO(a.date));
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const pageRows = sorted.slice(startIdx, endIdx);

  updateCharts(pageRows, currentRows);
}

// Make functions global for onclick handlers
window.changePage = changePage;
window.editIncident = editIncident;
window.deleteIncident = deleteIncident;

/*
============================================
CHART FUNCTIONS
============================================
*/

function updateCharts(pageRows, allRows) {
  // Chart 1: Line chart - incidents over time (SYNCED TO PAGINATION)
  const byMonth = new Map();
  pageRows.forEach(r => {
    const k = monthKey(parseISO(r.date));
    byMonth.set(k, (byMonth.get(k) || 0) + 1);
  });
  const months = [...byMonth.keys()].sort();
  const counts = months.map(m => byMonth.get(m));

  // Update total count text
  document.getElementById('chartTimeTotal').textContent = `Total: ${pageRows.length}`;

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
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          ticks: { display: false },
          grid: { color: '#2a3042' }
        },
        y: {
          beginAtZero: true,
          max: Math.max(0, ...counts) + 1,
          ticks: {
            callback: v => Number.isInteger(v) ? v : '',
            color: '#cfd2db'
          },
          grid: { color: '#2a3042' }
        }
      }
    }
  });

  // Chart 2: Bar chart - incident types (SYNCED TO PAGINATION)
  const byType = new Map();
  pageRows.forEach(r => byType.set(r.type, (byType.get(r.type) || 0) + 1));

  // Sort by count
  const sortedTypes = [...byType.entries()].sort((a, b) => b[1] - a[1]);
  const typeLabels = sortedTypes.map(t => t[0]);
  const typeValues = sortedTypes.map(t => t[1]);

  // Update summary text: "Top attack type: [Type] - [Count]"
  const topType = sortedTypes.length > 0 ? sortedTypes[0] : null;
  const typeSummaryEl = document.getElementById('chartTypesSummary');
  if (typeSummaryEl) {
    typeSummaryEl.textContent = topType ? `Top attack type: ${topType[0]} - ${topType[1]}` : '';
  }

  if (chartTypes) chartTypes.destroy();
  chartTypes = new Chart(document.getElementById('chartTypes'), {
    type: 'bar',
    data: {
      labels: typeLabels,
      datasets: [{ label: 'By Type', data: typeValues, backgroundColor: '#61dafb' }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          ticks: { display: false }, // Remove bottom labels as requested
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          max: Math.max(0, ...typeValues) + 1,
          ticks: {
            callback: v => Number.isInteger(v) ? v : '',
            color: '#cfd2db'
          },
          grid: { color: '#2a3042' }
        }
      }
    }
  });

  // Chart 3: Doughnut chart - severity breakdown (USES ALL DATA)
  // Use allRows (filtered but not paginated) for the pie chart
  const rowsForPie = allRows || pageRows;
  const sCritical = rowsForPie.filter(r => r.severity === 'Critical').length;
  const sHigh = rowsForPie.filter(r => r.severity === 'High').length;
  const sMed = rowsForPie.filter(r => r.severity === 'Medium').length;
  const sLow = rowsForPie.filter(r => r.severity === 'Low').length;

  // Calculate "Most severities"
  const sevCounts = [
    { name: 'Critical', count: sCritical },
    { name: 'High', count: sHigh },
    { name: 'Medium', count: sMed },
    { name: 'Low', count: sLow }
  ].sort((a, b) => b.count - a.count);

  const topSev = sevCounts[0];
  const sevSummaryEl = document.getElementById('chartSeveritySummary');
  if (sevSummaryEl) {
    sevSummaryEl.textContent = `Most severities: ${topSev.name} - ${topSev.count}`;
  }

  if (chartSeverity) chartSeverity.destroy();
  chartSeverity = new Chart(document.getElementById('chartSeverity'), {
    type: 'doughnut',
    data: {
      labels: ['Critical', 'High', 'Medium', 'Low'],
      datasets: [{
        data: [sCritical, sHigh, sMed, sLow],
        backgroundColor: ['#dc2626', '#f56565', '#f6ad55', '#31c48d'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#cfd2db' }, position: 'bottom' }
      }
    }
  });
}

/*
============================================
INFO CARD FUNCTIONS
============================================
*/

function showInfoCard(incident, pinned = false) {
  const card = document.getElementById('mapInfoCard');
  const title = document.getElementById('infoCardTitle');
  const content = document.getElementById('infoCardContent');

  if (pinned) {
    isPinned = true;
    pinnedIncident = incident;
    card.classList.add('pinned');
  }

  // Title shows just Severity with badge color
  title.innerHTML = `<span class="${badgeClass(incident.severity)}">${incident.severity}</span> - ${fullCountry(incident.country)}`;

  content.innerHTML = `
    <div class="info-table-wrapper">
      <table class="info-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Organization</th>
            <th>Response Time</th>
            <th>Mitigation</th>
            <th>Industry</th>
            <th>Financial Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${incident.type}</td>
            <td>${fmtMDY(incident.date)}</td>
            <td>${incident.org}</td>
            <td>${incident.responseTime || 'N/A'}</td>
            <td>${incident.mitigationStrategy || 'N/A'}</td>
            <td>${incident.affectedIndustry || 'N/A'}</td>
            <td>${incident.financialImpact || 'N/A'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function showMultipleIncidentsInfo(incidents, country, severity = null) {
  const card = document.getElementById('mapInfoCard');
  const title = document.getElementById('infoCardTitle');
  const content = document.getElementById('infoCardContent');

  isPinned = true;
  card.classList.add('pinned');

  // Title shows severity and count
  // Title shows severity and country (centered)
  if (severity) {
    title.innerHTML = `Severity: ${severity} - ${fullCountry(country)}`;
    title.style.textAlign = 'center';
  } else {
    // Group by severity for multi-severity display
    const bySeverity = {};
    incidents.forEach(inc => {
      if (!bySeverity[inc.severity]) bySeverity[inc.severity] = [];
      bySeverity[inc.severity].push(inc);
    });

    const sevBreakdown = Object.keys(bySeverity).map(sev =>
      `<span class="${badgeClass(sev)}">${sev}: ${bySeverity[sev].length}</span>`
    ).join(' ');

    title.innerHTML = `${fullCountry(country)} - ${incidents.length} incident${incidents.length > 1 ? 's' : ''}<br/>${sevBreakdown}`;
    title.style.textAlign = 'center';
  }

  // Build table with all incidents
  const rows = incidents.map(inc => `
    <tr>
      <td><span class="${badgeClass(inc.severity)}">${inc.severity}</span></td>
      <td>${inc.type}</td>
      <td>${fmtMDY(inc.date)}</td>
      <td>${inc.org}</td>
      <td>${inc.responseTime || 'N/A'}</td>
      <td>${inc.mitigationStrategy || 'N/A'}</td>
      <td>${inc.affectedIndustry || 'N/A'}</td>
      <td>${inc.financialImpact || 'N/A'}</td>
    </tr>
  `).join('');

  content.innerHTML = `
    <div class="info-table-wrapper">
      <table class="info-table">
        <thead>
          <tr>
            <th>Severity</th>
            <th>Type</th>
            <th>Date</th>
            <th>Organization</th>
            <th>Response Time</th>
            <th>Mitigation</th>
            <th>Industry</th>
            <th>Financial Impact</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function clearInfoCard() {
  if (isPinned) return; // Don't clear if pinned

  const card = document.getElementById('mapInfoCard');
  const title = document.getElementById('infoCardTitle');
  const content = document.getElementById('infoCardContent');

  card.classList.remove('pinned');
  title.textContent = 'Hover over a marker';
  content.innerHTML = '<p class="info-hint">Hover over a marker to see incident details</p>';
}

function unpinInfoCard() {
  isPinned = false;
  pinnedIncident = null;
  const card = document.getElementById('mapInfoCard');
  card.classList.remove('pinned');
  clearInfoCard();
}

/*
============================================
MAP FUNCTIONS (WITH CLUSTERING)
============================================
*/

// Cluster incidents by country + severity
function clusterIncidents(rows) {
  const clusters = new Map();

  rows.forEach(incident => {
    // Use country coords if incident has no specific lat/lng
    let lat = incident.lat;
    let lng = incident.lng;

    if (!lat || !lng) {
      const defaults = countryCoords[incident.country];
      if (defaults) {
        lat = defaults.lat;
        lng = defaults.lng;
      } else {
        lat = 0;
        lng = 0;
      }
    }

    const key = `${incident.country}_${incident.severity}`;
    if (!clusters.has(key)) {
      clusters.set(key, {
        country: incident.country,
        severity: incident.severity,
        lat: lat,
        lng: lng,
        incidents: []
      });
    }
    clusters.get(key).incidents.push(incident);
  });

  return Array.from(clusters.values());
}

// Offset markers in same country so they don't overlap
function offsetMarkersInSameCountry(clusters) {
  const byCountry = new Map();

  // Group clusters by country
  clusters.forEach(cluster => {
    if (!byCountry.has(cluster.country)) {
      byCountry.set(cluster.country, []);
    }
    byCountry.get(cluster.country).push(cluster);
  });

  // Apply offsets to markers in the same country
  byCountry.forEach((countryClusters, country) => {
    if (countryClusters.length > 1) {
      // Spread markers in a circle around the country center
      // Reduced radius to 1.5 degrees to prevent markers from drifting into other countries
      const radius = 1.5;
      const angleStep = (2 * Math.PI) / countryClusters.length;

      countryClusters.forEach((cluster, index) => {
        // Offset based on index to ensure deterministic placement
        const angle = index * angleStep;
        // Apply offset to the cluster's coordinates
        cluster.lat = cluster.lat + (radius * Math.cos(angle));
        cluster.lng = cluster.lng + (radius * Math.sin(angle));
      });
    }
  });

  return clusters;
}

// Convert clustered incidents to map markers
function rowsToMarkers(rows) {
  // 1. Cluster the data
  const clusters = clusterIncidents(rows);

  // 2. Apply offsets to the clusters
  const offsetClusters = offsetMarkersInSameCountry(clusters);

  // 3. Convert to map markers
  return offsetClusters.map(cluster => ({
    name: `${cluster.severity} - ${cluster.incidents.length}`,
    coords: [cluster.lat, cluster.lng],
    style: {
      initial: { fill: sevColor(cluster.severity), stroke: 'rgba(0, 0, 0, .5)', strokeWidth: 1, r: 6 },
      hover: { fill: sevColor(cluster.severity), stroke: 'rgba(0, 0, 0, .5)', strokeWidth: 1, r: 8 }
    },
    cluster: cluster
  }));
}

// Force zoom button colors (map library overrides CSS)
function fixZoomButtonColors() {
  const applyStyles = () => {
    const btns = document.querySelectorAll('.jsvectormap-zoomin, .jsvectormap-zoomout, .jvectormap-zoomin, .jvectormap-zoomout, .jvm-zoom-btn, .jvm-zoomin, .jvm-zoomout');
    btns.forEach(btn => {
      btn.style.setProperty('background-color', '#ffffff', 'important');
      btn.style.setProperty('color', '#000000', 'important');
      btn.style.setProperty('border', '1px solid #cccccc', 'important');
      btn.style.setProperty('opacity', '1', 'important');
      btn.style.setProperty('display', 'flex', 'important');
      btn.style.setProperty('align-items', 'center', 'important');
      btn.style.setProperty('justify-content', 'center', 'important');
      btn.style.setProperty('border-radius', '0', 'important');
      btn.style.setProperty('cursor', 'pointer', 'important');
      btn.style.setProperty('font-weight', 'bold', 'important');
      btn.style.setProperty('font-size', '16px', 'important');
      btn.style.setProperty('width', '28px', 'important');
      btn.style.setProperty('height', '28px', 'important');
      btn.style.setProperty('line-height', '28px', 'important');
      btn.style.setProperty('margin', '12px', 'important');

      // User requested fix for spacing
      if (btn.classList.contains('jsvectormap-zoomin') ||
        btn.classList.contains('jvectormap-zoomin') ||
        btn.classList.contains('jvm-zoomin')) {
        btn.style.setProperty('top', '-2px', 'important');
      }
    });
  };

  // Apply immediately
  applyStyles();

  // And repeatedly to fight back against the library
  if (!window.zoomFixInterval) {
    window.zoomFixInterval = setInterval(applyStyles, 500);
  }
}

// Force the marker colors to stay solid (no animation effects)
function forceMarkerColors(markers) {
  setTimeout(() => {
    const nodes = document.querySelectorAll('#map svg circle');
    nodes.forEach((c, i) => {
      if (markers[i]) {
        const col = sevColor(markers[i].cluster.severity);
        c.setAttribute('fill', col);
        c.style.fill = col;
        c.setAttribute('stroke', 'rgba(0, 0, 0, .5)');
        c.style.stroke = 'rgba(0, 0, 0, .5)';
        c.setAttribute('stroke-width', '1');
        c.style.strokeWidth = '1';
        c.setAttribute('r', '6'); // Slightly smaller radius to help with crowding
        c.style.animation = 'none';
        c.style.filter = 'none';
      }
    });

    // Fix zoom button colors after markers
    fixZoomButtonColors();
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
    try { vmap.destroy(); } catch (_) { }
    vmap = null;
  }

  const mapEl = document.getElementById('map');
  mapEl.innerHTML = '';

  // Update title with count - REMOVED per user request
  // const titleEl = document.getElementById('mapPanelTitle');
  // if (titleEl) {
  //   titleEl.textContent = `Incidents by Location (${rows.length})`;
  // }

  // Sort rows by country and severity to ensure deterministic marker order
  // This is crucial for the hover index to match the marker array
  rows.sort((a, b) => {
    if (a.country !== b.country) return a.country.localeCompare(b.country);
    return a.severity.localeCompare(b.severity);
  });

  // Create markers from clustered data
  const markers = rowsToMarkers(rows);

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
    markers: markers,
    onLoaded: function () {
      forceMarkerColors(markers);
      fixZoomButtonColors();
    }
  });

  // Add click handlers
  if (vmap && vmap.on) {
    // When you hover over a marker, show in info card
    vmap.on('markerTooltipShow', (e, tooltip, idx) => {
      let cluster;
      // Try to get data from the map instance first (safest if map reorders markers)
      if (vmap.markers && vmap.markers[idx] && vmap.markers[idx].config && vmap.markers[idx].config.cluster) {
        cluster = vmap.markers[idx].config.cluster;
      } else if (markers[idx]) {
        cluster = markers[idx].cluster;
      }

      if (cluster) {
        // Update tooltip text to be explicit: {Severity} - {Count}
        tooltip.text(`${cluster.severity} - ${cluster.incidents.length}`);

        if (cluster.incidents.length === 1) {
          showInfoCard(cluster.incidents[0], false);
        } else {
          showMultipleIncidentsInfo(cluster.incidents, cluster.country, cluster.severity);
        }
      }
    });

    // When you click on a marker, pin the info
    vmap.on('markerClick', (e, idx) => {
      let cluster;
      if (vmap.markers && vmap.markers[idx] && vmap.markers[idx].config && vmap.markers[idx].config.cluster) {
        cluster = vmap.markers[idx].config.cluster;
      } else if (markers[idx]) {
        cluster = markers[idx].cluster;
      }

      if (cluster) {
        if (cluster.incidents.length === 1) {
          showInfoCard(cluster.incidents[0], true);
          showIncidentDetails(cluster.incidents[0]);
        } else {
          showMultipleIncidentsInfo(cluster.incidents, cluster.country, cluster.severity);
        }
      }
    });

    // When you click on a country, show all incidents in that country
    vmap.on('regionClick', (e, code) => {
      const list = currentRows.filter(x => x.country === code);
      if (list.length > 0) {
        showMultipleIncidentsInfo(list, code);
      }
    });
  }

  // Add hover handlers to map markers
  setTimeout(() => {
    const circles = document.querySelectorAll('#map svg circle');
    circles.forEach((circle, idx) => {
      circle.addEventListener('mouseenter', () => {
        let cluster;
        // Try to get data from the map instance first
        if (vmap.markers && vmap.markers[idx] && vmap.markers[idx].config && vmap.markers[idx].config.cluster) {
          cluster = vmap.markers[idx].config.cluster;
        } else if (markers[idx]) {
          cluster = markers[idx].cluster;
        }

        if (cluster) {
          if (cluster.incidents.length === 1) {
            showInfoCard(cluster.incidents[0], false);
          } else {
            showMultipleIncidentsInfo(cluster.incidents, cluster.country, cluster.severity);
          }
        }
      });
    });
  }, 200);

  // Set the initial map position
  setTimeout(() => {
    if (vmap && vmap.setFocus) {
      try {
        vmap.setFocus({ scale: initialMapState.scale, x: initialMapState.x, y: initialMapState.y, animate: true });
      } catch (_) { }
    }
    forceMarkerColors(markers);
    fixZoomButtonColors();
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
      <div><b>Response Time:</b> ${r.responseTime || 'N/A'}</div>
      <div><b>Data Breached:</b> ${r.dataBreached || 'N/A'}</div>
      <div><b>Mitigation:</b> ${r.mitigationStrategy || 'N/A'}</div>
      <div><b>Industry:</b> ${r.affectedIndustry || 'N/A'}</div>
      <div><b>Financial Impact:</b> ${r.financialImpact || 'N/A'}</div>
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
MODAL FUNCTIONS
============================================
*/

function openModal(editMode = false, incident = null) {
  isEditMode = editMode;
  const modal = document.getElementById('incidentModal');
  const form = document.getElementById('incidentForm');
  const deleteBtn = document.getElementById('deleteIncidentBtn');

  document.getElementById('modalTitle').textContent = editMode ? 'Edit Incident' : 'Add New Incident';

  // Show/hide delete button
  if (editMode && incident) {
    deleteBtn.style.display = 'block';
    editingIncidentId = incident.id;
    document.getElementById('incidentId').value = incident.id;
    document.getElementById('incidentDate').value = incident.date;
    document.getElementById('incidentType2').value = incident.type;
    document.getElementById('incidentSeverity').value = incident.severity;
    document.getElementById('incidentOrg').value = incident.org;
    document.getElementById('incidentCountry').value = incident.country;
    document.getElementById('incidentResponseTime').value = incident.responseTime || '';
    document.getElementById('incidentDataBreached').value = incident.dataBreached || '';
    document.getElementById('incidentMitigation').value = incident.mitigationStrategy || '';
    document.getElementById('incidentIndustry').value = incident.affectedIndustry || '';
    document.getElementById('incidentFinancial').value = incident.financialImpact || '';
    document.getElementById('incidentLat').value = incident.lat || '';
    document.getElementById('incidentLng').value = incident.lng || '';
  } else {
    deleteBtn.style.display = 'none';
    form.reset();
    editingIncidentId = null;
  }

  modal.classList.add('show');
}

function closeModal() {
  const modal = document.getElementById('incidentModal');
  modal.classList.remove('show');
  document.getElementById('incidentForm').reset();
  isEditMode = false;
  editingIncidentId = null;
}

function editIncident(id) {
  const incident = allIncidents.find(inc => inc.id === id);
  if (incident) {
    openModal(true, incident);
  }
}

/*
============================================
REFRESH FUNCTION
============================================
*/

// Refresh everything when filters change
function refresh() {
  const rows = filterData();
  currentRows = rows;
  currentPage = 1;
  updateTable(currentRows);

  // Charts: Line/Bar use paginated data, Pie uses all data
  // Get paginated data for current page
  const sorted = rows.slice().sort((a, b) => parseISO(b.date) - parseISO(a.date));
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const pageRows = sorted.slice(startIdx, endIdx);

  updateCharts(pageRows, currentRows); // Update charts with new page data (Line/Bar) and all data (Pie)
  renderMap(currentRows); // Map always shows all data
}

/*
============================================
INITIALIZATION
============================================
*/

// Run this when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Setup the date picker with auto-apply
  fp = flatpickr('#dateRange', {
    mode: 'range',
    dateFormat: 'm-d-Y',
    clickOpens: true,
    allowInput: false,
    onChange: (dates) => {
      if (dates.length === 2) {
        // Auto-apply date filter when both dates are selected
        pendingDateRange = [
          new Date(dates[0].getFullYear(), dates[0].getMonth(), dates[0].getDate()),
          new Date(dates[1].getFullYear(), dates[1].getMonth(), dates[1].getDate())
        ];
        refresh();
      } else if (dates.length === 0) {
        // Clear filter when dates are cleared
        pendingDateRange = null;
        refresh();
      }
    }
  });

  // Initialize date picker for new incident modal
  flatpickr('#incidentDate', {
    dateFormat: 'Y-m-d',
    defaultDate: 'today'
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
    const all = document.querySelector('input[name="severity"][value="all"]');
    if (all) all.checked = true;
    document.getElementById('incidentType').value = 'all';
    refresh();
  });

  // Reset map view button
  document.getElementById('resetView').addEventListener('click', resetMapView);

  // Close detail panel button
  document.getElementById('detailClose').addEventListener('click', flipBack);

  // Close info card button
  document.getElementById('infoCardClose').addEventListener('click', unpinInfoCard);

  // Add Incident button
  document.getElementById('addIncidentBtn').addEventListener('click', () => openModal(false));

  // Modal controls
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('cancelBtn').addEventListener('click', closeModal);

  // Delete button in modal
  document.getElementById('deleteIncidentBtn').addEventListener('click', () => {
    if (editingIncidentId) {
      deleteIncident(editingIncidentId);
      closeModal();
    }
  });

  // Close modal when clicking outside
  document.getElementById('incidentModal').addEventListener('click', (e) => {
    if (e.target.id === 'incidentModal') {
      closeModal();
    }
  });

  // Form submission
  document.getElementById('incidentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      date: document.getElementById('incidentDate').value,
      type: document.getElementById('incidentType2').value,
      severity: document.getElementById('incidentSeverity').value,
      org: document.getElementById('incidentOrg').value,
      country: document.getElementById('incidentCountry').value,
      responseTime: document.getElementById('incidentResponseTime').value,
      dataBreached: document.getElementById('incidentDataBreached').value,
      mitigationStrategy: document.getElementById('incidentMitigation').value,
      affectedIndustry: document.getElementById('incidentIndustry').value,
      financialImpact: document.getElementById('incidentFinancial').value,
      lat: parseFloat(document.getElementById('incidentLat').value) || null,
      lng: parseFloat(document.getElementById('incidentLng').value) || null
    };

    try {
      if (isEditMode && editingIncidentId) {
        await updateIncident(editingIncidentId, formData);
      } else {
        await createIncident(formData);
      }
      closeModal();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  });

  // Initialize map immediately (even before data loads)
  renderMap([]);

  // Populate country dropdown
  populateCountryDropdown();

  // Load initial data
  fetchIncidents();
});
