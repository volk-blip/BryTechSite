export type ProductVisualId =
  | 'websites'
  | 'crm'
  | 'portal'
  | 'automation'
  | 'corridor'
  | 'clinic-case'
  | 'telaviv-case'
  | 'lviv-case'
  | 'haifa-case';

function svgToDataUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

const WEBSITES_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
  <defs>
    <linearGradient id="bgWeb" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F5F7FA"/>
      <stop offset="50%" stop-color="#EDF2F8"/>
      <stop offset="100%" stop-color="#E2ECFA"/>
    </linearGradient>
    <linearGradient id="blueAccent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0071E3"/>
      <stop offset="100%" stop-color="#15BCDF"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#0071E3" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="960" height="540" fill="url(#bgWeb)"/>
  <circle cx="820" cy="110" r="220" fill="#0071E3" fill-opacity="0.08"/>
  <circle cx="140" cy="430" r="190" fill="#15BCDF" fill-opacity="0.08"/>

  <!-- Apple macOS Window Frame -->
  <g transform="translate(88, 48)" filter="url(#cardShadow)">
    <rect x="0" y="0" width="784" height="444" rx="28" fill="#FFFFFF" stroke="#E5E5EA" stroke-width="1.5"/>
    <path d="M0 28 C0 12.5 12.5 0 28 0 L756 0 C771.5 0 784 12.5 784 28 L784 52 L0 52 Z" fill="#F8F9FB"/>
    <line x1="0" y1="52" x2="784" y2="52" stroke="#E5E5EA" stroke-width="1"/>
    <!-- macOS Traffic Lights -->
    <circle cx="28" cy="26" r="6" fill="#FF5F56"/>
    <circle cx="48" cy="26" r="6" fill="#FFBD2E"/>
    <circle cx="68" cy="26" r="6" fill="#27C93F"/>
    <!-- Pill URL Bar -->
    <rect x="210" y="13" width="364" height="26" rx="13" fill="#FFFFFF" stroke="#E5E5EA"/>
    <text x="295" y="30" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="12" font-weight="600">brytech-clinic.com · EN / UA / HE</text>

    <!-- Left Hero Preview inside Browser -->
    <rect x="32" y="78" width="440" height="334" rx="22" fill="#F5F5F7"/>
    <rect x="58" y="106" width="128" height="24" rx="12" fill="#0071E3" fill-opacity="0.1"/>
    <text x="74" y="122" fill="#0071E3" font-family="-apple-system, sans-serif" font-size="11" font-weight="700">99/100 PAGESPEED</text>
    <rect x="58" y="148" width="310" height="28" rx="8" fill="#1D1D1F"/>
    <rect x="58" y="188" width="240" height="28" rx="8" fill="url(#blueAccent)"/>
    <rect x="58" y="232" width="340" height="12" rx="6" fill="#86868B" fill-opacity="0.35"/>
    <rect x="58" y="254" width="270" height="12" rx="6" fill="#86868B" fill-opacity="0.25"/>
    <rect x="58" y="296" width="180" height="46" rx="23" fill="#0071E3"/>
    <text x="92" y="324" fill="#FFFFFF" font-family="-apple-system, sans-serif" font-size="13" font-weight="700">Book Online 24/7</text>

    <!-- Right Live Booking & Conversion Card -->
    <rect x="496" y="78" width="256" height="156" rx="22" fill="#1D1D1F"/>
    <text x="522" y="112" fill="#86868B" font-family="-apple-system, sans-serif" font-size="11" font-weight="700">ONLINE CONVERSION</text>
    <text x="522" y="158" fill="#FFFFFF" font-family="-apple-system, sans-serif" font-size="38" font-weight="700">+310%</text>
    <path d="M522 198 Q565 180 605 185 T695 142" fill="none" stroke="#15BCDF" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="695" cy="142" r="5" fill="#15BCDF"/>

    <rect x="496" y="252" width="256" height="160" rx="22" fill="#F5F5F7" stroke="#E5E5EA"/>
    <text x="520" y="284" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="12" font-weight="700">Instant Slot Selection</text>
    <rect x="520" y="302" width="64" height="36" rx="12" fill="#0071E3"/>
    <text x="536" y="324" fill="#FFFFFF" font-family="-apple-system, sans-serif" font-size="12" font-weight="700">10:30</text>
    <rect x="592" y="302" width="64" height="36" rx="12" fill="#FFFFFF" stroke="#D2D2D7"/>
    <text x="608" y="324" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="12" font-weight="600">13:00</text>
    <rect x="664" y="302" width="64" height="36" rx="12" fill="#FFFFFF" stroke="#D2D2D7"/>
    <text x="680" y="324" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="12" font-weight="600">16:15</text>
    <rect x="520" y="354" width="208" height="34" rx="17" fill="#E8F8F0"/>
    <text x="562" y="375" fill="#059669" font-family="-apple-system, sans-serif" font-size="11" font-weight="700">✓ Synced with CRM</text>
  </g>
</svg>
`;

const CRM_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
  <defs>
    <linearGradient id="bgCrm" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F5F5F7"/>
      <stop offset="100%" stop-color="#E8F0FE"/>
    </linearGradient>
    <filter id="crmShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#1D1D1F" flood-opacity="0.08"/>
    </filter>
  </defs>
  <rect width="960" height="540" fill="url(#bgCrm)"/>

  <!-- Top Apple Floating Pill Header -->
  <g filter="url(#crmShadow)">
    <rect x="72" y="42" width="816" height="64" rx="22" fill="#FFFFFF" stroke="#E5E5EA"/>
    <circle cx="108" cy="74" r="10" fill="#0071E3"/>
    <text x="132" y="79" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="15" font-weight="700">BryTech Unified CRM &amp; Pipeline · $0 Per-Seat Fees</text>
    <rect x="676" y="56" width="192" height="36" rx="18" fill="#0071E3" fill-opacity="0.1"/>
    <text x="702" y="79" fill="#0071E3" font-family="-apple-system, sans-serif" font-size="12" font-weight="700">Active Pipeline: $148,400</text>
  </g>

  <!-- 3 Clean Apple Bento Kanban Columns -->
  <g transform="translate(72, 130)" filter="url(#crmShadow)">
    <rect x="0" y="0" width="256" height="364" rx="24" fill="#FFFFFF" stroke="#E5E5EA"/>
    <text x="24" y="38" fill="#86868B" font-family="-apple-system, sans-serif" font-size="11" font-weight="700">NEW INQUIRIES · 18</text>
    <rect x="20" y="58" width="216" height="118" rx="18" fill="#F5F5F7"/>
    <text x="36" y="84" fill="#0071E3" font-family="-apple-system, sans-serif" font-size="10" font-weight="700">TELEGRAM · KYIV</text>
    <text x="36" y="108" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="15" font-weight="700">Aesthetica Clinic</text>
    <text x="36" y="132" fill="#86868B" font-family="-apple-system, sans-serif" font-size="12">$3,400 · Dental Suite</text>
    <rect x="20" y="192" width="216" height="118" rx="18" fill="#F5F5F7"/>
    <text x="36" y="218" fill="#059669" font-family="-apple-system, sans-serif" font-size="10" font-weight="700">WHATSAPP · TEL AVIV</text>
    <text x="36" y="242" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="15" font-weight="700">Shaked Realty</text>
    <text x="36" y="266" fill="#86868B" font-family="-apple-system, sans-serif" font-size="12">₪14,500 · VIP Lead</text>
  </g>

  <g transform="translate(352, 130)" filter="url(#crmShadow)">
    <rect x="0" y="0" width="256" height="364" rx="24" fill="#FFFFFF" stroke="#E5E5EA"/>
    <text x="24" y="38" fill="#86868B" font-family="-apple-system, sans-serif" font-size="11" font-weight="700">BOOKED &amp; QUALIFIED · 11</text>
    <rect x="20" y="58" width="216" height="134" rx="18" fill="#F5F5F7" stroke="#0071E3" stroke-width="1.5"/>
    <text x="36" y="84" fill="#0071E3" font-family="-apple-system, sans-serif" font-size="10" font-weight="700">AUTO-SCHEDULED</text>
    <text x="36" y="108" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="15" font-weight="700">Karpaty Logistics</text>
    <text x="36" y="132" fill="#86868B" font-family="-apple-system, sans-serif" font-size="12">₴142,000 · Lviv Fleet</text>
    <rect x="36" y="148" width="144" height="26" rx="13" fill="#0071E3"/>
    <text x="54" y="165" fill="#FFFFFF" font-family="-apple-system, sans-serif" font-size="10" font-weight="700">Call Today · 14:00</text>
  </g>

  <g transform="translate(632, 130)" filter="url(#crmShadow)">
    <rect x="0" y="0" width="256" height="364" rx="24" fill="#1D1D1F"/>
    <text x="24" y="38" fill="#15BCDF" font-family="-apple-system, sans-serif" font-size="11" font-weight="700">CLOSED &amp; PAID · 42</text>
    <rect x="20" y="58" width="216" height="134" rx="18" fill="#2C2C2E"/>
    <text x="36" y="84" fill="#34D399" font-family="-apple-system, sans-serif" font-size="10" font-weight="700">✓ PAYMENT VERIFIED</text>
    <text x="36" y="110" fill="#FFFFFF" font-family="-apple-system, sans-serif" font-size="16" font-weight="700">NovaDent Studio</text>
    <text x="36" y="134" fill="#15BCDF" font-family="-apple-system, sans-serif" font-size="14" font-weight="700">+$4,800 Paid</text>
    <rect x="36" y="150" width="164" height="26" rx="13" fill="#34D399" fill-opacity="0.18"/>
    <text x="52" y="167" fill="#34D399" font-family="-apple-system, sans-serif" font-size="10" font-weight="700">Client Portal Active</text>
  </g>
</svg>
`;

const PORTAL_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
  <defs>
    <linearGradient id="bgPortal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F5F7FA"/>
      <stop offset="100%" stop-color="#E6EEFA"/>
    </linearGradient>
    <filter id="portalShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#0071E3" flood-opacity="0.1"/>
    </filter>
  </defs>
  <rect width="960" height="540" fill="url(#bgPortal)"/>

  <!-- Apple Floating Dashboard Window -->
  <g transform="translate(72, 42)" filter="url(#portalShadow)">
    <rect x="0" y="0" width="816" height="456" rx="28" fill="#FFFFFF" stroke="#E5E5EA"/>
    <!-- Left Apple Sidebar -->
    <path d="M0 28 C0 12.5 12.5 0 28 0 L210 0 L210 456 L28 456 C12.5 456 0 443.5 0 428 Z" fill="#F5F5F7"/>
    <line x1="210" y1="0" x2="210" y2="456" stroke="#E5E5EA"/>
    <circle cx="42" cy="42" r="14" fill="#0071E3"/>
    <text x="66" y="47" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="13" font-weight="700">Client Area</text>

    <rect x="20" y="84" width="170" height="40" rx="14" fill="#0071E3"/>
    <text x="42" y="109" fill="#FFFFFF" font-family="-apple-system, sans-serif" font-size="12" font-weight="700">Products &amp; Notes</text>
    <rect x="20" y="134" width="170" height="40" rx="14" fill="#FFFFFF"/>
    <text x="42" y="159" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="12" font-weight="600">Project Roadmap</text>
    <rect x="20" y="184" width="170" height="40" rx="14" fill="#FFFFFF"/>
    <text x="42" y="209" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="12" font-weight="600">Document Vault</text>
    <rect x="20" y="234" width="170" height="40" rx="14" fill="#FFFFFF"/>
    <text x="42" y="259" fill="#0071E3" font-family="-apple-system, sans-serif" font-size="12" font-weight="700">Live Admin Chat</text>

    <!-- Main Content Cards -->
    <rect x="242" y="34" width="260" height="190" rx="22" fill="#F5F5F7"/>
    <text x="266" y="68" fill="#86868B" font-family="-apple-system, sans-serif" font-size="11" font-weight="700">SYSTEM PROGRESS</text>
    <circle cx="372" cy="138" r="50" fill="none" stroke="#E5E5EA" stroke-width="12"/>
    <circle cx="372" cy="138" r="50" fill="none" stroke="#0071E3" stroke-width="12" stroke-dasharray="275 330" stroke-linecap="round"/>
    <text x="348" y="146" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="22" font-weight="700">88%</text>

    <rect x="522" y="34" width="262" height="190" rx="22" fill="#1D1D1F"/>
    <text x="546" y="68" fill="#15BCDF" font-family="-apple-system, sans-serif" font-size="11" font-weight="700">CLIENT PRODUCT NOTES</text>
    <rect x="546" y="86" width="214" height="62" rx="14" fill="#2C2C2E"/>
    <text x="562" y="112" fill="#FFFFFF" font-family="-apple-system, sans-serif" font-size="12" font-weight="600">"Add Saturday hours 9-16"</text>
    <text x="562" y="132" fill="#34D399" font-family="-apple-system, sans-serif" font-size="10" font-weight="700">✓ Admin Notified Instantly</text>

    <rect x="242" y="244" width="542" height="178" rx="22" fill="#F5F5F7"/>
    <text x="266" y="278" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="14" font-weight="700">Live Project Milestones &amp; Direct Admin Chat</text>
    <rect x="266" y="298" width="494" height="44" rx="14" fill="#FFFFFF"/>
    <text x="286" y="325" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="12" font-weight="600">Phase 3: Online Booking &amp; WhatsApp Bot Connected</text>
    <text x="668" y="325" fill="#059669" font-family="-apple-system, sans-serif" font-size="11" font-weight="700">Completed</text>
    <rect x="266" y="354" width="494" height="44" rx="14" fill="#FFFFFF"/>
    <text x="286" y="381" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="12" font-weight="600">Phase 4: Final Quality Assurance &amp; Launch</text>
    <text x="668" y="381" fill="#0071E3" font-family="-apple-system, sans-serif" font-size="11" font-weight="700">In Progress</text>
  </g>
</svg>
`;

const AUTOMATION_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
  <defs>
    <linearGradient id="bgAuto" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F5F7FA"/>
      <stop offset="100%" stop-color="#E8F4F8"/>
    </linearGradient>
    <filter id="autoShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#0071E3" flood-opacity="0.1"/>
    </filter>
  </defs>
  <rect width="960" height="540" fill="url(#bgAuto)"/>

  <!-- Connecting Curve Lines -->
  <path d="M290 155 C380 155, 380 270, 480 270" fill="none" stroke="#0071E3" stroke-width="3" stroke-dasharray="6 6"/>
  <path d="M290 385 C380 385, 380 270, 480 270" fill="none" stroke="#10B981" stroke-width="3" stroke-dasharray="6 6"/>
  <path d="M480 270 L670 270" fill="none" stroke="#1D1D1F" stroke-width="3"/>

  <!-- Left Messenger Nodes -->
  <g transform="translate(76, 95)" filter="url(#autoShadow)">
    <rect x="0" y="0" width="220" height="120" rx="24" fill="#FFFFFF" stroke="#E5E5EA"/>
    <circle cx="42" cy="42" r="18" fill="#0071E3" fill-opacity="0.12"/>
    <text x="72" y="47" fill="#0071E3" font-family="-apple-system, sans-serif" font-size="13" font-weight="700">Telegram Bot</text>
    <text x="24" y="84" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="13" font-weight="600">Instant Booking &amp; Alerts</text>
  </g>

  <g transform="translate(76, 325)" filter="url(#autoShadow)">
    <rect x="0" y="0" width="220" height="120" rx="24" fill="#FFFFFF" stroke="#E5E5EA"/>
    <circle cx="42" cy="42" r="18" fill="#10B981" fill-opacity="0.14"/>
    <text x="72" y="47" fill="#059669" font-family="-apple-system, sans-serif" font-size="13" font-weight="700">WhatsApp API</text>
    <text x="24" y="84" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="13" font-weight="600">24h Visit Confirmation</text>
  </g>

  <!-- Center BryTech Engine Hub -->
  <g transform="translate(385, 185)" filter="url(#autoShadow)">
    <rect x="0" y="0" width="190" height="170" rx="32" fill="#1D1D1F"/>
    <text x="48" y="76" fill="#15BCDF" font-family="-apple-system, sans-serif" font-size="12" font-weight="700">BRYTECH HUB</text>
    <text x="36" y="106" fill="#FFFFFF" font-family="-apple-system, sans-serif" font-size="20" font-weight="700">Auto-Sync</text>
    <text x="48" y="132" fill="#86868B" font-family="-apple-system, sans-serif" font-size="11">0.2s Latency</text>
  </g>

  <!-- Right Result Card -->
  <g transform="translate(650, 155)" filter="url(#autoShadow)">
    <rect x="0" y="0" width="234" height="230" rx="26" fill="#FFFFFF" stroke="#E5E5EA"/>
    <rect x="24" y="28" width="124" height="26" rx="13" fill="#E8F8F0"/>
    <text x="40" y="45" fill="#059669" font-family="-apple-system, sans-serif" font-size="11" font-weight="700">-78% No-Shows</text>
    <text x="24" y="92" fill="#1D1D1F" font-family="-apple-system, sans-serif" font-size="17" font-weight="700">Zero Missed Leads</text>
    <text x="24" y="122" fill="#86868B" font-family="-apple-system, sans-serif" font-size="12">Every inquiry is logged,</text>
    <text x="24" y="142" fill="#86868B" font-family="-apple-system, sans-serif" font-size="12">confirmed &amp; reminded</text>
    <text x="24" y="162" fill="#86868B" font-family="-apple-system, sans-serif" font-size="12">automatically 24/7.</text>
  </g>
</svg>
`;

const CASE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 400" width="960" height="400">
  <defs>
    <linearGradient id="bgCase" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F5F7FA"/>
      <stop offset="100%" stop-color="#E4EEFA"/>
    </linearGradient>
  </defs>
  <rect width="960" height="400" fill="url(#bgCase)"/>
  <circle cx="820" cy="80" r="180" fill="#0071E3" fill-opacity="0.08"/>
  <circle cx="160" cy="320" r="140" fill="#15BCDF" fill-opacity="0.09"/>
</svg>
`;

export const PRODUCT_ARTWORK_IMAGES: Record<ProductVisualId, string> = {
  websites: svgToDataUri(WEBSITES_SVG),
  crm: svgToDataUri(CRM_SVG),
  portal: svgToDataUri(PORTAL_SVG),
  automation: svgToDataUri(AUTOMATION_SVG),
  corridor: svgToDataUri(WEBSITES_SVG),
  'clinic-case': svgToDataUri(CASE_SVG),
  'telaviv-case': svgToDataUri(CASE_SVG),
  'lviv-case': svgToDataUri(CASE_SVG),
  'haifa-case': svgToDataUri(CASE_SVG),
};
