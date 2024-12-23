import endpoint from "../axios";

const getTraceabilityDataWithDate = (version, start, end, SN, SET) => {
  const getData = async () => {
    const url =
      SN !== null
        ? `/api/v${version}/AcousticTraceLog/GetByDateRange?startDate=${start}&endDate=${end}&serialCode=${encodeURIComponent(
          SN
        )}`
        : `/api/v${version}/AcousticTraceLog/GetByDateRange?startDate=${start}&endDate=${end}`;

    // console.log(url);

    try {
      const res = await endpoint.get(url);
      // console.log("getTraceabilityDataWithDate :", res.data);
      SET(res.data.data);
    } catch (error) {
      console.error("Failed to fetch Data:", error);
      if (error.response) {
        console.error("Error Status:", error.response.status);
        console.error("Error Data:", error.response.data);
      }
    }
  };

  getData();
};
const getAcousticTraceLogBySerialNo = async (version, SN, SET) => {
  console.log(SN);

  if (SN === " ") {
    console.error("Serial number is required");
    console.log("Serial number is required");
    return [];
  } else {
    const url = `/api/v${version}/AcousticTraceLog/GetAcousticTraceLogBySerialNo/${encodeURIComponent(
      SN
    )}`;
    console.log(url);

    try {
      const res = await endpoint.get(url);
      console.log("getAcousticTraceLogBySerialNo : ", [res.data.data]);
      SET([res.data.data]);
      return res.data.data;
    } catch (error) {
      console.error("Failed to fetch Data:", error);
      return [];
    }
  }
};
const newRetest = async (version, NewNo, SET) => {
  console.log(NewNo);

  if (NewNo === "") {
    console.error("Serial number is required");
    console.log("Serial number is required");
    return [];
  } else {
    const url = `/api/v1/AcousticTraceLog/GetLastRetestAcousticTraceLog`;
    console.log(url);
    try {
      const res = await endpoint.get(url);
      console.log("newRetest : ", res.data.data);

      SET(res.data.data);
      return res.data.data;
    } catch (error) {
      console.error("Failed to fetch Data:", error);
      return [];
    }
  }
};

const SetReTestAcousticTracLogById = async (version, data) => {
  if (data === null) {
    console.error("Data is required for retest");
    return;
  }

  const url = `/api/v${version}/AcousticTraceLog/SetReTestAcousticTracLogById`;

  try {
    console.log("Sending request to:", url);
    const res = await endpoint.put(url, data);
    console.log('SetReTestAcousticTracLogById : ', res.data.data);

    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch Data:", error);
    console.error('SetReTestAcousticTracLogById : ', error.response.data.Message);
    return error.response.data.Message
  }
};

const traceabilityService = {
  getTraceabilityDataWithDate,
  getAcousticTraceLogBySerialNo,
  SetReTestAcousticTracLogById,
  newRetest,
};

export default traceabilityService;
