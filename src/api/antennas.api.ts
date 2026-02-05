import { AntenaSchema, type Antena } from "../types/antenna.type";

const API_BASE_URL: string =
    "https://6823c58065ba05803397d6df.mockapi.io/api/v1";
const ANTENNAS_ENDPOINT: string = `${API_BASE_URL}/antennas`;

export async function apiGetAntennas(): Promise<Antena[]>{
   const response: Response = await fetch(ANTENNAS_ENDPOINT);
   if(!response.ok){
      throw new Error(`GET Antenas failed: ${response.status}`);
   }      

   const data: unknown = await response.json();

   if(!Array.isArray(data)){
     throw new Error("Invalid antenas response: expected array");
   }

   const parsed: Antena[] = data.map((item: unknown) => AntenaSchema.parse(item));
return parsed;
}
