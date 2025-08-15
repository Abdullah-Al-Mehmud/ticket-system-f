import React from "react";
import { useParams } from "react-router-dom";
import { useGetTicketByIdQuery } from "../../../../store/features/tickets/ticketsApiSlice";
import { XCircle, MapPin, Scissors, Download } from "lucide-react";
import PageLoading from "../../../../components/common/loaderComponent/PageLoading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QRCodeSVG } from "qrcode.react";
import dayjs from "dayjs";

export default function BookingTicketDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetTicketByIdQuery(id);

  if (isLoading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><PageLoading /></div>;

  if (isError || !data?.data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center p-8">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <CardTitle className="text-xl mb-2">Ticket Not Found</CardTitle>
            <p className="text-gray-600 text-center">We couldn't find the ticket you're looking for.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const ticket = data.data;
  const event = ticket.event;

  const ticketFields = [
    { label: "Start Date", value: dayjs(event.start_date).format("MMM D, YYYY") },
    { label: "End Date", value: dayjs(event.end_date).format("MMM D, YYYY") },
    { label: "Start Time", value: dayjs(event.start_date).format("h:mm A") },
    { label: "End Time", value: dayjs(event.end_date).format("h:mm A") },
    { label: "Ticket Category", value: ticket.ticket_category_name || "N/A" },
    { label: "Quantity", value: `${ticket.quantity} TICKET${ticket.quantity > 1 ? "S" : ""}` },
    { label: "Price Each", value: `৳${ticket.price_per_ticket}` }
  ];
  const qrPayload = JSON.stringify({
    user_name: ticket.user?.name,
    event_id: event?.id,
    ticket_id: ticket.ticket_id
  });

  const handleDownload = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/ticket/download/${ticket.ticket_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
        'Accept': 'application/pdf',
      },
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ticket-${ticket.ticket_number}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Ticket
          </button>
        </div>

        <Card className="border-amber-600 overflow-hidden" style={{ fontFamily: "monospace" }}>
          <div className="flex">
            <div className="flex-1 p-8 relative">
              <CardHeader className="p-0 pb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl text-gray-900 mb-2">{event.title}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-amber-600 hover:bg-amber-700 text-white mb-2">{ticket.status?.toUpperCase()}</Badge>
                    <div className="text-xs text-gray-500">#{ticket.ticket_number}</div>
                  </div>
                </div>
                <div className="border-b-2 border-dashed border-gray-300"></div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {ticketFields.slice(0, 4).map(({ label, value }, idx) => (
                    <div key={idx}>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">{label}</label>
                      <div className="text-lg font-mono text-gray-900">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  {ticketFields.slice(4).map(({ label, value }, idx) => (
                    <div key={idx}>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">{label}</label>
                      <div className="text-lg font-mono text-gray-900">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-dashed border-gray-300 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Amount</span>
                    <span className="text-3xl font-bold text-amber-600">৳{ticket.total_price}</span>
                  </div>
                </div>
              </CardContent>

              <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col justify-center items-center">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <div key={idx} className="w-4 h-4 bg-gray-100 rounded mb-2" />
                ))}
              </div>
            </div>
            <div className="w-48 bg-gray-50 p-6 border-l-2 border-dashed border-gray-300 relative flex flex-col items-center">

              {/* Vertical Admit One text */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/3 -translate-y-1/2 w-30 pointer-events-none select-none z-20 transform rotate-90 origin-center">
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Admit One
                  </div>
                  <Badge variant="outline" className="text-amber-600 border-amber-600 mb-2">
                    #{ticket.ticket_number}
                  </Badge>
                  <div className="text-xs text-gray-600">
                    {dayjs(event.start_date).format("MMM D, YYYY")}
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="absolute bottom-6 left-6 right-6 z-10">  {/* lower z-index */}
                <Card className="w-36 h-36 mx-auto flex items-center justify-center border-2">
                  <QRCodeSVG
                    value={qrPayload}
                    size={140}
                    includeMargin={false}
                  />
                </Card>
                <div className="text-center mt-3 text-sm font-medium text-gray-600">
                  SCAN AT VENUE
                </div>
              </div>

            </div>

          </div>

          <div className="border-t-2 border-dashed border-gray-300 bg-gray-50 px-8 py-4">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center">
                <Scissors className="w-3 h-3 mr-2" />
                <span>DETACH AT VENUE</span>
              </div>
              <div>Valid for: {ticket.quantity} person{ticket.quantity > 1 ? "s" : ""}</div>
              <div>Keep this portion</div>
            </div>
          </div>
        </Card>

        <Alert className="mt-4 bg-transparent border-none">
          <AlertDescription className="text-center text-xs text-gray-500">
            <p>This ticket is non-refundable and non-transferable. Please arrive 30 minutes before event start time.</p>
            <p className="mt-1">For support, contact us at support@tapkori.com</p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}