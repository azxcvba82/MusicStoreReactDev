import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import spiderfly from './images/spiderfly.png';
import random from './PlayerImg/random.png';
import prev from './PlayerImg/prev.png';
import play from './PlayerImg/play.png';
import pause from './PlayerImg/pause.png';
import next from './PlayerImg/next.png';
import replay from './PlayerImg/replay.png';
import sound from './PlayerImg/sound.png';
import mute from './PlayerImg/mute.png';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <html>
    <head>
    <title>SpiderFly</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>

    {/* @* ↓主要用來讀取一些特殊icon *@ */}

    <script src="https://kit.fontawesome.com/a076d05399.js"></script>

    {/* @* 測試兩版本jquery的共用性，如出意外先刪除下面那行並解除上面那行註解 *@
    @* 目前已知差別，使用let時下面那個不能重複宣告而上面可以 *@ */}
    @*<script src="https://code.jquery.com/jquery-1.12.4.js"></script>*@
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>

    {/* @* 聖開的 *@
    @RenderSection("styles", required: false) */}
    <script src="https://www.paypal.com/sdk/js?client-id=AQkR_scjhSlBeRrg9DRBwj6ucqCTQcWwhAslnfMYoX7d8P1vgt8syXR7lSwHjWdL6E36RGLoDo5MYD_n&intent=authorize&currency=TWD">
        // Required. Replace SB_CLIENT_ID with your sandbox client ID.
    </script>


    </head>
    <body>
    {/* @* 播放清單相關畫面 *@ */}
    <div class="playListSwitch s1">
        <i class="fa fa-caret-left"></i>
    </div>

    <div class="playListPanel">
        <div class="playListSwitch s2">
            <i class="fa fa-caret-right"></i>
        </div>
        <div class="playList">

                <div class="noLogin">
                    <div class="h5">您尚未<span class="playlistLogin">登入</span>喔</div>
                    <div><span class="playlistLogon">點我註冊</span>以享受SpyderFly的音樂服務!</div>
                </div>

            <div class="playListPartialView">
            </div>
        </div>
    </div>

    {/* @* 測試modal *@ */}
    <div id="modal">
        <div id="modalContent">
            {/* @* 這裡的內容隨按鍵改變而讀取 *@ */}
        </div>
    </div>

    <div class="header">
        <a class="link" href="">
            <div class="header-logo">
                <img src={spiderfly}/>
            </div>
        </a>

        {/* @* 搜尋條--套用bootstrap(input-group) *@ */}
        <div class="searchBar">
            {/* @* 基本搜尋條(結合進階搜尋鍵) *@ */}
            <div class="input-group">
                <input class="searchtxt form-control" type="text" placeholder="搜尋歌曲..." name="basicSearch"/>
                <div class="input-group-append">
                    <div class="btn btn-outline-secondary" id="advancedBtn">進階搜尋</div>
                    <div class="btn btn-outline-secondary searchBtn">
                        <i class="fa fa-search"></i>
                    </div>
                </div>
            </div>

            {/* @* 進階搜尋面板 *@ */}
            <div class="advancedPanel">
                <div class="advancedItemGroup">
                    <div class="advancedItem">
                        歌曲名稱
                        <input type="text" class="advancedtxt form-control" id="adSong" />
                    </div>
                    <div class="advancedItem">
                        專輯名稱
                        <input type="text" class="advancedtxt form-control" id="adAlbum" />
                    </div>
                    <div class="advancedItem">
                        歌手
                        <input type="text" class="advancedtxt form-control" id="adSinger" />
                    </div>
                    <div class="advancedItem">
                        團體名稱
                        <input type="text" class="advancedtxt form-control" id="adGroup" />
                    </div>
                    <div class="advancedItem">
                        作曲者
                        <input type="text" class="advancedtxt form-control" id="adComposer" />
                    </div>
                    <div class="advancedItem">
                        發行類別
                        <select class="advancedtxt form-control" id="adType">
                            {/* @* 網頁初始化時會在這裡更新搜尋的類別 *@ */}
                        </select>
                    </div>
                </div>

                {/* @* 這邊放自選類別 *@ */}
                <div class="typeSelectGroup">
                    {/* @* 選擇想要的類別 *@ */}
                    <div class="typeSelect advancedSelect">
                        {/* 偏好的曲風 */}
                        <div class="advancedBlock">
                            {/* @* 網頁初始化時會在這裡更新曲風與增加鈕 *@ */}
                        </div>

                        {/* @* 點選+號後會出現的type選擇表，位置應在+號正下方 *@ */}
                        <div class="selectableItemPanel">
                            {/* @* 網頁初始化時會在這裡更新曲風 *@ */}
                        </div>
                    </div>

                    {/* @* 進階搜尋鍵 *@ */}
                    <div class="searchPanel">
                        <button class="btn btn-primary adSearchBtn">搜尋</button>
                    </div>
                </div>
            </div>
        </div>

        {/* @* 登入註冊鍵 *@ */}
        <div class="header-button">
                {/* //登入後會顯示的會員頭像，待修正 */}


                    <div id="logonInterface" class="btn btn-outline-secondary">註冊</div>
                    <div id="loginInterface" class="btn btn-outline-secondary">登入</div>

        </div>
    </div>

    <div id="content">
    {/* 邊條選項欄 */}
        <div class="sidebox">
            <ul>
                <li>
                    <a href="">
                        <div class="menuItem">
                            <i class="fa fa-home"></i>
                            <span>首頁</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <div class="menuItem">
                            <i class="fa fa-search"></i>
                            <span>音樂分類</span>
                        </div>
                    </a>
                </li>

                {/* <li>
                        <a href="@Url.Action("TwoPlayer", "Player")">
                            <div class="menuItem">
                                <i class="fa fa-headphones"></i>
                                <span>雙重播放器測試</span>
                            </div>
                        </a>
                    </li> */}

            </ul>
        </div>

        {/* 內容主體 */}
        <div class="mainbox">
        <link href="~/Content/bootstrap.css" rel="stylesheet" />

        <div class="h3 mx-5 mt-5 font-weight-bold">最新音樂</div>
        <div class="albumPanel">

        </div>
        <script src="~/Scripts/bootstrap.js"></script>
        
        </div>

        {/* 播放器 */}

        <div id="footer">
            <div id="playerPanel">
                {/* 封面與歌名div */}

                <figure id="playerfigure">
                    <img id="playercover" class="playerCover"/>
                </figure>

                <div id="titlePanel">
                    <span class="album description"></span><br />
                    <span id="Descriptiontwo" class="music descriptionSub"></span><br />
                    <span id="singer" class="singer descriptionSub"></span>
                </div>
                {/* 基本按鍵div */}
                <div id="btnPanel">
                    <div id="random" class="btn"><img src={random}/></div>
                    <div id="prev" class="btn"><img src={prev}/></div>
                    <div id="play" class="btn"><img src={play}/></div>
                    <div id="pause" class="btn"><img src={pause}/></div>
                    <div id="next" class="btn"><img src={next}/></div>
                    <div id="replay" class="btn"><img src={replay}/></div>
                </div>

                {/* 進度條div */}
                <div id="progressPanel">
                    <span id="nowTime">00:00</span>
                    <input id="progress" type="range" min="0" max="100" step="0.01" value="0"/>
                    <span id="totalTime">00:00</span>
                </div>

                {/* 音量條div */}
                <div id="volumePanel">
                    <img src={sound} data-sound="volumeImg" id="volumeImg" class="sound"/>
                    <img src={mute} data-sound="muteImg" id="muteImg" class="sound"/>
                    <input id="volumeBar" type="range" min="0" max="1" step="0.01" value="0.5"/>
                </div>

                {/* 播放器本體 */}
                <audio id="mainPlayer" src=""></audio>
            </div>
        </div>
    </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>



    </body>
    </html>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
