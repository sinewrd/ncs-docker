// 登出
// 2023.09.21 新增
function logOut(){
    window.location= "/login";
}


//顯示裝置樣版
//function showDevice(index){
function showDevice(item){
   let str1 ='';
   // Card
   //str1 += "<div class='col col-xs-12 mb-2'>";
   //str1 += "<div class='card shadow mr-2 mb-2 h-100 flex-fill' id='card"+(index+1)+"'>";
   //str1 += "<div class='card shadow mr-2 mb-2 h-100 flex-fill' id='card"+(index+1)+"'>";
   str1 += "<div class='card shadow mr-2 mb-2 h-100' id='"+item['id']+"'>";
   //card head
   //str1 += "<div class='card-header d-flex flex-row'>";
   str1 += "<div class='card-header'>";
   //核取選單
   str1 += "<div class='form-check-inline'>";
   str1 += "<label class='form-check-label'>";
   if(item['conn_status'] != 'off'){
        str1 += "<input type='checkbox' class='form-check-input' value='"+item['id']+"'><span class='m-0 text-primary'>"+item['name']+"</span>";
   }
   else{
        str1 += "<input type='checkbox' class='form-check-input' value='' disabled><span class='m-0 text-primary dev-name_"+item['id']+"'>"+item['name']+"</span>";
   }

   str1 += "</label>";
   str1 += "</div>";
   /*
   str1 += "<div class='custom-control custom-checkbox'>";
   str1 += "<input class='form-check-input' type='checkbox'>";
   str1 += "</div>";
   str1 += "<span class='h6 m-0 text-primary'>";
   //str1 += "Class "+(index+1);
   //str1 += "xxxxxxxxxxxx"; //12字元
   str1 += item['name'];
   str1 += "</span>";
   */
   //Card Header End
   str1 += "</div>";
   //Card Body
   //index = getRandom(0,2);
   str1 += "<div class='card-body dev-status_"+item['id']+"'>";
   if(item['conn_status'] == "off"){
      str1 += "<div class='text-center px-2'>";
      str1 += icon[2];
   }
   else if(item['equipment_status'] == "on"){
      str1 += "<div class='text-center mb-3 px-1'>";
      str1 += icon[1];
   }
   else{
      str1 += "<div class='text-center mb-3 px-1'>";
      str1 += icon[0];
   }

   str1 += "</div>";
   str1 += "</div>";
   //Card footer
   /*
   str1 += "<div class='card-footer text-center'>";
   str1 += "Card footer";
   str1 += "</div>";
   */
   //End
   str1 += "</div>";
   //str1 += "</div>";

   return str1;
}

// 隨機取數
//產生min到max之間的亂數
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}


// 顯示資訊和控制
function showDevicePanel(id, dict_data){
    //清空陣列
    //yAxis = []
    //datas = []
    //console.log(id);
    getDeviceDatatPromse(id)
    .then(function(obj_data) {
        //console.log(dict_data);
            //console.log(obj_data);
            let len = obj_data['dataset'].length;
            //console.log(obj_data['dataset'][len-1]);
            $("#showMsg .modal-dialog").addClass("modal-lg"); //變大modal
            $('#ModalLabel').text(dict_data['name']);
            //時間
            $('.lastupdtime').text('Last updated: '+obj_data['dataset'][len-1]['datetime']);
            //內容
            str = '';
            //電壓
            str += "<div class='row'>";
            str += "<div class='col-xs-12 col-md-3'>";
            str += "<div class='card mb-2 border-left-primary shadow'>";
            str += "<div class='card-body'>";
            str += "<div class='text-primary text-primary'>Power</div>";
            str += "<div class='text-gray-800 h1 w'>"+obj_data['dataset'][len-1]['pw1']+"</div>";
            str += "<div class='text-right' style='font-size: 1rem;'>W</div>";
            str += "</div>";
            str += "</div>";
            str += "</div>";
            //電流
            str += "<div class='col-xs-12 col-md-3''>";
            str += "<div class='card mb-2 border-left-info shadow'>";
            str += "<div class='card-body'>";
            str += "<div class='text-info'>Current</div>";
            str += "<div class='text-gray-800 h1 a cu'>"+obj_data['dataset'][len-1]['cu1']+"</div>";
            str += "<div class='text-right' style='font-size: 1rem;'>A</div>";
            str += "</div>";
            str += "</div>";
            str += "</div>";
            //今日用電量
            str += "<div class='col-xs-12 col-md-3''>";
            str += "<div class='card mb-2 border-left-danger shadow'>";
            str += "<div class='card-body'>";
            str += "<div class='text-danger'>Today's Cons.</div>";
            str += "<div class='text-gray-800 h1 wh'>"+(obj_data['wh']/1000).toFixed(2)+"</div>";
            str += "<div class='text-right' style='font-size: 1rem;'>KWH</div>";
            str += "</div>";
            str += "</div>";
            str += "</div>";
            //今日使用時數
            str += "<div class='col-xs-12 col-md-3''>";
            str += "<div class='card mb-2 border-left-success shadow'>";
            str += "<div class='card-body'>";
            str += "<div class='text-success'>Today's Usage</div>";
            str += "<div class='text-gray-800 h1 hr'>"+(obj_data['usage']/3600).toFixed(2)+"</div>";
            str += "<div class='text-right' style='font-size: 1rem;'>HR</div>";
            str += "</div>";
            str += "</div>";
            str += "</div>";
            str += "</div>";
            //控制項
            str += "<div class='row'><div class='col-12 mt-2'>";
            str += "<div class='card mb-3 shadow'>";
            //header
            str += "<div class='card-header py-3 d-flex flex-row align-items-center justify-content-between'>";
            str += "<h6 class='m-0 font-weight-bold text-primary'>Equipment Status：Power <span class='e-status'>"+dict_data['equipment_status'].toUpperCase()+"</span></h6>";
            str += "</div>";
            //Body
            str += "<div class='card-body showcontent'>";
            //str += "<div class='row'>";
            str += "<div class='col-3 ctrlbtn'>";
            //id = '3E64AE';  //測試
            //console.log(id);
            //console.log( obj_data['equipment_status'].toUpperCase() );
            //if( $(".e-status").text() == "ON"){
            if( dict_data['equipment_status'] == "on"){
                str += "<button type='button' class='btn btn-primary' id='controlbtn' onClick=\"execution(event, 'OFF', '"+dict_data['id']+"', 'rs232tx')\">Power OFF</button>";
            }
            else{
                str += "<button type='button' class='btn btn-primary' id='controlbtn' onClick=\"execution(event, 'ON', '"+dict_data['id']+"', 'rs232tx')\">Power ON</button>";
            }
            str += "</div>";
            str += "<p class='resMsg pt-1'></p>";
            //str += "</div>";
            str += "</div>";
            //End Card
            str += "</div>";
            str += "</div></div>";
            //chart
            str += "<div class='row'><div class='col-12 mt-2'>";
            str += "<div class='card shadow mb-4 shadow'>";
            str += "<div class='card-header py-3'>";
            //str += "<h6 class='m-0 font-weight-bold text-primary'>Power Consumption Trend</h6>";
            str += "<h6 class='m-0 font-weight-bold text-primary'>Power Consumption (1 H)</h6>";
            str += "</div>";
            //str += "</div>";

            str += "<div class='card-body'>";
            str += "<div class='chart-area'>";
            str += "<canvas id='myAreaChart'></canvas>";
            str += "</div>";
            str += "</div>";
            //str += "</div></div>";
            //End Card
            str += "</div>";
            str += "</div></div>";

            $('#showMsg .body-content').html(str);

            //$('.footer-content').html("<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>");
            $('.footer-content').html("<button type='button' class='btn btn-secondary' onClick='stopTimer()'>Close</button>");
            $('#showMsg').modal({backdrop: 'static', keyboard: false});

            //顯示圖表
            showChartLine(obj_data['dataset']);
    })
    .then(function() {
        //Get Device statistics
        getStatisticsDevice(id);
        /*
        obj_data.forEach(function(value) {
            datas.push(value['pw1']);
            yAxis.push(value['datetime'].split(" ")[1]);
        });
        //console.log(datas);
        myLineChart1.update();
        */
    });
}

//取消裝置Timer
function stopTimer(){
    clearInterval(devTimer); //清除Timer
    $('#showMsg').modal('hide');
}


//顯示圖表
function showChartLine(obj_data){
    //console.log(dataset);
    //圖表 - 趨勢圖
    var yAxis = new Array();  //宣告陣列(), 放時間
    var datas = new Array();  //宣告陣列(), 放值
    var myLineChart1;
    obj_data.forEach(function(value) {
        datas.push(value['pw1']);
        let nowtime = (value['datetime'].split(" ")[1]).split(":");
        let dt = nowtime[0]+':'+nowtime[1];
        yAxis.push(dt);
    });

    var data = {
              labels: yAxis, //變數
              datasets: [{
                label: "power",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: datas, //變數
              }],
            };
        var options = {
              maintainAspectRatio: false,
              layout: {
                padding: {
                  left: 10,
                  right: 25,
                  top: 25,
                  bottom: 0
                }
              },
              scales: {
                xAxes: [{
                  time: {
                    unit: 'date'
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false
                  },
                  ticks: {
                    maxTicksLimit: 7   // 可以設區間區隔
                  }
                }],
                yAxes: [{
                  ticks: {
                    maxTicksLimit: 5,
                    padding: 10,
                    min: 0, // minimum value
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                      return number_format(value) + 'W';
                    }
                  },
                  gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2]
                  },
                }],

              },
              legend: {
                display: false
              },
              tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                  label: function(tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + ': ' + number_format(tooltipItem.yLabel) + 'W';
                  }
                }
              }
            };

        var ctx = document.getElementById("myAreaChart");
        myLineChart1 = new Chart(ctx, {type: 'line', data: data, options: options}); //chart 設全域變數
}


//取出裝置統計資料
function getStatisticsDevice(id){
    //console.log(id);
    let url = '/get/statistics/'+id;
    $.ajax({
        //url: '/api/sensor/?device='+device,
        url: url,
        type: "GET",
        cache: false,
        dataType: "json",
        //data: JSON.stringify(param),
        //contentType: "application/json",
        success: function (response) {
           //console.log(response['dataset'][0]['addwh']);
           $('.hr').text( (response['dataset'][0]['usage']/3600).toFixed(2) );
           $('.wh').text( (response['dataset'][0]['addwh']/1000).toFixed(2) );
           //data = response;
        },
        complete: function() {
           //console.log('finish')
        },
        error: function (error) {
           console.log(error);
        }
    });
}


// 執行設備
function execution(event, act, id, set){
   let url = '/device/cmd';
   if(act == "ON"){
        var param = {"id": id, "action":"on", "set": set}
   }
   else{
        var param = {"id": id, "action":"off", "set": set}
   }
   //console.log(param);
   $.ajax({
        //url: '/api/sensor/?device='+device,
        url: url,
        type: "POST",
        cache: false,
        async: false,
        data: JSON.stringify(param),
        contentType: "application/json",
        success: function (response) {
            //console.log(response);
            $('#controlbtn').prop('disabled', true);   //關閉按鈕
            if(act == "ON"){
                //$(".ctrlbtn").html('<button type="button" class="btn btn-primary" onClick="execution(\'OFF\', \''+id+'\', \'rs232tx\')">Power OFF</button>');
                $(".resMsg").text("The equipment will startup....");
            }
            else{
                //$(".ctrlbtn").html('<button type="button" class="btn btn-primary" onClick="execution(\'ON\', \''+id+'\', \'rs232tx\')">Power ON</button>');
                $(".resMsg").text("The equipment will shutdown....");
            }
            //datacol = response;
        },
        complete: function() {
           //console.log('finish')
        },
        error: function (error) {
           console.log(error);
        }
   });
   event.stopPropagation(); //防止氣泡排序
}


// Dashboard URL - Group
function GroupDashboard(g_id){
    if(g_id != 0) 
        location.href= "/dashboard/"+g_id;
    else
        location.href= "/dashboard";
}


// Group Data
function initDatatPromse(g_id){
    return new Promise(function(resolve, reject) {
        //console.log(num)
        let url = '/device/group/'+g_id;
        //let url = '/device/test/group/'+g_id+'/'+num;
        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "GET",
            cache: false,
            async: false,
            //data: JSON.stringify(param),
            //contentType: "application/json",
            success: function (response) {
                //console.log(response);
                data = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });
        //console.log(data)
        resolve(data);
        //resolve(data);
  });
}

// 取出裝置列表
function initDatatPromse1(){
    return new Promise(function(resolve, reject) {
        //console.log(num)
        let url = '/device';
        //let url = '/device/test/group/'+g_id+'/'+num;
        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "GET",
            cache: false,
            async: false,
            //data: JSON.stringify(param),
            //contentType: "application/json",
            success: function (response) {
                //console.log(response);
                data = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });
        //console.log(data)
        resolve(data);
        //resolve(data);
  });
}

// 取出設備列表
function initDatatPromse2(){
    return new Promise(function(resolve, reject) {
        let url = '/equipmentcode';

        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "GET",
            cache: false,
            async: false,
            //data: JSON.stringify(param),
            //contentType: "application/json",
            success: function (response) {
                //console.log(response);
                data = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });
        //console.log(data)
        resolve(data);
    });
}

//取出裝置 raw Data
function getDeviceDatatPromse(id){
    return new Promise(function(resolve, reject) {
        let url = '/get/datainfo';
        //let url = '/get/test/datainfo';
        var param = {"id": id}
        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "POST",
            cache: false,
            async: false,
            data: JSON.stringify(param),
            contentType: "application/json",
            success: function (response) {
                //console.log(response);
                datacol = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });

        resolve(datacol);
    });
}

//顯示畫面
function showDeviceList(obj_data){
    //console.log(obj_data.length);
    //console.log(obj_data);
    //統計
    let total =0;
    let pw_on =0;
    let pw_off =0;
    let online =0;
    let offline =0;
    $(".total").text(obj_data.length);

    obj_data.forEach(function(value) {
        if(value['conn_status'] == 'on'){
            online += 1;
        }

        if(value['conn_status'] == 'off'){
            offline += 1;
        }

        if(value['equipment_status'] == 'on' && value['conn_status'] == 'on'){
            pw_on += 1;
        }

        if(value['equipment_status'] == 'off' && value['conn_status'] == 'on'){
            pw_off += 1;
        }
    });
    $(".pw_on").text(pw_on);
    $(".pw_off").text(pw_off);
    $(".online").text(online);
    $(".offline").text(offline);
    //Card 顯示
    var str = '';
    //取出 active 為 1, 測試用
    /*
    var filterObj = obj_data.filter(function(item, index, array){
            return item.active == 1;
    });
    */
    //console.log(filterObj);
    if(obj_data.length != 0){
    //if(filterObj.length != 0){   // 測試用
        //顯示表格
        for(var i=0; i<obj_data.length; i++){
            let Remainder  = i % col;
            if(Remainder == 0){
                str += "<div class='d-flex align-content-around flex-wrap flex-fill'>";
                //str += "<div class='row d-flex flex-row w-100 h-100'>";
            }

            str += showDevice(obj_data[i]);
            //str += showDevice(filterObj[i]);    // 測試用

            if((i+1) % col == 0){
                str += "</div>";
            }
        }
    }
    else{
        str += "<div class='d-flex justify-content-center h2 pt-5'> No devices were found. </div>"; //沒有資料
    }
    //console.log(str);
    $('.showdevlist').html(str);
}

//裝置畫面列表
function showDeviceListTable(obj_data, group_list, equipment_list){
    var str = '';
    //console.log(obj_data);
    obj_data['dataset'].forEach(function(value) {
        //console.log(value);
        str += '<tr>';
        //核取選單
        str += '<td class="align-middle">';
        str += '<div class="custom-control custom-checkbox">';
        str += '<input class="form-check-input" type="checkbox" name="Checkbox[]" value="'+value['id']+'">';
        str += '</div>';
        str += '</td>';
        //ID
        str += '<td class="align-middle">'+value['id']+'</td>';
        //名稱
        str += '<td><input type="text" class="form-control" id="name_'+value['id']+'" value="'+value['name']+'" maxlength="6" /></td>';
        //Equipment。 這邊要呼叫API取出 Equipment
        str += '<td>';
        str += '<select class="form-control" id="equipment_'+value['id']+'">';
        str += '<option value=0>-- Select --</option>';
        equipment_list['dataset'].forEach(function(value1) {
            str += '<option value="'+value1['index']+'"';
            if(value1['index'] == value['equipment_index']){
                str += ' selected';
            }
            str += '>'+value1['brand']+'-'+value1['model']+'</option>';
        });
        /*
        str += '<option value="1">LG-42LD520</option>';
        str += '<option value="2">Samsung-32LS03C</option>';
        */
        str += '</select>';
        str += '</td>';
        //Group。這邊要呼叫API取出Group
        str += '<td>';
        str += '<select class="form-control" id="group_'+value['id']+'">';
        str += '<option value=0>-- Select --</option>';
        //console.log(obj_data['group']);
        group_list['group'].forEach(function(value1) {
            str += '<option value="'+value1['g_id']+'"';
            if(value1['g_id'] == value['group_id']){
                str += ' selected';
            }
            str += '>'+value1['name']+'</option>';
        });
        /*
        str += '<option value="1">Group 1</option>';
        str += '<option value="2">Group 2</option>';
        str += '<option value="3">Group 3</option>';
        */
        str += '</select>';
        str += '</td>';
        str += '<td>';
        str += '<div class="row">';
        // Button
        if(value['active'] == 1){
            str += '<div class="col-auto">';
            str += '<button type="button" class="btn btn-success mr-2" onClick=\'setDevice("'+value['id']+'", "set")\'>Setting</button>';
            str += '</div>';
        }
        else{
            str += '<div class="col-auto">';
            str += '<button type="button" class="btn btn-primary mr-2" onClick=\'setDevice("'+value['id']+'", "reg")\'>Register</button>';
            str += '</div>';
        }
        str += '<div class="col-auto">';
        str += '<button type="button" class="btn btn-danger" onClick="confirmDelete(\''+value['id']+'\')">Delete</button>';
        str += '</div>';
        str += '</td>';

        str += '</tr>'
    });

    $('#devlist').html(str);
}

//JS 隔字元加入字串
//@param {String} str 需要插入的字元
//@param {Int} space 間隔
function strInsert(str, space){
    let result = '';
    for(var i=0; i<str.length; i++){
        if(i%space ===0 && i != 0) result += ' ';
        result += str[i];
    }
    //console.log(result);
    return result;
}

//設定值 ( 十進位轉換 config)
function convertConfig(value){
    let config = '';

    if(value == "0"){
       config = '5, N, 1';
    }
    else if(value == "2"){
       config = '6, N, 1';
    }
    else if(value == "4"){
       config = '7, N, 1';
    }
    else if(value == "6"){
       config = '8, N, 1';
    }
    else if(value == "32"){
       config = '5, E, 1';
    }
    else if(value == "34"){
       config = '6, E, 1';
    }
    else if(value == "36"){
       config = '7, E, 1';
    }
    else if(value == "38"){
       config = '8, E, 1';
    }
    else if(value == "48"){
       config = '5, O, 1';
    }
    else if(value == "50"){
       config = '6, O, 1';
    }
    else if(value == "52"){
       config = '7, O, 1';
    }
    else if(value == "54"){
       config = '8, O, 1';
    }

    return config;
}

//設備畫面列表
function showEquipmentListTable(obj_data){
    var str = '';
    obj_data['dataset'].forEach(function(value) {
        str += '<tr>';
        //ID
        str += '<td class="align-middle">'+value['index']+'</td>';
        //Brand
        str += '<td class="align-middle">'+value['brand']+'</td>';
        //Model
        str += '<td class="align-middle">'+value['model']+'</td>';
        //baudrate
        str += '<td class="align-middle">'+value['baudrate']+'</td>';
        //config
        str += '<td class="align-middle">';
        //console.log( convertConfig(value['config']) );
        str += convertConfig(value['config']);
        str += '</td>';
        //setting
        str += '<td class="align-middle">';
        value['setting'].forEach(function(value1) {
            //console.log(value1);
            let setcode = strInsert(value1['code'], 2);
            //console.log(setcode);
            str += '<a href="javascript:void(0)" onClick="showCode(\''+value1['name']+'\', \''+setcode+'\')">'+value1['name']+'</a><br>';
            //str += value1['name']+' : '+setcode+'<br>';
        });
        str += '</td>';
        //value['setting']+'</td>';
        //response
        str += '<td class="align-middle">';
        value['response'].forEach(function(value1) {
            //console.log(value1);
            let setcode = strInsert(value1['code'], 2);
            //console.log(setcode);
            //str += value1['name']+'<br>';
            str += '<a href="javascript:void(0)" onClick="showCode(\''+value1['name']+'\', \''+setcode+'\')">'+value1['name']+'</a><br>';
            //str += value1['name']+' : '+setcode+'<br>';
        });
        str += '</td>';
        //value['response']+'</td>';
        //Button
        str += '<td>';
        str += '<button type="button" class="btn btn-success mr-2" onClick="setEquipemnt(\''+value['index']+'\')">Edit</button>';
        str += '<button type="button" class="btn btn-danger" onClick="confirmDelEquipment(\''+value['index']+'\')">Delete</button>';
        str += '</td>';

        str += '</tr>';
    });

    $('#equlist').html(str);
}

//顯示裝備 Code
function showCode(name, code){
    $('#showcode').modal({backdrop: 'static', keyboard: false});

    $('#ModalLabelCode').text(name);
    $('.body-content-code').text(code);
}

//event 事件
function listenObjectEvent(){
    //console.log(data); //全域變數
    var i=0;
    var cardItem = document.getElementsByClassName('card');
    //console.log(cardItem);
    [].forEach.call(cardItem, function (el) {
        var idName = el.getAttribute("id"); //取出物件的ID
        //console.log(idName);
        //var filter = data.filter(function(item, index, array){

        //核取選單
        $('#'+idName+' input[type="checkbox"]').click(function(event){
             if( $('#'+idName+' input[type="checkbox"]').is(':checked') ){
                $('#'+idName+' input[type="checkbox"]').prop('checked', true); //checked
             }
             else{
                $('#'+idName+' input[type="checkbox"]').prop('checked', false); //checked
            }
            event.stopPropagation();
        });
        //訊息
        cardItem[i].addEventListener('click', function(event) {
            //event.stopPropagation();
            // 在滑鼠移動時執行的程式碼
            console.log('id:'+idName+', Mouse click the card!');
            //console.log(filter);
            var filter = data['dataset'].filter(function(item, index, array){
                return item.id == idName;
            });
            //console.log(filter);
            // $('#'+idName+' .t1').trigger("click");  //trigger 圖片超連結
            if(filter[0]['conn_status'] == 'on'){
                devstatus = filter[0]['equipment_status'];//儲存設備狀態 -- first
                //顯示資訊和控制
                showDevicePanel(idName, filter[0]); //id, object(conn_status, equipment_status)
                //Timer Start
                //輪詢 Device Info
                devTimer = setInterval(function() {updatedInfo(idName)}, 5000);
                //devstatus = filter[0]['equipment_status'];//儲存設備狀態
            }
            else{
                //alert('disconnect');
                //彈跳視窗
                $("#showMsg .modal-dialog").removeClass("modal-lg"); //移除變大modal
                $('.lastupdtime').text('');
                $('#ModalLabel').text('Message');
                $('#showMsg .body-content').html('The Device was disconnect');
                $('.footer-content').html("<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>");
                $('#showMsg').modal({backdrop: 'static', keyboard: false});
            }
            //event.preventDefault();
        });

        i++;
    });
}

//查詢 Modal Device資訊
function updatedInfo(id){
    var filter = data['dataset'].filter(function(item, index, array){
         return item.id == id;
    });
    //console.log(filter[0]);
    if(filter[0]['equipment_status'] != devstatus){
        $('#controlbtn').prop('disabled', false);   //關閉按鈕
        if(filter[0]['equipment_status'] == 'on'){
            $('.e-status').text('ON');
            $('.ctrlbtn').html("<button type='button' class='btn btn-primary' id='controlbtn' onClick=\"execution(event, 'OFF', '"+filter[0]['id']+"', 'rs232tx')\">Power OFF</button>");
        }
        else{
            $('.e-status').text('OFF');
            $('.ctrlbtn').html("<button type='button' class='btn btn-primary' id='controlbtn' onClick=\"execution(event, 'ON', '"+filter[0]['id']+"', 'rs232tx')\">Power ON</button>");
        }
        $('.resMsg').text('');

        getDeviceDatatPromse(id) //變更 W 和Cu
        .then(function(obj_data){
            //console.log(obj_data);
            let len = obj_data['dataset'].length;
            $('.w').text(obj_data['dataset'][len-1]['pw1']);
            $('.cu').text(obj_data['dataset'][len-1]['cu1']);
        });

        getStatisticsDevice(id);   //今日統計
        //資訊更新
        devstatus = filter[0]['equipment_status'];//儲存設備狀態
    }
    //
    console.log(devstatus);  //現在裝置狀態
}



//update Device Status - per 15 sec
//更新裝置狀態
function upddeviceStatus(gid){
    //console.log(gid);
    initDatatPromse(gid)
    .then(function(obj_data) {
            //顯示畫面
            console.log(obj_data); //15 sec send
            //console.log(obj_data['dataset']);
            //showDeviceList(obj_data);
            //showDeviceList(obj_data['dataset']);
            let total =0;
            let pw_on =0;
            let pw_off =0;
            let online =0;
            let offline =0;
            $(".total").text(obj_data.length);
            obj_data['dataset'].forEach(function(value) {
                // 以下統計
                if(value['conn_status'] == 'on'){
                    online += 1;
                }

                if(value['conn_status'] == 'off'){
                    offline += 1;
                    $('.dev-status_'+value['id']).html("<div class='text-center px-2'>"+icon[2]+"</div>");
                }

                if(value['equipment_status'] == 'on' && value['conn_status'] == 'on'){
                    pw_on += 1;
                    $('.dev-status_'+value['id']).html("<div class='text-center mb-3 px-1'>"+icon[1]+"</div>");
                }

                if(value['equipment_status'] == 'off' && value['conn_status'] == 'on'){
                    pw_off += 1;
                    $('.dev-status_'+value['id']).html("<div class='text-center mb-3 px-1'>"+icon[0]+"</div>");
                }
                //變更名稱
                $('.dev-name_'+value['id']).text(value['name']);
            });
            $(".pw_on").text(pw_on);
            $(".pw_off").text(pw_off);
            $(".online").text(online);
            $(".offline").text(offline);
    });
}

//確認刪除視窗
function confirmDelete(type){
    //console.log(type);
    $('#ModalLabel').text('Confirm Delete Device');
    if(type == "select"){
        $('.body-content').text('Are you sure you want to delete the checked device?');
        $('.footer-content').html("<button type='button' class='btn btn-danger' onClick=\"deleteSelect()\">Delete</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
    }
    else{
       $('.body-content').text('Are you sure you want to delete the device - '+type+' ?');
       $('.footer-content').html("<button type='button' class='btn btn-danger' onClick=\"deleteDevice('"+type+"') \">Delete</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
    }

    $('#showModal').modal({backdrop: 'static', keyboard: false});
}

//刪除選擇
function deleteSelect(){
    deleteBatchDevicePromse()
    .then(function() {
        reloadDeviceList();

        $('#showModal').modal('toggle'); //關閉Modal
    });
}

//執行批次刪除
function deleteBatchDevicePromse(){
    return new Promise(function(resolve, reject) {
        var array = [];
	    var checkboxes = document.querySelectorAll("input[name='Checkbox[]']:checked");
	    var j =0;
        //刪除裝置
	    for(var i = 0; i < checkboxes.length; i++) {
	        //console.log(checkboxes[i].value); //取值, 進入各別裝置刪除
            deleteDevicePromse(checkboxes[i].value);
	    }

        resolve('ok');
    });
}


// 重新載入裝置列表
function reloadDeviceList(){
    //$('.showalert').hide();
    let obj_data =callWebAPI('/device', 'get', 'None'); //取出群組列表
    //console.log(obj_data);
    let group =callWebAPI('/group', 'get', 'None'); //取出群組列表
    let equipment =callWebAPI('/equipmentcode', 'get', 'None'); //取出設備列表

    showDeviceListTable(obj_data, group, equipment); //顯示畫面
}


//判斷帳號全部全選或者反選
function selectAllcheck(){
   if($(".checkAll").prop("checked")){//如果全選按鈕有被選擇的話（被選擇是true）
      $("input[name='Checkbox[]']").prop("checked",true);//把所有的核取方框的property都變成勾選
   }else{
      $("input[name='Checkbox[]']").prop("checked",false);//把所有的核取方框的property都取消勾選
   }
}

//註冊/更新
function setDeviceMsg(deviceId, type){
   if(type == "set"){
      $('.showalert').show();
      $('.showalert').text("The Device was updated successfully");
      setTimeout(() => {
          $('.showalert').hide();
      }, 3000);
   }
   else{
      //$('#dev'+deviceId).html("<button type='button' class='btn btn-success mr-2' onClick=\"setDevice('11055027', 'set')\">Setting</button>");
      //顯示訊息
      $('.showalert').show();
      $('.showalert').text("The Device was registered successfully");
      setTimeout(() => {
          $('.showalert').hide();
      }, 3000);
   }
}

//確認批次處理
function confirmExec(type){
    $('#confirmMsg').modal({backdrop: 'static', keyboard: false});

    var array = [];
	var checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
	//console.log(checkboxes.length);
	if(checkboxes.length == 0){
        $('#onMsg').hide();
        $('#offMsg').hide();
        $('#alertMsg').show();
        $('#batchexec').hide();

    }
    else{
        let btn = document.getElementById("batchexec");
        //console.log(btn);
        $('#batchexec').show();
        $('#alertMsg').hide();
        if(type == 'on'){
            $('#onMsg').show();
            $('#offMsg').hide();
            //設置按鈕屬性
            btn.addEventListener('click', function(event) {
                //console.log('open');
                checkboxes.forEach(function(obj) {
                    //console.log(obj.value);
                    execution(event, 'ON', ''+obj.value+'', 'rs232tx')
                });

                //$('#confirmMsg').modal('hide');
                $('#confirmMsg').modal('toggle');
                event.stopPropagation();
            });
        }
        else{
            $('#onMsg').hide();
            $('#offMsg').show();
            //設置按鈕屬性
            btn.addEventListener('click', function(event) {
                //console.log('close');
                checkboxes.forEach(function(obj) {
                    //console.log(obj.value);
                    execution(event, 'OFF', ''+obj.value+'', 'rs232tx')
                });
                //$('#confirmMsg').modal('hide');
                $('#confirmMsg').modal('toggle');
                event.stopPropagation();
            });
        }
    }
}


//取出群組列表
function getGroupList(){
//function getGroupList(url, type, param=None){
    //console.log(id);
    //return new Promise(function(resolve, reject) {
        let url = '/group';
        let val;
        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "GET",
            cache: false,
            async: false,
            dataType: "json",
            //data: JSON.stringify(param),
            //contentType: "application/json",
            success: function (response) {
                val = response
            },
            complete: function() {
               //console.log('finish')
            },
            error: function (error) {
               console.log(error);
            }
        });

        return val;
        //resolve(data);
    //});
}

//取出群組列表
function callWebAPI(url, type, param=None){
    //console.log(id);
    //return new Promise(function(resolve, reject) {
        //let url = '/group';
        let val;
        if(type == 'get'){
            $.ajax({
                //url: '/api/sensor/?device='+device,
                url: url,
                type: "GET",
                cache: false,
                async: false,
                dataType: "json",
                //data: JSON.stringify(param),
                //contentType: "application/json",
                success: function (response) {
                    val = response
                },
                complete: function() {
                   //console.log('finish')
                },
                error: function (error) {
                   console.log(error);
                }
            });
        }
        else if(type == 'post'){
            $.ajax({
                //url: '/api/sensor/?device='+device,
                url: url,
                type: "POST",
                cache: false,
                async: false,
                dataType: "json",
                data: JSON.stringify(param),
                contentType: "application/json",
                success: function (response) {
                    val = response
                },
                complete: function() {
                   //console.log('finish')
                },
                error: function (error) {
                   console.log(error);
                }
            });
        }

        return val;
        //resolve(data);
    //});
}

// 刪除裝置
// Act
function deleteDevicePromse(id){
    return new Promise(function(resolve, reject) {
        let url = '/device/delete/'+id;
        //let url = '/get/test/datainfo';
        //var param = {"id": id}
        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "DELETE",
            cache: false,
            async: false,
            //data: JSON.stringify(param),
            //contentType: "application/json",
            success: function (response) {
                //console.log(response);
                datacol = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });

        resolve('ok');
    });
}

// trigger point
function deleteDevice(id){
    //console.log(id);
    deleteDevicePromse(id)
    .then(function() {
        //再次取出裝置列表
        initDatatPromse1()
        .then(function(obj_data) {
            //顯示畫面
            //console.log(obj_data);
            let group =callWebAPI('/group', 'get', 'None'); //取出群組列表
            let equipment =callWebAPI('/equipmentcode', 'get', 'None'); //取出設備列表

            showDeviceListTable(obj_data, group, equipment); //顯示畫面
            $('#showModal').modal('toggle');
            //$('#showModal').hide();
        });
    });
}

// 裝置註冊
function setDevice(id, type){
    actBindDevicePromse(id, type)
    .then(function() {
        //顯示畫面
        reloadDeviceList();

        setDeviceMsg(id, 'set');
        //$('#showModal').modal('toggle');
        //$('#showModal').hide();
    });
}

// Act
function actBindDevicePromse(id, type){
    return new Promise(function(resolve, reject) {
        let url = '/device/bind';

        let name = $('#name_'+id).val();
        let equipment = $('#equipment_'+id).val();
        let group = $('#group_'+id).val();

        //let url = '/get/test/datainfo';
        let param = {"id": id, "name": name, "equipment": equipment, "group": group, "type": type}
        //console.log(param);

        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "POST",
            cache: false,
            async: false,
            data: JSON.stringify(param),
            contentType: "application/json",
            success: function (response) {
                console.log(response);
                //datacol = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });

        resolve('ok');
    });
}


//確認刪除設備提示訊息
function confirmDelEquipment(index){
    //console.log(index);
    //$(".modal-dialog").removeClass("modal-lg");  //移除Class
    $('#ModalLabel').text('Confirm Delete Equipment');
    $('.body-content').text('Are you sure you want to delete the equipment?');
    $('.footer-content').html("<button type='button' class='btn btn-danger' onClick=\"triggerDelEquip("+index+")\">Delete</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");

    $('#showMsg').modal({backdrop: 'static', keyboard: false});
}

//Trigger Delete Equipment
function triggerDelEquip(index){
    deleteEquipmentPromse(index)
    .then(function() {
        //顯示畫面
        initDatatPromse2()
        .then(function(obj_data) {
            //顯示畫面
            //console.log(obj_data);
            showEquipmentListTable(obj_data); //顯示畫面
            $('#showMsg').modal('toggle');
        });
    });
}

// 刪除裝置 - ACT
function deleteEquipmentPromse(index){
    return new Promise(function(resolve, reject) {
        let url = '/delete/equipmentcode/'+index;

        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "DELETE",
            cache: false,
            async: false,
            //data: JSON.stringify(param),
            //contentType: "application/json",
            success: function (response) {
                //console.log(response);
                datacol = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });

        resolve('ok');

    });
}



//新增 / 更新 設備
//@param: type : new  / (id) -- update
function setEquipemnt(type){
        //console.log(type);
      $('.settinglist').html('');
      $('.responselist').html('');
      $('#brand').val('');
      $('#model').val('');
      //$(".modal-dialog").addClass("modal-lg"); //變大modal
      if(type == 'new'){
        $('#showForm #ModalLabel').text('Append Equipemnt');
        $('.footer-content').html("<button type='button' class='btn btn-primary' onClick=\"createEquipment()\">Save</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
      }
      else{
        let obj = callWebAPI('/equipmentcode/'+type+'', 'get', 'None'); //取出設備列表
        //console.log(obj['dataset'][0]);
        $('#showForm #ModalLabel').text('Update Equipemnt');
        $('#brand').val(obj['dataset'][0]['brand']);
        $('#model').val(obj['dataset'][0]['model']);
        $('#baudrate').val(obj['dataset'][0]['baudrate']);
        $('#config').val(obj['dataset'][0]['config']);
        $('#power_on').val(obj['dataset'][0]['setting'][0]['code']);
        $('#power_off').val(obj['dataset'][0]['setting'][1]['code']);
        //設定碼
        var filterItem = obj['dataset'][0]['setting'].filter(function(item, index, array){
          return index != 0 && index != 1;       // 取得大於五歲的
        });
        //console.log(filterItem);
        createSetForm('upd', filterItem);
        //回應碼
        createResponeForm('upd', obj['dataset'][0]['response']);
        $('.footer-content').html("<button type='button' class='btn btn-primary' onClick=\"updateEquipment('"+type+"')\">Save</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
      }
      //form = createForm();
      //$('.body-content').html(form);
      $('#showForm').modal({backdrop: 'static', keyboard: false});
}


//新增設定
function createSetForm(type, param=None){
   var str ='';

   if(type == 'new'){
       str += "<div class='form-row pt-1'>";
     // str += "<div class='col-2'><input type='text' class='form-control' placeholder='key' /></div>";
       str += "<div class='col-3'>";
       str += "<select class='form-control' name='setKey[]'>";
       str += "<option value='non'>Action</option>";
       str += "<option value='mute-on'>Mute ON</option>";
       str += "<option value='mute-off'>Mute OFF</option>";
       str += "</select>";
       str += "</div>";
       str += "<div class='col-9'><input type='text' class='form-control' placeholder='code' name='setCode[]' /></div>";
       //str += "<div class='col-2'><input type='text' class='form-control' placeholder='commit' /></div>";
       str += "</div>";

       //console.log(str);
       $('.settinglist').append(str);
   }
   else{
        console.log(param);
        for(var i=0; i<param.length; i++){
                str += "<div class='form-row pt-1'>";
                // str += "<div class='col-2'><input type='text' class='form-control' placeholder='key' /></div>";
                str += "<div class='col-3'>";
                str += "<select class='form-control' name='setKey[]'>";
                str += "<option value='non'>Action</option>";
                str += "<option value='mute-on'";
                if(param[i]['name'] == 'mute-on'){
                    str += ' selected';
                }
                str += ">Mute ON</option>";
                str += "<option value='mute-off'";
                if(param[i]['name'] == 'mute-off'){
                    str += ' selected';
                }
                str += ">Mute OFF</option>";
                str += "</select>";
                str += "</div>";
                str += "<div class='col-9'><input type='text' class='form-control' placeholder='code' name='setCode[]' value='"+param[i]['code']+"' /></div>";
                //str += "<div class='col-2'><input type='text' class='form-control' placeholder='commit' /></div>";
                str += "</div>";
        }

        $('.settinglist').append(str);
   }
   //document.getElementById("settinglist").append(str);
}

//新增回應碼設定
function createResponeForm(type, param=None){
   var str ='';

   if(type == 'new'){
       str += "<div class='form-row pt-1'>";
       //str += "<div class='col-2'><input type='text' class='form-control' placeholder='key' /></div>";
       str += "<div class='col-3'>";
       str += "<select class='form-control' id='key' name='resKey[]'>";
       str += "<option value='non'>Action</option>";
       str += "<option value='on-ok'>Power ON</option>";
       str += "<option value='off-ok'>Power OFF</option>";
       str += "<option value='mute-on-ok'>Mute ON</option>";
       str += "<option value='mute-off-ok'>Mute OFF</option>";
       str += "</select>";
       str += "</div>";
       str += "<div class='col-9'><input type='text' class='form-control' placeholder='code' name='resCode[]' /></div>";
       //str += "<div class='col-5'><input type='text' class='form-control' placeholder='commit' /></div>";
       str += "</div>";

       //console.log(str);
       $('.responselist').append(str);
   }
   else{
       for(var i=0; i<param.length; i++){
            str += "<div class='form-row pt-1'>";
            //str += "<div class='col-2'><input type='text' class='form-control' placeholder='key' /></div>";
            str += "<div class='col-3'>";
            str += "<select class='form-control' id='key' name='resKey[]'>";
            str += "<option value='non'>Action</option>";
            str += "<option value='on-ok'";
            if(param[i]['name'] == 'on-ok'){
               str += ' selected';
            }
            str += " >Power ON</option>";
            str += "<option value='off-ok'";
            if(param[i]['name'] == 'off-ok'){
                str += ' selected';
            }
            str += ">Power OFF</option>";
            str += "<option value='mute-on-ok'>Mute ON</option>";
            str += "<option value='mute-off-ok'>Mute OFF</option>";
            str += "</select>";
            str += "</div>";
            str += "<div class='col-9'><input type='text' class='form-control' placeholder='code' name='resCode[]' value='"+param[i]['code']+"' /></div>";
            //str += "<div class='col-5'><input type='text' class='form-control' placeholder='commit' /></div>";
            str += "</div>";
       }

      $('.responselist').append(str);
   }
   //document.getElementById("settinglist").append(str);
}


// 新增設備
function createEquipment(){
    actCreateEquipmentPromse()
    .then(function() {
        //console.log('finish');
        initDatatPromse2()
        .then(function(obj_data) {
            //顯示畫面
            //console.log(obj_data);
            showEquipmentListTable(obj_data); //顯示畫面
        });

        $('#showForm').modal('toggle');
    });
}

// 更新設備
function updateEquipment(index){
    //console.log(index);
    actUpdEquipmentPromse(index)
    .then(function() {
        //console.log('finish');
        initDatatPromse2()
        .then(function(obj_data) {
            //顯示畫面
            $('.showalert').show();
            $('.showalert').text("The Equipment was updated successfully");
            setTimeout(() => {
               $('.showalert').hide();
            }, 3000);
            //console.log(obj_data);
            showEquipmentListTable(obj_data); //顯示畫面
        });

        $('#showForm').modal('toggle');
    });
}

// 更新設備 - ACT
function actUpdEquipmentPromse(index){
    return new Promise(function(resolve, reject) {
        let brand = $('#brand').val();
        let model = $('#model').val();
        let baudrate = $('#baudrate').val();
        let config = $('#config').val();
        //console.log(config);
        //設定碼 - 十進制
        let power_on = $('#power_on').val();   //必填
        let power_off = $('#power_off').val(); //必填
        //var setName = document.querySelectorAll("input[name='setKey[]']");  //取出 Setting 名稱
        let setName = document.querySelectorAll("select[name='setKey[]']");  //取出 Setting 名稱
        let setCode = document.querySelectorAll("input[name='setCode[]']");  //取出 Setting Code
        //console.log(setName.length);
        //console.log(setCode.length);
        let settingVal =[{"name": "on", "code": power_on}, {"name": "off", "code": power_off}];

        if(setName.length != 0){
            let item ='';
            for(var i=0; i<setName.length; i++){
                //console.log(i);
                item = {"name": setName[i].value, "code": setCode[i].value }
                settingVal.push(item);
            }
        }
        //回應碼
        let resName = document.querySelectorAll("select[name='resKey[]']");  //取出 Setting 名稱
        let resCode = document.querySelectorAll("input[name='resCode[]']");  //取出 Setting Code

        let resVal = [];

        if(resName.length != 0){
            let item ='';
            for(var i=0; i<resName.length; i++){
                //console.log(i);
                item = {"name": resName[i].value, "code": resCode[i].value }
                resVal.push(item);
            }
        }

        let param = {"brand": brand, "model": model, "baudrate": baudrate, "config": config, "setting": settingVal, "response": resVal}
        //console.log(param);
        let url = "/update/equipmentcode/"+index;
        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "PUT",
            cache: false,
            async: false,
            data: JSON.stringify(param),
            contentType: "application/json",
            success: function (response) {
                console.log(response);
            },
            complete: function() {
               //console.log('finish')
            },
            error: function (error) {
               console.log(error);
            }
        });

        resolve('ok');
    });
}

// 新增設備 - ACT
function actCreateEquipmentPromse(){
    return new Promise(function(resolve, reject) {
        let brand = $('#brand').val();
        let model = $('#model').val();
        let baudrate = $('#baudrate').val();
        let config = $('#config').val();
        //console.log(config);
        if(brand == '' && model == ''){
            $('.showalert').show();
            $('.showalert').addClass('alert-danger');
            $('.showalert').text("Please fill in necessary the form");
            setTimeout(() => {
               $('.showalert').hide();
            }, 3000);
            $('#showForm').modal('toggle');
        }
        else{
            $('.showalert').removeClass('alert-danger');
            //設定碼 - 十進制
            let power_on = $('#power_on').val();   //必填
            let power_off = $('#power_off').val(); //必填
            //var setName = document.querySelectorAll("input[name='setKey[]']");  //取出 Setting 名稱
            let setName = document.querySelectorAll("select[name='setKey[]']");  //取出 Setting 名稱
            let setCode = document.querySelectorAll("input[name='setCode[]']");  //取出 Setting Code
            //console.log(setName.length);
            //console.log(setCode.length);
            let settingVal =[{"name": "on", "code": power_on}, {"name": "off", "code": power_off}];

            if(setName.length != 0){
                let item ='';
                for(var i=0; i<setName.length; i++){
                    //console.log(i);
                    item = {"name": setName[i].value, "code": setCode[i].value }
                    settingVal.push(item);
                }
            }
            //回應碼
            let resName = document.querySelectorAll("select[name='resKey[]']");  //取出 Setting 名稱
            let resCode = document.querySelectorAll("input[name='resCode[]']");  //取出 Setting Code

            let resVal = [];

            if(resName.length != 0){
                let item ='';
                for(var i=0; i<resName.length; i++){
                    //console.log(i);
                    item = {"name": resName[i].value, "code": resCode[i].value }
                    resVal.push(item);
                }
            }

            let param = {"brand": brand, "model": model, "baudrate": baudrate, "config": config, "setting": settingVal, "response": resVal}
            //console.log(dataItem);
            let url = "/set/equipmentcode";
            $.ajax({
                //url: '/api/sensor/?device='+device,
                url: url,
                type: "POST",
                cache: false,
                async: false,
                data: JSON.stringify(param),
                contentType: "application/json",
                success: function (response) {
                    console.log(response);
                },
                complete: function() {
                   //console.log('finish')
                },
                error: function (error) {
                   console.log(error);
                }
            });

            resolve('ok');
        }
    });
}