import React, { useRef, useState, useEffect } from "react";
import QrScanner from "qr-scanner";
import { CheckCircle, XCircle, Loader2, RefreshCw, QrCode, User, Calendar, Shield } from "lucide-react";
import { useCheckTicketMutation, useVerifyTicketMutation } from "../../../../store/features/tickets/ticketsApiSlice";

export default function ScannersEvent() {
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [ticketInfo, setTicketInfo] = useState(null);
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
        setTicketInfo(res?.ticket);
      } else {
        setVerifyStatus("fail");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerifyStatus("fail");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">QR Code Scanner</h1>
          <p className="text-gray-600">Scan tickets to verify attendance</p>
        </div>

        {/* Main Content - Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Scanner Section */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Camera Scanner
                </h2>
              </div>
              
              <div className="p-6">
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-full h-64 md:h-80 bg-gray-100 rounded object-cover border-4 border-dashed border-gray-300"
                    muted
                    playsInline
                  />
                  {!isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded">
                      <div className="text-center text-white">
                        <QrCode className="w-12 h-12 mx-auto mb-2 opacity-70" />
                        <p className="text-sm font-medium">Ready to scan</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={startScanner}
                  disabled={isScanning}
                  className={`w-full mt-6 py-4 px-6 rounded font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    isScanning
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 active:scale-95'
                  }`}
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <QrCode className="w-5 h-5" />
                      Start Scanning
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1">
            <div className="bg-white rounded h-full">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Ticket Information
                </h2>
              </div>
              
              <div className="p-6 flex flex-col justify-center min-h-[300px] lg:min-h-[400px]">
                
                {/* Loading State */}
                {isChecking && (
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-spin" />
                    <p className="text-lg font-medium text-gray-700">Checking ticket...</p>
                    <p className="text-sm text-gray-500 mt-1">Please wait</p>
                  </div>
                )}

                {/* Ticket Information */}
                {ticketInfo && !ticketInfo.error && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className={`inline-flex items-center px-4 py-2 rounded text-sm font-semibold mb-4 ${
                        ticketInfo.is_verify 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ticketInfo.is_verify ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Already Verified
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-2" />
                            Pending Verification
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded">
                        <User className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Attendee</p>
                          <p className="text-lg font-semibold text-gray-800">{ticketInfo.user_name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded">
                        <Calendar className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Event</p>
                          <p className="text-lg font-semibold text-gray-800">{ticketInfo.event_name}</p>
                        </div>
                      </div>
                    </div>

                    {/* Verify Button */}
                    {!ticketInfo.is_verify && (
                      <button
                        onClick={handleVerify}
                        disabled={isVerifying || verifyStatus === "success"}
                        className={`w-full py-4 px-6 rounded font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                          verifyStatus === "success"
                            ? 'bg-green-500 text-white cursor-not-allowed'
                            : isVerifying
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 active:scale-95'
                        }`}
                      >
                        {isVerifying ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Verifying...
                          </>
                        ) : verifyStatus === "success" ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Verified Successfully
                          </>
                        ) : (
                          <>
                            <Shield className="w-5 h-5" />
                            Verify Ticket
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {/* Error State */}
                {ticketInfo?.error && (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded mb-4">
                      <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ticket Not Found</h3>
                    <p className="text-red-600 font-medium">{ticketInfo.error}</p>
                    <p className="text-sm text-gray-500 mt-2">Please try scanning again</p>
                  </div>
                )}

                {/* Verification Failed */}
                {verifyStatus === "fail" && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
                    <div className="flex items-center gap-2 text-red-700 font-semibold">
                      <XCircle className="w-5 h-5" />
                      Verification Failed
                    </div>
                    <p className="text-sm text-red-600 mt-1">Unable to verify this ticket. Please try again.</p>
                  </div>
                )}

                {/* Default State */}
                {!isChecking && !ticketInfo && (
                  <div className="text-center text-gray-500">
                    <QrCode className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Ready to Scan</h3>
                    <p className="text-sm">Point your camera at a QR code to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}