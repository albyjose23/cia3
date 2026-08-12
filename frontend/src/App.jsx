import { useState } from "react";
import Navbar from "./components/Navbar";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
function App() {
  const [editEvent, setEditEvent] = useState(null);
  const [refresh, setRefresh] = useState(false);
return ( <div>
<Navbar />
<EventForm
    editEvent={editEvent}
    setEditEvent={setEditEvent}
    setRefresh={setRefresh}
  />
  <EventList
    setEditEvent={setEditEvent}
    refresh={refresh}
    setRefresh={setRefresh}
  />
</div>
);
}
export default App;