const { getGuid } = require("@/common/functions");

const items = [
  {
    name: "Mike",
    phone: "+19680608071",
    createdAt: +new Date(),
    guid: getGuid()
  },
  {
    name: "Kosti222",
    phone: "+19680608022",
    guid: getGuid(),
    createdAt: +new Date(),
    updatedAt: null
  },
  {
    name: "Tony",
    phone: "+459680608022",
    guid: getGuid(),
    createdAt: +new Date(),
    updatedAt: null
  },
  {
    name: "James",
    phone: "+19929129129",
    createdAt: +new Date(),
    guid: getGuid(),
    updatedAt: null
  }
];

export default items;
