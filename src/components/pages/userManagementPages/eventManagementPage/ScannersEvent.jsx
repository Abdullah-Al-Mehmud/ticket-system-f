import React, { useRef, useState, useEffect } from "react";
import QrScanner from "qr-scanner";
import { CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react";
import { useVerifyTicketMutation } from "../../../../store/features/tickets/ticketsApiSlice";

export default function ScannersEvent() {
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [verifyStatus, setVerifyStatus] = useState(null); 

  const [verifyTicket, { isLoading }] = useVerifyTicketMutation();

  // Start scanning
  const startScanner = () => {
    if (isScanning) return;
    setScannedData("");
    setVerifyStatus(null);

    setIsScanning(true);

    scannerRef.current = new QrScanner(
      videoRef.current,
      (result) => {
        stopScanner();
        const data = typeof result === "string" ? result : result?.data;
        setScannedData(data || "");
        setVerifyStatus(null);
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
    <div
      style={{
        maxWidth: 800,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
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

        {/* Right: Scan result and verify */}
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
          {!scannedData && <p style={{ color: "#777" }}>Scan a QR code to see data here</p>}

          {scannedData && (
            <>
              <div
                style={{
                  wordBreak: "break-word",
                  backgroundColor: "white",
                  padding: 15,
                  borderRadius: 6,
                  width: "100%",
                  boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                  marginBottom: 20,
                  maxHeight: 150,
                  overflowY: "auto",
                  fontFamily: "monospace",
                  fontSize: 14,
                }}
              >
                {scannedData}
              </div>

              <button
                onClick={handleVerify}
                disabled={isLoading || verifyStatus === "success"}
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
                  cursor: isLoading || verifyStatus === "success" ? "not-allowed" : "pointer",
                }}
                title={verifyStatus === "success" ? "Ticket Verified" : "Verify Ticket"}
              >
                {isLoading ? (
                  <Loader2 className="lucide-spin" size={20} />
                ) : verifyStatus === "success" ? (
                  <CheckCircle size={20} />
                ) : (
                  <RefreshCw size={20} />
                )}
                {verifyStatus === "success" ? "Verified" : "Verify Ticket"}
              </button>

              {verifyStatus === "fail" && (
                <div
                  style={{
                    marginTop: 15,
                    color: "#d9534f",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontWeight: "bold",
                  }}
                >
                  <XCircle size={20} />
                  <span>Verification Failed</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Spinner animation for lucide icon */}
      <style>{`
        .lucide-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}
