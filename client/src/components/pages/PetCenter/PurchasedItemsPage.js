import React, { Component } from "react";
import PurchasedItems from '../../PetCenter/PurchasedItems';
import {PetStats} from '../../PetStats/PetStats';



const PurchasedItemsPage = () => { return(
<div style={{'display':'contents'}}> 
<PetStats/>
<PurchasedItems/>
</div>
)};


export default PurchasedItemsPage;