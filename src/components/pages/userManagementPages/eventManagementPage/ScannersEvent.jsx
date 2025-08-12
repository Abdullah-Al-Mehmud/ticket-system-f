import React, { useRef, useState, useEffect } from "react";
import QrScanner from "qr-scanner";
import { CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react";
import { useCheckTicketMutation, useVerifyTicketMutation } from "../../../../store/features/tickets/ticketsApiSlice";

export default function ScannersEvent() {
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [ticketInfo, setTicketInfo] = useState(null); // ticket details from check API
  const [verifyStatus, setVerifyStatus] = useState(null);

  const [checkTicket, { isLoading: isChecking }] = useCheckTicketMutation();
  const [verifyTicket, { isLoading: isVerifying }] = useVerifyTicketMutation();


  // Start scanning
  const startScanner = () => {
    if (isScanning) return;
    setScannedData("");
    setTicketInfo(null);
    setVerifyStatus(null);

    setIsScanning(true);

    scannerRef.current = new QrScanner(
      videoRef.current,
      (result) => {
        stopScanner();
        const data = typeof result === "string" ? result : result?.data;
        setScannedData(data || "");
        handleCheck(data);
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        preferredCamera: "environment",
      }
    );

    scannerRef.current.start().catch((err) => {
      console.error("Failed to start scanner:", err);
      setIsScanning(false);
    });
  };

  // Stop scanning
  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current.destroy();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current.destroy();
        scannerRef.current = null;
      }
    };
  }, []);

  // Call /ticket-check API
  const handleCheck = async (data) => {
    let payload;
    try {
      payload = JSON.parse(data);
    } catch {
      payload = { ticket_id: data };
    }

    try {
      const res = await checkTicket(payload).unwrap();
      if (res?.status) {
        setTicketInfo(res?.data);
      } else {
        setTicketInfo({ error: res.message });
      }
    } catch (error) {
      console.error("Check error:", error);
      setTicketInfo({ error: "Ticket not found or invalid." });
    }
  };

  // Call /ticket-verify API
  const handleVerify = async () => {
    if (!scannedData) return;
    setVerifyStatus(null);

    let payload;
    try {
      payload = JSON.parse(scannedData);
    } catch {
      payload = { ticket_id: scannedData };
    }

    try {
      const res = await verifyTicket(payload).unwrap();
      if (res?.status && res?.ticket?.is_verify) {
        setVerifyStatus("success");
      } else {
        setVerifyStatus("fail");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerifyStatus("fail");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>QR Code Scanner</h1>

      <div style={{ display: "flex", gap: 20 }}>
        {/* Left: Video Scanner */}
        <div style={{ flex: 1, position: "relative" }}>
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: 300,
              backgroundColor: "#eee",
              borderRadius: 8,
              objectFit: "cover",
            }}
            muted
            playsInline
          />
          <button
            onClick={startScanner}
            disabled={isScanning}
            style={{
              marginTop: 10,
              width: "100%",
              padding: 12,
              fontSize: 16,
              backgroundColor: isScanning ? "#999" : "#FFBF00",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: isScanning ? "not-allowed" : "pointer",
            }}
          >
            {isScanning ? "Scanning..." : "Start Scanning"}
          </button>
        </div>

        {/* Right: Ticket Info + Verify */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#f9f9f9",
            borderRadius: 8,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 300,
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
          }}
        >
          {isChecking && <p>Checking ticket...</p>}

          {ticketInfo && !ticketInfo.error && (
            <div style={{ textAlign: "center" }}>
              <p><strong>User:</strong> {ticketInfo.user_name}</p>
              <p><strong>Event:</strong> {ticketInfo.event_name}</p>
              <p><strong>Status:</strong> {ticketInfo.is_verify ? "✅ Verified" : "❌ Not Verified"}</p>
            </div>
          )}

          {ticketInfo?.error && (
            <div style={{ color: "red", fontWeight: "bold" }}>{ticketInfo.error}</div>
          )}

          {ticketInfo && !ticketInfo.error && !ticketInfo.is_verify && (
            <button
              onClick={handleVerify}
              disabled={isVerifying || verifyStatus === "success"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                fontSize: 16,
                backgroundColor: verifyStatus === "success" ? "#5cb85c" : "#0275d8",
                color: "white",
                border: "none",
                borderRadius: 6,
                marginTop: 15,
                cursor: isVerifying || verifyStatus === "success" ? "not-allowed" : "pointer",
              }}
            >
              {isVerifying ? (
                <Loader2 className="lucide-spin" size={20} />
              ) : verifyStatus === "success" ? (
                <CheckCircle size={20} />
              ) : (
                <RefreshCw size={20} />
              )}
              {verifyStatus === "success" ? "Verified" : "Verify Ticket"}
            </button>
          )}

          {verifyStatus === "fail" && (
            <div style={{ marginTop: 15, color: "#d9534f", display: "flex", alignItems: "center", gap: 6, fontWeight: "bold" }}>
              <XCircle size={20} />
              <span>Verification Failed</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .lucide-spin { animation: spin 1s linear infinite; }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}
