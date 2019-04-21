//===============
//ロードした瞬間実行
//===============
window.onload = function(){
    //多重配列で対象となる区間を挿入(距離が)
    //[徒歩で出発候補駅,徒歩で到着候補駅,距離,駅数]
    var RouteMetaArray = route_distance_decition(ex_array_load());
    var walk_route = least_route_search(RouteMetaArray); //[[no1],[no2],[no3],[no4],[no5]]
    var Win_Wid = window.innerWidth; //windowの大きさを取得（横）
    var n1_R = walk_route[0];
    var n2_R = walk_route[1];
    var n3_R = walk_route[2];
    var n4_R = walk_route[3];
    var n5_R = walk_route[4];

    $("#R1T").html(n1_R[0]+'→'+n1_R[1]);
    $("#R1B").html("距離は"+n1_R[2]+"00メートルです");
    $("#G1").html('<a href="https://www.google.co.jp/maps/dir/名古屋市営地下鉄'+n1_R[0]+'駅/名古屋'+n1_R[1]+'駅">このルートの地図を調べる</a>');

    $("#R2T").html(n2_R[0]+'→'+n2_R[1]);
    $("#R2B").html("距離は"+n2_R[2]+"00メートルです");
    $("#G2").html('<a href="https://www.google.co.jp/maps/dir/名古屋市営地下鉄'+n2_R[0]+'駅/名古屋'+n2_R[1]+'駅">このルートの地図を調べる</a>');

    $("#R3T").html(n3_R[0]+'→'+n3_R[1]);
    $("#R3B").html("距離は"+n3_R[2]+"00メートルです");
    $("#G3").html('<a href="https://www.google.co.jp/maps/dir/名古屋市営地下鉄'+n3_R[0]+'駅/名古屋'+n3_R[1]+'駅">このルートの地図を調べる</a>');

    $("#R4T").html(n4_R[0]+'→'+n4_R[1]);
    $("#R4B").html("距離は"+n4_R[2]+"00メートルです");
    $("#G4").html('<a href="https://www.google.co.jp/maps/dir/名古屋市営地下鉄'+n4_R[0]+'駅/名古屋'+n4_R[1]+'駅">このルートの地図を調べる</a>');

    $("#R5T").html(n5_R[0]+'→'+n5_R[1]);
    $("#R5B").html("距離は"+n5_R[2]+"00メートルです");
    $("#G5").html('<a href="https://www.google.co.jp/maps/dir/名古屋市営地下鉄'+n5_R[0]+'駅/名古屋'+n5_R[1]+'駅">このルートの地図を調べる</a>');

    if(n5_R[0] == undefined){
        $("#r5").html("");
    };
    if(n4_R[0] == undefined){
        $("#r4").html("");
    };
    if(n3_R[0] == undefined){
        $("#r3").html("");
    };
    if(n2_R[0] == undefined){
        $("#r2").html("");
    };
    if(n1_R[0] == undefined){
        alert("ルートが見つかりません");
        history.back();
    };
};

//===============
//以下処理関数
//===============
//前画面から来た駅情報を配列で作成する。
//output [s1,s2,s3,s4,s5......]
function ex_array_load(){
    var x = decodeURIComponent(location.search);
    var x1 = x.split("?");
    var x2 = x1[1];
    var solo = x2.split(",");
    return(solo);
};

//input [s1,s2,s3,s4,s5......]
//output[徒歩で出発候補駅,徒歩で到着候補駅,距離,駅数]
function route_distance_decition(this_route_array){
    var hit_this_route = [];
    for(i=0;i<this_route_array.length-1;i++){
        for(j=0;j<distance_in_40.length;j++){
            for(k=0;k<this_route_array.length-1;k++){
                if(distance_in_40[j]["d_station_name"]==this_route_array[i] && distance_in_40[j]["s_station_name"]==this_route_array[i+k]){
                    var this_array = [];
                    this_array.push(distance_in_40[j]["d_station_name"]);
                    this_array.push(distance_in_40[j]["s_station_name"]);
                    this_array.push(distance_in_40[j]["distance"]);
                    this_array.push(k);
                    hit_this_route.push(this_array);
                }
            }
        }
    }
    return(hit_this_route);
};

//短いところを探す
function least_route_search(AllR){
    //距離の初期値を設定
    var this_least_route_N1 = 40;
    var this_least_route_N2 = 40;
    var this_least_route_N3 = 40;
    var this_least_route_N4 = 40;
    var this_least_route_N5 = 40;
    var this_array_1        = [];
    var this_array_2        = [];
    var this_array_3        = [];
    var this_array_4        = [];
    var this_array_5        = [];
    var result_array        = [];
    for(i=0;i<AllR.length;i++){
        if(AllR[i][0]!==this_array_1[0] && AllR[i][1]!==this_array_1[1]){
            if(AllR[i][0]!==this_array_2[0] && AllR[i][1]!==this_array_2[1]){
                if(AllR[i][0]!==this_array_3[0] && AllR[i][1]!==this_array_3[1]){
                    if(AllR[i][0]!==this_array_4[0] && AllR[i][1]!==this_array_4[1]){
                        if(AllR[i][0]!==this_array_5[0] && AllR[i][1]!==this_array_5[1]){
                            if(AllR[i][2]<=this_least_route_N1){ //i番目の距離が一番小さいものだった時
                                this_least_route_N5 = this_least_route_N4;
                                this_least_route_N4 = this_least_route_N3;
                                this_least_route_N3 = this_least_route_N2;
                                this_least_route_N2 = this_least_route_N1;
                                this_least_route_N1 = AllR[i][2];
                                this_array_5        = this_array_4;
                                this_array_4        = this_array_3;
                                this_array_3        = this_array_2;
                                this_array_2        = this_array_1;
                                this_array_1        = AllR[i];
                            }else if (AllR[i][2]<=this_least_route_N2) {
                                this_least_route_N5 = this_least_route_N4;
                                this_least_route_N4 = this_least_route_N3;
                                this_least_route_N3 = this_least_route_N2;
                                this_least_route_N2 = AllR[i][2];
                                this_array_5        = this_array_4;
                                this_array_4        = this_array_3;
                                this_array_3        = this_array_2;
                                this_array_2        = AllR[i];
                            }else if (AllR[i][2]<=this_least_route_N3) {
                                this_least_route_N5 = this_least_route_N4;
                                this_least_route_N4 = this_least_route_N3;
                                this_least_route_N3 = AllR[i][2];
                                this_array_5        = this_array_4;
                                this_array_4        = this_array_3;
                                this_array_3        = AllR[i];
                            }else if (AllR[i][2]<=this_least_route_N4) {
                                this_least_route_N5 = this_least_route_N4;
                                this_least_route_N4 = AllR[i][2];
                                this_array_5        = this_array_4;
                                this_array_4        = AllR[i];
                            }else if (AllR[i][2]<=this_least_route_N5) {
                                this_least_route_N5 = AllR[i][2];
                                this_array_5        = AllR[i];
                            };
                        };
                    };
                };
            };
        };
    };
    result_array.push(this_array_1);
    result_array.push(this_array_2);
    result_array.push(this_array_3);
    result_array.push(this_array_4);
    result_array.push(this_array_5);
    return(result_array);
};
