import endpoint from "../axios";

const GetMasterSetting = async (version, productionLineID) => {
  console.log(`/api/v${version}/ProductionLine/${productionLineID}`);
  try {
    const res = await endpoint.get(`/api/v${version}/ProductionLine/${productionLineID}`);
    console.log(`MasterData ${productionLineID} : `, res.data);
    return res.data; // Return the data
  } catch (error) {
    console.error("Failed to fetch Data:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

const PutDMCSetting = async (version, id, data) => {
  console.log('v: ', version, '  id: ', id, '   data: ', data);
  
  try {
    const res = await endpoint.put(`/api/v${version}/ProductionLine/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating DMC Setting : ", err);
    throw err; // Rethrow the error for handling in the calling function
  }
};

export {
  GetMasterSetting,
  PutDMCSetting
};
