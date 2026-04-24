import { useState } from "react";
import { createSignal } from "../services/api";

const SignalForm = ({ refresh, setToast, close }) => {
  const [form, setForm] = useState({
    symbol: "",
    direction: "BUY",
    entry_price: "",
    stop_loss: "",
    target_price: "",
    entry_time: "",
    expiry_time: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createSignal(form);
      setToast({ message: "Signal Created!", type: "success" });
      refresh();
      close();
    } catch (err) {
      setToast({ message: err.response?.data?.error || "Error", type: "error" });
    }

    setLoading(false);
  };

  return (
 <form onSubmit={handleSubmit} className="premium-card">
  <h2 className="title">📊 Create Trading Signal</h2>

  <div className="form-grid">

    <div className="field">
      <label>Trading Pair</label>
      <input
        name="symbol"
        placeholder="BTCUSDT"
        onChange={handleChange}
        required
      />
    </div>

    <div className="field">
      <label>Direction</label>
      <select name="direction" onChange={handleChange}>
        <option value="BUY">BUY ↑</option>
        <option value="SELL">SELL ↓</option>
      </select>
    </div>

    <div className="field">
      <label>Entry Price</label>
      <input
        type="number"
        name="entry_price"
        placeholder="60000"
        onChange={handleChange}
        required
      />
    </div>

    <div className="field">
      <label>Target Price</label>
      <input
        type="number"
        name="target_price"
        placeholder="62000"
        onChange={handleChange}
        required
      />
    </div>

    <div className="field">
      <label>Stop Loss</label>
      <input
        type="number"
        name="stop_loss"
        placeholder="59000"
        onChange={handleChange}
        required
      />
    </div>

    <div className="field">
      <label>Entry Time</label>
      <input
        type="datetime-local"
        name="entry_time"
        onChange={handleChange}
      />
    </div>

    <div className="field full">
      <label>Expiry Time</label>
      <input
        type="datetime-local"
        name="expiry_time"
        onChange={handleChange}
      />
    </div>

  </div>

  {/* Hint */}
  <div className="hint">
    💡 BUY → Target above Entry, SL below  
    <br />
    💡 SELL → Target below Entry, SL above
  </div>

 <button className="premium-btn" disabled={loading}>
  {loading ? (
    <span className="spinner"></span>
  ) : (
    "Create Signal"
  )}
</button>
</form>
  );
};

export default SignalForm;