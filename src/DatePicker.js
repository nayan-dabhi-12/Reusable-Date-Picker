import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const recurrenceOptions = ["None", "Daily", "Weekly", "Monthly", "Custom"];

const DatePickerWithRecurrence = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [recurrenceType, setRecurrenceType] = useState("None");
  const [endDate, setEndDate] = useState(null); // For range selection
  const [customInterval, setCustomInterval] = useState(1); // Custom recurrence interval (days)
  
  // Handle date change for single date or range
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle date range change
  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setSelectedDate(start);
    setEndDate(end);
  };

  // Handle recurrence selection change
  const handleRecurrenceChange = (e) => {
    setRecurrenceType(e.target.value);
  };

  // Handle custom interval input change
  const handleCustomIntervalChange = (e) => {
    setCustomInterval(Number(e.target.value));
  };

  // Function to calculate recurring dates with day names
  const getRecurringDates = () => {
    if (!selectedDate || !endDate) return [];

    const start = moment(selectedDate);
    const end = moment(endDate);
    let recurringDates = [start.clone()];

    if (recurrenceType === "None") {
      return recurringDates;
    }

    let currentDate = start.clone();
    
    while (currentDate.isBefore(end)) {
      if (recurrenceType === "Daily") {
        currentDate.add(1, "days");
      } else if (recurrenceType === "Weekly") {
        currentDate.add(1, "weeks");
      } else if (recurrenceType === "Monthly") {
        currentDate.add(1, "months");
      } else if (recurrenceType === "Custom") {
        currentDate.add(customInterval, "days");
      }

      if (currentDate.isBefore(end) || currentDate.isSame(end)) {
        recurringDates.push(currentDate.clone());
      }
    }

    return recurringDates;
  };

  return (
    <div className="date-picker-container">
      <h2>Date Picker with Recurrence</h2>

      {/* Date Picker for single date or range */}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateRangeChange}
        startDate={selectedDate}
        endDate={endDate}
        selectsRange={true} // Allows range selection
        inline
      />

      {/* Recurrence selection */}
      <div className="recurrence-options">
        <label>Recurrence: </label>
        <select value={recurrenceType} onChange={handleRecurrenceChange}>
          {recurrenceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Custom interval input */}
      {recurrenceType === "Custom" && (
        <div className="custom-interval">
          <label>Interval (days): </label>
          <input
            type="number"
            value={customInterval}
            onChange={handleCustomIntervalChange}
            min="1"
          />
        </div>
      )}

      {/* Display recurring dates with day names */}
      <div className="recurring-dates">
        <h3>Recurring Dates</h3>
        <ul>
          {getRecurringDates().map((date, index) => (
            <li key={index}>
              {date.format("dddd, YYYY-MM-DD")} {/* Display Day (e.g., Monday) and Date */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DatePickerWithRecurrence;
