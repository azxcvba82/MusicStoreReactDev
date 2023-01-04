import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import React, { useState,useCallback, useEffect } from "react";
import {
  Header,
  Mainbox,
  Kind,
  Modal,
  Verify,
  Album,
  MyAlbumList,
  Notfound,
  KindResult,
  Search,
  MyMusic,
  ShoppingCart
} from "./components";
import SearchService from "./services/search.service";
import KindService from "./services/kind.service";
import AlbumService from "./services/album.service";
import StorageService from "./services/storage.service";
import LoginService from "./services/login.service";

 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faSearch,faHome,faCaretLeft,faCaretRight,faHeadphones,faMusic,faPlus,faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import spiderfly from './images/spiderfly.png';
import random from './PlayerImg/random.png';
import prev from './PlayerImg/prev.png';
import play from './PlayerImg/play.png';
import pause from './PlayerImg/pause.png';
import next from './PlayerImg/next.png';
import replay from './PlayerImg/replay.png';
import sound from './PlayerImg/sound.png';
import mute from './PlayerImg/mute.png';

function App() {
  let [volumeValueSave, setVolumeSave] = useState(0.5);
  let [displayModalInterface, setModalInterface] = useState("none");
  let [displayModalEffect, setModalEffect] = useState(false);
  let [displayModalConponent, setModalConponent] = useState("");
  let [displayModalMessage, setModalMessage] = useState("");
  const [isPlayListOpen, setPlayListOpen] = useState(false);
  const [isAdvancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [isItemAddOpen, setItemAddOpen] = useState(false);
  let [displayPlay, setDisplayPlay] = useState("none");
  let [displayPause, setDisplayPause] = useState("inline-block");
  let [displayMute, setDisplayMute] = useState("none");
  let [displayVolume, setDisplayVolume] = useState("inline-block");
  let [disContextmenu, setContextmenu] = useState("none");
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  let [playingItem, setPlayingItem] = useState(-1);
  const [playList, setPlayList] = useState([]);
  let [selectedProductId, setSelectedProductId] = useState(-1);
  let [volumeValue, setVolume] = useState(0.5);
  let [volumeBar, setDisplayVolumeBar] = useState("-webkit-linear-gradient(left , #5599FF 50%,#fff 0px)");
  let [menuItemSelected, setMenuItemSelected] = useState(0);
  const [albumType, setAlbumType] = useState([]);
  const [kinds, setKind] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [userName, setUserName] = useState("");
  const userOnLocalStorage = JSON.parse(localStorage.getItem("user"));

  //player
  let [album, setAlbum] = useState("");
  let [descriptiontwo, setDescriptiontwo] = useState("");
  let [singer, setSinger] = useState("");
  let [songcover, setSongcover] = useState("");

  const checkFragments = () => {
    const { hash } = window.location;
    if(!hash.startsWith("#")){
        return;
    }
    const result = {};
    const query = hash.replace("#","");
    query.split('&').forEach(function(part) {
        const item = part.split('=');
        result[item[0]] = decodeURIComponent(item[1]);
      });
    ssoLogin(result.state,result.id_token);

    // clear fragments
    //window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };
  const ssoLogin = (stateBase64, idTokenBase64) => {
    LoginService.ssoLogin(stateBase64, idTokenBase64)
      .then((response) => {
        localStorage.setItem("user",JSON.stringify({account: response.data.account,token: response.data.token,expiresAt: response.data.expiresAt}));
        setUserName(response.data.account);
        fetchUserPlayList();
        setModalConponent("")
        setTimeout(function () {
            setModalEffect(false);
        }, 10)
        setTimeout(function () {
            setModalInterface("none");
        }, 500)
      })
      .catch((error) => {
        setModalInterface("block");
        setModalEffect(true);
        setModalConponent("error")
        setModalMessage("not valid user")
        console.log(error);
      });
  };
  const fetchAlbumTypeData = () => {
    SearchService.allAlbumType()
      .then((response) => {
        setAlbumType(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchKindData = () => {
    KindService.allkind()
      .then((response) => {
        setKind(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchUserPlayList = () => {
    AlbumService.getPlayListByAccount()
      .then((response) => {
        setPlayList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const postPlayListData = (id) => {
    AlbumService.deletePlayLists(id)
      .then((response) => {
        fetchUserPlayList();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkTokenExpire = () => {
    if(userOnLocalStorage && userOnLocalStorage?.token != ""){
        let currentTime = Math.floor(new Date().getTime()/1000);
        let expireTime = Math.floor(new Date(userOnLocalStorage.expiresAt).getTime()/1000);
        let expireDuration = expireTime -currentTime;
        if(expireDuration < 0){
            localStorage.setItem("user",JSON.stringify({account: '',token: ''}));
            setUserName("");
        }else{
            setUserName(userOnLocalStorage.account);
            fetchUserPlayList();
        }
    }
  };
  useEffect(() => {
    checkFragments();
    fetchAlbumTypeData();
    fetchKindData()
    checkTokenExpire();
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
        document.removeEventListener("click", handleClick);
        document.removeEventListener("contextmenu", handleContextMenu);
      };
  }, []);

  const handleContextMenu = useCallback(
    (event) => {
    if(event.target.classList.contains("playListItem") ||
    event.target.parentElement.classList.contains("playListItem") ||
    event.target.parentElement.parentElement.classList.contains("playListItem")){
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setContextmenu("block")
      if(event.target.dataset.soid !== undefined){
        setSelectedProductId(event.target.dataset.soid);
      }
      else if(event.target.parentElement.dataset.soid !== undefined){
        setSelectedProductId(event.target.parentElement.dataset.soid);
      }
      else if(event.target.parentElement.parentElement.dataset.soid !== undefined){
        setSelectedProductId(event.target.parentElement.parentElement.dataset.soid);
      }
    }
    },
    [setAnchorPoint]
  );

  const handleClick = useCallback((event) => {
    if(event.target.classList.contains("playListItem") ||
    event.target.parentElement.classList.contains("playListItem") ||
    event.target.parentElement.parentElement.classList.contains("playListItem")){
    }else{
        setContextmenu("none")
    }
}, []);

const handleItemDelete = () => {
    if(selectedProductId !== undefined && selectedProductId !== -1){
    postPlayListData(selectedProductId);
    }
  };

  const handlePlayListSwitchOnClick = e => {
    setPlayListOpen(!isPlayListOpen);
  };
  const handleAdvancedSearchOnClick = e => {
    setAdvancedSearchOpen(!isAdvancedSearchOpen);
  };
  const handleItemAddOnClick = e => {
    setItemAddOpen(!isItemAddOpen);
  };
  const handleVolumeOnChange = e => {
    setVolume(e.target.value);
    let v = e.target.value * 100;
    setDisplayVolumeBar(`-webkit-linear-gradient(left , #5599FF ${v}%,#fff 0px)`)
    if (e.target.value < 0.01) {
      setDisplayVolume("none")
      setDisplayMute("inline-block")
    }
    else {
      setDisplayVolume("inline-block")
      setDisplayMute("none")
    }
  };
    const handleSoundMute = e => {
        if (displayMute === "none") {
            setVolumeSave(volumeValue)
            volumeValue = 0;
            setDisplayVolumeBar(`-webkit-linear-gradient(left , #5599FF ${0}%,#fff 0px)`)
            setDisplayVolume("none")
            setDisplayMute("inline-block")
        } else {
            volumeValue = volumeValueSave;
            setDisplayVolumeBar(`-webkit-linear-gradient(left , #5599FF ${volumeValue * 100}%,#fff 0px)`)
            setDisplayVolume("inline-block")
            setDisplayMute("none")
        }
    }
    const handleLoginInterfaceOnClick = e => {
        setModalInterface("block");
        setModalEffect(true);
        setModalConponent("login")
    };
    const handleLoginoutOnClick = e => {
        localStorage.setItem("user",JSON.stringify({account: '',token: ''}));
        setUserName("")
    };

    const handleSignupInterfaceOnClick = e => {
        setModalInterface("block");
        setModalEffect(true);
        setModalConponent("signup")
      };
    const handleModalOnClick = e => {
        if (e.target.children["modalContent"].length  != 0
        || e.target.children["modalMonthly"].length != 0) {
        setTimeout(function () {
            setModalEffect(false);
        }, 10)
        setTimeout(function () {
            setModalInterface("none");
        }, 500)
    }
      };
      const handleModalCallback = useCallback(async (name) => {
        setUserName(name);
        fetchUserPlayList();
        if(name !== "verify"){
        setModalConponent("")
        setTimeout(function () {
            setModalEffect(false);
        }, 10)
        setTimeout(function () {
            setModalInterface("none");
        }, 500)
        }else{
            setModalConponent("verify")
        }
      });
      const handlePlayListCallback = useCallback(async () => {
        fetchUserPlayList();
      });

      function useQuery() {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
      }
      let query = useQuery();
      
    

  return (
    <html>
    <Header />
    <body>

    {/* @* 播放清單相關畫面 *@ */}
    <div className="playListSwitch s1" onClick={handlePlayListSwitchOnClick}>
        <FontAwesomeIcon icon={faCaretLeft}></FontAwesomeIcon>
    </div>

    <div className={isPlayListOpen ? "playListPanel open" : "playListPanel"}>
        <div class="playListSwitch s2" onClick={handlePlayListSwitchOnClick}>
            <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>
        </div>
        <div className="playList">
        { userName === "" ? 
                <div className="noLogin">
                    <div className="h5">您尚未<span class="playlistLogin" onClick={handleLoginInterfaceOnClick}>登入</span>喔</div>
                    <div><span className="playlistLogon" onClick={handleSignupInterfaceOnClick}>點我註冊</span>以享受SpyderFly的音樂服務!</div>
                </div>
                :
                <div className="playListPartialView">
                    { playList?.length === 0 ? 
                        <div className="noMusic">
                        <div className="h5">播放清單是空的喔</div>
                        </div>
                        :
                        <div>
                        <div className={playingItem === 0 ? "playListItem playingItem" : "playListItem"} title="點擊撥放" data-soid={playList[0].ProductID} onClick={(e) => {setPlayingItem(0);setDescriptiontwo(playList[0].ProductName);setSinger(playList[0].Singer);setSongcover(StorageService.getBlobStorage() + playList[0].CoverPath);setAlbum(playList[0].AlbumName);}}>
                            <div className={playingItem === 0 ? "plSymbol playingSymbol" : "plSymbol"}>
                                <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
                            </div>
                                <div className="plDescription">
                                <div className="mTitle">{playList[0].ProductName}</div>
                                <div className="hr"></div>
                                <div className="mDetail">{playList[0].AlbumName} - {playList[0].Singer}</div>
                            </div>
                        </div>
                        <div>
                            { playList.map((object, i) => i > 0 && 
                                <div className={playingItem === i ? "playListItem playingItem" : "playListItem"} data-soid={object.ProductID} onClick={(e) => {setPlayingItem(i);setDescriptiontwo(object.ProductName);setSinger(object.Singer);setSongcover(StorageService.getBlobStorage() + object.CoverPath);setAlbum(object.AlbumName);}}>
                               <div className={playingItem === i ? "plSymbol playingSymbol" : "plSymbol"}>
                                    <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
                               </div>
                               <div className="plDescription">
                                   <div className="mTitle">{object.ProductName}</div>
                                   <div className="hr"></div>
                                   <div className="mDetail">{object.AlbumName} - {object.Singer}</div>
                               </div>
                                </div>
                            )}
                        </div>
                        </div>
                    }
                    <div class="contextmenu" style={{display: disContextmenu,top: anchorPoint.y, left: anchorPoint.x}}>
                        <div class="itemDelete" onClick={e=>{handleItemDelete()}} >從播放清單中刪除此曲</div>
                        <div>取消</div>
                    </div>
                </div>
        }
        </div>
    </div>

    {/* @* 測試modal *@ */}
    <div id="modal" className={displayModalEffect ? "fadein" :""} style={{display:displayModalInterface}} onClick={handleModalOnClick}>
        <div id="modalContent" className={displayModalEffect ? "fadein" :""}>
            <Modal action={displayModalConponent}
            result={handleModalCallback}
            message={displayModalMessage}
            />
            {/* @* 這裡的內容隨按鍵改變而讀取 *@ */}
        </div>
    </div>

    <div className="header">
        <a className="link" href="">
            <div className="header-logo">
                <img src={spiderfly}/>
            </div>
        </a>

        {/* @* 搜尋條--套用bootstrap(input-group) *@ */}
        <div className="searchBar">
            {/* @* 基本搜尋條(結合進階搜尋鍵) *@ */}
            <div className="input-group">
                <input className="searchtxt form-control" type="text" placeholder="搜尋歌曲..." name="basicSearch" value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
                <div className="input-group-append">
                    <div className="btn btn-outline-secondary" id="advancedBtn" onClick={handleAdvancedSearchOnClick}>進階搜尋</div>
                    <Link to={{pathname: "/search",search: "?name="+searchText }} ><div className="btn btn-outline-secondary searchBtn" >
                      <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </div></Link>
                </div>
            </div>

            {/* @* 進階搜尋面板 *@ */}
            <div className={isAdvancedSearchOpen ? "advancedPanel adSwitch" : "advancedPanel"}>
                <div className="advancedItemGroup">
                    <div className="advancedItem">
                        歌曲名稱
                        <input type="text" className="advancedtxt form-control" id="adSong"  value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                    </div>
                    <div className="advancedItem">
                        專輯名稱
                        <input type="text" className="advancedtxt form-control" id="adAlbum" />
                    </div>
                    <div className="advancedItem">
                        歌手
                        <input type="text" className="advancedtxt form-control" id="adSinger" />
                    </div>
                    <div className="advancedItem">
                        團體名稱
                        <input type="text" className="advancedtxt form-control" id="adGroup" />
                    </div>
                    <div className="advancedItem">
                        作曲者
                        <input type="text" className="advancedtxt form-control" id="adComposer" />
                    </div>
                    <div className="advancedItem">
                        發行類別
                        <select className="advancedtxt form-control" id="adType">
                        {/* @* 網頁初始化時會在這裡更新搜尋的類別 *@ */}
                        { albumType.map((object, i) =>
                            <option value={object.TypeID}>{object.TypeName}</option>
                        )}
                        </select>
                    </div>
                </div>

                {/* @* 這邊放自選類別 *@ */}
                <div className="typeSelectGroup">
                    {/* @* 選擇想要的類別 *@ */}
                    <div className="typeSelect advancedSelect">
                        {/* 偏好的曲風 */}
                        <div className="advancedBlock">
                            {/* @* 網頁初始化時會在這裡更新曲風與增加鈕 *@ */}
                        { kinds.map((object, i,row) => i+1 ===row.length ? 
                            <div><div className="selectedItem" style={{backgroundColor:object.Color,backgroundImage:`linear-gradient(to bottom,#16161660 100%,${object.Color})`}}>{object.KindName}</div> <div class="itemAdd" onClick={handleItemAddOnClick}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></div></div>:
                                <div className="selectedItem" style={{backgroundColor:object.Color,backgroundImage:`linear-gradient(to bottom,#16161660 100%,${object.Color})`}}>{object.KindName}</div>
                        
                        )}
                        </div>

                        {/* @* 點選+號後會出現的type選擇表，位置應在+號正下方 *@ */}
                        <div className={isItemAddOpen ? "selectableItemPanel adSwitch" : "selectableItemPanel"}>
                            {/* @* 網頁初始化時會在這裡更新曲風 *@ */}
                            { kinds.map((object, i) =>
                            <div className="selectableItem" style={{backgroundColor:object.Color,backgroundImage:`linear-gradient(to bottom,#16161660 100%,${object.Color})`}}>{object.KindName}</div>
                        )}
                        </div>
                    </div>

                    {/* @* 進階搜尋鍵 *@ */}
                    <div className="searchPanel">
                        <Link to={{pathname: "/search",search: "?name="+searchText }} ><button className="btn btn-primary adSearchBtn">搜尋</button></Link>
                    </div>
                </div>
            </div>
        </div>

        {/* @* 登入註冊鍵 *@ */}
        <div class="header-button">
                {/* //登入後會顯示的會員頭像，待修正 */}
               { userName === "" ? 
                <div>
                    <div id="logonInterface" class="btn btn-outline-secondary" onClick={handleSignupInterfaceOnClick}>註冊</div>
                    <div id="loginInterface" class="btn btn-outline-secondary" onClick={handleLoginInterfaceOnClick}>登入</div>
                </div>
                :
                <div>
                <div id="logonInterface" class="btn btn-outline-secondary">訊息</div>
                <div id="loginInterface" class="btn btn-outline-secondary" onClick={handleLoginoutOnClick}>登出</div>
            </div>
            }
        </div>
    </div>

    <div id="content">
    {/* 邊條選項欄 */}

        <div class="sidebox">
            <ul>
                <li>
                    <Link to="/"><a href="">
                        <div className={menuItemSelected === 1 ? "menuItem menuItemSelected" : "menuItem"} onClick={(e) => setMenuItemSelected(1)}>
                            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                            <span style={{color: menuItemSelected === 1 ? "white" : "#656565"}}>首頁</span>
                        </div>
                    </a></Link>
                </li>
                <li>
                    <Link to="/kind"><a href="">
                        <div className={menuItemSelected === 2 ? "menuItem menuItemSelected" : "menuItem"} onClick={(e) => setMenuItemSelected(2)}>
                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            <span style={{color: menuItemSelected === 2 ? "white" : "#656565"}}>音樂分類</span>
                        </div>
                    </a></Link>
                </li>
                { userName === "" ? <div></div>:
                <div>
                <li>
                        <Link to="/myAlbumList"><a href="">
                            <div className={menuItemSelected === 3 ? "menuItem menuItemSelected" : "menuItem"} onClick={(e) => setMenuItemSelected(3)} >
                            <FontAwesomeIcon icon={faHeadphones}></FontAwesomeIcon>
                            <span style={{color: menuItemSelected === 3 ? "white" : "#656565"}}>我的發行</span>
                            </div>
                        </a></Link>
                </li>
                <li>
                        <Link to="/myMusic"><a href="">
                            <div className={menuItemSelected === 4 ? "menuItem menuItemSelected" : "menuItem"} onClick={(e) => setMenuItemSelected(4)} >
                            <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
                            <span style={{color: menuItemSelected === 4 ? "white" : "#656565"}}>我的音樂庫</span>
                            </div>
                        </a></Link>
                </li>
                <li>
                        <Link to="/shoppingCart"><a href="">
                            <div className={menuItemSelected === 5 ? "menuItem menuItemSelected" : "menuItem"} onClick={(e) => setMenuItemSelected(5)} >
                            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                            <span style={{color: menuItemSelected === 5 ? "white" : "#656565"}}>我的購物車</span>
                            </div>
                        </a></Link>
                </li>
                </div>
                }
            </ul>
        </div>


        {/* 內容主體 */}
                  <div className="mainbox">
                      <Switch>
                          <Route exact path="/">
                              <Mainbox />
                          </Route>
                          <Route exact path="/kind">
                              <Kind />
                          </Route>
                          <Route path="/kind/:id">
                              <KindResult />
                          </Route>
                          <Route exact path="/album">
                              <h3>please enter albumId</h3>
                          </Route>
                          <Route path="/album/:id">
                              <Album result={handlePlayListCallback} />
                          </Route>
                          <Route path="/search" >
                          <Search name={query.get("name")} />
                          </Route>
                          <Route path="/verify" >
                          <Verify token={query.get("token")} />
                          </Route>
                          <Route path="/myAlbumList">
                              {userName === "" ? <Notfound /> : <MyAlbumList />}
                          </Route>
                          <Route path="/myMusic">
                              {userName === "" ? <Notfound /> : <MyMusic />}
                          </Route>
                          <Route path="/shoppingCart">
                              {userName === "" ? <Notfound /> : <ShoppingCart />}
                          </Route>
                          <Route path="*">
                              <Notfound />
                          </Route>
                      </Switch>
                  </div>
        {/* 播放器 */}

        <div id="footer">
            <div id="playerPanel">
                {/* 封面與歌名div */}

                <figure id="playerfigure">
                    <img id="playercover" src={songcover} className="playerCover"/>
                </figure>

                <div id="titlePanel">
                    <span className="album description">{album}</span><br />
                    <span id="Descriptiontwo" className="music descriptionSub">{descriptiontwo}</span><br />
                    <span id="singer" className="singer descriptionSub">{singer}</span>
                </div>
                {/* 基本按鍵div */}
                <div id="btnPanel">
                    <div id="random" className="btn"><img src={random}/></div>
                    <div id="prev" className="btn"><img src={prev}/></div>
                    <div id="play" className="btn" style={{display: displayPlay}}><img src={play}/></div>
                    <div id="pause" className="btn" style={{display: displayPause}}><img src={pause}/></div>
                    <div id="next" className="btn"><img src={next}/></div>
                    <div id="replay" className="btn"><img src={replay}/></div>
                </div>

                {/* 進度條div */}
                <div id="progressPanel">
                    <span id="nowTime">00:00</span>
                    <input id="progress" type="range" min="0" max="100" step="0.01" value="0"/>
                    <span id="totalTime">00:00</span>
                </div>

                {/* 音量條div */}
                <div id="volumePanel">
                    <img src={sound} data-sound="volumeImg" id="volumeImg" className="sound" style={{display: displayVolume}} onClick={handleSoundMute}/>
                    <img src={mute} data-sound="muteImg" id="muteImg" className="sound" style={{display: displayMute}} onClick={handleSoundMute}/>
                    <input id="volumeBar" type="range" min="0" max="1" step="0.01" value={volumeValue} style={{backgroundImage: volumeBar}} onChange={handleVolumeOnChange}/>
                </div>

                {/* 播放器本體 */}
                <audio id="mainPlayer" src="" volume={volumeValue}></audio>
            </div>
        </div>
    </div>
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> */}



    </body>
    </html>
  );
}

export default App;
