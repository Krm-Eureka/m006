import endpoint from "../axios";

const GetMasterSetting = async (version, productionLineID,SET,LOADING) => {
  console.log(`/api/v${version}/ProductionLine/${productionLineID}`);
  try {
    const res = await endpoint.get(`/api/v${version}/ProductionLine/${productionLineID}`);
    console.log(`MasterData ${productionLineID} : `, res.data);
    SET(res.data.data)
    {
      res.data.succeeded && res.data.succeeded === true
        ? LOADING(false)
        : LOADING(true);
    }
    return res.data;
    
  } catch (error) {
    console.error("Failed to fetch Data:", error);
    throw error; 
  }
};

const PutDMCSetting = async (version, id, data) => {
  console.log('v: ', version, '  id: ', id, '   data: ', data);
  
  try {
    const res = await endpoint.put(`/api/v${version}/ProductionLine/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating DMC Setting : ", err);
    throw err;
  }
};
const PutParameterSetting = async (version, id, data) => {
  console.log('v: ', version, '  id: ', id, '   data: ', data);
  
  try {
    const res = await endpoint.put(`/api/v${version}/ProductionLine/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating DMC Setting : ", err);
    throw err;
  }
};

export {
  GetMasterSetting,
  PutDMCSetting,
  PutParameterSetting
};
