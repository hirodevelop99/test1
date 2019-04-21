    var LineID = 0;
    //===============
    //関数記述
    //===============
    function zyousya_line_decision(stationID) {
        $("#zyousya_result").html("");
        station__NAME = "";
        for (i = 0; i < AllStationData.length; i++) {
            if (stationID == AllStationData[i]["station_cd"]) {
                LineID = AllStationData[i]["line_cd"];
                station__NAME = AllStationData[i]["station_name"];
            }
        }
        $("#zyousya_result").html(
            '<a class="btn ' + line_color_decition(LineID) + ' z-depth-0"style="text-align:center;width:85%;border-radius:20px" id="ZR" value='+stationID+'>' + station__NAME + '</a>'
        );
        norikae1_list_add(LineID);
        $('#change').show();
        $('#a_result').show();
        $('#norikae1_position').show();

    };
    //選択した乗車駅によって乗換駅のmodalリストを操作する部分
    function norikae1_list_add(lineID) {  //lineIDには乗車駅の路線コードが入っている
        $("#norikae1_list").html(""); //白紙に更新
        for (var i = 0; i < Multichangestation.length; i++) {
            if (Multichangestation[i]["line_cd"] == lineID) {
                var this_changed_station = Linechange(Multichangestation[i]["station_cd"]); //乗換後の駅
                var this_changed_line = Station_Line(this_changed_station); //乗換後の路線コード
                var this_station_name = Multichangestation[i]["station_name"]; //ここだけ旧情報
                $("#norikae1_list").append('<a href="#!" onClick=norikae1_add(' + this_changed_station + ')><div class="btn ' + line_color_decition(this_changed_line) + ' waves-effect modal-action modal-close" style="text-align:center;width:70%;border-radius:20px">' + this_station_name + '</div></a><br><br>');
            };
        };
    };
    //乗換追加１のmodal内で駅を選択したときにhtmlを書き換える関数
    function norikae1_add(x) { //x : station_cd　乗換後の駅コード
        this_line = Station_Line(x);
        this_name = StationCD_to_StationName(x);
        $("#norikae1_result").html(
            '<a class="btn ' + line_color_decition(this_line) + ' z-depth-0" value='+x+' id="N1R" style="text-align:center;width:75%;border-radius:20px">' + this_name + '</a><br><br>'
        );
        norikae2_append();
        norikae2_list_add(this_line);

    };
    //乗換選択をした後、乗換２を表示する関数
    function norikae2_append() {
        $('#norikae2_position').show();
    };
    //乗換駅のmodalが選択されたら乗換２のmodalの中を変更する
    function norikae2_list_add(lineID) { //lineID=選択した乗換駅１のラインコード
        $("#norikae2_list").html(""); //白紙に更新
        for (var i = 0; i < Multichangestation.length; i++) {
            if (Multichangestation[i]["line_cd"] == lineID) {
                var this_changed_station = Linechange(Multichangestation[i]["station_cd"]);　
                var this_changed_line = Station_Line(this_changed_station);
                var this_station_name = Multichangestation[i]["station_name"]; //ここだけ旧情報
                $("#norikae2_list").append(
                  '<a href="#!" onClick=norikae2_add(' + this_changed_station + ')><div class="btn ' + line_color_decition(this_changed_line) + ' waves-effect modal-action modal-close" style="text-align:center;width:70%;border-radius:20px">' + this_station_name + '</div></a><br><br>');
            }
        }
    };
    //乗換追加２のmodal内で駅を選択したときにhtmlを書き換える関数
    function norikae2_add(x) { //x : station_cd　乗換したあとの路線コード上の駅コード
        this_line = Station_Line(x);
        this_name = StationCD_to_StationName(x);
        $("#norikae2_result").html(
            '<a class="btn ' + line_color_decition(this_line) + ' z-depth-0" value='+x+' id="N2R" style="text-align:center;width:75%;border-radius:20px">' + this_name + '</a>'
        );
    };

    //到着駅のmodalリストを確定する
    function arrive_list_add(){
      $("#arrive_list").html("");
      var arrive_line = Lastlinevalue();
      var this_line = LinedecisionSimple(arrive_line);
      for(var i=0;i<this_line.length;i++){
        $("#arrive_list").append(
           '<a href="#!" onClick=arrive_add('+this_line[i]["station_cd"]+')><div class="btn ' + line_color_decition(arrive_line) + ' waves-effect modal-action modal-close" style="text-align:center;width:70%;border-radius:20px">' + this_line[i]["station_name"] + '</div></a><br><br>'
         );
      };
    };
    //到着駅のmodalsを選択したとき、htmlを書き換える
      function arrive_add(x){ //x=到着駅の駅コード
      var this_line = Station_Line(x);
      var this_name = StationCD_to_StationName(x);
      $("#arrive_result").html(
        '<a class="btn ' + line_color_decition(this_line) + ' z-depth-0" value='+x+' id="AR" value='+x+' style="text-align:center;width:85%;border-radius:20px">' + this_name + '</a>'
      );
    };
    ///////////////////////
    //乗換後,その駅で路線を変更する関数
    function Linechange(exline_station) {
        for (i = 0; i < Multichangestation.length; i++) {
            if (exline_station == Multichangestation[i]["station_cd"]) {
                return (Multichangestation[i]["station_c_cd"]);
            };
        };
    };
    //駅コードを路線コードに変更する関数
    function Station_Line(xStation) {
        for (i = 0; i < AllStationData.length; i++) {
            if (xStation == AllStationData[i]["station_cd"]) {
                return (AllStationData[i]["line_cd"]);
            };
        };
    };
    //駅コードを駅名に変換する
    function StationCD_to_StationName(xStation) {
        for (i = 0; i < AllStationData.length; i++) {
            if (xStation == AllStationData[i]["station_cd"]) {
                return (AllStationData[i]["station_name"]);
            };
        };
    };
    //駅名を駅コードに変換する
    function StationName_to_StationCD(x){//x=station_name
      for(i=0;i<AllStationData.length;i++){
        if(AllStationData[i]["station_name"]==x){
          return(AllStationData[i]["station_cd"]);
        }
      }
    }
    //何線かを返す関数(名城線はループ配列にしてある)
    function Linedecision(whatLine) {
        if (whatLine == 99513) {
            return HigashiyamaLine
        } else if (whatLine == 99514) {
            return MeijoLineLoop
        } else if (whatLine == 99515) {
            return MeikoLine
        } else if (whatLine == 99516) {
            return TsurumaiLine
        } else if (whatLine == 99517) {
            return SakuradoriLine
        } else if (whatLine == 99518) {
            return KamiiidaLine
        }
    };
    //何線かを返す関数(名城線はループ配列ではない)
    function LinedecisionSimple(whatLine) {
        if (whatLine == 99513) {
            return HigashiyamaLine
        } else if (whatLine == 99514) {
            return MeijoLine
        } else if (whatLine == 99515) {
            return MeikoLine
        } else if (whatLine == 99516) {
            return TsurumaiLine
        } else if (whatLine == 99517) {
            return SakuradoriLine
        } else if (whatLine == 99518) {
            return KamiiidaLine
        }
    };
    //路線のイメージ色を返す関数
    function line_color_decition(lineID) {
        if (lineID == 99513) {
            return "amber darken-1"
        } else if (lineID == 99514) {
            return "deep-purple lighten-1"
        } else if (lineID == 99515) {
            return "deep-purple accent-2"
        } else if (lineID == 99516) {
            return "light-blue darken-2"
        } else if (lineID == 99517) {
            return "red darken-2"
        } else if (lineID == 99518) {
            return "pink darken-1"
        }
    };
    //到着駅の路線コードを決定
    function Lastlinevalue() {
        if ($("#N2R").attr("value")==undefined){
            if ($("#N1R").attr("value") == undefined) {
               //乗換駅なし
                var this_last_line_on_station = $("#ZR").attr("value");
                var this_arriveLine = Station_Line(this_last_line_on_station);
                return (this_arriveLine)
            } else {
              //乗換１のみあり
                var ex_this_last_line_on_station = $("#N1R").attr("value"); //乗換駅のvalue取得
                var This_next_line = Station_Line(ex_this_last_line_on_station); //路線コードに変換
                return (This_next_line)
            }
        } else {
          //乗換２あり
          var ex_this_last_line_on_station = $("#N2R").attr("value"); //乗換駅のvalue取得
          var This_next_line = Station_Line(ex_this_last_line_on_station); //路線コードに変換
          return (This_next_line);
        };
    };
    //送信ボタンを押すと、配列をURLにのせて送信する関数
    function health_send(){
      if ($("#N2R").attr("value")==undefined){
          if ($("#N1R").attr("value") == undefined) {
             //乗換駅なし
              var this_route_array = [];
              var d_station = $("#ZR").attr("value");
              var a_station = $("#AR").attr("value");
              var DA_route  = Station_Line(a_station);
              this_route_array.push(routeArraydecision(DA_route,d_station,a_station));
              location.replace('./index2.html?'+this_route_array);
          } else {
            //乗換１のみあり
              var this_route_array = [];

              var this_ex_route_array =[];
              var d_station = $("#ZR").attr("value");
              var a_station = $("#N1R").attr("value");
                  a_station = Linechange(a_station);
              var DA_route  = Station_Line(a_station);
              this_ex_route_array.push(routeArraydecision(DA_route,d_station,a_station));
              this_route_array.push(this_ex_route_array);

                  this_ex_route_array =[];
                  d_station = $("#N1R").attr("value");
                  a_station = $("#AR").attr("value");
                  DA_route  = Station_Line(a_station);
              this_ex_route_array.push(routeArraydecision(DA_route,d_station,a_station));
              this_route_array.push(this_ex_route_array);

              location.replace('./index2.html?'+this_route_array);
          }
      } else {
        //乗換２あり
        var this_route_array = [];

        var this_ex_route_array =[];
        var d_station = $("#ZR").attr("value");
        var a_station = $("#N1R").attr("value");
            a_station = Linechange(a_station);
        var DA_route  = Station_Line(a_station);
        this_ex_route_array.push(routeArraydecision(DA_route,d_station,a_station));
        this_route_array.push(this_ex_route_array);

            this_ex_route_array =[];
            d_station = $("#N1R").attr("value");
            a_station = $("#N2R").attr("value");
            a_station = Linechange(a_station);
            DA_route  = Station_Line(a_station);
        this_ex_route_array.push(routeArraydecision(DA_route,d_station,a_station));
        this_route_array.push(this_ex_route_array);

            this_ex_route_array =[];
            d_station = $("#N2R").attr("value");
            a_station = $("#AR").attr("value");
            DA_route  = Station_Line(a_station);
        this_ex_route_array.push(routeArraydecision(DA_route,d_station,a_station));
        this_route_array.push(this_ex_route_array);

          location.replace('./index2.html?'+this_route_array);
      };
    };
    //ルート配列を作成する関数
    function routeArraydecision(l1, s1, s2) { //l1=路線コード, s1=出発の駅コード, s2=到着の駅コード
        this_route = [];
        //路線の決定
        var thisLine = Linedecision(l1);
        //何番目か探す
        Line_Dnumber = 0;
        Line_Anumber = 0;
        //Line_Dnumber,Line_Anumberを決める
        if (l1 == 99514) {
            DList = [];
            AList = [];
            for (i = 0; i < MeijoLineLoop.length; i++) {
                if (MeijoLineLoop[i]["station_cd"] == s1) {
                    DList.push(i);
                };
                if (MeijoLineLoop[i]["station_cd"] == s2) {
                    AList.push(i);
                };
            };
            this_minList_DA = 100; //仮の数値

            for (var k = 0; k < DList.length; k++) {
                for (var l = 0; l < AList.length; l++) {
                    if (Math.abs(DList[k] - AList[l]) < this_minList_DA) {
                        this_minList_DA = Math.abs(DList[k] - AList[l]);
                        Line_Dnumber = DList[k];
                        Line_Anumber = AList[l];
                    }
                }
            };
        } else {
            for (j = 0; j < thisLine.length; j++) {
                if (thisLine[j]["station_cd"] == s1) {
                    Line_Dnumber = j;
                };
                if (thisLine[j]["station_cd"] == s2) {
                    Line_Anumber = j;
                };
            };
        };
        //決定終了
        //順番の場合
        if (Line_Dnumber < Line_Anumber) {
            for (var i = Line_Dnumber; i <= Line_Anumber; i++) {
                this_route.push(thisLine[i]["station_name"]);
            }
        };
        //順番じゃない場合
        if (Line_Dnumber > Line_Anumber) {
            for (var i = Line_Dnumber; i >= Line_Anumber; i--) {
                this_route.push(thisLine[i]["station_name"]);
            };
        };
        return (this_route);

    };
    //ページロードの瞬間に実行する関数
    $(function() {
      $('#change').hide();
      $('#a_result').hide();
      $('#norikae1_position').hide();
      $('#norikae2_position').hide();
    });
    //===============
    //materializeのjQueryを読み込む
    //===============
    $(document).ready(function() {
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
    });
    //     $(".button-collapse").sideNav();
    $(document).ready(function() {
        $('select').material_select();
    });
    $('select').material_select('destroy');
    $(".button-collapse").sideNav();
