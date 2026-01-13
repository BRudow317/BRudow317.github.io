// MessageCenterPage.jsx
import { useMemo, useState } from "react";
import "./MessageCenterPageStyle.css";

export {MessageCenterPage};

const initialEmails = [
  {
    id: "1",
    sender: "Alex Johnson <alex@example.com>",
    subject: "Project update",
    time: "2026-01-02T01:10:00-05:00",
    bodyText:
      "Hey — quick update on the project.\n\nWe finished the initial wireframes and started on the API integration. Next up: validation and error states.\n\nThanks!",
    attachments: [
      {
        name: "sample-image.png",
        kind: "image",
        url: "https://via.placeholder.com/1000x600.png?text=Sample+Image",
      },
    ],
  },
  {
    id: "2",
    sender: "Billing <billing@company.com>",
    subject: "Your January invoice",
    time: "2026-01-01T18:30:00-05:00",
    bodyText:
      "Your invoice is ready.\n\nPlease see the attached PDF.\n\n— Billing Team",
    attachments: [
      {
        name: "invoice.pdf",
        kind: "pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  },
];

function formatTime(isoString) {
  try {
    const d = new Date(isoString);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function getPreviewText(bodyText) {
  if (!bodyText) return "";
  return bodyText.replace(/\s+/g, " ").trim();
}

function AttachmentViewer({ attachment }) {
  if (!attachment) return null;

  const { kind, url, name } = attachment;

  return (
    <div className="attachment">
      <div className="attachmentHeader">
        <div className="attachmentName">{name || "Attachment"}</div>
        {url ? (
          <a className="attachmentLink"
          
           href={url} target="_blank" rel="noreferrer">
            Open
          </a>
        ) : null}
      </div>

      {!url ? (
        <div className="attachmentPlaceholder">No URL provided for this attachment.</div>
      ) : kind === "image" ? (
        <img className="attachmentImage" src={url} alt={name || "image attachment"} />
      ) : kind === "pdf" ? (
        <iframe className="attachmentPdf" title={name || "pdf attachment"} src={url} />
      ) : (
        <div className="attachmentPlaceholder">
          Unsupported attachment type: <b>{kind}</b>
        </div>
      )}
    </div>
  );
}

function MessageCenterPage() {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedId, setSelectedId] = useState(initialEmails[0]?.id || null);

  const [mode, setMode] = useState("view"); // "view" | "compose"
  const [draft, setDraft] = useState({
    to: "",
    subject: "",
    body: "",
    attachmentKind: "image",
    attachmentUrl: "",
    attachmentName: "",
  });

  const selectedEmail = useMemo(
    () => emails.find((e) => e.id === selectedId) || null,
    [emails, selectedId]
  );

  const inboxEmpty = emails.length === 0;

  function handleCompose() {
    setMode("compose");
    setDraft({
      to: "",
      subject: "",
      body: "",
      attachmentKind: "image",
      attachmentUrl: "",
      attachmentName: "",
    });
  }

  function handleReply() {
    if (!selectedEmail) return;
    setMode("compose");
    setDraft({
      to: selectedEmail.sender,
      subject: selectedEmail.subject.startsWith("Re:")
        ? selectedEmail.subject
        : `Re: ${selectedEmail.subject}`,
      body: `\n\n---\nReplying to:\n${selectedEmail.bodyText}`,
      attachmentKind: "image",
      attachmentUrl: "",
      attachmentName: "",
    });
  }

  function handleForward() {
    if (!selectedEmail) return;
    setMode("compose");
    setDraft({
      to: "",
      subject: selectedEmail.subject.startsWith("Fwd:")
        ? selectedEmail.subject
        : `Fwd: ${selectedEmail.subject}`,
      body: `\n\n---\nForwarded message:\nFrom: ${selectedEmail.sender}\nSubject: ${selectedEmail.subject}\n\n${selectedEmail.bodyText}`,
      attachmentKind: "image",
      attachmentUrl: "",
      attachmentName: "",
    });
  }

  function handleDelete() {
    if (!selectedEmail) return;

    const remaining = emails.filter((e) => e.id !== selectedEmail.id);
    setEmails(remaining);

    if (remaining.length === 0) {
      setSelectedId(null);
      setMode("view");
      return;
    }

    // Select next email (same index if possible)
    const oldIndex = emails.findIndex((e) => e.id === selectedEmail.id);
    const nextIndex = Math.min(oldIndex, remaining.length - 1);
    setSelectedId(remaining[nextIndex].id);
    setMode("view");
  }

  function handleSendDraft(e) {
    e.preventDefault();

    const newEmail = {
      id: String(Date.now()),
      sender: "You <you@example.com>",
      subject: draft.subject || "(no subject)",
      time: new Date().toISOString(),
      bodyText: draft.body || "",
      attachments:
        draft.attachmentUrl.trim() === ""
          ? []
          : [
              {
                name: draft.attachmentName || "attachment",
                kind: draft.attachmentKind,
                url: draft.attachmentUrl.trim(),
              },
            ],
    };

    setEmails((prev) => [newEmail, ...prev]);
    setSelectedId(newEmail.id);
    setMode("view");
  }

  return (
    <div className="inboxPage">
      <header className="topBar">
        <div className="brand">Inbox</div>

        <div className="actions">
          <button className="btn" onClick={handleCompose}>
            Compose
          </button>

          <button className="btn" onClick={handleForward} disabled={!selectedEmail}>
            Forward
          </button>

          <button className="btn" onClick={handleReply} disabled={!selectedEmail}>
            Reply
          </button>

          <button className="btn danger" onClick={handleDelete} disabled={!selectedEmail}>
            Delete
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="sidebarHeader">Messages</div>

          {emails.map((email) => {
            const active = email.id === selectedId;
            const preview = getPreviewText(email.bodyText);

            return (
              <button
                key={email.id}
                className={`emailItem ${active ? "active" : ""}`}
                onClick={() => {
                  setSelectedId(email.id);
                  setMode("view");
                }}
              >
                <div className="emailRow">
                  <div className="emailSender" title={email.sender}>
                    {email.sender}
                  </div>
                  <div className="emailTime">{formatTime(email.time)}</div>
                </div>

                <div className="emailSubject" title={email.subject}>
                  {email.subject}
                </div>

                <div className="emailPreview" title={preview}>
                  {preview}
                </div>
              </button>
            );
          })}

          {inboxEmpty ? <div className="emptySidebar">No emails.</div> : null}
        </aside>

        <main className="content">
          {mode === "compose" ? (
            <div className="contentInner">
              <div className="contentHeader">
                <div className="contentTitle">Compose</div>
              </div>

              <form className="composeForm" onSubmit={handleSendDraft}>
                <label className="field">
                  <div className="label">To</div>
                  <input
                    className="input"
                    value={draft.to}
                    onChange={(e) => setDraft((d) => ({ ...d, to: e.target.value }))}
                    placeholder="someone@example.com"
                  />
                </label>

                <label className="field">
                  <div className="label">Subject</div>
                  <input
                    className="input"
                    value={draft.subject}
                    onChange={(e) => setDraft((d) => ({ ...d, subject: e.target.value }))}
                    placeholder="Subject"
                  />
                </label>

                <label className="field">
                  <div className="label">Body</div>
                  <textarea
                    className="textarea"
                    value={draft.body}
                    onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))}
                    placeholder="Write your email..."
                  />
                </label>

                <div className="composeAttachments">
                  <div className="label">Attachment (URL)</div>
                  <div className="attachmentRow">
                    <select
                      className="select"
                      value={draft.attachmentKind}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, attachmentKind: e.target.value }))
                      }
                    >
                      <option value="image">Image</option>
                      <option value="pdf">PDF</option>
                    </select>

                    <input
                      className="input"
                      value={draft.attachmentName}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, attachmentName: e.target.value }))
                      }
                      placeholder="filename (optional)"
                    />

                    <input
                      className="input"
                      value={draft.attachmentUrl}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, attachmentUrl: e.target.value }))
                      }
                      placeholder="https://example.com/file.pdf"
                    />
                  </div>
                  <div className="hint">
                    Note: some sites block embedding PDFs/images due to CORS. The “Open” link
                    will still work.
                  </div>
                </div>

                <div className="composeActions">
                  <button type="submit" className="btn">
                    Send
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setMode("view")}
                    disabled={inboxEmpty && !selectedEmail}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : selectedEmail ? (
            <div className="contentInner">
              <div className="contentHeader">
                <div className="contentTitle">{selectedEmail.subject}</div>
                <div className="contentMeta">
                  <div>
                    <span className="metaLabel">From:</span> {selectedEmail.sender}
                  </div>
                  <div>
                    <span className="metaLabel">Time:</span> {formatTime(selectedEmail.time)}
                  </div>
                </div>
              </div>

              <pre className="emailBody">{selectedEmail.bodyText}</pre>

              {selectedEmail.attachments?.length ? (
                <div className="attachments">
                  <div className="attachmentsTitle">Attachments</div>
                  {selectedEmail.attachments.map((a, idx) => (
                    <AttachmentViewer key={idx} attachment={a} />
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="contentInner emptyContent">
              <div className="emptyTitle">No email selected</div>
              <div className="emptyText">
                {inboxEmpty ? "Inbox is empty." : "Select an email from the left."}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}