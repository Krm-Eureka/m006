import endpoint from "../axios";

const getTraceabilityDataWithDate = (version, start, end, SET) => {
  const getData = async () => {
    console.log(
      `/api/v${version}/AcousticTraceLog/GetByDateRange?startDate=${encodeURIComponent(
        start
      )}&endDate=${encodeURIComponent(end)}`
    );

    try {
      const res = await endpoint.get(
        `/api/v${version}/AcousticTraceLog/GetByDateRange?startDate=${encodeURIComponent(
          start
        )}&endDate=${encodeURIComponent(end)}`
      );
      SET(res.data.data);
    } catch (error) {
      console.error("Failed to fetch Data:", error);
    }
  };
  getData();
};

export default getTraceabilityDataWithDate;
