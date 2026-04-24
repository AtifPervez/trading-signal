import { useState } from "react";
import { deleteSignal } from "../services/api";

const SignalTable = ({ signals, refresh }) => {
  const [deleteId, setDeleteId] = useState(null);
  const getTimeRemaining = (expiryTime) => {
  if (!expiryTime) return "-";

  const total = new Date(expiryTime) - new Date();

  if (total <= 0) return "Expired";

  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

  return (
    <>
    <div 
    style={{ width: "100%", overflowX: "auto" }}>
      <table style={{ width: "100%", minWidth: "900px" }}>
        <thead>
          <tr>
            <th>Trading Pair</th>
            <th>Direction</th>
            <th>Entry Price</th>
            <th>Target Price</th>
            <th>Stop Loss</th>
            <th>Price</th>
            <th>Status</th>
            <th>ROI</th>

        
            <th>Time Left</th>
           

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {signals?.map((s) => (
            <tr key={s.id}>
              <td>{s.symbol}</td>

              <td className={s.direction === "BUY" ? "buy" : "sell"}>
                {s.direction}
              </td>

              <td>{s.entry_price}</td>
              <td>{s.target_price}</td>
              <td>{s.stop_loss}</td>
              <td>{s.current_price}</td>

              <td>
                <span className={`status ${s.status}`}>
                  {s.status}
                </span>
              </td>

              <td className={s.roi >= 0 ? "profit" : "loss"}>
                {s.roi?.toFixed(2)}%
              </td>

             
              <td>
                {getTimeRemaining(s.expiry_time)}
              </td>

              <td>
                <button
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 12px",
                  }}
                  onClick={() => setDeleteId(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

    
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this signal?</p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "15px",
              }}
            >
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #ccc",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await deleteSignal(deleteId);
                  setDeleteId(null);
                  refresh();
                }}
                style={{
                  padding: "8px 12px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignalTable;