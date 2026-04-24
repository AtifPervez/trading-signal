import { deleteSignal } from "../services/api";

const SignalTable = ({ signals, refresh }) => {
  return (
    <table>
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
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {signals.map((s) => (
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
              <button
                onClick={async () => {
                  await deleteSignal(s.id);
                  refresh();
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SignalTable;