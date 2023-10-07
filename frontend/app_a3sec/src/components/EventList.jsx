function EventList({ events, onDeleteEvent, onEditEvent}) {

    if (events.length === 0) {
      return <p className="mt-5">No events available.</p>;
    }
  
    const handleDeleteEvent = (id) => {
      const index = events.findIndex((event) => event.id === id);
      if (index !== -1) {
        onDeleteEvent(id);
      }
    };
  
    const handleEditEvent = (event) => {
      onEditEvent(event);
    };
  
    return (
      <div className="p-4">
        <ul className="bg-white rounded-lg shadow-lg p-4">
          {events.map((event) => (
            <li className="py-2 flex items-center justify-between" key={event.id}>
              <div>
                <h3 className="text-lg font-bold mr-20">{event.name}</h3>
                <p className="text-gray-500">{"Date:  " + event.date}</p>
                <p className="text-gray-500">{"Place:  " + event.place}</p>
                <p className="text-gray-500">{"Modality:  " + event.modality}</p>
              </div>
  
              <div className="flex items-center">
                
                <button
                  className="ml-5 py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleEditEvent(event)}
                >
                  Edit
                </button>
  
                <button
                  className="py-1 px-2 ml-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </button>

              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default EventList;
  
  
  