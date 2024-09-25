import endpoint from "../axios";

const GetMasterSetting = (version, productionLineID, SET, LOADING)=>{
  console.log(`/api/v${version}/ProductionLine/${productionLineID}`);
  const getData = async () => {
    try {
      const res = await endpoint.get(
        `/api/v${version}/ProductionLine/${productionLineID}`
      );
      console.log(`MasterData ${productionLineID} : `, res.data);

      SET(res.data.data);
      {
        res.data.succeeded && res.data.succeeded === true
          ? LOADING(false)
          : LOADING(true);
      }
    }catch (error) {
        console.error("Failed to fetch Data:", error);
        throw error;
      }
  };
  getData();
}

const PutDMCSetting = async(version , id, data)=>{
  console.log('v: ',version,'  id: ',id,'   data: ',data);
  
  try{
    const res = await endpoint.put(`/api/v${version}/ProductionLine/${id}`, data)
    return res.data
  }catch(err){
    console.error("Error updating DMC Setting : ",err);
    console.log(err);
    
    throw err
    
  }
  
}
export {
    GetMasterSetting,
    PutDMCSetting
}

