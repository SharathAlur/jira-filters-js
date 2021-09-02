import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Graph from './Graph';
import Header from './Header';
import sampleData from '../mockData/assignment-sample-data';

const { records } = sampleData;

const filterData = records.reduce((acc, current) => {
  if (!acc.statusList.find(status => status === current.status)) {
    acc.statusList.push(current.status);
  }
  if (!acc.typeList.find(type => type === current.issue_type)) {
    acc.typeList.push(current.issue_type);
  }
  if (!acc.priorityList.find(priority => priority === current.priority)) {
    acc.priorityList.push(current.priority);
  }
  return acc;
}, {
  statusList: [],
  typeList: [],
  priorityList: []
});

const filterRecords = (filter) => (records.reduce((acc, current) => {
  const { assignee } = current;
  const tickets = acc[assignee] || 0;
  let statusMatched = filter.status ? filter.status === current.status : true;
  let typeMatched = filter.type ? filter.type === current.issue_type : true;
  let priorityMatched = filter.priority ? filter.priority === current.priority : true;

  if (statusMatched && typeMatched && priorityMatched) {
    acc[assignee] = tickets + 1;
  }
  return acc;
}, {}));

const jsonToArray = jsonData => {
  const data = [];
  for (const key in jsonData) {
    if (Object.hasOwnProperty.call(jsonData, key)) {
      data.push({
        assignee: key,
        tickets: jsonData[key]
      });
    }
  }
  return data;
}

function App() {
  const [filters, setFilters] = useState({
    status: 0,
    type: 0,
    priority: 0
  });
  const filteredRecords = filterRecords(filters);

  return (
    <Container>
      <Header statusList={filterData.statusList} typeList={filterData.typeList} priorityList={filterData.priorityList} setFilter={setFilters} />
      <Graph filteredData={jsonToArray(filteredRecords)} />
    </Container>
  );
}

export default App;
