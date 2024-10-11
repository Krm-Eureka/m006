import endpoint from "../axios";

const PutManualRun = async (version, id, data) => {
  try {
    const res = await endpoint.put(
      `/api/v${version}/ProductionLine/${id}`,
      data
    );
    return res.data;
  } catch (err) {
    console.error(`Error Manual Run Serial ${data.serialNumber} : `, err);
    throw err;
  }
};

export { PutManualRun };
