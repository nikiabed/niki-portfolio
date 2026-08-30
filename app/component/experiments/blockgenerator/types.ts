export type Building = {
  x:number;
  y:number;
  width:number;
  height:number;
};


export type UrbanBlock = {
  id:number;
  x:number;
  y:number;
  width:number;
  height:number;
  buildings:Building[];
};