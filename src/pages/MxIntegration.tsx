const function MxIntegration() {
    return (
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MX Integration Technical Guide: Next.js + Lambda + Postgres</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8f9fa; /* Warm neutral background */
            color: #1f2937;
        }

        .code-font {
            font-family: 'Fira Code', monospace;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }

        /* Chart Container Strict Styling */
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            height: 300px;
            max-height: 400px;
        }
        @media (min-width: 768px) {
            .chart-container {
                height: 350px;
            }
        }

        /* Interactive Node Styling */
        .node-box {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .node-box:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border-color: #3b82f6;
        }
        .node-active {
            border-color: #2563eb;
            background-color: #eff6ff;
            box-shadow: 0 0 0 2px #bfdbfe;
        }

        /* Timeline Connector */
        .timeline-line::before {
            content: '';
            position: absolute;
            left: 1rem;
            top: 2rem;
            bottom: -2rem;
            width: 2px;
            background-color: #e2e8f0;
            z-index: 0;
        }
        .timeline-item:last-child .timeline-line::before {
            display: none;
        }

        /* Tab Transitions */
        .tab-content {
            display: none;
            animation: fadeIn 0.3s ease-in-out;
        }
        .tab-content.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
    <!-- Chosen Palette: "Fintech Neutral" - Warm gray background (#f8f9fa), Slate text (#1f2937), Professional Blue Accents (#2563eb) -->
    <!-- Application Structure Plan: Dashboard-style layout with a sticky sidebar for navigation. 
         1. "Architecture Overview": Interactive diagram of the Data Model (User -> Member -> Account).
         2. "Integration Flow": Vertical step-by-step timeline (Next.js/Lambda context) with toggleable code snippets.
         3. "Data Strategy Center": Interactive calculators for Rate Limits and Caching decisions using Chart.js.
         4. "Security & Ops": Checklist and Tooling recommendations.
         Reasoning: The user is an engineer needing technical specs. A linear text doc is boring; an interactive dashboard allows them to simulate load, copy code, and visualize the architecture. -->
    <!-- Visualization & Content Choices:
         - Data Model: Flexbox-based interactive nodes. Goal: Visualize relationships. Interaction: Click to reveal TS interfaces.
         - Rate Limiting: Line Chart (Chart.js). Goal: Visualize exponential backoff. Interaction: Slider to change retry count.
         - Caching: Decision Tree (Interactive Buttons). Goal: Determine when to cache.
         - Telemetry: Card grid. Goal: Quick tool selection.
         - CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
</head>
<body class="flex flex-col md:flex-row min-h-screen">

    <!-- Mobile Nav Toggle -->
    <div class="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-50">
        <span class="font-bold text-lg text-slate-800">MX Integration Hub</span>
        <button id="mobile-menu-btn" class="text-slate-600 focus:outline-none px-3 py-2 border rounded">
            Menu
        </button>
    </div>

    <!-- Sidebar Navigation -->
    <nav id="sidebar" class="hidden md:flex flex-col w-full md:w-64 bg-white border-r border-gray-200 h-auto md:h-screen sticky top-0 z-40 overflow-y-auto">
        <div class="p-6 border-b border-gray-100">
            <h1 class="font-bold text-xl text-slate-900 tracking-tight">MX Tech Spec</h1>
            <p class="text-xs text-slate-500 mt-1">Next.js • Lambda • Postgres</p>
        </div>
        <div class="flex-1 py-4">
            <ul class="space-y-1">
                <li><button onclick="navTo('overview')" class="w-full text-left px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors border-l-4 border-transparent active-nav" data-target="overview">Overview & Data Model</button></li>
                <li><button onclick="navTo('integration')" class="w-full text-left px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors border-l-4 border-transparent" data-target="integration">Integration Lifecycle</button></li>
                <li><button onclick="navTo('performance')" class="w-full text-left px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors border-l-4 border-transparent" data-target="performance">Performance & Caching</button></li>
                <li><button onclick="navTo('security')" class="w-full text-left px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors border-l-4 border-transparent" data-target="security">Security & Ops</button></li>
            </ul>
        </div>
        <div class="p-6 border-t border-gray-100 bg-slate-50">
            <p class="text-xs text-slate-400">Generated for Lead Integration Engineer</p>
        </div>
    </nav>

    <!-- Main Content Area -->
    <main class="flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden">
        
        <!-- SECTION: OVERVIEW & DATA MODEL -->
        <section id="overview" class="mb-16">
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-slate-900 mb-4">MX Platform Architecture</h2>
                <p class="text-slate-600 leading-relaxed max-w-3xl">
                    Welcome to the integration command center. As the lead engineer, your primary goal is to map the MX data universe to our <strong>Postgres</strong> schema using <strong>Next.js</strong> API routes for orchestration and <strong>Lambda</strong> for asynchronous processing (webhooks).
                    <br><br>
                    Below is the interactive Entity Relationship Model. <strong>Click any node</strong> to view the TypeScript Interface and Postgres schema recommendations.
                </p>
            </div>

            <!-- Interactive Architecture Diagram -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                <div class="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 relative">
                    <!-- Connector Line (Desktop) -->
                    <div class="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>

                    <!-- Nodes -->
                    <div class="node-box relative z-10 w-full md:w-48 bg-white border-2 border-slate-200 rounded-lg p-4 text-center node-active" onclick="showModelDetails('user')">
                        <div class="text-2xl mb-2">👤</div>
                        <h3 class="font-bold text-slate-800">MX User</h3>
                        <p class="text-xs text-slate-500 mt-1">Root Entity</p>
                    </div>

                    <div class="node-box relative z-10 w-full md:w-48 bg-white border-2 border-slate-200 rounded-lg p-4 text-center" onclick="showModelDetails('member')">
                        <div class="text-2xl mb-2">🏦</div>
                        <h3 class="font-bold text-slate-800">Member</h3>
                        <p class="text-xs text-slate-500 mt-1">Bank Connection</p>
                    </div>

                    <div class="node-box relative z-10 w-full md:w-48 bg-white border-2 border-slate-200 rounded-lg p-4 text-center" onclick="showModelDetails('account')">
                        <div class="text-2xl mb-2">💳</div>
                        <h3 class="font-bold text-slate-800">Account</h3>
                        <p class="text-xs text-slate-500 mt-1">Checking, Savings, Loan</p>
                    </div>

                    <div class="node-box relative z-10 w-full md:w-48 bg-white border-2 border-slate-200 rounded-lg p-4 text-center" onclick="showModelDetails('transaction')">
                        <div class="text-2xl mb-2">🧾</div>
                        <h3 class="font-bold text-slate-800">Transaction</h3>
                        <p class="text-xs text-slate-500 mt-1">Line Items</p>
                    </div>
                </div>

                <!-- Dynamic Details Pane -->
                <div class="bg-slate-900 rounded-lg p-6 overflow-hidden transition-all">
                    <div class="flex justify-between items-center mb-4">
                        <h4 id="model-title" class="text-blue-400 font-bold font-mono text-lg">MX User Entity</h4>
                        <span class="text-xs text-slate-400 uppercase tracking-wider">TypeScript Interface</span>
                    </div>
                    <pre id="model-code" class="code-font text-sm text-slate-300 overflow-x-auto">
// Represents a distinct end-user in the MX platform.
// Store 'guid' in your Postgres 'users' table.

interface MXUser {
  guid: string;           // Primary Key (MX side)
  id: string;             // Your internal DB ID (metadata)
  email?: string;
  is_disabled: boolean;
  metadata?: string;      // JSON string for internal refs
}
                    </pre>
                    <div class="mt-4 pt-4 border-t border-slate-700">
                        <p id="model-desc" class="text-sm text-slate-400">
                            <strong>Postgres Strategy:</strong> Create a `mx_user_guid` column on your `users` table. Index this column heavily as it is the foreign key for all API lookups.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION: INTEGRATION LIFECYCLE -->
        <section id="integration" class="hidden-section mb-16">
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-slate-900 mb-4">Integration Lifecycle</h2>
                <p class="text-slate-600 leading-relaxed">
                    A typical Next.js integration involves a frontend widget and backend API proxying. Never call MX APIs directly from the browser (CORS/Security). Use <strong>Lambda</strong> for webhook processing to handle data spikes independently of your web server.
                </p>
            </div>

            <div class="relative pl-2 md:pl-0">
                <!-- Step 1 -->
                <div class="timeline-item flex gap-6 mb-12">
                    <div class="timeline-line relative flex flex-col items-center">
                        <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold z-10">1</div>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-slate-800 mb-2">User Creation & Widget URL</h3>
                        <p class="text-sm text-slate-600 mb-4">
                            Before opening the widget, create the user on MX (idempotent check) and request a widget URL.
                        </p>
                        <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
                            <div class="flex border-b border-slate-100 bg-slate-50">
                                <button class="px-4 py-2 text-xs font-medium text-blue-600 border-b-2 border-blue-600">Next.js API Route</button>
                            </div>
                            <div class="p-4 bg-slate-900 overflow-x-auto">
                                <pre class="code-font text-xs text-slate-300">
// pages/api/mx/widget.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { mxClient } from '@/lib/mx'; // Wrapper around axios

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { internalUserId } = req.session; 

  // 1. Get or Create MX User
  // Recommended: Store mx_guid in DB to avoid this call
  const { data: user } = await mxClient.post('/users', {
    user: { id: internalUserId, metadata: JSON.stringify({ source: 'nextjs' }) }
  });

  // 2. Request Widget URL
  const { data: widget } = await mxClient.post(`/users/${user.guid}/widget_urls`, {
    widget_url: { 
      widget_type: 'connect_widget',
      is_mobile_webview: false,
      ui_message_version: 4
    }
  });

  res.status(200).json({ url: widget.widget_url.url });
}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="timeline-item flex gap-6 mb-12">
                    <div class="timeline-line relative flex flex-col items-center">
                        <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold z-10">2</div>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-slate-800 mb-2">Frontend Widget Implementation</h3>
                        <p class="text-sm text-slate-600 mb-4">
                            Embed the MX Connect Widget. Listen for postMessages to know when connection is complete.
                        </p>
                        <div class="bg-white rounded-lg border border-slate-200 p-4">
                            <p class="text-sm font-semibold text-slate-700 mb-2">Key Events to Listen For:</p>
                            <ul class="list-disc list-inside text-sm text-slate-600 space-y-1 mb-4">
                                <li><code class="bg-slate-100 px-1 rounded">mx/connect/memberConnected</code> - Success!</li>
                                <li><code class="bg-slate-100 px-1 rounded">mx/connect/error</code> - User closed or failed.</li>
                            </ul>
                            <div class="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                                <strong>Tip:</strong> Do not rely solely on the frontend event for data syncing. Use Webhooks (Step 3) for reliability.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="timeline-item flex gap-6">
                    <div class="timeline-line relative flex flex-col items-center">
                        <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold z-10">3</div>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-slate-800 mb-2">Lambda Webhook Processing</h3>
                        <p class="text-sm text-slate-600 mb-4">
                            Offload data aggregation to AWS Lambda. When MX finishes aggregating, they send a webhook.
                        </p>
                        <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
                            <div class="flex border-b border-slate-100 bg-slate-50">
                                <button class="px-4 py-2 text-xs font-medium text-blue-600 border-b-2 border-blue-600">AWS Lambda (Node.js)</button>
                            </div>
                            <div class="p-4 bg-slate-900 overflow-x-auto">
                                <pre class="code-font text-xs text-slate-300">
// lambda/mx-webhook.ts
export const handler = async (event: APIGatewayEvent) => {
  const body = JSON.parse(event.body);
  const { type, member_guid, user_guid } = body.webhook;

  // IMPORTANT: Verify Basic Auth Header from MX to ensure security

  if (type === 'MEMBER_AGGREGATION_COMPLETED') {
    // 1. Fetch latest data from MX API
    const accounts = await fetchAccounts(user_guid, member_guid);
    
    // 2. Batch Insert/Upsert into Postgres
    // Using Prisma or pg-promise
    await db.transaction(async (tx) => {
        await upsertAccounts(tx, accounts);
    });
    
    console.log(`Synced member ${member_guid}`);
  }

  return { statusCode: 200, body: 'OK' };
};
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION: PERFORMANCE & CACHING -->
        <section id="performance" class="hidden-section mb-16">
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-slate-900 mb-4">Data Strategy & Performance</h2>
                <p class="text-slate-600 leading-relaxed max-w-4xl">
                    Handling bank data requires respecting <strong>Rate Limits</strong> and implementing aggressive <strong>Caching</strong>. MX rate limits are strict. Hitting them causes 429 errors.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Rate Limit Simulator -->
                <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 class="text-lg font-bold text-slate-800 mb-4">Exponential Backoff Visualizer</h3>
                    <p class="text-sm text-slate-500 mb-4">
                        If you hit a 429, wait. Do not retry immediately. Recommended formula: <code class="bg-slate-100 px-1">delay = min(cap, base * 2^attempt)</code>.
                    </p>
                    
                    <div class="flex items-center gap-4 mb-4">
                        <label class="text-sm font-medium text-slate-700">Base Delay (ms):</label>
                        <input type="number" id="baseDelay" value="500" class="border rounded px-2 py-1 w-24 text-sm" onchange="updateChart()">
                    </div>

                    <div class="chart-container">
                        <canvas id="backoffChart"></canvas>
                    </div>
                </div>

                <!-- Caching Strategy -->
                <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 class="text-lg font-bold text-slate-800 mb-4">Caching & Batching Guidelines</h3>
                    
                    <div class="space-y-4">
                        <div class="border border-l-4 border-l-green-500 border-slate-200 rounded p-4 bg-green-50">
                            <h4 class="font-bold text-green-800 text-sm">✅ Cache 'Accounts' & 'Institution' Data</h4>
                            <p class="text-xs text-green-700 mt-1">
                                Metadata (names, routing numbers, institution details) rarely changes. Cache in Postgres and refresh only on user login or webhook updates.
                            </p>
                        </div>

                        <div class="border border-l-4 border-l-yellow-500 border-slate-200 rounded p-4 bg-yellow-50">
                            <h4 class="font-bold text-yellow-800 text-sm">⚠️ Transaction Batching</h4>
                            <p class="text-xs text-yellow-700 mt-1">
                                Don't sync transactions in real-time on every page load.
                                <br>1. Sync on Login (Lambda).
                                <br>2. Sync on Webhook (Lambda).
                                <br>3. UI reads from Postgres (Fast).
                            </p>
                        </div>

                        <div class="border border-l-4 border-l-blue-500 border-slate-200 rounded p-4 bg-blue-50">
                            <h4 class="font-bold text-blue-800 text-sm">ℹ️ Batch API Requests</h4>
                            <p class="text-xs text-blue-700 mt-1">
                                When fetching data for analytics, do not loop through users. Use Lambda to process queues of users slowly to avoid spiking API usage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION: SECURITY & OPS -->
        <section id="security" class="hidden-section mb-16">
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-slate-900 mb-4">Security & Operations</h2>
                <p class="text-slate-600 leading-relaxed">
                    Financial data requires SOC2-level compliance. Ensure your integration adheres to these non-negotiables.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <!-- Security Checklist -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        🛡️ Security Checklist
                        <span id="security-score" class="ml-auto text-sm font-normal bg-slate-100 px-2 py-1 rounded">0/4 Checked</span>
                    </h3>
                    <div class="space-y-3">
                        <label class="flex items-start gap-3 p-3 rounded hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100 transition-colors">
                            <input type="checkbox" class="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500" onchange="updateSecurityScore()">
                            <div>
                                <span class="block font-medium text-slate-700">Never Expose API Keys</span>
                                <span class="text-xs text-slate-500">API Credentials must reside in Lambda Env Vars or Next.js Server Side. Never in client bundles.</span>
                            </div>
                        </label>
                        <label class="flex items-start gap-3 p-3 rounded hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100 transition-colors">
                            <input type="checkbox" class="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500" onchange="updateSecurityScore()">
                            <div>
                                <span class="block font-medium text-slate-700">Webhook Verification</span>
                                <span class="text-xs text-slate-500">Validate the Basic Auth header on incoming webhooks to prevent spoofing.</span>
                            </div>
                        </label>
                        <label class="flex items-start gap-3 p-3 rounded hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100 transition-colors">
                            <input type="checkbox" class="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500" onchange="updateSecurityScore()">
                            <div>
                                <span class="block font-medium text-slate-700">Least Privilege Database Access</span>
                                <span class="text-xs text-slate-500">Lambda functions should only have INSERT/UPDATE rights to the specific tables they need.</span>
                            </div>
                        </label>
                        <label class="flex items-start gap-3 p-3 rounded hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100 transition-colors">
                            <input type="checkbox" class="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500" onchange="updateSecurityScore()">
                            <div>
                                <span class="block font-medium text-slate-700">Data Sanitization</span>
                                <span class="text-xs text-slate-500">Sanitize all inputs from MX before writing to Postgres to prevent NoSQL/SQL injection via metadata.</span>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Telemetry Tools -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-bold text-slate-800 mb-4">Recommended Tooling</h3>
                    <p class="text-sm text-slate-600 mb-6">
                        You need to trace a request from the User -> Next.js -> Lambda -> MX and back.
                    </p>
                    
                    <div class="grid grid-cols-1 gap-4">
                        <div class="flex items-center gap-4 p-3 border border-slate-100 rounded bg-slate-50">
                            <div class="bg-purple-100 text-purple-600 p-2 rounded">📊</div>
                            <div>
                                <h4 class="font-bold text-sm text-slate-800">Datadog / New Relic</h4>
                                <p class="text-xs text-slate-500">Essential for correlating Lambda logs with API Gateway requests.</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 p-3 border border-slate-100 rounded bg-slate-50">
                            <div class="bg-orange-100 text-orange-600 p-2 rounded">🔍</div>
                            <div>
                                <h4 class="font-bold text-sm text-slate-800">AWS X-Ray</h4>
                                <p class="text-xs text-slate-500">Trace the full lifecycle of a webhook execution through your serverless stack.</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 p-3 border border-slate-100 rounded bg-slate-50">
                            <div class="bg-blue-100 text-blue-600 p-2 rounded">📝</div>
                            <div>
                                <h4 class="font-bold text-sm text-slate-800">Sentry</h4>
                                <p class="text-xs text-slate-500">Capture unhandled exceptions in the Widget (React) or Lambda failures.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <script>
        // State and Data
        const modelData = {
            user: {
                title: 'MX User Entity',
                desc: 'Postgres Strategy: Create a `mx_user_guid` column on your `users` table. Index this column heavily as it is the foreign key for all API lookups.',
                code: `// Represents a distinct end-user in the MX platform.
// Store 'guid' in your Postgres 'users' table.

interface MXUser {
  guid: string;           // Primary Key (MX side)
  id: string;             // Your internal DB ID (metadata)
  email?: string;
  is_disabled: boolean;
  metadata?: string;      // JSON string for internal refs
}`
            },
            member: {
                title: 'Member (Connection)',
                desc: 'Represents a connection to a specific institution (e.g., Chase, Wells Fargo). A User can have multiple Members. Handle `connection_status` carefully.',
                code: `interface MXMember {
  guid: string;
  user_guid: string;
  institution_code: string;
  connection_status: 'CONNECTED' | 'CHALLENGED' | 'FAILED';
  is_managed_by_user: boolean;
  successfully_aggregated_at: string;
}`
            },
            account: {
                title: 'Account',
                desc: 'Specific financial accounts under a Member. Cache the `available_balance` and `current_balance` but be aware they change often.',
                code: `interface MXAccount {
  guid: string;
  member_guid: string;
  user_guid: string;
  account_number: string; // Last 4 digits usually
  routing_number?: string;
  available_balance: number;
  currency_code: string;
  type: 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD';
}`
            },
            transaction: {
                title: 'Transaction',
                desc: 'The heaviest data object. Use pagination when fetching. Store with a composite key of `guid` and `account_guid` in Postgres.',
                code: `interface MXTransaction {
  guid: string;
  account_guid: string;
  amount: number;
  date: string; // YYYY-MM-DD
  description: string;
  category: string;
  is_bill_pay: boolean;
  status: 'POSTED' | 'PENDING';
}`
            }
        };

        let backoffChartInstance = null;

        // Navigation Logic
        function navTo(sectionId) {
            // Hide all sections
            document.querySelectorAll('main > section').forEach(sec => {
                sec.style.display = 'none';
            });
            // Show target
            document.getElementById(sectionId).style.display = 'block';
            
            // Update Sidebar UI
            document.querySelectorAll('#sidebar button').forEach(btn => {
                btn.classList.remove('active-nav', 'border-blue-600', 'bg-slate-50', 'text-blue-600');
                btn.classList.add('border-transparent', 'text-slate-600');
            });
            const activeBtn = document.querySelector(`button[data-target="${sectionId}"]`);
            activeBtn.classList.remove('border-transparent', 'text-slate-600');
            activeBtn.classList.add('active-nav', 'border-blue-600', 'bg-slate-50', 'text-blue-600');

            // Scroll to top
            window.scrollTo(0,0);

            // Init charts if needed
            if(sectionId === 'performance' && !backoffChartInstance) {
                initChart();
            }
        }

        // Data Model Interaction
        function showModelDetails(key) {
            const data = modelData[key];
            document.getElementById('model-title').innerText = data.title;
            document.getElementById('model-desc').innerHTML = `<strong>Postgres Strategy:</strong> ${data.desc}`;
            document.getElementById('model-code').innerText = data.code;

            // Update visual state
            document.querySelectorAll('.node-box').forEach(box => {
                box.classList.remove('node-active');
            });
            // Finding the clicked box (simple traversal for demo)
            event.currentTarget.classList.add('node-active');
        }

        // Security Score Logic
        function updateSecurityScore() {
            const checkboxes = document.querySelectorAll('#security input[type="checkbox"]');
            const checked = Array.from(checkboxes).filter(c => c.checked).length;
            const total = checkboxes.length;
            const label = document.getElementById('security-score');
            label.innerText = `${checked}/${total} Checked`;
            
            if(checked === total) {
                label.classList.remove('bg-slate-100');
                label.classList.add('bg-green-100', 'text-green-800');
            } else {
                label.classList.remove('bg-green-100', 'text-green-800');
                label.classList.add('bg-slate-100');
            }
        }

        // Chart.js Implementation
        function initChart() {
            const ctx = document.getElementById('backoffChart').getContext('2d');
            
            backoffChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Attempt 1', 'Attempt 2', 'Attempt 3', 'Attempt 4', 'Attempt 5'],
                    datasets: [{
                        label: 'Delay Time (ms)',
                        data: calculateBackoffData(500),
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Wait Time (ms)'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `Wait: ${context.raw}ms`;
                                }
                            }
                        }
                    }
                }
            });
        }

        function calculateBackoffData(base) {
            // Formula: base * 2^index
            return [0, 1, 2, 3, 4].map(i => base * Math.pow(2, i));
        }

        function updateChart() {
            if(!backoffChartInstance) return;
            const base = document.getElementById('baseDelay').value || 500;
            backoffChartInstance.data.datasets[0].data = calculateBackoffData(base);
            backoffChartInstance.update();
        }

        // Mobile Menu
        document.getElementById('mobile-menu-btn').addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('absolute');
            sidebar.classList.toggle('z-50');
            sidebar.classList.toggle('h-screen');
        });

        // Initialize view
        document.addEventListener('DOMContentLoaded', () => {
            // Initial render styling for visible section
            document.querySelectorAll('main > section').forEach(sec => {
                if(sec.id !== 'overview') sec.style.display = 'none';
            });
        });

    </script>
</body>
</html>

    )
}