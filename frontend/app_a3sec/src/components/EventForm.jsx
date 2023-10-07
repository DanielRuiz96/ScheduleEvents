import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EventForm({ handleClose, onAddEvent, onEditEvent, editingEvent,user_id }) {
  const initialDate = editingEvent && editingEvent.date ? new Date(editingEvent.date) : new Date();
  const [name, setName] = useState(editingEvent ? editingEvent.name : "");
  const [date, setDate] = useState(initialDate);
  const [place, setPlace] = useState(editingEvent ? editingEvent.place : "");
  const [modality, setModality] = useState(editingEvent ? editingEvent.modality : "");

  const options = [
    { value: "", label: "Event modality!" },
    { value: "PRESENTIAL", label: "In-Person" },
    { value: "VIRTUAL", label: "Virtual" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = date.toISOString();

    const eventToSubmit = {
      name,
      date: formattedDate,
      place,
      modality,
      user_id
    };

    if (editingEvent) {
      eventToSubmit.id = editingEvent.id;
      onEditEvent(eventToSubmit);
    } else {
      onAddEvent(eventToSubmit);
    }

    setName("");
    setDate("");
    setPlace("");
    setModality("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white w-96 rounded shadow-lg">
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-center">Create or edit the event</h2>
          <div>
            <label htmlFor="inputTitle" className="text-sm">
              Name:
            </label>
            <input
              type="text"
              id="inputTitle"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What is the name of your event?"
              className="block text-sm mt-1 py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="inputDate" className="text-sm">
              Date and Time:
            </label>

            <div className="flex items-center">
            <DatePicker
                id="inputDate"
                dateFormat="dd MMMM yyyy HH:mm:ss"
                selected={date instanceof Date ? date : new Date()}
                onChange={(selectedDate) => setDate(selectedDate)}
                placeholderText="Select a date and time"
                showTimeInput
                timeInputLabel="Time:"
                className="block text-sm mt-1 py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="inputPlace" className="text-sm">
              Place:
            </label>
            <input
              type="text"
              id="inputPlace"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="What is the place of your event?"
              className="block text-sm mt-1 py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="inputPlace" className="text-sm">
              Event Modality:
            </label>
            <select
              value={modality}
              onChange={(e) => setModality(e.target.value)}
              className="block text-sm mt-1 py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            >
              {options.map((data) => (
                <option key={data.value} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gray-100 p-4 flex justify-end">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded mr-2"
            onClick={handleClose}
          >
            Cerrar
          </button>

          <button
            className="text-white bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 font-bold py-2 px-4 rounded mr-2"
            onClick={handleSubmit}
          >
            {editingEvent ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventForm;
