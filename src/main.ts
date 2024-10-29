import data from "./data";
import api from "./api";

export default (async () => {    
    await data.init();
    await api.init();
})()



