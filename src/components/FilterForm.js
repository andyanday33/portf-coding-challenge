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
            console.log('filtering data');
            const filteredData = unfilteredDataRef.current.filter(beer => {
                const date = new Date(beer.date);
                return date >= startDate && date <= endDate;
            });
            setFilteredData(filteredData);
        }

    }, [startDate, endDate, unfilteredDataRef, setFilteredData]);

    const handleABVFilterChange = (e) => {
        const abv = e.target.value;
        const filteredData = unfilteredDataRef.current.filter(beer => {
            return +beer.abv >= +abv;
        });
        setFilteredData(filteredData);
    }

  return (
    <section class="filter-form">
        <section class="date-filter">
            <label>Start Date</label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <span> - </span>
            <label>End Date</label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </section>
        <section class="ABV-filter">
            <label>ABV:</label>
            <input type="number" onChange={handleABVFilterChange} />
        </section>
        
    </section>
  )
}
