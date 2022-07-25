import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

/**
 * A filter form consisting of multiple filter inputs.
 * Filters the raw data based on the values of the inputs.
 * 
 * @param {React.ComponentProps} props a prop object
 * containing the raw unfiltered data and setState function of the
 * filtered data.
 * @returns {JSX.Element} A React component that displays a filter form.
 */
export default function FilterForm({ setFilteredData, unfilteredDataRef }) {
  const [startDate, setStartDate] = useState(new Date('Jan 2004'));
  const [endDate, setEndDate] = useState(new Date()); // Today's date
  const ABVRef = useRef(null);

  useEffect(() => {
    if (unfilteredDataRef.current && unfilteredDataRef.current.length > 0) {
      // Date filtering
      let filteredData = unfilteredDataRef.current.filter(beer => {
        const date = new Date(beer.date);
        return date >= startDate && date <= endDate;
      });
      // ABV filtering
      let abv = ABVRef?.current?.value;
      if(abv) {
        filteredData = filteredData.filter(beer => {
          return +beer.abv >= +abv;
        });
      }
      
      setFilteredData(filteredData);
    }

  }, [startDate, endDate, unfilteredDataRef, setFilteredData]);

  const handleABVFilterChange = (e) => {
    let abv = e.target.value;
    // ABV filtering
    let filteredData = unfilteredDataRef.current.filter(beer => {
      return +beer.abv >= +abv;
    });
    // Date filtering
    filteredData = filteredData.filter(beer => {
      const date = new Date(beer.date);
      return date >= startDate && date <= endDate;
    });
    setFilteredData(filteredData);
  }

return (
  <section className="filter-form">
    <h2 style={{gridColumn: '1 / span 2', textAlign: 'center'}}>Filter Data</h2>
    {/* Start and End date filter */}
    <section className="date-filter">
      <label>Start Date</label>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <label>End Date</label>
      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
    </section>
    {/* Minimum ABV Filter */}
    <section className="ABV-filter">
      <label>ABV:</label>
      <input ref={ABVRef} type="number" onChange={handleABVFilterChange} />
    </section>
      
  </section>
)
}
