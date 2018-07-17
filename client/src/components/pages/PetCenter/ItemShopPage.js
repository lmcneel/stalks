import React, {Component} from 'react';
import ItemShop from '../../PetCenter/ItemShop';
import {PetStats} from '../../PetStats/PetStats';


const ItemShopPage = () => (
<div style={{'display': 'contents'}}>
<PetStats/>
<ItemShop/>
</div>
);


export default ItemShopPage;
