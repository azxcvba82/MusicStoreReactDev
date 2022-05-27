import React from "react";

// displays a page header

export default function MyAlbumList() {
  return (
    
<div id="wrapper">
    <div className="myMenu">
        <ul className="tab_btns">
            <li className="on nav-item"><a className="nav-link active" onclick="tab_switch(this)" data-div="#tab_contents1">我的專輯</a></li>
            <li className="nav-item"><a className="nav-link" onclick="tab_switch(this)" data-div="#tab_contents1">新增專輯</a></li>
            <li className="nav-item"><a className="nav-link" onclick="tab_switch(this)" data-div="#tab_contents1">販售統計</a></li>
            <li className="nav-item"><a className="nav-link" onclick="tab_switch(this)" data-div="#tab_contents1">單曲總覽</a></li>
        </ul>
    </div>
    <div className="tab_container">
        <script>
        </script>
        <ul className="tab_contents" id="tab_contents1">
            <li>
                <div className="section__content section__content--p30">


                </div>
            </li>
            <li>
                <div className="section__content section__content--p30">
                </div>
            </li>
            <li>
                <div className="headtitle h1 font-weight-bold">我的專輯統計資料</div>
                <div className="section__content section__content--p30">
                </div>
            </li>
            <li>
                <div className="headtitle h1 font-weight-bold">單曲列表</div>
                <div className="section__content section__content--p30">
                </div>
            </li>
        </ul>
    </div>
</div>

  );
}
