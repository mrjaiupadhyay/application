"use client"

import { useState, useRef, useCallback, useEffect } from "react"

export default function PermissionPage() {
  const [status, setStatus] = useState(null) // null | "approved" | "rejected"
  const [rejectPos, setRejectPos] = useState({ x: 200, y: 0 })
  const containerRef = useRef(null)
  const rejectRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && status === null) {
      const rect = containerRef.current.getBoundingClientRect()
      const padding = 60
      const maxX = rect.width - 220
      const maxY = rect.height - 60
      setRejectPos({
        x: padding + Math.random() * Math.max(0, maxX - 2 * padding),
        y: padding + Math.random() * Math.max(0, maxY - 2 * padding),
      })
    }
  }, [status])

  const moveReject = useCallback(() => {
    if (!containerRef.current || status !== null) return
    const rect = containerRef.current.getBoundingClientRect()
    const padding = 60
    const maxX = rect.width - 140
    const maxY = rect.height - 52
    setRejectPos({
      x: padding + Math.random() * Math.max(0, maxX - 2 * padding),
      y: padding + Math.random() * Math.max(0, maxY - 2 * padding),
    })
  }, [status])

  const handleRejectMouseEnter = () => moveReject()
  const handleRejectMouseMove = () => moveReject()

  const handleApprove = () => {
    setStatus("approved")
  }

  const handleCancel = () => {
    setStatus(null)
  }

  return (
    <main
      ref={containerRef}
      className="card"
      style={{ position: "relative" }}
    >
      <h1 className="title">Official Permission Application</h1>
      <p className="submitted">
        Submitted by <strong>Jai Upadhyay</strong> to <strong>Swati Babes</strong>
      </p>
      <p className="description">
        This is a light‑hearted official request asking for your permission to
        allow <strong>Jai Upadhyay</strong> to touch wherever he wants.
      </p>
      <ul className="terms">
        <li>Your consent is the highest authority.</li>
        <li>You can approve, reject, or cancel anytime.</li>
        <li>All interactions must follow respect and comfort.</li>
      </ul>

      {status === null && (
        <>
          <div className="buttons">
            <button
              type="button"
              className="btn approve"
              onClick={handleApprove}
            >
              Approve 😂
            </button>
          </div>
          <button
            ref={rejectRef}
            type="button"
            className="btn reject"
            style={{
              position: "absolute",
              left: rejectPos.x,
              top: rejectPos.y,
              transition: "left 0.15s ease-out, top 0.15s ease-out",
            }}
            onMouseEnter={handleRejectMouseEnter}
            onMouseMove={handleRejectMouseMove}
            onClick={moveReject}
          >
            Application Rejected ❌
          </button>
        </>
      )}

      {status === "approved" && (
        <div className="result approved">
          <p className="result-emoji">✅</p>
          <p className="result-text">Application Approved</p>
          <button type="button" className="btn cancel" onClick={handleCancel}>
            Cancel / Reset
          </button>
        </div>
      )}

      <style jsx>{`
        .card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          min-height: 320px;
        }
        .title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
          background: linear-gradient(180deg, #fff 0%, #e0d4f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .submitted {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 1.25rem;
        }
        .submitted strong {
          color: #c9b8f0;
        }
        .description {
          font-size: 0.95rem;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1rem;
        }
        .description strong {
          color: #d4c4f7;
        }
        .terms {
          list-style: none;
          margin-bottom: 1.75rem;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
        }
        .terms li::before {
          content: "• ";
          color: #a78bfa;
        }
        .buttons {
          position: relative;
          min-height: 52px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn:hover {
          transform: scale(1.03);
        }
        .btn.approve {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);
        }
        .btn.approve:hover {
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.5);
        }
        .btn.reject {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);
        }
        .result {
          text-align: center;
          padding: 1rem 0;
        }
        .result-emoji {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }
        .result-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: #86efac;
          margin-bottom: 1rem;
        }
        .btn.cancel {
          background: rgba(255, 255, 255, 0.15);
          color: #e0d4f7;
        }
      `}</style>
    </main>
  )
}
