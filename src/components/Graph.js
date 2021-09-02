import React from 'react';
import { Chart } from "react-charts";



const Graph = ({ filteredData }) => {
  const data = [{
    label: 'Assignements',
    data: filteredData
  }];

  const primaryAxis = ({
    getValue: (datum) => datum.assignee,
  });

  const secondaryAxes = React.useMemo(
    () => [{
      getValue: (datum) => datum.tickets,
    }],
    []
  );
  return (
    <div style={{ margin: 20 }}>
      <div
        style={{
          width: '100%',
          height: '300px',
          boxShadow: "0 20px 40px rgba(0,0,0,.1)",
        }}
      >
        {/* <ResizableBox> */}
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
        {/* </ResizableBox> */}
      </div>
    </div>
  );
}

export default Graph;