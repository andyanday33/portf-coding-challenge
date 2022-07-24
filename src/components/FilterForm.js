import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

export default function FilterForm({ setFilteredData, unfilteredDataRef }) {
    const [startDate, setStartDate] = useState(new Date('Jan 2004'));
    const [endDate, setEndDate] = useState(new Date()); // Today's date

    useEffect(() => {
        console.log(startDate);
        console.log(endDate);
        if (unfilteredDataRef.current && unfilteredDataRef.current.length > 0) {
            const filteredData = unfilteredDataRef.current.filter(beer => {
                const date = new Date(beer.date);
                return date >= startDate && date <= endDate;
            });
            setFilteredData(filteredData);
        }

    }, [startDate, endDate, unfilteredDataRef, setFilteredData]);
  return (
    <div id="filter-form">
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <span> - </span>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
    </div>
  )
}
