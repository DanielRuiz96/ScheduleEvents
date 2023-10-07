import { useState, useEffect } from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";

function TodoEvent({setPage}) {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [allEvents,setAllEvents] = useState([]);
    const [editingEvent, setEditingEvents] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);


    useEffect(() => {
        fetchEvents();
    },[]);

    useEffect(() => {
        const filtered = allEvents.filter((event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEvents(filtered);
    }, [allEvents, searchTerm]);

    const userId = localStorage.getItem("user_id")

    const fetchEvents = async () => {
        try {
          const response = await fetch(`http://localhost:5000/event/${userId}/`);
          if (response.ok) {
            const events = await response.json();
            setAllEvents(events);
          } else {
            console.error("Error fetching events", response.status);
          }
        } catch (error) {
          console.error("Error fetching events", error);
        }
    };

    const handleOpenDialog = () => {
      setIsOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setIsOpenDialog(false);
      setEditingEvents(null);
    };

    const handleAddEvent = async(newEvent) => {

        try{
            const response = await fetch(`http://localhost:5000/event/`,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(newEvent),

            });

            if (response.ok){
                fetchEvents();
                handleCloseDialog();
            }else{
                console.error("Error adding event", response.status)
            }
        }catch(error){
            console.error("Error adding event",error)
        }
    };

    const handleDeleteEvent = async(id) => {
        
        const dataToDelete = {
            id: id,
            user_id: userId
        };

        try{

            const response = await fetch(`http://localhost:5000/event/`,{
                method:"DELETE",
                body: JSON.stringify(dataToDelete), 
                headers: {
                    "Content-Type": "application/json" 
                }
            });

            if (response.ok){
                const updateEvents = allEvents.filter((event)=> event.id !==id);
                setAllEvents(updateEvents);
            }else{
                console.error("Error deleting event", response.status);
            }

        }catch(error){
            console.error("Error deleting event", error);
        }
    };

    const handleEditEvent = async(editedEvent) => {
        try {
            const response = await fetch(`http://localhost:5000/event/`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(editedEvent)
            });
            if (response.ok){
                fetchEvents();
                handleCloseDialog();
            }else{
                console.error("Error editing event", response.status);
            }
        }catch(error){
            console.error("Error editing event", error);
        }
    };

    const handleOpenEditDialog = (event) => {
        if (!isOpenDialog) {
            setEditingEvents(event);
            setIsOpenDialog(true);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleLogout = () => {

        localStorage.removeItem("access_token");
        localStorage.removeItem("access_token_type");
        localStorage.removeItem("user_id");

        setPage("login");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
      };
    


  return (
    <>
      <section className="flex flex-col items-center flex-grow">
        <h1 className="text-4xl mt-3 font-bold"> Welcome to APP a3Sec</h1>
        <header className="bg-auto space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-slate-900">Create a new event</h2>
                    <button 
                    className="hover:bg-yellow-300 active:bg-yellow-500 group flex items-center rounded-md bg-yellow-400 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm ml-10"
                    onClick={handleOpenDialog}
                    >
                    <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                        <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                    </svg>
                    New
                    </button>
                </div>

                <form className="group relative">
                    <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-yellow-500" aria-hidden="true">
                    <path  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                    </svg>
                    <input className="focus:ring-2 focus:ring-yellow-400 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter events" placeholder="Search Event..."  value={searchTerm} onChange={handleSearchChange}/>
                </form>

        </header>

        
        {isOpenDialog && (
          <EventForm
            handleClose={handleCloseDialog}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            editingEvent={editingEvent}
            user_id={userId}
          />
        )}

        <EventList
          events={filteredEvents}
          onDeleteEvent={handleDeleteEvent}
          onEditEvent={handleOpenEditDialog}
        />

      </section>

      <button
        className="fixed bottom-4 right-4 bg-red-400 hover:bg-red-500 active:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
    
  )
}

export default TodoEvent