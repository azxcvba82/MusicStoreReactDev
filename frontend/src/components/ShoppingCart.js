import React, { useState, useEffect } from 'react';
import ShoppingCartService from "../services/shoppingCart.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import {
  Notfound
} from ".";

// displays a page header

export default function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const fetchAlbumData = () => {
    ShoppingCartService.getProductsByProductName()
      .then((response) => {
        setIsLoading(false);
        setShoppingCart(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAlbumData();
  }, []);

  if (isLoading) {
    return <div class="loading">
    <FontAwesomeIcon icon={faCircleNotch}></FontAwesomeIcon>
  <span class="sr-only">Loading...</span>
</div>;
  }
  else if(isError===true){
    return (
      <div class="tabcontent eventMenu pb-3">
    <div class="h1 font-weight-bold title">我的購物車</div>
    <table class="table col-10 mx-auto mt-3 table-bordered text-center">
        <thead>
            <tr class="tableTitle">
                <th scope="col">訂單編號</th>
                <th scope="col">訂購日期</th>
                <th scope="col">專輯封面</th>
                <th scope="col">音樂名稱</th>
                <th scope="col">金額</th>
                <th scope="col">刪除</th>
            </tr>
        </thead>
        <tbody class="buyList">
        <tr><td class="bg-dark" colspan="6">您的購物車裡沒有任何東西喔</td></tr>
        </tbody>
    </table>
</div>
    );
  }
  return (
    
<div class="tabcontent eventMenu pb-3">
    <div class="h1 font-weight-bold title">我的購物車</div>
    <table class="table col-10 mx-auto mt-3 table-bordered text-center">
        <thead>
            <tr class="tableTitle">
                <th scope="col">訂單編號</th>
                <th scope="col">訂購日期</th>
                <th scope="col">專輯封面</th>
                <th scope="col">音樂名稱</th>
                <th scope="col">金額</th>
                <th scope="col">刪除</th>
            </tr>
        </thead>
        <tbody class="buyList">
        { shoppingCart.map((object, i) =>
                                <tr class="buyItem">
                                    <td class="cartId" data-name="Cid">
                                        {object.PurchaseItemID}
                                    </td>
                                    <td class="bg-dark" data-name="Member">
                                        <div>{object.Date}</div>
                                    </td>
                                    <td class="bg-dark"> <img src="" /></td>
                                    <td class="bg-dark" data-name="pName">
                                        <div>
                                        </div>
                                    </td>
                                    <td class="bg-dark" data-name="Price">

                                    </td>
            
                                    <td class="bg-dark">
                                        <input class="btn btn-primary" type="button" name="deletebtn" value="刪除" data-products="@item.fProductID" data-cartid="@item.fPurchaseItemID" />
                                    </td>
                                </tr>            
          )}
        </tbody>
    </table>
</div>

  );
}
