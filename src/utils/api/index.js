import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableURL = url;

  if (country) {
    changeableURL = `${url}/countries/${country}`;
  }

  try {
    //  BELOW TWO ARE THE SAME

    //method 1
    // const response = await axios.get(url);

    //method 2
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableURL);

    const modifiedData = {
      confirmed: confirmed,
      recovered: recovered,
      deaths: deaths,
      lastUpdate: lastUpdate,
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(
      `https://api.covidtracking.com/v1/us/daily.json`
    );

    const modifiedData = data.map((dailyData) => ({
      date: new Date(dailyData.dateChecked).toDateString(),
      positive: dailyData.positive,
      deaths: dailyData.death,
    }));

    const reversedData = modifiedData.reverse();
    return reversedData;
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    // console.log(countries);

    return countries.map((country) => country.name);
  } catch (error) {}
};
