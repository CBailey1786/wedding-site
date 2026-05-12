import React, { useMemo, useState } from "react";

/** ---------- helpers ---------- */

const norm = (s) =>
  String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const fullNameKey = (first, last) => `${norm(first)}|${norm(last)}`;

function toTitle(s) {
  if (!s) return "";
  return String(s)
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

function countTruthy(rows, key) {
  return rows.reduce((acc, r) => acc + (r?.[key] === true ? 1 : 0), 0);
}

function countBy(rows, key) {
  const out = {};
  for (const r of rows) {
    const v = r?.[key];
    if (!v) continue;
    out[v] = (out[v] || 0) + 1;
  }
  return out;
}

function entriesSortedDesc(obj) {
  return Object.entries(obj).sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0));
}

function toProperCase(str) {
  if (!str) return "";
  return String(str)
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function downloadCsv(filename, rows) {
  const headers = Array.from(
    rows.reduce((set, r) => {
      Object.keys(r || {}).forEach((k) => set.add(k));
      return set;
    }, new Set())
  );

  const esc = (v) => {
    const s = v == null ? "" : String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => esc(r?.[h])).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** ---------- UI pieces ---------- */

function StatCard({ label, subheader, value, total, items, emptyLabel = "No data" }) {
  const max = items.length ? Math.max(...items.map(([, n]) => n)) : 0;

  return (
    <div className="adm-card">
      <div className="adm-cardLabel">{label}</div>
      {subheader ? <div className="adm-subheader">{subheader}</div> : null}
      <div className="adm-cardValue">
        {value} <span className="adm-cardSub">/ {total}</span>
      </div>

      {items.length === 0 ? (
        <div className="adm-muted">{emptyLabel}</div>
      ) : (
        <div className="adm-bars">
          {items.map(([label, n]) => {
            const pct = total ? Math.round((n / total) * 100) : 0;
            const w = max ? (n / max) * 100 : 0;

            return (
              <div className="adm-barRow" key={label}>
                <div className="adm-barLabel" title={label}>
                  {label}
                </div>
                <div className="adm-barTrack" aria-hidden="true">
                  <div className="adm-barFill" style={{ width: `${w}%` }} />
                </div>
                <div className="adm-barValue">
                  {n} <span className="adm-muted">({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BarList({ title, subheader, items, total, emptyLabel = "No data" }) {
  const max = items.length ? Math.max(...items.map(([, n]) => n)) : 0;

  return (
    <div className="adm-panel">
      <div className="adm-cardLabel">{title}</div>
      {subheader ? <div className="adm-subheader">{subheader}</div> : null}

      {items.length === 0 ? (
        <div className="adm-muted">{emptyLabel}</div>
      ) : (
        <div className="adm-bars">
          {items.map(([label, n]) => {
            const pct = total ? Math.round((n / total) * 100) : 0;
            const w = max ? (n / max) * 100 : 0;

            return (
              <div className="adm-barRow" key={label}>
                <div className="adm-barLabel" title={label}>
                  {toProperCase(label)}
                </div>
                <div className="adm-barTrack" aria-hidden="true">
                  <div className="adm-barFill" style={{ width: `${w}%` }} />
                </div>
                <div className="adm-barValue">
                  {n} <span className="adm-muted">({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DietaryDetailsPanel({ rows, defaultLimit = 5 }) {
  const [showAll, setShowAll] = useState(false);

  const limited = showAll ? rows : rows.slice(0, defaultLimit);
  const hasMore = rows.length > defaultLimit;

  return (
    <div className="adm-panel">
      <div className="adm-cardLabel">Dietary requirements (details)</div>
      <div className="adm-subheader">
        {rows.length} guest{rows.length === 1 ? "" : "s"} with requirements
      </div>

      {rows.length === 0 ? (
        <div className="adm-muted">No dietary requirements flagged</div>
      ) : (
        <>
          <div className="adm-tableWrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th style={{ width: "35%" }}>Guest</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {limited.map((r) => (
                  <tr key={r.key}>
                    <td>{r.name}</td>
                    <td>{r.details || <span className="adm-muted">No details provided</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hasMore ? (
            <div className="adm-tableActions">
              <button className="adm-btn" type="button" onClick={() => setShowAll((v) => !v)}>
                {showAll ? "Show less" : `See all (${rows.length})`}
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

function fmtDateTime(v) {
  if (!v) return "";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return String(v);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Top10TablePanel({ title, subheader, columns, rows, emptyLabel = "No data" }) {
  return (
    <div className="adm-panel">
      <div className="adm-cardLabel">{title}</div>
      {subheader ? <div className="adm-subheader">{subheader}</div> : null}

      {rows.length === 0 ? (
        <div className="adm-muted">{emptyLabel}</div>
      ) : (
        <div className="adm-tableWrap">
          <table className="adm-table">
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c.key} style={c.style}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 10).map((r) => (
                <tr key={r._key}>
                  {columns.map((c) => (
                    <td key={c.key}>
                      {c.render ? c.render(r) : (r[c.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/** ---------- main dashboard ---------- */

export default function AdminDashboard({ guestList, responses }) {
  const guests = Array.isArray(guestList) ? guestList : [];
  const food = Array.isArray(responses) ? responses : [];

  const computed = useMemo(() => {
    const respondedKeys = new Set(
      food
        .map((r) => fullNameKey(r.first_name, r.last_name))
        .filter((k) => k !== "|")
    );

    // --- duplicates detection in guest list ---
    const guestKeyCounts = new Map();
    for (const g of guests) {
      const k = fullNameKey(g.first_name, g.last_name);
      if (k === "|") continue;
      guestKeyCounts.set(k, (guestKeyCounts.get(k) || 0) + 1);
    }
    const duplicateGuestKeys = Array.from(guestKeyCounts.entries())
      .filter(([, c]) => c > 1)
      .map(([k, c]) => ({ key: k, count: c }));

    // --- outstanding guests (not responded) ---
    const outstanding = guests.filter((g) => {
      const k = fullNameKey(g.first_name, g.last_name);
      if (k === "|") return false;
      return !respondedKeys.has(k);
    });

    // --- event attendance counts (based on responses dataset) ---
    const attendingWelcome = countTruthy(food, "attending_welcome_party");
    const attendingWedding = countTruthy(food, "attending_wedding");
    const attendingBrunch = countTruthy(food, "attending_farewell_brunch");

    // --- food option breakdowns ---
    const starterCounts = countBy(food, "starter");
    const mainCounts = countBy(food, "main");
    const dietaryCounts = countBy(food, "dietary_requirements");

    // --- dietary details table rows ---
    const isDietaryFlagged = (v) => {
      if (v === true) return true;
      if (typeof v === "string") {
        const t = norm(v);
        if (!t) return false;
        // treat these as “no dietary requirements”
        if (["none", "no", "n/a", "na", "nil"].includes(t)) return false;
        return true;
      }
      return false;
    };

    // ---- Panel 1: Latest submissions (top 10) ----
// Mirrors: ORDER BY f.created_at DESC
const latestSubmissions = [...food]
  .filter((r) => r.submitted_at) // only real submissions
  .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
  .slice(0, 10)
  .map((r, idx) => ({
    _key: `${fullNameKey(r.first_name, r.last_name)}|${r.submitted_at}|${idx}`,
    name: toTitle(`${r.first_name ?? ""} ${r.last_name ?? ""}`.trim()) || "Unknown",
    submitted_at: r.submitted_at ?? null,
    rsvp: r.rsvp,
    starter: r.starter,
    main: r.main,
    attending_welcome_party: r.attending_welcome_party,
    attending_wedding: r.attending_wedding,
    attending_farewell_brunch: r.attending_farewell_brunch,
    dietary_requirements: r.dietary_requirements,
    dietary_requirements_details: r.dietary_requirements_details,
  }));

// ---- Panel 2: Most recent visitors (top 10) ----
// Mirrors: WHERE first_visit is not null ORDER BY most_recent_visit DESC
// Assumes you're passing parties rows in `responses` OR you have a separate prop.
// If parties data is in `food` rows (as per your schema), this works.
const mostRecentVisitors = [...food]
  .filter((r) => r.first_visit) // where first_visit is not null
  // de-duplicate by party_id if present; fallback to name
  .reduce((acc, r) => {
    const key = r.party_id ?? fullNameKey(r.first_name, r.last_name);
    const existing = acc.get(key);
    const curr = r.most_recent_visit ? new Date(r.most_recent_visit).getTime() : 0;
    const prev = existing?.most_recent_visit ? new Date(existing.most_recent_visit).getTime() : 0;

    if (!existing || curr > prev) acc.set(key, r);
    return acc;
  }, new Map())
  .values();

const mostRecentVisitorsTop10 = Array.from(mostRecentVisitors)
  .sort((a, b) => new Date(b.most_recent_visit) - new Date(a.most_recent_visit))
  .slice(0, 10)
  .map((r, idx) => ({
    _key: `${r.party_id ?? fullNameKey(r.first_name, r.last_name)}|${r.most_recent_visit}|${idx}`,
    party_id: r.party_id ?? "",
    display_name:
      r.display_name ??
      toTitle(`${r.first_name ?? ""} ${r.last_name ?? ""}`.trim()) ??
      "",
    first_visit: r.first_visit ?? null,
    most_recent_visit: r.most_recent_visit ?? null,
  }));

    const dietaryDetailRows = food
      .filter((r) => isDietaryFlagged(r.dietary_requirements))
      .map((r) => {
        const first = r.first_name ?? "";
        const last = r.last_name ?? "";
        const key = fullNameKey(first, last);

        // details column: prefer a dedicated field if you have one
        const details =
          (typeof r.dietary_requirements === "string" ? r.dietary_requirements : "") ||
          r.dietary_requirements_details ||
          r.dietary_details ||
          "";

        return {
          key: key !== "|" ? key : `${Math.random()}`, // fallback if name missing
          name: toTitle(`${first} ${last}`.trim()) || "Unknown guest",
          details: String(details ?? "").trim(),
        };
      })
      // optional: sort alphabetically
      .sort((a, b) => a.name.localeCompare(b.name));

    // --- responded ratio ---
    const totalGuests = guests.length;
    const respondedCount = respondedKeys.size;
    const outstandingCount = outstanding.length;

    const rsvpYes = food.filter((r) => r.rsvp === true).length;
    const rsvpNo = food.filter((r) => r.rsvp === false).length;

    const summaryRows = [
      { metric: "Total guests (in guest list)", count: totalGuests, percent: "" },
      {
        metric: "Responded (unique names in responses)",
        count: respondedCount,
        percent: totalGuests ? `${Math.round((respondedCount / totalGuests) * 100)}%` : "",
      },
      {
        metric: "Outstanding (not in responses)",
        count: outstandingCount,
        percent: totalGuests ? `${Math.round((outstandingCount / totalGuests) * 100)}%` : "",
      },
      {
        metric: "Attending welcome party (of responses)",
        count: attendingWelcome,
        percent: food.length ? `${Math.round((attendingWelcome / food.length) * 100)}%` : "",
      },
      {
        metric: "Attending wedding (of responses)",
        count: attendingWedding,
        percent: food.length ? `${Math.round((attendingWedding / food.length) * 100)}%` : "",
      },
      {
        metric: "Attending farewell brunch (of responses)",
        count: attendingBrunch,
        percent: food.length ? `${Math.round((attendingBrunch / food.length) * 100)}%` : "",
      },
    ];

    return {
      totalGuests,
      respondedCount,
      outstandingCount,
      outstanding,
      duplicateGuestKeys,
      attendingWelcome,
      attendingWedding,
      attendingBrunch,
      starterCounts,
      mainCounts,
      dietaryCounts,
      dietaryDetailRows,
      summaryRows,
      rsvpYes,
      rsvpNo,
        latestSubmissions,
  mostRecentVisitorsTop10,
    };
  }, [guests, food]);

  const starters = entriesSortedDesc(computed.starterCounts);
  const mains = entriesSortedDesc(computed.mainCounts);
  const dietary = entriesSortedDesc(computed.dietaryCounts);

  const exportSummary = () => {
    downloadCsv("wedding-admin-summary.csv", computed.summaryRows);
  };

  const exportOutstanding = () => {
    const rows = computed.outstanding.map((g) => ({
      first_name: g.first_name ?? "",
      last_name: g.last_name ?? "",
      name: toTitle(`${g.first_name ?? ""} ${g.last_name ?? ""}`.trim()),
    }));
    downloadCsv("wedding-outstanding-guests.csv", rows);
  };

  return (
    <div className="adm-wrap">
      {/* Actions */}
      <div className="adm-actions">
        <button className="adm-btn" onClick={exportSummary}>
          Export summary CSV
        </button>
        <button className="adm-btn" onClick={exportOutstanding} disabled={computed.outstandingCount === 0}>
          Export outstanding guests CSV
        </button>
      </div>

      {/* Attendance panels */}
      <div className="adm-grid2">
        <StatCard
          label="Total Responses"
          value={computed.respondedCount}
          total={computed.totalGuests}
          items={[
            ["Responded", computed.respondedCount],
            ["Outstanding", computed.outstandingCount],
          ]}
        />

        <StatCard
          label="RSVP Acceptance"
          subheader="of those responded"
          value={computed.rsvpYes}
          total={computed.respondedCount}
          items={[
            ["Accept", computed.rsvpYes],
            ["Decline", computed.rsvpNo],
          ]}
        />

        <BarList
          title="Event Attendance"
          subheader="of those responded"
          total={food.length}
          items={[
            ["Welcome party", computed.attendingWelcome],
            ["Wedding", computed.attendingWedding],
            ["Farewell brunch", computed.attendingBrunch],
          ]}
          emptyLabel="No responses yet"
        />

        <BarList title="Starters" total={food.length} items={starters} emptyLabel="No starter selections yet" />
        <BarList title="Mains" total={food.length} items={mains} emptyLabel="No main selections yet" />

        {/* NEW: Dietary details table panel */}
        <DietaryDetailsPanel rows={computed.dietaryDetailRows} defaultLimit={5} />

        <Top10TablePanel
  title="Latest submissions"
  subheader="Most recent RSVP/food submissions (top 10)"
  columns={[
    { key: "name", label: "Guest", style: { width: "20%" } },
    { key: "rsvp", label: "RSVP", style: { width: "10%" }, render: (r) => (r.rsvp === true ? "Yes" : r.rsvp === false ? "No" : "—") },
    { key: "starter", label: "Starter", style: { width: "14%" }, render: (r) => r.starter ?? "—" },
    { key: "main", label: "Main", style: { width: "14%" }, render: (r) => r.main ?? "—" },
    { key: "welcome", label: "Welcome Party", style: { width: "14%" }, render: (r) => r.attendingWelcomeParty ?? "—" },
    { key: "wedding", label: "Wedding", style: { width: "14%" }, render: (r) => r.attendingWedding ?? "—" },
    { key: "brunch", label: "Farewell Brunch", style: { width: "14%" }, render: (r) => r.attending_farewellBrunch ?? "—" },
  ]}
  rows={computed.latestSubmissions}
/>

<Top10TablePanel
  title="Most recent visitors"
  subheader="Parties with visits recorded (top 10)"
  columns={[
    { key: "display_name", label: "Party", style: { width: "45%" }, render: (r) => r.display_name || "—" },
    { key: "most_recent_visit", label: "Most recent", style: { width: "28%" }, render: (r) => fmtDateTime(r.most_recent_visit) },
    { key: "first_visit", label: "First visit", style: { width: "27%" }, render: (r) => fmtDateTime(r.first_visit) },
  ]}
  rows={computed.mostRecentVisitorsTop10}
/>
      </div>
    </div>
  );
}