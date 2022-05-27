
import React from "react";

// displays a page header

export default function Header() {
  return (
<>
    {/* @* ↓主要用來讀取一些特殊icon *@ */}

    {/* <script src="https://kit.fontawesome.com/a076d05399.js"></script> */}

    {/* @* 測試兩版本jquery的共用性，如出意外先刪除下面那行並解除上面那行註解 *@
    @* 目前已知差別，使用let時下面那個不能重複宣告而上面可以 *@ */}
    {/* <script src="https://code.jquery.com/jquery-1.12.4.js"></script> */}
    {/* <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script> */}

    {/* @* 聖開的 *@
    @RenderSection("styles", required: false) */}

</>
  );
}
