import { useEffect, useState } from "react";
function EventForm({ editEvent, setEditEvent, setRefresh }) {
const [event, setEvent] = useState({
eventName: "",
eventType: "",
resourcePerson: "",
eventDate: "",
venue: "",
maxParticipants: "",
status: ""
});
const [error, setError] = useState("");
useEffect(() => {
if (editEvent) {
setEvent({
eventName: editEvent.eventName,
eventType: editEvent.eventType,
resourcePerson: editEvent.resourcePerson,
eventDate: editEvent.eventDate
    ? editEvent.eventDate.split("T")[0]
    : "",
venue: editEvent.venue,
maxParticipants: editEvent.maxParticipants,
status: editEvent.status
});
}
}, [editEvent]);

const handleChange = (e) => {
setEvent({
...event,
[e.target.name]: e.target.value
});
};
const handleSubmit = async (e) => {
e.preventDefault();
if (
!event.eventName ||
!event.eventType ||
!event.resourcePerson ||
!event.eventDate ||
!event.venue ||
!event.maxParticipants ||
!event.status
) {
setError("Please fill all fields");
return;
}
setError("");
let url = "http://localhost:5000/api/events";
let method = "POST";
if (editEvent) {
url = "http://localhost:5000/api/events/" + editEvent._id;
method = "PUT";
}
await fetch(url, {
method: method,
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(event)
});
alert(editEvent ? "Event updated" : "Event added");
setEvent({
eventName: "",
eventType: "",
resourcePerson: "",
eventDate: "",
venue: "",
maxParticipants: "",
status: ""
});
setEditEvent(null);
setRefresh((x) => !x);
};
return (
<div className="p-6 bg-gray-100">
<div className="bg-white p-6 rounded-md shadow-sm w-96">
<h2 className="text-xl font-semibold mb-5 text-blue-700">
    Campus Event Management</h2>
{error && (
    <p className="text-red-500 mb-3">
    {error}
    </p>
)}
<form onSubmit={handleSubmit}>
    <input
    className="border p-2 w-full mb-3 rounded"
    name="eventName"
    placeholder="Event Name"
    value={event.eventName}
    onChange={handleChange}
    />
    <select
    className="border p-2 w-full mb-3 rounded"
    name="eventType"
    value={event.eventType}
    onChange={handleChange}
    >
    <option value="">Select Event Type</option>
    <option value="Workshop">Workshop</option>
    <option value="Hackathon">Hackathon</option>
    <option value="Seminar">Seminar</option>
    <option value="Masterclass">Masterclass</option>
    <option value="Competition">Competition</option>
    </select>

    <input
    className="border p-2 w-full mb-3 rounded"
    name="resourcePerson"
    placeholder="Resource Person"
    value={event.resourcePerson}
    onChange={handleChange}
    />

    <input
    className="border p-2 w-full mb-3 rounded"
    type="date"
    name="eventDate"
    value={event.eventDate}
    onChange={handleChange}
    />

    <input
    className="border p-2 w-full mb-3 rounded"
    name="venue"
    placeholder="Venue"
    value={event.venue}
    onChange={handleChange}
    />

    <input
    className="border p-2 w-full mb-3 rounded"
    type="number"
    name="maxParticipants"
    placeholder="Maximum Participants"
    value={event.maxParticipants}
    onChange={handleChange}
    />

    <select
    className="border p-2 w-full mb-4 rounded"
    name="status"
    value={event.status}
    onChange={handleChange}
    >
    <option value="">Select Status</option>
    <option value="Open">Open</option>
    <option value="Closed">Closed</option>
    </select>

    <button
    className="bg-blue-500 text-white px-4 py-2 rounded"
    type="submit"
    >
    {editEvent ? "Update Event" : "Add Event"}
    </button>

</form>

</div>

</div>
);
}

export default EventForm;