import { useEffect, useState } from "react";
import { getSignals } from "./services/api";
import SignalTable from "./components/SignalTable";
import SignalForm from "./components/SignalForm";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
const styles = {
  primary: {
    background: "#0f172a",
    color: "white",
    border: "1px solid #0f172a",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500"
  },

  secondary: {
    background: "white",
    color: "#0f172a",
    border: "1px solid #e2e8f0",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

function App() {
  const [signals, setSignals] = useState([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  

  const fetchSignals = async () => {
    const res = await getSignals();
    setSignals(res.data.data);
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className={"app"}>
      <h1 style={{
        fontSize: "28px",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: "20px"
      }}>
        Trading Dashboard
      </h1>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "20px"
      }}>

        <button
          style={styles.primary}
          onClick={() => setOpen(true)}
        >
          + Create Signal
        </button>

       

      </div>

      <SignalTable signals={signals} refresh={fetchSignals} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <SignalForm
          refresh={fetchSignals}
          setToast={setToast}
          close={() => setOpen(false)}
        />
      </Modal>

      <Toast message={toast?.message} type={toast?.type} />
    </div>
  );
}

export default App;