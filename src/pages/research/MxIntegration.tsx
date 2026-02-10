import { useMemo, useState, type ChangeEvent } from "react";

type SectionKey = "overview" | "integration" | "performance" | "security";
type ModelKey = "user" | "member" | "account" | "transaction";

const modelData: Record<
    ModelKey,
    { title: string; desc: string; code: string; blurb: string }
> = {
    user: {
        title: "MX User Entity",
        desc: "Create a mx_user_guid column on your users table. Index this column as the foreign key for API lookups.",
        blurb: "Root Entity",
        code: `// Represents a distinct end-user in the MX platform.
// Store 'guid' in your Postgres 'users' table.

interface MXUser {
    guid: string;           // Primary Key (MX side)
    id: string;             // Your internal DB ID (metadata)
    email?: string;
    is_disabled: boolean;
    metadata?: string;      // JSON string for internal refs
}`,
    },
    member: {
        title: "Member (Connection)",
        desc: "Represents a connection to a specific institution. A User can have multiple Members; handle connection_status carefully.",
        blurb: "Bank Connection",
        code: `interface MXMember {
    guid: string;
    user_guid: string;
    institution_code: string;
    connection_status: 'CONNECTED' | 'CHALLENGED' | 'FAILED';
    is_managed_by_user: boolean;
    successfully_aggregated_at: string;
}`,
    },
    account: {
        title: "Account",
        desc: "Specific financial accounts under a Member. Cache available_balance and current_balance with care.",
        blurb: "Checking, Savings, Loan",
        code: `interface MXAccount {
    guid: string;
    member_guid: string;
    user_guid: string;
    account_number: string; // Last 4 digits usually
    routing_number?: string;
    available_balance: number;
    currency_code: string;
    type: 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD';
}`,
    },
    transaction: {
        title: "Transaction",
        desc: "The heaviest data object. Use pagination; store with a composite key of guid and account_guid.",
        blurb: "Line Items",
        code: `interface MXTransaction {
    guid: string;
    account_guid: string;
    amount: number;
    date: string; // YYYY-MM-DD
    description: string;
    category: string;
    is_bill_pay: boolean;
    status: 'POSTED' | 'PENDING';
}`,
    },
};

const sections: { key: SectionKey; label: string; sublabel: string }[] = [
    { key: "overview", label: "Overview & Data Model", sublabel: "Architecture" },
    { key: "integration", label: "Integration Lifecycle", sublabel: "Next.js + Lambda" },
    { key: "performance", label: "Performance & Caching", sublabel: "Rate limits" },
    { key: "security", label: "Security & Ops", sublabel: "Compliance" },
];

const securityItems = [
    {
        title: "Never Expose API Keys",
        body: "API credentials must reside in Lambda env vars or server-side code; never in client bundles.",
    },
    {
        title: "Webhook Verification",
        body: "Validate Basic Auth headers on incoming webhooks to prevent spoofing.",
    },
    {
        title: "Least Privilege DB Access",
        body: "Lambda functions should only have INSERT/UPDATE on the tables they need.",
    },
    {
        title: "Data Sanitization",
        body: "Sanitize all inputs from MX before writing to Postgres to prevent injection via metadata.",
    },
];

const calculateBackoffData = (base: number) => [0, 1, 2, 3, 4].map((i) => base * 2 ** i);

export function MxIntegration() {
    const [activeSection, setActiveSection] = useState<SectionKey>("overview");
    const [activeModel, setActiveModel] = useState<ModelKey>("user");
    const [baseDelay, setBaseDelay] = useState<number>(500);
    const [securityChecks, setSecurityChecks] = useState<boolean[]>(
        securityItems.map(() => false)
    );
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const backoffData = useMemo(() => calculateBackoffData(baseDelay), [baseDelay]);
    const maxBackoff = Math.max(...backoffData, 1);
    const checkedCount = securityChecks.filter(Boolean).length;

    const onBaseDelayChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setBaseDelay(Number.isFinite(value) ? value : 0);
    };

    const toggleSecurity = (index: number) => {
        setSecurityChecks((prev) =>
            prev.map((item, idx) => (idx === index ? !item : item))
        );
    };

    return (
        <div
            className="min-h-screen bg-(--bg-1) text-(--text-1)"
            style={{ fontFamily: "var(--text-font)" }}
            data-theme="git"
        >
            <div className="md:hidden sticky top-0 z-50 flex items-center justify-between border-b border-(--border-1) bg-(--panel) px-4 py-3">
                <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-(--text-2)">
                        MX Tech Spec
                    </p>
                    <p className="text-base font-semibold">Integration Hub</p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsMobileNavOpen((prev) => !prev)}
                    className="rounded border border-(--border-1) px-3 py-2 text-sm text-(--text-2) hover:bg-(--hover-1)"
                    aria-expanded={isMobileNavOpen}
                    aria-controls="mx-sidebar"
                >
                    Menu
                </button>
            </div>

            <div className="flex min-h-screen flex-col md:flex-row">
                <nav
                    id="mx-sidebar"
                    className={`${isMobileNavOpen ? "block" : "hidden"} md:block w-full md:w-72 border-r border-(--border-1) bg-(--panel) md:sticky md:top-0 md:h-screen`}
                >
                    <div className="border-b border-(--border-1) px-6 py-6">
                        <h1 className="text-xl font-semibold tracking-tight">MX Integration Spec</h1>
                        <p className="mt-2 text-xs text-(--text-2)">
                            Next.js + Lambda + Postgres
                        </p>
                    </div>
                    <ul className="space-y-2 px-4 py-6">
                        {sections.map((section) => {
                            const isActive = activeSection === section.key;
                            return (
                                <li key={section.key}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveSection(section.key);
                                            setIsMobileNavOpen(false);
                                        }}
                                        className={`w-full border-l-4 px-4 py-3 text-left text-sm transition-colors ${
                                            isActive
                                                ? "border-(--item-1) bg-(--hover-1) text-(--text-1)"
                                                : "border-transparent text-(--text-2) hover:bg-(--hover-1)"
                                        }`}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        <div className="text-xs uppercase tracking-[0.2em] text-(--text-2)">
                                            {section.sublabel}
                                        </div>
                                        <div className="mt-1 font-medium">{section.label}</div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="border-t border-(--border-1) px-6 py-4 text-xs text-(--text-2)">
                        Built for integration leads
                    </div>
                </nav>

                <main className="flex-1 px-4 py-10 md:px-10 lg:px-14">
                    {activeSection === "overview" && (
                        <section className="space-y-8">
                            <header className="max-w-4xl space-y-3">
                                <p className="text-xs uppercase tracking-[0.3em] text-(--text-2)">
                                    Architecture Overview
                                </p>
                                <h2 className="text-3xl font-semibold">MX Platform Architecture</h2>
                                <p className="text-sm text-(--text-2)">
                                    Map the MX data universe to your Postgres schema using Next.js
                                    API routes for orchestration and Lambda for webhook processing.
                                    Click a node to view the TypeScript interface and storage
                                    guidance.
                                </p>
                            </header>

                            <div className="rounded-2xl border border-(--border-1) bg-(--panel) p-6 shadow-(--box-shadow-1)">
                                <div className="relative grid gap-4 md:grid-cols-4">
                                    {(
                                        ["user", "member", "account", "transaction"] as ModelKey[]
                                    ).map((key) => {
                                        const isActive = activeModel === key;
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setActiveModel(key)}
                                                className={`rounded-xl border-2 px-4 py-5 text-left transition-all ${
                                                    isActive
                                                        ? "border-(--item-1) bg-(--hover-1) shadow-(--box-shadow-1)"
                                                        : "border-(--border-1) hover:border-(--item-1)"
                                                }`}
                                            >
                                                <p className="text-xs uppercase tracking-[0.2em] text-(--text-2)">
                                                    {modelData[key].blurb}
                                                </p>
                                                <p className="mt-2 text-lg font-semibold">
                                                    {modelData[key].title}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 rounded-xl border border-(--border-1) bg-(--bg-3) p-6">
                                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                        <h3 className="text-lg font-semibold text-(--item-1)">
                                            {modelData[activeModel].title}
                                        </h3>
                                        <span className="text-xs uppercase tracking-[0.2em] text-(--text-2)">
                                            TypeScript Interface
                                        </span>
                                    </div>
                                    <pre className="mt-4 overflow-x-auto rounded-lg bg-(--bg-2) p-4 text-xs text-(--text-1)">
                                        {modelData[activeModel].code}
                                    </pre>
                                    <p className="mt-4 text-sm text-(--text-2)">
                                        <span className="font-semibold text-(--text-1)">
                                            Postgres Strategy:
                                        </span>{" "}
                                        {modelData[activeModel].desc}
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeSection === "integration" && (
                        <section className="space-y-10">
                            <header className="max-w-3xl space-y-3">
                                <p className="text-xs uppercase tracking-[0.3em] text-(--text-2)">
                                    Integration Lifecycle
                                </p>
                                <h2 className="text-3xl font-semibold">Next.js + Lambda Flow</h2>
                                <p className="text-sm text-(--text-2)">
                                    Keep MX calls server-side. Use Lambda for webhook processing to
                                    absorb data spikes and keep web nodes responsive.
                                </p>
                            </header>

                            <div className="space-y-8">
                                {[1, 2, 3].map((step) => (
                                    <div
                                        key={step}
                                        className="flex flex-col gap-4 rounded-2xl border border-(--border-1) bg-(--panel) p-6 shadow-(--box-shadow-1) md:flex-row"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--item-1) text-sm font-semibold text-(--text-1)">
                                            {step}
                                        </div>
                                        {step === 1 && (
                                            <div className="space-y-4">
                                                <h3 className="text-xl font-semibold">User Creation & Widget URL</h3>
                                                <p className="text-sm text-(--text-2)">
                                                    Create the user on MX (idempotent check) and request the
                                                    widget URL.
                                                </p>
                                                <div className="rounded-xl border border-(--border-1) bg-(--bg-3) p-4">
                                                    <p className="text-xs uppercase tracking-[0.2em] text-(--text-2)">
                                                        Next.js API Route
                                                    </p>
                                                    <pre className="mt-3 overflow-x-auto rounded-lg bg-(--bg-2) p-3 text-xs">
{`// pages/api/mx/widget.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { mxClient } from '@/lib/mx';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { internalUserId } = req.session;

    const { data: user } = await mxClient.post('/users', {
        user: { id: internalUserId, metadata: JSON.stringify({ source: 'nextjs' }) }
    });

    const { data: widget } = await mxClient.post(\`/users/\${user.guid}/widget_urls\`, {
        widget_url: {
            widget_type: 'connect_widget',
            is_mobile_webview: false,
            ui_message_version: 4
        }
    });

    res.status(200).json({ url: widget.widget_url.url });
}
`}
                                                    </pre>
                                                </div>
                                            </div>
                                        )}
                                        {step === 2 && (
                                            <div className="space-y-4">
                                                <h3 className="text-xl font-semibold">Frontend Widget Implementation</h3>
                                                <p className="text-sm text-(--text-2)">
                                                    Embed the MX Connect Widget. Listen for postMessage
                                                    events to detect completion.
                                                </p>
                                                <div className="rounded-xl border border-(--border-1) bg-(--bg-3) p-4 text-sm text-(--text-2)">
                                                    <p className="font-semibold text-(--text-1)">
                                                        Key events to monitor
                                                    </p>
                                                    <ul className="mt-2 list-disc space-y-1 pl-5">
                                                        <li>mx/connect/memberConnected</li>
                                                        <li>mx/connect/error</li>
                                                    </ul>
                                                    <p className="mt-3 text-xs text-(--text-2)">
                                                        Tip: Always rely on webhooks for reliable data sync.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {step === 3 && (
                                            <div className="space-y-4">
                                                <h3 className="text-xl font-semibold">Lambda Webhook Processing</h3>
                                                <p className="text-sm text-(--text-2)">
                                                    Process aggregation events asynchronously and upsert
                                                    into Postgres in batch transactions.
                                                </p>
                                                <div className="rounded-xl border border-(--border-1) bg-(--bg-3) p-4">
                                                    <p className="text-xs uppercase tracking-[0.2em] text-(--text-2)">
                                                        AWS Lambda (Node.js)
                                                    </p>
                                                    <pre className="mt-3 overflow-x-auto rounded-lg bg-(--bg-2) p-3 text-xs">
{`// lambda/mx-webhook.ts
export const handler = async (event: APIGatewayEvent) => {
    const body = JSON.parse(event.body);
    const { type, member_guid, user_guid } = body.webhook;

    if (type === 'MEMBER_AGGREGATION_COMPLETED') {
        const accounts = await fetchAccounts(user_guid, member_guid);

        await db.transaction(async (tx) => {
            await upsertAccounts(tx, accounts);
        });

        console.log(
            'Synced member ' + member_guid
        );
    }

    return { statusCode: 200, body: 'OK' };
};
`}
                                                    </pre>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeSection === "performance" && (
                        <section className="space-y-10">
                            <header className="max-w-3xl space-y-3">
                                <p className="text-xs uppercase tracking-[0.3em] text-(--text-2)">
                                    Data Strategy
                                </p>
                                <h2 className="text-3xl font-semibold">Performance & Caching</h2>
                                <p className="text-sm text-(--text-2)">
                                    Respect rate limits and cache aggressively. If you hit a 429,
                                    wait and retry using exponential backoff.
                                </p>
                            </header>

                            <div className="grid gap-8 lg:grid-cols-2">
                                <div className="rounded-2xl border border-(--border-1) bg-(--panel) p-6 shadow-(--box-shadow-1)">
                                    <h3 className="text-lg font-semibold">Exponential Backoff Visualizer</h3>
                                    <p className="mt-2 text-sm text-(--text-2)">
                                        Formula: delay = min(cap, base * 2^attempt)
                                    </p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <label className="text-xs uppercase tracking-[0.2em] text-(--text-2)">
                                            Base Delay (ms)
                                        </label>
                                        <input
                                            type="number"
                                            value={baseDelay}
                                            onChange={onBaseDelayChange}
                                            className="w-28 rounded border border-(--border-1) bg-(--bg-2) px-2 py-1 text-sm text-(--text-1)"
                                        />
                                    </div>
                                    <div className="mt-6 space-y-3">
                                        {backoffData.map((value, index) => (
                                            <div key={value + index} className="space-y-1">
                                                <div className="flex justify-between text-xs text-(--text-2)">
                                                    <span>Attempt {index + 1}</span>
                                                    <span>{value} ms</span>
                                                </div>
                                                <div className="h-2 w-full rounded-full bg-(--bg-2)">
                                                    <div
                                                        className="h-2 rounded-full bg-(--item-1)"
                                                        style={{ width: `${(value / maxBackoff) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-(--border-1) bg-(--panel) p-6 shadow-(--box-shadow-1)">
                                    <h3 className="text-lg font-semibold">Caching & Batching Guidelines</h3>
                                    <div className="mt-5 space-y-4 text-sm text-(--text-2)">
                                        <div className="rounded-xl border border-(--border-1) bg-(--bg-3) p-4">
                                            <p className="font-semibold text-(--text-1)">
                                                Cache accounts and institution data
                                            </p>
                                            <p className="mt-2">
                                                Metadata changes slowly. Refresh on login or webhook
                                                updates.
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-(--border-1) bg-(--bg-3) p-4">
                                            <p className="font-semibold text-(--text-1)">
                                                Transaction batching
                                            </p>
                                            <p className="mt-2">
                                                Sync on login, sync on webhook, and serve the UI from
                                                Postgres.
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-(--border-1) bg-(--bg-3) p-4">
                                            <p className="font-semibold text-(--text-1)">
                                                Batch API requests
                                            </p>
                                            <p className="mt-2">
                                                Use Lambda to process queues of users slowly instead of
                                                looping in the UI.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeSection === "security" && (
                        <section className="space-y-10">
                            <header className="max-w-3xl space-y-3">
                                <p className="text-xs uppercase tracking-[0.3em] text-(--text-2)">
                                    Security & Operations
                                </p>
                                <h2 className="text-3xl font-semibold">Secure the Pipeline</h2>
                                <p className="text-sm text-(--text-2)">
                                    Financial data requires strict controls. Track your readiness
                                    checklist below.
                                </p>
                            </header>

                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="rounded-2xl border border-(--border-1) bg-(--panel) p-6 shadow-(--box-shadow-1)">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">Security Checklist</h3>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs ${
                                                checkedCount === securityItems.length
                                                    ? "bg-(--item-1) text-(--text-1)"
                                                    : "bg-(--bg-2) text-(--text-2)"
                                            }`}
                                        >
                                            {checkedCount}/{securityItems.length} Checked
                                        </span>
                                    </div>
                                    <div className="mt-4 space-y-3">
                                        {securityItems.map((item, index) => (
                                            <label
                                                key={item.title}
                                                className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent bg-(--bg-3) p-3 transition hover:border-(--border-1)"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={securityChecks[index]}
                                                    onChange={() => toggleSecurity(index)}
                                                    className="mt-1 h-4 w-4"
                                                />
                                                <div>
                                                    <p className="text-sm font-semibold text-(--text-1)">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs text-(--text-2)">
                                                        {item.body}
                                                    </p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-(--border-1) bg-(--panel) p-6 shadow-(--box-shadow-1)">
                                    <h3 className="text-lg font-semibold">Recommended Tooling</h3>
                                    <p className="mt-2 text-sm text-(--text-2)">
                                        Trace requests from user to Next.js to Lambda and back with
                                        end-to-end observability.
                                    </p>
                                    <div className="mt-5 space-y-3">
                                        {[
                                            {
                                                title: "Datadog / New Relic",
                                                body: "Correlate Lambda logs with API Gateway requests.",
                                            },
                                            {
                                                title: "AWS X-Ray",
                                                body: "Trace the full lifecycle of a webhook execution.",
                                            },
                                            {
                                                title: "Sentry",
                                                body: "Capture widget errors and Lambda failures.",
                                            },
                                        ].map((tool) => (
                                            <div
                                                key={tool.title}
                                                className="rounded-xl border border-(--border-1) bg-(--bg-3) p-4"
                                            >
                                                <p className="text-sm font-semibold text-(--text-1)">
                                                    {tool.title}
                                                </p>
                                                <p className="text-xs text-(--text-2)">
                                                    {tool.body}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}