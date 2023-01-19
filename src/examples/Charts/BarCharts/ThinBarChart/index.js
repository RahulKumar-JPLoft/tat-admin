import { useMemo, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes, { array } from "prop-types";

// react-chartjs-2 components
import { Bar } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// ThinBarChart configuration
import configs from "examples/Charts/BarCharts/ThinBarChart/configs";
import { Grid } from "@mui/material";

function ThinBarChart({ color, title, height, chart, setFilterGraph ,SetSelectYear }) {
  const { data, options } = configs(
    color,
    chart.labels || [],
    chart.datasets || {}
  );


  let currentYear = new Date().getFullYear();
      let arrayd = []
      for(let  i= 2001 ;i<=currentYear ; i++)
      {
          arrayd = arrayd.concat(i)    
      }
      
  const renderChart = (
    <SuiBox p={2} mb={2}>
      {title && (
        <SuiBox mb={1}>
          <SuiTypography variant="h6" color={color}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                {title}
              </Grid>
              <Grid item xs={12} sm={3}>
                <select
                defaultValue={currentYear}
                  className="form-control"
                  onChange={(e) => SetSelectYear(e.target.value)}
                >
                  <option value='' selected="selected">Selected</option>
                 {
                   arrayd && arrayd.length > 0 ? arrayd.map((val)=>(
                     <option value={val}>{val}</option>
                   )) : ""
                 }
                  
                </select>
              </Grid>


              <Grid item xs={12} sm={3}>
                <select
                  className="form-control"
                  onChange={(e) => setFilterGraph(e.target.value)}
                >
                  <option value='' selected="selected">Select Month</option>
                  <option value="jan">Jan</option>
                  <option value="fab">Feb</option>
                  <option value="mar">Mar</option>
                  <option value="apr">Apr</option>
                  <option value="may">May</option>
                  <option value="jun">Jun</option>
                  <option value="aug">Aug</option>
                  <option value="sep">Sep</option>
                  <option value="oct">Oct</option>
                  <option value="nov">Nov</option>
                  <option value="dec">Dec</option>
                </select>
              </Grid>
            </Grid>
          </SuiTypography>
        </SuiBox>
      )}
      {useMemo(
        () => (
          <SuiBox height="26rem" pt={2}>
            <Bar data={data} options={options} />
          </SuiBox>
        ),
        [chart]
      )}
    </SuiBox>
  );

  return title ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of ThinBarChart
ThinBarChart.defaultProps = {
  color: "dark",
  title: "",
  height: "36rem",
};

// Typechecking props for the ThinBarChart
ThinBarChart.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.string,
  chart: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string])
    ).isRequired,
  }).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ThinBarChart;
