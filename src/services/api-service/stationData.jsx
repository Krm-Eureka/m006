import endpoint from "../axios";

export function GetLastAcousticTraceLog(version, productionLineID, SET, LOADING) {
  console.log(`/api/v${version}/AcousticTraceLog/GetLastAcousticTraceLog/${productionLineID}`);
  const getData = async () => {
    try {
      const res = await endpoint.get(
        `/api/v${version}/AcousticTraceLog/GetLastAcousticTraceLog/${productionLineID}`
      );
      console.log(`LastActTrace ${productionLineID} : `, res.data);

      SET(res.data.data);
      LOADING(false);
    } catch (error) {
      console.error("Failed to fetch Data:", error);
    }
    // finally {
    //   LOADING(false);
    // }
  };
  getData();
}
