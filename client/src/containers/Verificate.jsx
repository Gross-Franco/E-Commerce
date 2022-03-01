import React from "react";
import { useState } from "react";

import {useParams} from "react-router-dom";


const Verificate = () => {
//   console [state,setState] = useState();
  const { ap } = useParams();

    return (
   <div>  <h1>
       Usuario a sido verficado:{ap}
         </h1>
    </div>
  );
};

export default Verificate;
