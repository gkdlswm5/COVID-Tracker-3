import React from "react";

import { Cards, Chart, CountryPicker } from "./Components";
import styles from "./App.module.css";
import { fetchData, fetchDailyData } from "./utils/api";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    fetchDailyData();

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    if (country === "global") {
      this.setState({ country: "" });
    } else {
      const fetchCountryData = await fetchData(country);
      this.setState({ data: fetchCountryData });
      this.setState({ country: country });
    }

    console.log(country);
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <h1>Covid Statistic</h1>
        <br />
        <br />
        <br />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
