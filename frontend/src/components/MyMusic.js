import React from "react";

// displays a page header

export default function MyMusic() {
  return (
    
<div class="container" >
    <div class="headtitle h1 mb-4 font-weight-bold">單曲列表</div>
    <div class="section__content section__content--p30">
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive m-b-40">
                    <table class="table table-borderless table-data3 text-center">
                        <thead>
                            <tr>
                                <th>單曲名</th>
                                <th>專輯名</th>
                                <th>歌手</th>
                                <th>音樂下載連結</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

  );
}
