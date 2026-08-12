import { useEffect, useState } from "react";

function EventList({ setEditEvent, refresh, setRefresh }) {

const [events, setEvents] = useState([]);

const getEvents = async () => {
const response = await fetch(
"http://localhost:5000/api/events"
);

const data = await response.json();
setEvents(data);
};
useEffect(() => {
getEvents();
}, [refresh]);
const deleteEvent = async (id) => {
await fetch(
"http://localhost:5000/api/events/" + id,
{
method: "DELETE"
}
);
alert("Event deleted");
setRefresh((x) => !x);
};
return (
<div className="p-6 bg-gray-100">
<h2 className="text-xl font-semibold mb-4 text-blue-700">
Event List
</h2>
<div className="bg-white p-3 rounded-md shadow-sm">
<table className="border-collapse border w-full">
<thead>
<tr className="bg-blue-100">
    <th className="border p-2 text-left">
    Event Name
    </th>
    <th className="border p-2 text-left">
    Type
    </th>
    <th className="border p-2 text-left">
    Resource Person
    </th>
    <th className="border p-2 text-left">
    Date
    </th>
    <th className="border p-2 text-left">
    Venue
    </th>
    <th className="border p-2 text-left">
    Participants
    </th>
    <th className="border p-2 text-left">
    Status
    </th>
    <th className="border p-2 text-left">
    Action
    </th>
</tr>
</thead>
<tbody>
{events.map((event) => (
    <tr key={event._id}>
    <td className="border p-2">
        {event.eventName}
    </td>
    <td className="border p-2">
        {event.eventType}
    </td>
    <td className="border p-2">
        {event.resourcePerson}
    </td>
    <td className="border p-2">
        {event.eventDate
        ? event.eventDate.split("T")[0]
        : ""}
    </td>
    <td className="border p-2">
        {event.venue}
    </td>
    <td className="border p-2">
        {event.maxParticipants}
    </td>
    <td className="border p-2">
        <span
        className={
            event.status === "Open"
            ? "text-green-600 font-semibold"
            : "text-red-600 font-semibold"
        }
        >
        {event.status}
        </span>
    </td>
    <td className="border p-2">
        <button
        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
        onClick={() => setEditEvent(event)}
        >
        Edit
        </button>
        <button
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => deleteEvent(event._id)}
        >
        Delete
        </button>
    </td>
    </tr>
))}
</tbody>
</table>
</div>
</div>
);
}

export default EventList;