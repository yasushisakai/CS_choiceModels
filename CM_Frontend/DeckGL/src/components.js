// MAKE ALL TRACTS ARCS
export function allODarcs(TRACTSjson, OD) {
  console.log("MAKING ALL ARCS");
  let tractFeatures = TRACTSjson.features;
  const arcsArr = [];
  //create the arcs array
  for (let i = 0; i < OD.length; i++) {
    for (let j = 0; j < OD[i].length; j++) {
      if (OD[i][j].o !== OD[i][j].d && OD[i][j].P > 1) {
        arcsArr.push({
          source: [
            tractFeatures[OD[i][j].o].geometry.coordinates[0][0][0][0],
            tractFeatures[OD[i][j].o].geometry.coordinates[0][0][0][1]
          ],
          target: [
            tractFeatures[OD[i][j].d].geometry.coordinates[0][0][0][0],
            tractFeatures[OD[i][j].d].geometry.coordinates[0][0][0][1]
          ],
          P: OD[i][j].P,
          M: OD[i][j].m
        });
      }
    }
  }

  return arcsArr;
}

/////////////////////////

//make arcs from OD json
export function ODarcsForThisTract(tract, TRACTSjson, OD) {
  let tractFeatures = TRACTSjson.features;
  const arcsArr = [];
  // console.log("MAKING ARCS FOR TRACT", tract);
  let addToDestPoint = 0;

  // create the arcs array
  for (let i = 0; i < OD[tract].length; i++) {
    addToDestPoint++;
    if (OD[tract][i].o !== OD[tract][i].d && OD[tract][i].P > 0) {
      const firstPointInOrgTract =
        tractFeatures[OD[tract][i].o].geometry.coordinates[0][0][0];
      const firstPointInDesTract =
        tractFeatures[OD[tract][i].d].geometry.coordinates[0][0][0];

      arcsArr.push({
        source: [firstPointInOrgTract[0], firstPointInOrgTract[1]],
        target: [
          firstPointInDesTract[0] + addToDestPoint / 3000,
          firstPointInDesTract[1] + addToDestPoint / 3000
        ],
        P: OD[tract][i].P,
        M: OD[tract][i].m
      });
    }
  }
  return arcsArr;
}

/////////////////////////

export function parseCityIO(cityIOdata) {
  if (cityIOdata == null) return;
  //repalce with volpe actual loc
  const siteCord = [-71.0856854, 42.3640386];
  const textArr = [];
  let counter = 0;
  for (let i = 0; i < cityIOdata.header.spatial.ncols; i++) {
    for (let j = 0; j < cityIOdata.header.spatial.nrows; j++) {
      textArr.push({
        coordinates: [0.0001 * j + siteCord[0], 0.0001 * i + siteCord[1]],
        cellData: cityIOdata.grid[counter].toString()
      });
      counter++;
    }
  }
  return textArr;
}
