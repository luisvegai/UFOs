// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
};

// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  let dateObj = d3.select("#datetime");
  let cityObj = d3.select("#city");
  let stateObj = d3.select("#state");
  let countryObj = d3.select("#country");
  let shapeObj = d3.select("#shape");
  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object

  if (dateObj.property("value")) {
    dateValue = dateObj.property("value");
    filters.dateFilt = ["datetime",dateValue];
  };

  if (cityObj.property("value")) {
    cityValue = cityObj.property("value");
    cityValue = cityValue.trim().toLowerCase();
    filters.cityFilt = ["city",cityValue];
  };

  if (stateObj.property("value")) {
    stateValue = stateObj.property("value");
    stateValue = stateValue.trim().toLowerCase();
    filters.stateFilt = ["state",stateValue];
  };

  if (countryObj.property("value")) {
    countryValue = countryObj.property("value");
    countryValue = countryValue.trim().toLowerCase();
    filters.countryFilt = ["country",countryValue];
  };

  if (shapeObj.property("value")) {
    shapeValue = shapeObj.property("value");
    shapeValue = shapeValue.trim().toLowerCase();
    filters.shapeFilt = ["shape",shapeValue];
  };

  // Call function to apply all filters and rebuild the table
  filterTable(filters);
};

function filterTable(filters) {

  // Set the filteredData to the tableData
  let filteredData = tableData;
  filterArray = Object.keys(filters);
  // Loop through all of the filters and keep any data that
  // matches the filter values
  for (let i = 0; i < Object.keys(filters).length; i++) {
    filterKey = filterArray[i];
    rowDat = filters[filterKey][0];
    value = filters[filterKey][1];
    if (rowDat === "datetime") {
        filteredData = filteredData.filter(row => row.datetime === value);
    };
    if (rowDat == "city") {
        filteredData = filteredData.filter(row => row.city === value);
    };
    if (rowDat == "state") {
        filteredData = filteredData.filter(row => row.state === value);
    };
    if (rowDat == "country") {
        filteredData = filteredData.filter(row => row.country === value);
    };
    if (rowDat == "shape") {
        filteredData = filteredData.filter(row => row.shape === value);
    };

  };

  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
};

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("#filter-btn").on("click",updateFilters);

d3.select("#reset-btn").on("click", () => {
    tbody.html("");
    filters = {};
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");
    
        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
          let cell = row.append("td");
          cell.text(val);
        });
      });
    // console.log("Reseting Table");
});

// Build the table when the page loads
buildTable(tableData);
