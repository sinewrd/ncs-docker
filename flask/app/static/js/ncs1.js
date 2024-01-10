// 登出
// 2023.09.21 新增
function logOut(){
    window.location= "/logout";
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

//顯示裝置樣版
function showDevice1(item){
  //console.log(item);
  let str1 ='';

  str1 += "<td class='showdevtable'>";
  if(item['conn_status'] != 'off'){
    str1 += "<div class='pl-2'><input type='checkbox' name='Checkbox[]' value='"+item['id']+"' id='checkbox-"+item['id']+"'></div>";
  }
  else{
    str1 += "<div class='pl-2'><input type='checkbox' name='Checkbox[]' value='"+item['id']+"' id='checkbox-"+item['id']+"' disabled></div>";
  }
  str1 += "<div class='d-flex justify-content-center' style='border:#FF0000 0px solid;'>";
  str1 += "<div class='container' id='status_"+item['id']+"' style='border:#0000FF 0px solid;'>";
  if(item['conn_status'] == "off"){
    str1 += icon[2];
    str1 += "<div class='text jstext_"+item['id']+"'></div>";
  }
  else if(item['equipment_status'] == "on"){
    str1 += icon[0];
    //console.log(icon[0]);
    str1 += "<div class='text jstext_"+item['id']+"'>"+item['name']+"</div>";
  }
  else if(item['equipment_status'] == "off"){
    str1 += icon[1];
    //console.log(icon[1]);
    str1 += "<div class='text_1 jstext_"+item['id']+"'>"+item['name']+"</div>";
  }
  //str1 += "<img src='{{url_for('static', filename='images/9.Device/power_on-183x119_new.png')}}' class='image'>";

  str1 += "</div>";
  str1 += "<div class='div2 px-2'><a href='javascript:void(0)' onClick=\"showDevicePanel1('"+item['id']+"')\"><i class='fas fa-ellipsis-h' style='font-size:18px;color:#47525D;'></i></a></div>";
  str1 += "</div>";
  str1 += "</td>";

  return str1;
}

//顯示裝置樣版 - empty
function showDevice2(){
  //console.log(item);
  let str1 ='';

  str1 += "<td class='showdevtable'>";
  str1 += "<div class='pt-4'></div>";
  str1 += "<div class='d-flex justify-content-center'>";
  str1 += "<div class='container'>";
  str1 += "<img src='/static/images/9.Device/white-183x119_new.png' class='image px-1' width='130%'>";
  str1 += "<div class='text jstext pb-5'></div>";
  //str1 += "<img src='{{url_for('static', filename='images/9.Device/power_on-183x119_new.png')}}' class='image'>";
  str1 += "</div>";
  str1 += "<div class='div2 px-2'><i class='fas fa-ellipsis-h' style='font-size:18px;color:#F8F9FC;'></i></div>";
  str1 += "</div>";
  str1 += "</td>";

  return str1;
}


//顯示Zone樣版
function showZone1(item, i, type){
  //console.log(i);
  let image = '';
  let str1 ='';

  str1 += '<td>';
  str1 += '<a href="javascript:void(0)"><div class="container1">';
  if(i == 0){
    image = '/static/images/8.Zone/normal_Science-Building-230x230.png';
  }
  else if(i == 1){
    image = '/static/images/8.Zone/normal_Medical-Building-230x230.png';
  }
  else if(i == 2){
    image = '/static/images/8.Zone/normal_Medical-Building-230x230.png';
  }
  else if(i == 3){
    image = '/static/images/8.Zone/normal_Medical-Building-230x230.png';
  }
  else if(i == 4){
    image = '/static/images/8.Zone/normal_Liberal-Arts-230x230.png';
  }
  else if(i == 5){
    image = '/static/images/8.Zone/normal_Mechatronics-230x230.png';
  }

  if(type == 'dashboard'){
    //console.log(item['index']);
    //str1 += '<img src="'+image+'" width="110%" class="image'+item['index']+'" onclick=\'redirectURL('+item['index']+', "dashboard", '+i+')\'>';
    str1 += '<img src="'+image+'" width="105%" class="image'+i+'" onclick=\'redirectURL("'+item['index']+'", "dashboard", '+i+')\'>';
  }
  else if(type == 'device'){
    str1 += '<img src="'+image+'" width="105%" class="image'+i+'" onclick=\'redirectURL("'+item['index']+'", "device", '+i+')\'>';
  }
  else if(type == 'analysis'){
    str1 += '<img src="'+image+'" width="105%" class="image'+i+'" onclick=\'redirectURL("'+item['index']+'", "analysis", '+i+')\'>';
    //console.log(typeof item['index'])
  }
  str1 += '<div class="text'+i+'">'+item['zone']+'</div>';
  str1 += '</a>';
  str1 += '</td>';

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

function showDevicePanel1(id){
    //console.log(id);
    $('#ModalLabel').text('Device Information'); //Title
    //console.log(data);
    var filterData = data['dataset'].filter(function(item, index, array){
      return item.id == id;
    });
    //console.log(filterData[0]);
    let url = '/get/statistics/'+id;
    //console.log(url);
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
           //console.log(response['dataset']);
           $('.dev_name').text(filterData[0]['name']);  //名稱
           //連線狀態
           let status = '';
           if(filterData[0]['conn_status'] == 'on'){
                status = 'On-line';
           }
           else{
                status = 'Off-line';
           }
           $('.dev_status').text(status); //conn_status

           //kwh
           //console.log(response['dataset'][0]['addwh']);
           //console.log(response['dataset'].length);
           if(filterData[0]['conn_status'] == 'on' || response['dataset'].length == 0){
                $('.dev_kwh').text(0);
           }
           else{
                $('.dev_kwh').text(response['dataset'][0]['addwh']);
           }

           let zone_name ='';
           if( filterData[0]['zone_name'] =='none'){
                zone_name = 'Not Zone';
           }
           else{
                //let zone = getZone(filterData[0]['zone_id']);
                zone_name = filterData[0]['zone_name'];
           }
           $('.dev_zone').text(zone_name);

           let group_name ='';
           if( filterData[0]['group_name'] =='none'){
                group_name = 'Not Group';
           }
           else{
                group_name = filterData[0]['group_name']
           }
           $('.dev_group').text(group_name);
        },
        complete: function() {
           //console.log('finish')
        },
        error: function (error) {
           console.log(error);
        }
    });

    $('.footer-content').html("<button type='button' class='btn btn-secondary' onClick='closeInfoModal()'>Close</button>");
    $('#showMsg').modal({backdrop: 'static', keyboard: false});
}

// 取出 Zone區名稱
function getZone(gid){
    //console.log(gid);
    var val;
  $.ajax({                        //return 有Closer作用, 通常Closer是用迴圈(多值)呼叫另外一個function時明顯有作用
    url:  "/zone/"+gid, //路徑, 變數
    type: "GET",                  //傳值方式
    //data: "folder="+folder,            //傳送使用者帳號
    cache: false,        //清除cache
    async: false,
    //dataType: "json",   //返回指定對像
    //失敗時處理的事件
    error: function(xhr) {
      console.log('Ajax request 發生錯誤');
    },
    //成功傳回來的值
    success: function(response){
      val = response;
    },
  });
  //console.log(val);
  return val;
}

// 取出 Group名稱
// 取出 Zone區名稱
function getGroup(gid){
    //console.log(gid);
    var val;
  $.ajax({                        //return 有Closer作用, 通常Closer是用迴圈(多值)呼叫另外一個function時明顯有作用
    url:  "/group/"+gid, //路徑, 變數
    type: "GET",                  //傳值方式
    //data: "folder="+folder,            //傳送使用者帳號
    cache: false,        //清除cache
    async: false,
    //dataType: "json",   //返回指定對像
    //失敗時處理的事件
    error: function(xhr) {
      console.log('Ajax request 發生錯誤');
    },
    //成功傳回來的值
    success: function(response){
      val = response;
    },
  });
  //console.log(val);
  return val;
}

//取消裝置Timer
function stopTimer(){
    clearInterval(devTimer); //清除Timer
    $('#showMsg').modal('hide');
}

//關閉Modal
function closeInfoModal(){
    $('#showMsg').modal('toggle');
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
    let userId = $('#userId').val();    //userId
    //console.log(userId);
    let url = '/device/cmd';
    let param = '';
    if(act == "ON"){
       param = {"id": id, "action":"on", "set": set, "username": userId}
    }else{
       param = {"id": id, "action":"off", "set": set, "username": userId}
    }
   console.log(param);
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
        location.href= "/dashboard1";
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


// Group Data
// param: type(dashboard、device)
// param: value (ObjectId值)
function initDatatPromse3(g_id, type){
    return new Promise(function(resolve, reject) {
        //console.log(g_id);
        let value = '';
        if(g_id == 0){
            value = 'all';
        }
        else{
            value = g_id;
        }
        //console.log(value);
        //value = '65375c24e8ff2efe1675b8a2';
        let url = '/device/zone/'+type+'/'+value;
        //console.log(url);
        //let url = '/device/test/group/'+g_id+'/'+num;
        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "GET",
            cache: false,
            async: false,
            //data: JSON.stringify(param),
            //contentType: "application/json",
            success: function (response, status, xhr) {
                //console.log(xhr['readyState']);
                //console.log(xhr.status);  //網路連線狀態
                if(xhr.status == 200){
                    $('.div_right_bottom').hide();
                }
                data = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
              $('.div_right_bottom').show();
              //$("input[name='Checkbox[]']").attr("disabled", true);
            }
        });
        //console.log(data);
        resolve(data);
        //resolve(data);
  });
}

// 取出Zone列表
function initDatatPromse4(type){
    return new Promise(function(resolve, reject) {
        let url ='';
        if(type == 'zone'){
            url = '/zone';
        }
        else if(type == 'group'){
            url = '/group';
        }
        else if(type == 'account'){
            url = '/account';
        }
        else if(type == 'log'){
            url = '/logdataset';
        }
        else if(type == 'exportlog'){
            url = '/log/export';
        }

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

// Zone Data
// 2023.12.27 新增type。變換 URL
function initZoneData(g_id){
    return new Promise(function(resolve, reject) {
        //console.log(type);
        value = '';
        if(g_id == 0){
            value = 'all';
        }
        else{
            value = g_id;
        }

        let url = '/zonelist/'+value;
        //console.log(url);
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
                zonedata = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });
        //console.log(zonedata);
        resolve(zonedata);
        //resolve(data);
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


//取出Analysis
function getAnalysisDataPromse(zone, group, today, firstday, lastday){
    return new Promise(function(resolve, reject) {
        let url = '/get/analysisdata';
        //let url = '/get/test/datainfo';
        var param = {"zone": zone, "group": group, "today": today, "firstday": firstday, "lastday": lastday}
        let data1 ='';
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
                data1 = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });

        resolve(data1);
    });
}



//取出Zone Analysis
function getAnalysisZoneDataPromse(id, today, firstday, lastday, type){
    return new Promise(function(resolve, reject) {
        let url = '/get/analysisdata';
        //let url = '/get/test/datainfo';
        var param ='';
        if(type == "zone"){
            param = {"zone": id, "today": today, "firstday": firstday, "lastday": lastday}
        }
        else if(type == "group"){
            param = {"group": id, "today": today, "firstday": firstday, "lastday": lastday}
        }
        let data1 ='';
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
                data1 = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });

        resolve(data1);
    });
}


//取出Group Analysis
function getAnalysisGroupDataPromse(groupId, today, firstday, lastday){
    return new Promise(function(resolve, reject) {
        let url = '/get/analysisdata';
        //let url = '/get/test/datainfo';
        var param = {"group": groupId, "today": today, "firstday": firstday, "lastday": lastday}
        let data1 ='';
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
                data1 = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });

        resolve(data1);
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
function showDeviceListTable(obj_data, group_list, equipment_list, zone_list){
    //console.log(group_list['group'] );
    var str = '';
    //console.log(obj_data);
    //obj_data['dataset'].forEach(function(value) {
    obj_data.forEach(function(value) {
        //console.log(value['equipment_index']);
        //console.log(value['zone_id']);
        //console.log(value['group_id']);
        str += '<tr>';
        //核取選單
        /*
        str += '<td class="align-middle">';
        str += '<div class="custom-control custom-checkbox">';
        str += '<input class="form-check-input" type="checkbox" name="Checkbox[]" value="'+value['id']+'">';
        str += '</div>';
        str += '</td>';
        */
        //ID
        str += '<td class="align-middle">'+value['id']+'</td>';
        //名稱
        str += '<td class="align-middle">'+value['name']+'</td>';
        //Status
        if(value['active'] == 1 && value['conn_status'] == 'off'){
             str += '<td class="align-middle">Off-line</td>';
        }
        else if(value['active'] == 1 && value['equipment_status'] == 'off'){
             str += '<td class="align-middle">Power Off</td>';
        }
        else if(value['active'] == 1 && value['equipment_status'] == 'on'){
             str += '<td class="align-middle">Power On</td>';
        }
        else if(value['active'] == 0){
             str += '<td class="align-middle">unregister</td>';
        }
        //Equipment。 這邊要呼叫API取出 Equipment
        str += '<td class="align-middle">'+value['equipment_name']+'</td>';
        //IP
        str += '<td class="align-middle">'+value['ip']+'</td>';
        //Zone
        str += '<td class="align-middle">'+value['zone_name']+'</td>';
        //Group
        str += '<td class="align-middle">'+value['group_name']+'</td>';
        //名稱
        //str += '<td><input type="text" class="form-control" id="name_'+value['id']+'" value="'+value['name']+'" maxlength="10" style="width: 6vw;" /></td>';
        //Equipment。 這邊要呼叫API取出 Equipment
        /*
        str += '<td>';
        str += '<select class="form-control" id="equipment_'+value['id']+'" style="width: 7vw;" >';
        str += '<option value=0>-- Select --</option>';
        equipment_list['dataset'].forEach(function(value1) {
            str += '<option value="'+value1['index']+'"';
            if(value1['index'] == value['equipment_index']){
                str += ' selected';
            }
            str += '>'+value1['brand']+'-'+value1['model']+'</option>';
        });
        str += '</select>';
        str += '</td>';
        */
        //Zone。這邊要呼叫API取出Zone
        //console.log( zone_list );
        /*
        str += '<td>';
        str += '<select class="form-control" id="zone_'+value['id']+'" style="width: 7vw;">';
        str += '<option value=0>-- Select --</option>';
        //console.log(value['zone_id']);
        zone_list['group'].forEach(function(value1) {
            //console.log(value1['index']);
            str += '<option value="'+value1['index']+'"';
            if(value1['index'] == value['zone_id']){
                str += ' selected';
            }
            str += '>'+value1['zone']+'</option>';
        });
        str += '</select>';
        str += '</td>';
        */
        //Group。這邊要呼叫API取出Group
        /*
        str += '<td>';
        str += '<select class="form-control" id="group_'+value['id']+'" style="width: 7vw;">';
        str += '<option value=0>-- Select --</option>';
        //console.log(obj_data['group']);
        group_list['group'].forEach(function(value1) {
            //console.log(value1);
            str += '<option value="'+value1['index']+'"';
            if(value1['index'] == value['group_id']){
                str += ' selected';
            }
            str += '>'+value1['name']+'</option>';
        });
        str += '</select>';
        str += '</td>';
        */
        str += '<td id="act-'+value['id']+'">';
        // Button
        //if(value['active'] == 1){
        str += '<button type="button" class="btn btn-success mr-2" onClick=\'editDeviceSetting("'+value['id']+'")\'>Edit</button>';
        //str += '<button type="button" class="btn btn-success mr-2" onClick=\'setDevice("'+value['id']+'", "set")\'>Setting</button>';
        /*
        }
        else{
            str += '<button type="button" class="btn btn-primary mr-2" onClick=\'setDevice("'+value['id']+'", "reg")\'>Register</button>';
        }
        */
        str += '<button type="button" class="btn btn-danger" onClick="confirmDelete(\''+value['id']+'\')">Delete</button>';
        str += '</td>';

        str += '</tr>'
    });

    $('#devlist').html(str);
}

//裝置設定彈跳視窗
function editDeviceSetting(id){
    //console.log(data);
    var filterObj = data['dataset'].filter(function(item, index, array){
                return item.id == id;
            });
    console.log(filterObj[0]);
    let group_list =callWebAPI('/grouplist', 'get', 'None'); //取出群組列表
    let equipment_list =callWebAPI('/equipmentcodelist', 'get', 'None'); //取出設備列表
    let zone_list =callWebAPI('/zonelist', 'get', 'None'); //取出Zone列表
    //console.log(group_list);
    //console.log(equipment_list);
    //console.log(zone_list);
    //Zone
    let urlvaild1 = '/zonelist/'+filterObj[0]['zone_id']
    let zone_list1 =callWebAPI(urlvaild1, 'get', 'None'); //取出群組列表
    //Group
    let urlvaild = '/grouplist/'+filterObj[0]['group_id']
    let group_list1 =callWebAPI(urlvaild, 'get', 'None'); //取出群組列表
    //Equipment
    let urlvaild2 = '/equipmentcodelist/'+filterObj[0]['equipment_index']
    let equipment_list1 =callWebAPI(urlvaild2, 'get', 'None'); //取出群組列表
    //console.log(equipment_list1['dataset'].length);

    $('#ModalLabel1').text('Edit');
    let str ='';

    str += "<form>";
    //ID
    str += "<div class='form-group row'>";
    str += "<label for='id' class='col-2 col-form-label'>ID</label>";
    str += "<div class='col-10'>";
    str += "<input type='text' readonly class='form-control-plaintext pt-2 pl-4' id='staticID' value='"+id+"'>";
    //str += id;
    str += "</div>";
    str += "</div>";
    //Name
    str += "<div class='form-group row'>";
    str += "<label for='name' class='col-2 col-form-label'>Name</label>";
    str += "<div class='col-8 ml-4'>";
    str += "<input type='text' class='form-control' id='dev_name' value='"+filterObj[0]['name']+"' >";
    //str += id;
    str += "</div>";
    str += "</div>";
    //Equipment
    str += "<div class='form-group row'>";
    str += "<label for='name' class='col-2 col-form-label'>Equipment</label>";
    str += "<div class='col-8 ml-4'>";
    str += '<select class="form-control" id="dev_equipment">';
    if(filterObj[0]['active'] == 0 || equipment_list1['dataset'].length == 0 || filterObj[0]['equipment_name'] == "none"){
        str += '<option value=0>-- Select --</option>';
    }
    equipment_list['dataset'].forEach(function(value1) {
       str += '<option value="'+value1['index']+'"';
       if(value1['index'] == filterObj[0]['equipment_index']){
           str += ' selected';
       }
       str += '>'+value1['brand']+'-'+value1['model']+'</option>';
    });
    str += '</select>';
    str += "</div>";
    str += "</div>";
    //zone
    str += "<div class='form-group row'>";
    str += "<label for='name' class='col-2 col-form-label'>Zone</label>";
    str += "<div class='col-8 ml-4'>";
    str += '<select class="form-control" id="dev_zone">';
    if(filterObj[0]['active'] == 0 || zone_list1['group'].length == 0 || filterObj[0]['zone_name'] == "none"){
        str += '<option value=0>-- Select --</option>';
    }
    zone_list['group'].forEach(function(value1) {
       str += '<option value="'+value1['index']+'"';
       if(value1['index'] == filterObj[0]['zone_id']){
           str += ' selected';
       }
       str += '>'+value1['zone']+'</option>';
    });
    str += '</select>';
    //str += "<input type='text' class='form-control' id=\'name_"+id+"\" value=\'"+id+"\' />";
    //str += id;
    str += "</div>";
    str += "</div>";
    //group
    str += "<div class='form-group row'>";
    str += "<label for='name' class='col-2 col-form-label'>Group</label>";
    str += "<div class='col-8 ml-4'>";
    str += '<select class="form-control" id="dev_group">';
    if(filterObj[0]['active'] == 0 || group_list1['group'].length == 0 || filterObj[0]['group_name'] == "none"){
        str += '<option value=0>-- Select --</option>';
    }
    group_list['group'].forEach(function(value1) {
       str += '<option value="'+value1['index']+'"';
       if(value1['index'] == filterObj[0]['group_id']){
           str += ' selected';
       }
       str += '>'+value1['name']+'</option>';
    });
    str += '</select>';
    //str += "<input type='text' class='form-control' id=\'name_"+id+"\" value=\'"+id+"\' />";
    //str += id;
    str += "</div>";
    str += "</div>";

    str += "</form>";

    $('.dev_setting').html(str);

    //Button
    let str1 ='';
    if(filterObj[0]['active'] == 1){
        str1 += '<button type="button" class="btn btn-secondary login100-form-title text-white mr-2" onClick=\'setDevice1("'+id+'", "set")\'>OK</button>';
    }
    else{
        str1 += '<button type="button" class="btn btn-success mr-2" onClick=\'setDevice1("'+id+'", "reg")\'>OK</button>';
    }
    str1 += '<button type=\'button\' class=\'btn btn-secondary\' data-dismiss=\'modal\'>Cancel</button>';
    $('#showForm .footer-content').html(str1);
    $('#showForm').modal({backdrop: 'static', keyboard: false});
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
    //obj_data['dataset'].forEach(function(value) {
    obj_data.forEach(function(value) {
        str += '<tr>';
        //ID
        //str += '<td class="align-middle">'+value['index']+'</td>';
        //Brand
        str += '<td class="align-middle">'+value['brand']+'</td>';
        //Model
        str += '<td class="align-middle">'+value['model']+'</td>';
        //baudrate
        str += '<td class="align-middle">'+value['baudrate']+'</td>';
        //config
        str += '<td>';
        str += '<button type="button" class="btn btn-success mr-2" onClick="updModelType(\''+value['index']+'\', \'equipment\')">Edit</button>';
        //console.log( convertConfig(value['config']) );
        //str += convertConfig(value['config']);
        str += '</td>';
        //setting
        /*
        str += '<td class="align-middle">';
        value['setting'].forEach(function(value1) {
            //console.log(value1);
            let setcode = strInsert(value1['code'], 2);
            //console.log(setcode);
            str += '<a href="javascript:void(0)" onClick="showCode(\''+value1['name']+'\', \''+setcode+'\')">'+value1['name']+'</a><br>';
            //str += value1['name']+' : '+setcode+'<br>';
        });
        str += '</td>';
        */
        //value['setting']+'</td>';
        /*
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
        */
        //value['response']+'</td>';
        //Button
        str += '<td>';
        //str += '<button type="button" class="btn btn-success mr-2" onClick="updModelType(\''+value['index']+'\', \'equipment\')">Edit</button>';
        str += '<button type="button" class="btn btn-danger" onClick="confirmDelModal(\''+value['index']+'\', \'equipment\')">Delete</button>';
        str += '</td>';

        str += '</tr>';
    });

    $('#equlist').html(str);
}

//Zone畫面列表
function showZoneListTable(obj_data, type){
    //console.log(obj_data);
    var str = '';

    obj_data.forEach(function(value) {
        str += '<tr>';
        //ID
        //str += '<td class="align-middle">'+value['index']+'</td>';
        //Name
        if(type == 'zone'){
            str += '<td class="align-middle">'+value['zone']+'</td>';
        }
        else{
            str += '<td class="align-middle">'+value['name']+'</td>';
        }
        str += '<td>';
        str += '<button type="button" class="btn btn-success mr-2" onClick="updModelType(\''+value['index']+'\', \''+type+'\')">Edit</button>'; //setModelType('new', 'zone')
        str += '<button type="button" class="btn btn-danger" onClick="confirmDelModal(\''+value['index']+'\', \''+type+'\')">Delete</button>';
        str += '</td>';
        str += '</tr>';
    });

    $('#zonelist').html(str);
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
    //console.log(devstatus);  //現在裝置狀態
}



//update Device Status - per 15 sec
//更新裝置狀態
function upddeviceStatus(gid){
    //console.log(gid);
    initDatatPromse(gid)
    .then(function(obj_data) {
            //顯示畫面
            //console.log(obj_data); //15 sec send
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


//取得時間英文格式
function getDateTimeFormat(){
     // 創建一個新的 Date 對象
    var currentDate = new Date();

    // 取得年、月、日、時、分、秒、星期幾
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月份從0開始，所以要加1
    var day = currentDate.getDate().toString().padStart(2, '0');
    var hours = currentDate.getHours().toString().padStart(2, '0');
    var minutes = currentDate.getMinutes().toString().padStart(2, '0');
    var seconds = currentDate.getSeconds().toString().padStart(2, '0');
    var dayOfWeek = getDayOfWeekName(currentDate.getDay());

    // 顯示日期時間的英文格式（包含日期和星期幾）
    //var englishFormat = `${getMonthName(currentDate.getMonth())} ${day}, ${year} ${hours}:${minutes}:${seconds} ${dayOfWeek}`;
    var englishFormat = `${dayOfWeek} ${getMonthName(currentDate.getMonth())} ${day} ${hours}:${minutes}:${seconds} ${year}`;

    return englishFormat;
}


// Helper 函數：根據月份數字取得月份名稱
function getMonthName(monthNumber) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  return monthNames[monthNumber];
}

// Helper 函數：根據星期幾的數字取得星期幾的英文名稱
function getDayOfWeekName(dayOfWeekNumber) {
  var dayOfWeekNames = [
    "Sun", "Mon", "Tue",
    "Wed", "Thur", "Fri", "Sat"
  ];

  return dayOfWeekNames[dayOfWeekNumber];
}


//update Device Status - per 15 sec
//更新裝置狀態
function upddeviceStatus1(zone_id){
    //console.log(zone_id);
    //$('.styletype').text(getDateTimeFormat()); //現在時間
    //getDateTimeFormat();
    initDatatPromse3(zone_id, 'dashboard') //全域變數Data
    .then(function(obj_data) {
        //console.log(obj_data);
        $('.total').text(obj_data['total']);
        $('.pw_on').text(obj_data['open']);
        $('.online').text(obj_data['standby']);
        $('.offline').text(obj_data['disconn']);
        $('.styletype').text(obj_data['nowTime']);
        //console.log(obj_data['dataset']);
        //顯示畫面
        obj_data['dataset'].forEach(function(item) {
            //console.log(item);
            if(item['conn_status'] == "off"){
                //str1 += icon[2];
                $('#status_'+item['id']+' .image').attr('src', '/static/images/9.Device/Off-line-183x119_new.png');
                $('.jstext_'+item['id']+'').text('');
                $('#checkbox-'+item['id']+'').prop('disabled', true);
            }
            else if(item['equipment_status'] == "on"){
                $('#status_'+item['id']+' .image').attr('src', '/static/images/9.Device/power_on-183x119_new.png');
                $('.jstext_'+item['id']+'').text(item['name']);
                $('.jstext_'+item['id']+'').css("color", "#A0CE4E");
                $('#checkbox-'+item['id']+'').prop('disabled', false);
            }
            else{
                $('#status_'+item['id']+' .image').attr('src', '/static/images/9.Device/normal-183x119_new.png');
                $('.jstext_'+item['id']+'').text(item['name']);
                $('.jstext_'+item['id']+'').css("color", "#999999");
                $('#checkbox-'+item['id']+'').prop('disabled', false);
            }
        });
        //pagination(obj_data['dataset'], nowPage);
    });
}


//確認刪除視窗
//param: type: device id 值
function confirmDelete(type){
    //console.log(type);
    //$('#ModalLabel').text('Confirm Delete Device');
    $('#ModalLabel').text('Delete Device');
    if(type == "select"){
        //$('.body-content').text('Are you sure you want to delete the checked device?');
        $('.body-content').text('Confirm to delete this device?');
        $('.footer-content').html("<button type='button' class='btn btn-danger' onClick=\"deleteSelect()\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
    }
    else{
       //$('.body-content').text('Are you sure you want to delete the device - '+type+' ?');
       $('.body-content').text('Confirm to delete this device?');
       $('.footer-content').html("<button type='button' class='btn btn-danger' onClick=\"deleteDevice('"+type+"') \">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
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
    alert('update sucess');
    let obj_data =callWebAPI('/device', 'get', 'None'); //取出群組列表
    //console.log(obj_data);
    let group =callWebAPI('/group', 'get', 'None'); //取出群組列表
    let equipment =callWebAPI('/equipmentcode', 'get', 'None'); //取出設備列表
    let zone =callWebAPI('/zone', 'get', 'None'); //取出Zone列表
    //console.log(obj_data);
    showDeviceListTable(obj_data['dataset'], group, equipment, zone); //顯示畫面
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
function confirmExec(e, type){
    let userId = $('#userId').val();    //userId
    //var array = [];
    let checkboxesdev = [];
    checkboxesdev = document.querySelectorAll("input[type='checkbox']:checked");
	//console.log(checkboxes);
	if(checkboxesdev.length == 0){
        $('#onMsg').hide();
        $('#offMsg').hide();
        $('#alertMsg').show();
        $('#batchexec').hide();

        //e.stopPropagation();
    }
    else{
        let btn = document.getElementById("batchexec");
        //console.log(btn);
        $('#batchexec').show();
        $('#alertMsg').hide();
        if(type == 'on'){
            $('.execTitle').text('Power On');
            $('#onMsg').show();
            $('#offMsg').hide();
            //Botton
            $('.btn-footer1').html("<button type='button' class='btn login100-form-title text-white' id='batchexec1' onClick=\"execAction(event, 'on')\">OK</button><button class='btn btn-secondary' type='button' data-dismiss='modal'>Cancel</button>");
            /*
            //設置按鈕屬性
            btn.addEventListener('click', function(event) {
                event.preventDefault();

                //let checkboxes1 = [];
	            let checkboxes1 = document.querySelectorAll("input[type='checkbox']:checked");
	            console.log(checkboxes1);
                //console.log('open');
                checkboxes1.forEach(function(obj) {
                    console.log(obj.value);
                    execution(event, 'ON', ''+obj.value+'', 'rs232tx')
                });

                //$('#confirmMsg').modal('hide');
                $('#confirmMsg').modal('toggle');
               // event.stopPropagation();
            });
            */
            e.stopPropagation();
        }
        else{
            $('.execTitle').text('Power Off');
            $('#onMsg').hide();
            $('#offMsg').show();
            //Botton
            $('.btn-footer1').html("<button type='button' class='btn login100-form-title text-white' id='batchexec1' onClick=\"execAction(event, 'off')\">OK</button><button class='btn btn-secondary' type='button' data-dismiss='modal'>Cancel</button>");
            /*
            //設置按鈕屬性
            btn.addEventListener('click', function(event) {
                //console.log('close');
                let checkboxes1 = document.querySelectorAll("input[type='checkbox']:checked");
                console.log(checkboxes1);
                checkboxes1.forEach(function(obj) {
                    //console.log(obj.value);
                    execution(event, 'OFF', ''+obj.value+'', 'rs232tx')
                });
                //$('#confirmMsg').modal('hide');
                $('#confirmMsg').modal('toggle');
                event.stopPropagation();
            });
            */
            e.stopPropagation();
        }
    }

    $('#confirmMsg').modal({backdrop: 'static', keyboard: false});
}


function execAction(event, act){
    //console.log(act);
    let checkboxes = document.querySelectorAll("input[name='Checkbox[]']:checked");
    //console.log(checkboxes);

    if(act == "on"){
        checkboxes.forEach(function(obj) {
            console.log(obj.value);
            execution(event, 'ON', ''+obj.value+'', 'rs232tx')
        });
    }
    else{
        checkboxes.forEach(function(obj) {
            //console.log(obj.value);
            execution(event, 'OFF', ''+obj.value+'', 'rs232tx')
        });
    }

    $('#confirmMsg').modal('toggle');
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
// 2023.12.07修改。新增Log紀錄
function deleteDevicePromse(id){
    return new Promise(function(resolve, reject) {
        let username = $('#userId').val();  //帳號

        let url = '/device/delete/'+id;
        //let url = '/get/test/datainfo';
        //var param = {"id": id}
        let param = {"username": username}
        let data ='';
        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "DELETE",
            cache: false,
            async: false,
            data: JSON.stringify(param),
            contentType: "application/json",
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

        resolve(data);
    });
}

// trigger point
function deleteDevice(id){
    //console.log(id);
    deleteDevicePromse(id)
    .then(function(obj_data1) {
        //再次取出裝置列表
        //console.log(obj_data1);
        initDatatPromse3(zone_id, 'device')
        .then(function(obj_data) {
            //console.log(obj_data);
            //顯示畫面
            $('.total').text(obj_data1['total']);
            $('.register').text(obj_data1['reg']);
            $('.unregister').text(obj_data1['unreg']);
            //console.log(tempPage);
            //顯示畫面
            pagination(obj_data['dataset'], tempPage, 'device');
            //$('#showModal').hide();
        });
    });

    $('#showModal').modal('toggle');
}

// 裝置註冊
function setDevice(id, type){
    //console.log(type);
    let device = $('#userId').val();
    //console.log(device);
    actBindDevicePromse(id, type)
    .then(function(obj_data) {
        if(type == 'set'){
            alert('It was updated success');
        }
        else{
            alert('It was registered success');
        }

        //console.log(obj_data)
        $('.total').text(obj_data['total']);
        $('.register').text(obj_data['reg']);
        $('.unregister').text(obj_data['unreg']);
        //console.log(nowPage);
        //let dev_nowPage = $('.current_page').text();
        //顯示畫面
        //reloadDeviceList();
        //查詢裝置清單
        initDatatPromse3(zone_id, 'device')
        .then(function(obj_data) {
            //console.log(obj_data);
            let str ='';
            str += '<button type="button" class="btn btn-success mr-2" onClick=\'setDevice("'+id+'", "set")\'>Setting</button>';
            str += '<button type="button" class="btn btn-danger" onClick="confirmDelete(\''+id+'\')">Delete</button>';
            //顯示畫面
            $('#act-'+id).html(str);
            //pagination(obj_data['dataset'], dev_nowPage, 'device');
        });
    });
}


function setDevice1(id, type){
    //console.log(type);
    //let userId = $('#userId').val();
    //console.log(userId);
    actBindDevicePromse1(id, type)
    .then(function(obj_data) {
        console.log(obj_data);
        $('.total').text(obj_data['total']);
        $('.register').text(obj_data['reg']);
        $('.unregister').text(obj_data['unreg']);
        //查詢裝置清單
        initDatatPromse3(zone_id, 'device')
        .then(function(obj_data) {
            //console.log(tempPage);
            pagination(obj_data['dataset'], tempPage, 'device');
        });
    });

    $('#showForm').modal ('toggle');
}


// Act
function actBindDevicePromse(id, type){
    return new Promise(function(resolve, reject) {
        let url = '/device/bind';

        let name = $('#name_'+id).val();
        let equipment = $('#equipment_'+id).val();
        let group = $('#group_'+id).val();
        let zone = $('#zone_'+id).val();
        let username = $('#userId').val();  //帳號
        //let url = '/get/test/datainfo';
        let param = {"id": id, "name": name, "equipment_index": parseInt(equipment), "group_id": parseInt(group), "zone_id": parseInt(zone), "type": type, "username": username}
        //console.log(param);
        let data;

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
                data = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });
        //console.log(data);
        resolve(data);
    });
}

// Act
//2023.12.27 update
function actBindDevicePromse1(id, type){
    return new Promise(function(resolve, reject) {
        let url = '/device/bind';

        let name = $('#dev_name').val();
        let equipment = $('#dev_equipment').val();
        //console.log(equipment);
        let group = $('#dev_group').val();
        let zone = $('#dev_zone').val();
        let username = $('#userId').val();  //帳號
        //let url = '/get/test/datainfo';
        let param = {"id": id, "name": name, "equipment_index": equipment, "group_id": group, "zone_id": zone, "type": type, "username": username}
        //console.log(param);

        let data;

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
                data = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });
        //console.log(data);
        resolve(data);
        //resolve('ok');
    });
}


//確認刪除設備提示訊息
function confirmDelModal(index, type){
    //console.log(index);
    //$(".modal-dialog").removeClass("modal-lg");  //移除Class
    if(type == 'equipment'){
        //$('#ModalLabel').text('Confirm Delete Equipment');
        $('#ModalLabel').text('Delete Equipment');
        //$('.body-content').text('Are you sure you want to delete the equipment?');
        $('.body-content').text('Confirm to delete this equipment?');
        $('.footer-content').html("<button type='button' class='btn btn-danger' onClick=\"triggerDelEquip("+index+")\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
    }
    else if(type == 'zone'){
        //$('#ModalLabel').text('Confirm Delete Zone');
        $('#ModalLabel').text('Delete Zone');
        //$('.body-content').text('Are you sure you want to delete the Zone?');
        $('.body-content').text('Confirm to delete zone?');
        $('.footer-content').html("<button type='button' class='btn btn-danger' onClick=\"triggerDelZone("+index+", 'zone')\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
    }
     else if(type == 'group'){
        //$('#ModalLabel').text('Confirm Delete Group');
        $('#ModalLabel').text('Delete Group');
        //$('.body-content').text('Are you sure you want to delete the Group?');
        $('.body-content').text('Confirm to delete group?');
        $('.footer-content').html("<button type='button' class='btn btn-danger' onClick=\"triggerDelZone("+index+", 'group')\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
    }
    else if(type == 'account'){
        //console.log(index);
        //$('#ModalLabel').text('Confirm Delete Account');
        $('#ModalLabel').text('Delete Account');
        //$('.body-content').text('Are you sure you want to delete the Account?');
        $('.body-content').text('Confirm to delete account?');
        $('.footer-content').html("<button type='button' class='btn btn-danger' onClick=\"triggerDelAccount("+index+")\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
    }

    $('#showMsg').modal({backdrop: 'static', keyboard: false});
}

//Trigger Delete Equipment
function triggerDelEquip(index){
    deleteEquipmentPromse(index)
    .then(function(obj_data1) {
        //console.log(obj_data1);
        //顯示畫面
        initDatatPromse2()
        .then(function(obj_data) {
            //顯示畫面
            //console.log(obj_data);
            $('.total').text(obj_data1['total']);
            obj_data = obj_data['dataset'].sort(function (a, b) { return a.Index < b.Index ? 1 : -1; });  //由高到低排序
            //showEquipmentListTable(obj_data); //顯示畫面
            pagination(obj_data, tempPage, 'equipment');
        });
    });

    $('#showMsg').modal('toggle');
}


//Trigger Delete Zone
function triggerDelZone(index, type){
    //console.log(type);
    deleteZonePromse(index, type)
    .then(function(obj_data1) {
        //console.log(obj_data1);
        //顯示畫面
        //initDatatPromse4('zone')
        initDatatPromse4(type)
        .then(function(obj_data) {
            //顯示畫面
            //console.log(obj_data);
            $('.total').text(obj_data['group'].length);
            obj_data = obj_data['group'].sort(function (a, b) { return a.Index < b.Index ? 1 : -1; });  //由高到低排序
            //showEquipmentListTable(obj_data); //顯示畫面
            //pagination(obj_data, nowPage, 'zone');
            pagination(obj_data, tempPage, type);
            $('#showMsg').modal('toggle');
        });
    });
}


//Trigger Delete Account
function triggerDelAccount(index){
    deleteAccountPromse(index)
    .then(function(obj_data1) {
        //console.log(obj_data1);
        initDatatPromse4('account')
        .then(function(obj_data) {
            //console.log(tempPage);
            //顯示畫面
            $('.total').text(obj_data['account'].length);
            pagination(obj_data['account'], tempPage, 'account');
            $('#showMsg').modal('toggle');
        });
    });
}


// 刪除裝置 - ACT
function deleteEquipmentPromse(index){
    return new Promise(function(resolve, reject) {
        let url = '/delete/equipmentcode/'+index;
        let data_equipment ='';

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
                data_equipment = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });

        resolve(data_equipment);
    });
}


// 刪除Zone - ACT
function deleteZonePromse(index, type){
    return new Promise(function(resolve, reject) {
        let url ='';
        if(type == 'zone'){
            url = '/delete/zone/'+index;
        }
        else if(type == 'group'){
            url = '/delete/group/'+index;
        }
        let data_zone ='';

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
                data_zone = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });

        resolve(data_zone);
    });
}


//新增 / 更新 設備
//@param: type : category: equipment / zone/ group
function setModelType(category){
      //$(".modal-dialog").addClass("modal-lg"); //變大modal
        if(category == 'equipment'){
             $('.settinglist').html('');
              $('.responselist').html('');
              $('#brand').val('');
              $('#model').val('');
              $//('#baudrate').val('');
              //$('#config').val('');
              $('#power_on').val('');
              $('#power_off').val('');
              //$('#power_on_ok').val('');
              //$('#power_off_ok').val('');
            //$('#showForm #ModalLabel').text('Append Equipemnt');
            $('#showForm #ModalLabel').text('New Equipemnt');
            $('.footer-content').html("<button type='button' class='btn btn-secondary login100-form-title text-white' onClick=\"createEquipment()\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
        }
        else if(category == 'zone'){
            $('#group').val('');
            //$('#showForm #ModalLabel').text('Append Zone');
            $('#showForm #ModalLabel').text('New Zone');
            $('.footer-content').html("<button type='button' class='btn btn-secondary login100-form-title text-white' onClick=\"createGroup('zone')\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
        }
        else if(category == 'group'){
            //group
            $('#group1').val('');
            //$('#showForm #ModalLabel').text('Append Group');
            $('#showForm #ModalLabel').text('New Group');
            $('.footer-content').html("<button type='button' class='btn btn-secondary login100-form-title text-white' onClick=\"createGroup('group')\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
        }
        else if(category == 'account'){
            //console.log(category );
            $('#username').prop("disabled", false);
            //group
            $('#username').val('');
            $('#name').val('');
            $('#pwd').val('');
            //$('#showForm #ModalLabel').text('Append Account');
            $('#showForm #ModalLabel').text('New User');
            $('.footer-content').html("<button type='button' class='btn btn-secondary login100-form-title text-white' onClick=\"createGroup('account')\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
        }
      //form = createForm();
      //$('.body-content').html(form);
      $('#showForm').modal({backdrop: 'static', keyboard: false});
}

//新增 / 更新 設備
//@param: type : category: equipment / zone/ group
function updModelType(index, category){
        //console.log(index);
        //console.log(category);
      //$(".modal-dialog").addClass("modal-lg"); //變大modal
        if(category == 'equipment'){
            let obj = callWebAPI('/equipmentcode/'+index+'', 'get', 'None'); //取出設備列表
            //console.log(obj['dataset'][0]);
            //$('#showForm #ModalLabel').text('Update Equipemnt');
            //$('#showForm #ModalLabel').text('Edit Equipemnt');
            $('#showForm #ModalLabel').text('Edit');
            $('#brand').val(obj['dataset'][0]['brand']);
            $('#model').val(obj['dataset'][0]['model']);
            $('#baudrate').val(obj['dataset'][0]['baudrate']);
            $('#config').val(obj['dataset'][0]['config']);
            $('#power_on').val(obj['dataset'][0]['setting'][0]['code']);
            $('#power_off').val(obj['dataset'][0]['setting'][1]['code']);
            //$('#power_on_ok').val(obj['dataset'][0]['response'][0]['code']);
            //$('#power_off_ok').val(obj['dataset'][0]['response'][1]['code']);
            //設定碼
            var filterItem = obj['dataset'][0]['setting'].filter(function(item, index, array){
              return index != 0 && index != 1;
            });
            $('.footer-content').html("<button type='button' class='btn btn-secondary login100-form-title text-white' onClick=\"updateEquipment('"+index+"')\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
        }
        else if(category == 'zone'){
           //console.log(index);
           let obj = callWebAPI('/zone/'+index+'', 'get', 'None'); //取出設備列表
           //console.log(obj['group']);
           //$('#showForm #ModalLabel').text('Update Zone');
           $('#showForm #ModalLabel').text('Edit Zone');
           $('#group').val(obj['group'][0]['zone']);
           $('.footer-content').html("<button type='button' class='btn btn-secondary login100-form-title text-white' onClick=\"updateZone('"+index+"', 'zone')\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
        }
        else if(category == 'group'){
           //group
           let obj = callWebAPI('/group/'+index+'', 'get', 'None'); //取出設備列表
           //console.log(obj['group'][0]['name']);
           //$('#showForm #ModalLabel').text('Update Group');
           $('#showForm #ModalLabel').text('Edit Group');
           $('#group1').val(obj['group'][0]['name']);
           $('.footer-content').html("<button type='button' class='btn btn-secondary login100-form-title text-white' onClick=\"updateZone('"+index+"', 'group')\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
        }
        else if(category == 'account'){
            //console.log(index);
            let account_data =callWebAPI('/account/'+index, 'get', 'None'); //取出設備列表
            //console.log(account_data);
            //$('#showForm #ModalLabel').text('Update Account');
            $('#showForm #ModalLabel').text('Edit User');
            //console.log(account_data['account'][0]);
            $('#username').val(account_data['account'][0]['username']);
            $('#username').prop("disabled", true);
            $('#name').val(account_data['account'][0]['name']);
            $('#pwd').val(account_data['account'][0]['password']);

            $('.footer-content').html("<button type='button' class='btn btn-secondary login100-form-title text-white' onClick=\"updateAccount('"+index+"')\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");
        }
      //form = createForm();
      //$('.body-content').html(form);
      $('#showForm').modal({backdrop: 'static', keyboard: false});
}


//新增設定
//@param : type: Index / new String
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
        //console.log(param);
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
    .then(function(obj_data1) {
        //console.log(obj_data1);
        initDatatPromse2()
        .then(function(obj_data) {
            //顯示畫面
            //console.log(obj_data);
            $('.total').text(obj_data1['total']);
            obj_data = obj_data['dataset'].sort(function (a, b) { return a.Index < b.Index ? 1 : -1; });  //由高到低排序
            showEquipmentListTable(obj_data); //顯示畫面
            pagination(obj_data, nowPage, 'equipment');
        });

        $('#showForm').modal('toggle');
    });
}


// 新增Group / Zone
//function createGroup(type, act){
function createGroup(type){
       //console.log(type);
    if(type == 'zone' || type == 'group'){
       let name ='';
       if(type == 'zone'){
          name = $('#group').val();
       }
       else{
          name = $('#group1').val();
       }
       //console.log(name);
       if(name == ''){
           alert('Please fill in required data.');
       }
       else{
            actCreateZonePromse(type)
            .then(function(obj_data1) {
                //console.log(obj_data1);
                //查詢Zone清單
                //initDatatPromse4('zone')
                initDatatPromse4(type)
                .then(function(obj_data) {
                    //console.log(obj_data);
                    obj_data = obj_data['group'].sort(function (a, b) { return a.Index < b.Index ? 1 : -1; });  //由高到低排序
                    //console.log(obj_data);
                    $('.total').text(obj_data.length);
                    //顯示畫面
                    pagination(obj_data, nowPage, type);
                });
            });

            $('#showForm').modal('toggle');
       }
    }
    else if(type == 'account'){
        let username = $('#username').val();
        //let name = $('#name').val();
        let pwd = $('#pwd').val();

        //驗証帳號
        account =callWebAPI('/checkaccount/'+username, 'get', 'None'); //取出設備列表
        if(username == '' || pwd == ''){
           alert('Please fill in required data.');
        }
        else if(account['total'] != 0){
            alert('username is being used');
        }
        else{
            //console.log('abcd');
            actCreateAccountPromse()  //更換
            .then(function(obj_data1) {
                //console.log(obj_data1);
                //查詢Zone清單
                //initDatatPromse4('zone')
                initDatatPromse4(type)
                .then(function(obj_data) {
                    //console.log(obj_data);
                    //obj_data = obj_data['group'].sort(function (a, b) { return a.Index < b.Index ? 1 : -1; });  //由高到低排序
                    //console.log(obj_data);
                    $('.total').text(obj_data['account'].length);
                    //顯示畫面
                    pagination(obj_data['account'], nowPage, type);
                });
            });

            $('#showForm').modal('toggle');
        }
    }
}

//
function actCreateZonePromse(type){
    return new Promise(function(resolve, reject) {
        //console.log(type);
        let group ='';
        if(type == 'zone'){
            group = $('#group').val();
        }
        else{
            group = $('#group1').val();
        }
        //console.log(group);
        let param = {"name": group}
        let url = '';
        if(type == 'zone'){
            url = "/set/zone";
        }
        else if(type == 'group'){
            url = "/set/group";
        }
        let data_group='';
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
                data_group = response;
            },
            complete: function() {
               //console.log('finish')
            },
            error: function (error) {
               console.log(error);
            }
        });

         resolve(data_group);
    });
}



// 更新設備
function updateEquipment(index){
    //console.log(index);
    actUpdEquipmentPromse(index)
    .then(function(obj_data1) {
        //console.log('finish');
        //console.log(obj_data1);
        initDatatPromse2()
        .then(function(obj_data) {
            //console.log(obj_data);
            //顯示畫面
            //alert('The Equipment was updated successfully');
            //console.log(obj_data);
            obj_data = obj_data['dataset'].sort(function (a, b) { return a.Index < b.Index ? 1 : -1; });  //由高到低排序
            //$('.total').text(obj_data1['total']);
            //showEquipmentListTable(obj_data); //顯示畫面
            //顯示畫面
            pagination(obj_data, tempPage, 'equipment');
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
        /*
        let resName = document.querySelectorAll("select[name='resKey[]']");  //取出 Setting 名稱
        let resCode = document.querySelectorAll("input[name='resCode[]']");  //取出 Setting Code

        //let resVal = [];
        //設定碼 - 十進制
        let on_ok = $('#power_on_ok').val();
        let off_ok = $('#power_off_ok').val();
        let resVal =[{"name": "on_ok", "code": on_ok}, {"name": "off_ok", "code": off_ok}];

        if(resName.length != 0){
            let item ='';
            for(var i=0; i<resName.length; i++){
                //console.log(i);
                item = {"name": resName[i].value, "code": resCode[i].value }
                resVal.push(item);
            }
        }
        */
        //let param = {"brand": brand, "model": model, "baudrate": baudrate, "config": config, "setting": settingVal, "response": resVal}
        let param = {"brand": brand, "model": model, "baudrate": baudrate, "config": config, "setting": settingVal}
        //console.log(param);

        let url = "/update/equipmentcode/"+index;
        let data_equipment='';
        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "PUT",
            cache: false,
            async: false,
            data: JSON.stringify(param),
            contentType: "application/json",
            success: function (response) {
                //console.log(response);
                data_equipment = response;
            },
            complete: function() {
               //console.log('finish')
            },
            error: function (error) {
               console.log(error);
            }
        });

        resolve(data_equipment);
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
            $('.showalert').text("Please fill in required data.");
            alert('Please fill in required data.');
            /*
            setTimeout(() => {
               $('.showalert').hide();
            }, 3000);
            */
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
            //let resVal = [];
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
            /*
            let resName = document.querySelectorAll("select[name='resKey[]']");  //取出 Setting 名稱
            let resCode = document.querySelectorAll("input[name='resCode[]']");  //取出 Setting Code

            //let resVal = [];
            //設定碼 - 十進制
            let on_ok = $('#power_on_ok').val();
            let off_ok = $('#power_off_ok').val();

            let resVal =[{"name": "on_ok", "code": on_ok}, {"name": "off_ok", "code": off_ok}];

            if(resName.length != 0){
                let item ='';
                for(var i=0; i<resName.length; i++){
                    //console.log(i);
                    item = {"name": resName[i].value, "code": resCode[i].value }
                    resVal.push(item);
                }
            }
            */
            //let param = {"brand": brand, "model": model, "baudrate": baudrate, "config": config, "setting": settingVal, "response": resVal}
            let param = {"brand": brand, "model": model, "baudrate": baudrate, "config": config, "setting": settingVal}
            //console.log(param);
            let data_equipment='';
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
                    //console.log(response);
                    data_equipment = response;
                },
                complete: function() {
                   //console.log('finish')
                },
                error: function (error) {
                   console.log(error);
                }
            });

            resolve(data_equipment);
        }
    });
}


//製作分頁
function pagination(data, nowPage, type){
  //console.log(data);
  let leftbtn = document.getElementById("dev_left");
  let rightbtn = document.getElementById("dev_right");
  // 取得資料長度
  let dataTotal = data.length;
  // 要顯示在畫面上的資料數量，預設每一頁只顯示四筆資料。
  let perpage = 0;
  if(type == 'dashboard'){
    perpage = 30;
  }
  else if(type == 'device'){
    perpage = 10;
  }
  else if(type == 'equipment'){
    perpage = 10;
  }
  else if(type == 'zone' || type == 'group'){
    perpage = 10;
  }
  else if(type == 'account'){
    perpage = 10;
  }
  else if(type == 'log'){
    perpage = 10;
  }
  // page 按鈕總數量公式 總資料數量 / 每一頁要顯示的資料
  // 這邊要注意，因為有可能會出現餘數，所以要無條件進位。
  let pageTotal = Math.ceil(dataTotal / perpage);
  //console.log(pageTotal);
  //let sorted = localStorage.getItem('sorted');
  //console.log('全部資料:'+pageTotal+' 每一頁顯示:'+perpage+'筆');
  // 當前頁數
  let currentPage = nowPage;
  tempPage = currentPage;
  //nowPage = currentPage;
  // 當”當前頁數”比”總頁數”大的時候，”當前頁數”就等於”總頁數”
  if (currentPage > pageTotal) {
    currentPage = pageTotal;
  }
  const minData = (currentPage * perpage)-perpage+1;   //最小值筆數  當前頁面去乘每一頁顯示得數量再減去每一頁顯示得數量，此時會得到 5 這個數字，但是我們是第 6 筆開始，所以要在 +1
  const maxData = (currentPage * perpage);             //最大值筆數
  // 資料切換
  let prevPage = 1;
  if(currentPage > 1){
       prevPage = currentPage -1;
  }
  else{
       prevPage = 1;
  }
  $(".dev_left").click(function(event){
      pagination(data, prevPage, type);
      event.stopPropagation();
      //alert("The paragraph was clicked.");
  });
  let afterPage = 1;
  if(currentPage == pageTotal){
       afterPage = currentPage;
  }
  else{
       afterPage = currentPage +1;
  }

  $(".dev_right").click(function(event){
      pagination(data, afterPage, type);
      event.stopPropagation();
      //alert("The paragraph was clicked.");
  });

  // 先建立新陣列
  const obj = new Array();
  // 使用 ES6 forEach 做資料處理
  // 這邊必須使用索引來判斷資料位子，所以要使用 index
  data.forEach((item, index) => {
    // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
    const num = index + 1;
    // 這邊判斷式會稍微複雜一點
    // 當 num 比 minData 大且又小於 maxData 就push進去新陣列。
    if(num >= minData && num <= maxData){
        obj.push(item);
    }
  });
  //console.log(obj);      //顯示每頁結果
  // 用物件方式來傳遞資料
  const page = {
    pageTotal,
    currentPage,
    hasPage: currentPage > 1,
    hasNext: currentPage < pageTotal,
    //sorted,
  };
  //console.log(page);
  //顯示畫面
  if(type == 'dashboard'){
     displayData(obj);
  }
  else if(type == 'device'){
     let group =callWebAPI('/group', 'get', 'None'); //取出群組列表
     let equipment =callWebAPI('/equipmentcode', 'get', 'None'); //取出設備列表
     let zone =callWebAPI('/zone', 'get', 'None'); //取出Zone列表
     //console.log(zone);
     showDeviceListTable(obj, group, equipment, zone);
     $('.total_page').text(pageTotal);
     $('.current_page').text(currentPage);
     //displayData1(obj);
  }
  else if(type == 'equipment'){
        //console.log(obj);
        //obj = obj.sort(function (a, b) { return a.Index < b.Index ? 1 : -1; });  //由高到低排序
      showEquipmentListTable(obj); //顯示畫面
       $('.total_page').text(pageTotal);
       $('.current_page').text(currentPage);
  }
  else if(type == 'zone' || type == 'group'){
        //console.log(obj);
        showZoneListTable(obj, type); //顯示畫面
        $('.total_page').text(pageTotal);
        $('.current_page').text(currentPage);
  }
  else if(type == 'account'){
        //console.log(obj);
        showAccountListTable(obj); //顯示畫面
        $('.total_page').text(pageTotal);
        $('.current_page').text(currentPage);
  }
  else if(type == 'log'){
        //console.log(obj);
        showLogListTable(obj); //顯示畫面
        $('.total_page').text(pageTotal);
        $('.current_page').text(currentPage);
  }
  /*
  obj.forEach(function(value, key, array){
        console.log(value);
  });
  */
}

//製作分頁區域
function paginationZone(data, nowPageZone, type){
  //console.log(data);
  let leftbtn = document.getElementById("zone_left");
  let rightbtn = document.getElementById("zone_right");
  // 取得資料長度
  let dataTotal = data.length;
  // 要顯示在畫面上的資料數量，預設每一頁只顯示四筆資料。
  const perpage = 6;
  // page 按鈕總數量公式 總資料數量 / 每一頁要顯示的資料
  // 這邊要注意，因為有可能會出現餘數，所以要無條件進位。
  let pageTotal = Math.ceil(dataTotal / perpage);
  //console.log(pageTotal);
  //let sorted = localStorage.getItem('sorted');
  //console.log('全部資料:'+pageTotal+' 每一頁顯示:'+perpage+'筆');
  // 當前頁數
  let currentPage = nowPageZone;
  //console.log('currentPage:'+currentPage);
  // 當”當前頁數”比”總頁數”大的時候，”當前頁數”就等於”總頁數”
  if (currentPage > pageTotal) {
    currentPage = pageTotal;
  }
  const minData = (currentPage * perpage)-perpage+1;   //最小值筆數  當前頁面去乘每一頁顯示得數量再減去每一頁顯示得數量，此時會得到 5 這個數字，但是我們是第 6 筆開始，所以要在 +1
  const maxData = (currentPage * perpage);             //最大值筆數
  //console.log(minData);
  //console.log(maxData);
  // 資料切換
  let prevPage =1;
  if(currentPage > 1){
       prevPage = currentPage -1;
  }
  else{
       prevPage = 1;
  }

  $(".zone_left").click(function(event){
      paginationZone(data, prevPage, type);
      event.stopPropagation();
      //alert("The paragraph was clicked.");
  });

  let afterPage =1;
  if(currentPage == pageTotal){
       afterPage = currentPage;
  }
  else{
       afterPage = currentPage +1;
  }

  $(".zone_right").click(function(event){
      paginationZone(data, afterPage, type);
      event.stopPropagation();
      //alert("The paragraph was clicked.");
  });

  // 先建立新陣列
  const obj = new Array();
  // 使用 ES6 forEach 做資料處理
  // 這邊必須使用索引來判斷資料位子，所以要使用 index
  data.forEach((item, index) => {
    //console.log(item);
    // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
    const num = index + 1;
    // 這邊判斷式會稍微複雜一點
    // 當 num 比 minData 大且又小於 maxData 就push進去新陣列。
    if(num >= minData && num <= maxData){
        obj.push(item);
    }
  });
  //console.log(obj);      //顯示每頁結果
  // 用物件方式來傳遞資料
  const page = {
    pageTotal,
    currentPage,
    hasPage: currentPage > 1,
    hasNext: currentPage < pageTotal,
    //sorted,
  };
    displayZoneData(obj, type);
  /*
  obj.forEach(function(value, key, array){
        console.log(value);
  });
  */
}

//切換資料
function switchPage(e, page){
  e.preventDefault();
  if(e.target.nodeName !== 'A') return;
  //const page = e.target.dataset.page;
  pagination(data, page);
}


//顯示樣版 - dashboard
function displayData(obj){
     //console.log(obj.length);
     let str ='';
     /*
     let i =0;
     obj.forEach((item) => {
        //console.log(item);
        //console.log(i);
        let Remainder  = i % col;
        if(Remainder == 0){
            str += "<tr>";
        }
        str += showDevice1(item);
        if((i+1) % col == 0){
          str += "</tr>";
        }
        i++;
     });
     */
     //if(obj.length < 30){ console.log('ok'); }
     for(var i=0; i<30; i++){
        //console.log(obj[j]);
        let Remainder  = i % col;
        if(Remainder == 0){
            str += "<tr>";
        }
        if(obj[i] != undefined){
            str += showDevice1(obj[i]);
        }
        else{
            //console.log('Non');
            str += showDevice2();
        }

        if((i+1) % col == 0){
          str += "</tr>";
        }
     }

     $('.devlist').html(str);
}


//顯示區域
function displayZoneData(obj, type){
     let str ='';
     let i =0;
     //console.log(zonecol);
     obj.forEach((item) => {
        //console.log(i);
        //console.log(item);
        let Remainder  = i % zonecol;
        if(Remainder == 0){
            str += "<tr>";
        }
        str += showZone1(item, i, type);

        if((i+1) % zonecol == 0){
          str += "</tr>";
        }

        i++;
     });
     //console.log(str);
     $('.zone').html(str);
}

//判斷裝置全部全選或者反選
function selectAllcheck1(){
   //if($("input[name='Checkbox[]']").prop('disabled') != true) {
   //console.log( $("input[name='Checkbox[]']").length  );
   let divs= $("input[name='Checkbox[]']:not(:disabled)").map(function() { return $(this).val(); }).get(); //選取沒有Disabled
   //console.log(divs);
    for(var i=0; i<divs.length; i++){
        $('#checkbox-'+divs[i]).prop("checked",true);
    }
   //$("input[name='Checkbox[]']").prop("checked",true);//把所有的核取方框的property都變成勾選
}


function selectAllcheck2(){
    //console.log('press');
    //name="Checkbox[]"
    //if($(".checkAll").prop("checked")){//如果全選按鈕有被選擇的話（被選擇是true）
    //console.log( $("input[name='Checkbox[]']").prop('disabled') );
   //if($("input[name='Checkbox[]']").prop('disabled') != true) {
      $("input[name='Checkbox[]']").prop("checked",false);//把所有的核取方框的property都變成勾選
   //}
   /* }else{
        $("input[name='Checkbox[]']").prop("checked",false);//把所有的核取方框的property都取消勾選
    }
    */
}


// 切換Zone區
function switchZone(category){
    //console.log(category);
    if(category == 'unselect'){
        $('.image0').attr('src', '/static/images/8.Zone/press_Science-Building-230x230.png');
        $('.image1').attr('src', '/static/images/8.Zone/normal_Medical-Building-230x230.png');
        $('.image2').attr('src', '/static/images/8.Zone/normal_Science-Building-230x230.png');
        $('.image3').attr('src', '/static/images/8.Zone/normal_Medical-Building-230x230.png');
        $('.image4').attr('src', '/static/images/8.Zone/normal_Liberal-Arts-230x230.png');
        $('.image5').attr('src', '/static/images/8.Zone/normal_Mechatronics-230x230.png');

        $(".text0").removeClass("text-white");
        $(".text1").removeClass("text-white");
        $(".text2").removeClass("text-white");
        $(".text3").removeClass("text-white");
        $(".text4").removeClass("text-white");
        $(".text5").removeClass("text-white");
    }
    else if(category == 0){
        $('.image0').attr('src', '/static/images/8.Zone/press_Science-Building-230x230.png');
        $('.image1').attr('src', '/static/images/8.Zone/normal_Medical-Building-230x230.png');
        $('.image2').attr('src', '/static/images/8.Zone/normal_Science-Building-230x230.png');
        $('.image3').attr('src', '/static/images/8.Zone/normal_Medical-Building-230x230.png');
        $('.image4').attr('src', '/static/images/8.Zone/normal_Liberal-Arts-230x230.png');
        $('.image5').attr('src', '/static/images/8.Zone/normal_Mechatronics-230x230.png');

        $(".text0").addClass("text-white");
        $(".text1").removeClass("text-white");
        $(".text2").removeClass("text-white");
        $(".text3").removeClass("text-white");
        $(".text4").removeClass("text-white");
        $(".text5").removeClass("text-white");
    }
    else if(category == 1){
        $('.image0').attr('src', '/static/images/8.Zone/normal_Science-Building-230x230.png');
        $('.image1').attr('src', '/static/images/8.Zone/press_Medical-Building-230x230.png');
        $('.image2').attr('src', '/static/images/8.Zone/normal_Science-Building-230x230.png');
        $('.image3').attr('src', '/static/images/8.Zone/normal_Medical-Building-230x230.png');
        $('.image4').attr('src', '/static/images/8.Zone/normal_Liberal-Arts-230x230.png');
        $('.image5').attr('src', '/static/images/8.Zone/normal_Mechatronics-230x230.png');

        $(".text0").removeClass("text-white");
        $(".text1").addClass("text-white");
        $(".text2").removeClass("text-white");
        $(".text3").removeClass("text-white");
        $(".text4").removeClass("text-white");
        $(".text5").removeClass("text-white");
    }
    else if(category == 2){
        $('.image0').attr('src', '/static/images/8.Zone/normal_Science-Building-230x230.png');
        $('.image1').attr('src', '/static/images/8.Zone/normal_Medical-Building-230x230.png');
        $('.image2').attr('src', '/static/images/8.Zone/press_Science-Building-230x230.png');
        $('.image3').attr('src', '/static/images/8.Zone/normal_Medical-Building-230x230.png');
        $('.image4').attr('src', '/static/images/8.Zone/normal_Liberal-Arts-230x230.png');
        $('.image5').attr('src', '/static/images/8.Zone/normal_Mechatronics-230x230.png');

        $(".text0").removeClass("text-white");
        $(".text1").removeClass("text-white");
        $(".text2").addClass("text-white");
        $(".text3").removeClass("text-white");
        $(".text4").removeClass("text-white");
        $(".text5").removeClass("text-white");
    }
    else if(category == 3){
        $('.image0').attr('src', '/static/images/8.Zone/normal_Science-Building-230x230.png');
        $('.image1').attr('src', '/static/images/8.Zone/normal_Medical-Building-230x230.png');
        $('.image2').attr('src', '/static/images/8.Zone/normal_Science-Building-230x230.png');
        $('.image3').attr('src', '/static/images/8.Zone/press_Medical-Building-230x230.png');
        $('.image4').attr('src', '/static/images/8.Zone/normal_Liberal-Arts-230x230.png');
        $('.image5').attr('src', '/static/images/8.Zone/normal_Mechatronics-230x230.png');

        $(".text0").removeClass("text-white");
        $(".text1").removeClass("text-white");
        $(".text2").removeClass("text-white");
        $(".text3").addClass("text-white");
        $(".text4").removeClass("text-white");
        $(".text5").removeClass("text-white");
    }
    else if(category == 4){
        $('.image0').attr('src', '/static/images/8.Zone/normal_Science-Building-230x230.png');
        $('.image1').attr('src', '/static/images/8.Zone/normal_Medical-Building-230x230.png');
        $('.image2').attr('src', '/static/images/8.Zone/normal_Science-Building-230x230.png');
        $('.image3').attr('src', '/static/images/8.Zone/normal_Medical-Building-230x230.png');
        $('.image4').attr('src', '/static/images/8.Zone/press_Liberal-Arts-230x230.png');
        $('.image5').attr('src', '/static/images/8.Zone/normal_Mechatronics-230x230.png');

        $(".text0").removeClass("text-white");
        $(".text1").removeClass("text-white");
        $(".text2").removeClass("text-white");
        $(".text3").removeClass("text-white");
        $(".text4").addClass("text-white");
        $(".text5").removeClass("text-white");
    }
    else if(category == 5){
        $('.image0').attr('src', '/static/images/8.Zone/normal_Science-Building-230x230.png');
        $('.image1').attr('src', '/static/images/8.Zone/normal_Medical-Building-230x230.png');
        $('.image2').attr('src', '/static/images/8.Zone/normal_Science-Building-230x230.png');
        $('.image3').attr('src', '/static/images/8.Zone/normal_Medical-Building-230x230.png');
        $('.image4').attr('src', '/static/images/8.Zone/normal_Liberal-Arts-230x230.png');
        $('.image5').attr('src', '/static/images/8.Zone/press_Mechatronics-230x230.png');

        $(".text0").removeClass("text-white");
        $(".text1").removeClass("text-white");
        $(".text2").removeClass("text-white");
        $(".text3").removeClass("text-white");
        $(".text4").removeClass("text-white");
        $(".text5").addClass("text-white");
    }
}

//URL切換 - Dashboard
function redirectURL(id, type, i){
    if(type == 'dashboard'){
        //location.href='/dashboard1/'+id;
        //console.log(id);
        zone_id = id;
        initDatatPromse3(id, 'dashboard') //全域變數Data
        .then(function(obj_data) {
            //console.log(obj_data);
            //顯示畫面
            pagination(obj_data['dataset'], nowPage, 'dashboard');
        })
        .then(function() {
            switchZone(i);
        });
    }else if(type == 'device'){
        //location.href='/register/device1/'+id;
        //查詢裝置清單
        //console.log(id);
        initDatatPromse3(id, 'device')
        .then(function(obj_data) {
            //console.log(obj_data);
            //顯示畫面
            pagination(obj_data['dataset'], nowPage, 'device');
        })
        .then(function() {
            switchZone(i);
        });
    }else if(type == 'analysis'){
        //console.log(zone_id);
        //let group_id = $('.group-dev').val();
        //location.href='/analysis/'+id+'/'+group_id;
        //查詢裝置清單
        //getAnalysisDataPromse(id, 0, today, get_first_last[0], today)
        getAnalysisZoneDataPromse(id, today, get_first_last[0], today, 'zone')
        .then(function(obj_data) {
            console.log(obj_data);
            //顯示畫面
            showDataChart(obj_data, days);
        })
        .then(function() {
            //console.log(id);
            //$('.group-dev').val(0); //預設選項
            //$('#zoneId').val(id);       //設定Zone區選項
            zone_id =id
            switchZone(i);
        });
    }
}

//選擇群組
function selectGroup(type){
   let group_type = $('.group-dev').val();
   //console.log('group_id:'+group_type);
   //console.log(data['dataset']);

   let filterData = [];
   if(group_type == 'non'){
        filterData = data['dataset'];
   }
   else{
        filterData = data['dataset'].filter(function(item, index, array){
            //console.log(group_type);
            return item.group_id == group_type;       // 取得大於五歲的
        });
   }
   //console.log(filterData);
   if(type == 'dashboard'){
     //console.log(filterData);
     //displayData(filterData);
      //顯示畫面
     pagination(filterData, 1, 'dashboard');
   }
   else{
        /*
        let group =callWebAPI('/group', 'get', 'None'); //取出群組列表
        let equipment =callWebAPI('/equipmentcode', 'get', 'None'); //取出設備列表
        let zone =callWebAPI('/zone', 'get', 'None'); //取出Zone列表

        showDeviceListTable(filterData, group, equipment, zone);
        */
        //顯示畫面
        pagination(filterData, 1, 'device');
   }
}

// 更新Zone - ACT
function actUpdZonePromse(index, type){
    return new Promise(function(resolve, reject) {
        let zone = '';
        let url = '';
        let param = '';
        if(type == 'zone'){
            zone = $('#group').val();
            param = {"zone": zone}
            url = "/update/zone/"+index;
        }
        else if(type == 'group'){
            zone = $('#group1').val();
            param = {"name": zone}
            url = "/update/group/"+index;
        }
        let data_zone='';
        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "PUT",
            cache: false,
            async: false,
            data: JSON.stringify(param),
            contentType: "application/json",
            success: function (response) {
                //console.log(response);
                data_equipment = response;
            },
            complete: function() {
               //console.log('finish')
            },
            error: function (error) {
               console.log(error);
            }
        });

        resolve(data_equipment);
    });
}

// 更新Zone
function updateZone(index, type){
    //console.log(type);
    actUpdZonePromse(index, type)
    .then(function(obj_data1) {
        //console.log(type);
        initDatatPromse4(type)
        .then(function(obj_data) {
            //console.log(obj_data);
            obj_data = obj_data['group'].sort(function (a, b) { return a.Index < b.Index ? 1 : -1; });  //由高到低排序
            //console.log(obj_data);
            //console.log(tempPage);
            //顯示畫面
            pagination(obj_data, tempPage, type);
        });
    });

    $('#showForm').modal('toggle');
}


//更新帳號資訊
function updateAccount(index){
    //console.log(type);
    actUpdAccountPromse(index)
    .then(function(obj_data1) {
        //console.log(obj_data1);
        initDatatPromse4('account')
        .then(function(obj_data) {
            //console.log(obj_data);
            //console.log(tempPage);
            //obj_data = obj_data['group'].sort(function (a, b) { return a.Index < b.Index ? 1 : -1; });  //由高到低排序
            //console.log(obj_data);
            //console.log(nowPage);
            //顯示畫面
            pagination(obj_data['account'], tempPage, 'account');
        });
    });

    $('#showForm').modal('toggle');
}



//account畫面列表
function showAccountListTable(obj_data){
    //console.log(obj_data);
    var str = '';

    obj_data.forEach(function(value) {
        if(value['username'] != "sinew"){
            str += '<tr>';
            //ID
            //str += '<td class="align-middle">'+value['index']+'</td>';
            str += '<td class="align-middle">'+value['username']+'</td>';
            str += '<td class="align-middle">'+value['password']+'</td>';
            //str += '<td class="align-middle">'+value['name']+'</td>';

            str += '<td>';
            str += '<button type="button" class="btn btn-success mr-2" onClick="updModelType(\''+value['index']+'\', \'account\')">Edit</button>'; //setModelType('new', 'zone')
            str += '<button type="button" class="btn btn-danger" onClick="confirmDelModal(\''+value['index']+'\', \'account\')">Delete</button>';
            str += '</td>';
            str += '</tr>';
        }
    });
    //console.log(str);
    $('#accountlist').html(str);
}


//驗証account
function vaildUsername(){
    let username = $('#username').val();
    //console.log(username);
    account =callWebAPI('/checkaccount/'+username, 'get', 'None'); //取出設備列表
    //console.log(account);
    if(account['total'] != 0){
        $('.vaildmsg').show();
    }
}


//log畫面列表
function showLogListTable(obj_data){
    var str = '';

    obj_data.forEach(function(value) {
        str += '<tr>';
        //ID
        str += '<td class="align-middle">'+value['datetime']+'</td>';
        //str += '<td class="align-middle">'+value['role']+'</td>';
        str += '<td class="align-middle">'+value['id']+'</td>';
        str += '<td class="align-middle">'+value['msg']+'</td>';

        str += '</tr>';
    });
    //console.log(str);
    $('#loglist').html(str);

}


//新增帳號
//
function actCreateAccountPromse(){
    return new Promise(function(resolve, reject) {
        let username = $('#username').val();
        let name = $('#name').val();
        let password = $('#pwd').val();
        //console.log(group);
        let param = {"username": username, "name": name, "password":password}

        let url = "/set/account";

        let data_account='';
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
                data_account = response;
            },
            complete: function() {
               //console.log('finish')
            },
            error: function (error) {
               console.log(error);
            }
        });

        resolve(data_account);
    });
}


// 更新Account - ACT
function actUpdAccountPromse(index){
    return new Promise(function(resolve, reject) {
        let username = $('#username').val();
        let name = $('#name').val();
        let password = $('#pwd').val();

        //let param = {"name": name, "password":password}
        let param = {"password":password}
        let url = "/update/account/"+index;

        let data_account='';
        $.ajax({
            //url: '/api/sensor/?device='+device,
            url: url,
            type: "PUT",
            cache: false,
            async: false,
            data: JSON.stringify(param),
            contentType: "application/json",
            success: function (response) {
                //console.log(response);
                data_account = response;
            },
            complete: function() {
               //console.log('finish')
            },
            error: function (error) {
               console.log(error);
            }
        });

        resolve(data_account);
    });
}


// 刪除account - ACT
function deleteAccountPromse(index,){
    return new Promise(function(resolve, reject) {
        let url = '/delete/account/'+index;
        let data_account ='';

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
                data_zone = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });

        resolve(data_zone);
    });
}

//取出今日日期
function getNowToday(){
  var now=new Date();//生成日期物件(完整的日期資訊)
  var y=now.getFullYear();//年份
  var M=now.getMonth()+1>9?now.getMonth()+1:'0'+(now.getMonth()+1); //月份
  var d=now.getDate()>9?now.getDate():'0'+now.getDate();//日期
  var h=now.getHours()>9?now.getHours():'0'+now.getHours();//小時
  var m=now.getMinutes()>9?now.getMinutes():'0'+now.getMinutes();//分鐘
  var currentdate = y+'-'+M+'-'+d;

  return currentdate;
}

//取出本月第一天和最後一天
function getThisMonthfirstlast(){
    const today = new Date();
    // 获取当月第一天
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const formattedFirstDay = formatDate(firstDay);
    //console.log("当月第一天:", formattedFirstDay);
    // 获取当月最后一天
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const formattedLastDay = formatDate(lastDay);
    //console.log("当月最后一天:", formattedLastDay);

    let arr=[];
    arr.push(formattedFirstDay);
    arr.push(formattedLastDay);
    //console.log(arr);
    return arr;
}

// 日期格式轉換
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

//顯示目前時間
function getCurrentTime(){
  var now=new Date();//生成日期物件(完整的日期資訊)
  var y=now.getFullYear();//年份
  var M=now.getMonth()+1>9?now.getMonth()+1:'0'+(now.getMonth()+1); //月份
  var d=now.getDate()>9?now.getDate():'0'+now.getDate();//日期
  var h=now.getHours()>9?now.getHours():'0'+now.getHours();//小時
  var m=now.getMinutes()>9?now.getMinutes():'0'+now.getMinutes();//分鐘
  var currentdate = y+'-'+M;
  //var currentdate = y+'-'+M+'-'+d+' '+h+':'+m;
  return currentdate;
}


//date为传入日期
function getDuration (date) {
  // how many days of this month
  let dt = new Date(date)
  var month = dt.getMonth()
  dt.setMonth(dt.getMonth() + 1)
  dt.setDate(0);
  return dt.getDate()
}


//呈現資料
function showDataChart(obj_data, days){
    //newArrDate = [];   //放置日期
    //newArrCount = [];  //放置每日總值
    //console.log(obj_data);
    $('.daily_pw').text(obj_data['today_addwh']);
    $('.daily_usage').text(obj_data['today_usage']);
    $('.month_pw').text(obj_data['total_addwh']);
    $('.month_usage').text(obj_data['total_usage']);
    //日期
    let showdate = '';
    let findObj = '';
    newArrDate.length = 0; //清空array
    newArrCount.length = 0; //清空array
    for(var i=1; i<= days; i++){
        if(i<10){ i = "0"+i}  //日期
        showdate = ndate+"-"+i;
        //篩選DevID DataSet
        findObj = obj_data['dataset'].filter(function(item, index, array){
          //console.log(element.id);
          if(item.date.indexOf(showdate) != -1)
            return item;
        });
        //console.log(findObj);
        newArrDate.push(showdate); //日期
        if(findObj[0] !== undefined){
          //console.log(findObj[0].dkwh);
          newArrCount.push(parseFloat(findObj[0]['addwh']));
        }else{
          newArrCount.push(0);
        }
    }
    myChartBar.update();   //更新圖表
}


//呈現資料 - 全部區域
function showDataChart1(obj_data){
    //console.log(obj_data['dataset']);
    $('.daily_pw').text(obj_data['today_addwh']);
    $('.daily_usage').text(obj_data['today_usage']);
    $('.month_pw').text(obj_data['total_addwh']);
    $('.month_usage').text(obj_data['total_usage']);
    //日期
    newArrDate.length = 0; //清空array
    newArrCount.length = 0; //清空array
    obj_data['dataset'].forEach(function(value) {
        newArrCount.push(value['addwh']);
        newArrDate.push(value['name']);
    });
    myChartBar.update();   //更新圖表
}


//統計群組
function statisticsgroup(){
     //let zoneId = $('#zoneId').val();
     //console.log(zone_id);
     let groupId = $('.group-dev').val();
     //查詢裝置清單
     //getAnalysisDataPromse(zone_id, groupId, today, get_first_last[0], today)
     getAnalysisZoneDataPromse(groupId, today, get_first_last[0], today, 'group')
     .then(function(obj_data) {
        //console.log(obj_data);
        //顯示畫面
        showDataChart(obj_data, days);
        //pagination(obj_data['dataset'], nowPage, 'device');
     });
}

//匯出Log
function exportLog(){
    //window.location.href="/log/export";
    let url = "/log/export";
    window.open(url);
}


//Log
/*
function filterLog(){
    let category = $('#inlineFormCustomSelectPref').val();
    //console.log(data);
    var filterData = data['dataset'].filter(function(item, index, array){
      return item.category == category;       // 取得大於五歲的
    });
    //console.log(filterData);
    pagination(filterData, 1, 'log');
}
*/
//取得今日日期
function getTodayDate() {
  var fullDate = new Date();
  var yyyy = fullDate.getFullYear();
  var MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ("0" + (fullDate.getMonth() + 1));
  var dd = fullDate.getDate() < 10 ? ("0"+fullDate.getDate()) : fullDate.getDate();
  var today = yyyy + "-" + MM + "-" + dd;
  return today;
}


//Search Log
function filterLog(){
    let username = $('#username').val();
    let start = $('#startdate').val();
    let end = $('#enddate').val();
    //console.log(username);
    //initfilterDatatPromse(start, end)
    initfilterDatatPromse1(username, start, end)
    .then(function(obj_data) {
        //console.log(obj_data);
        //顯示畫面
        pagination(obj_data['dataset'], nowPage, 'log');
    });
}


// 取出Filter
function initfilterDatatPromse(start, end){
    return new Promise(function(resolve, reject) {
        let url ='/get/log/'+start+'/'+end;
        let data ='';

        $.ajax({
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


function initfilterDatatPromse1(user, start, end){
    return new Promise(function(resolve, reject) {
        let url ='/filter/log';
        let data ='';
        var param = {"id": user, "start": start, "end": end}
        //console.log(param);
        $.ajax({
            url: url,
            type: "POST",
            cache: false,
            async: false,
            data: JSON.stringify(param),
            contentType: "application/json",
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

//Search Username
function searchUserName(){
    let username = $('#account').val();
    //console.log(username);
    initSearchUsernametPromse1(username)
    .then(function(obj_data) {
        //console.log(obj_data);
        //顯示畫面
        pagination(obj_data['account'], nowPage, 'account');
    });
}


function initSearchUsernametPromse1(user){
    return new Promise(function(resolve, reject) {
        let url ='/search/account';
        let data ='';
        var param = {"id": user}
        //console.log(param);
        $.ajax({
            url: url,
            type: "POST",
            cache: false,
            async: false,
            data: JSON.stringify(param),
            contentType: "application/json",
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

//Search Zone
function searchZoneName(){
    let zone = $('#zone').val();
    //console.log(zone);
    searchZonePromse1(zone)
    .then(function(obj_data) {
        //console.log(obj_data);
        obj_data = obj_data['group'].sort(function (a, b) { return a.Index < b.Index ? 1 : -1; });  //由高到低排序
        //顯示畫面
        pagination(obj_data, nowPage, 'zone');
    });
}


function searchZonePromse1(zone){
    return new Promise(function(resolve, reject) {
        let url ='/filter/zone';
        let filter_data ='';
        var param = {"zone": zone}
        //console.log(param);
        $.ajax({
            url: url,
            type: "POST",
            cache: false,
            async: false,
            data: JSON.stringify(param),
            contentType: "application/json",
            success: function (response) {
                //console.log(response);
                filter_data = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });
        //console.log(filter_data)
        resolve(filter_data);
    });
}


//Search Group
function searchGroupName(){
    let group = $('#group').val();
    //console.log(zone);
    searchGroupPromse1(group)
    .then(function(obj_data) {
        //console.log(obj_data);
        obj_data = obj_data['group'].sort(function (a, b) { return a.Index < b.Index ? 1 : -1; });  //由高到低排序
        //顯示畫面
        pagination(obj_data, nowPage, 'group');
    });
}


function searchGroupPromse1(group){
    return new Promise(function(resolve, reject) {
        let url ='/filter/group';
        let filter_data ='';
        var param = {"name": group}
        //console.log(param);
        $.ajax({
            url: url,
            type: "POST",
            cache: false,
            async: false,
            data: JSON.stringify(param),
            contentType: "application/json",
            success: function (response) {
                //console.log(response);
                filter_data = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });
        //console.log(filter_data)
        resolve(filter_data);
    });
}

//Search Equipment
function searchEquipment(){
    let brand = $('#filter_brand').val();
    let model = $('#filter_model').val();

    searchEquipmentPromse1(brand, model)
    .then(function(obj_data) {
        //console.log(obj_data);
        //obj_data = obj_data['dataset'].sort(function (a, b) { return a.Index < b.Index ? 1 : -1; });  //由高到低排序
        //顯示畫面
        pagination(obj_data['dataset'], nowPage, 'equipment');
    });
}


function searchEquipmentPromse1(brand, model){
    return new Promise(function(resolve, reject) {
        let url ='/filter/equipment';
        let filter_data ='';
        var param = {"brand": brand, "model": model}
        //console.log(param);
        $.ajax({
            url: url,
            type: "POST",
            cache: false,
            async: false,
            data: JSON.stringify(param),
            contentType: "application/json",
            success: function (response) {
                //console.log(response);
                filter_data = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });
        //console.log(filter_data)
        resolve(filter_data);
    });
}


//Search Device Name
function searchDeviceName(){
    let name = $('#name').val();
    //let model = $('#filter_model').val();

    searchDevicePromse1(name)
    .then(function(obj_data) {
        //console.log(obj_data);
        //obj_data = obj_data['dataset'].sort(function (a, b) { return a.Index < b.Index ? 1 : -1; });  //由高到低排序
        //顯示畫面
        pagination(obj_data['dataset'], nowPage, 'device');
    });
}


function searchDevicePromse1(name){
    return new Promise(function(resolve, reject) {
        let url ='/filter/device';
        let filter_data ='';
        var param = {"name": name}
        //console.log(param);
        $.ajax({
            url: url,
            type: "POST",
            cache: false,
            async: false,
            data: JSON.stringify(param),
            contentType: "application/json",
            success: function (response) {
                //console.log(response);
                filter_data = response;
            },
            complete: function() {
                //console.log('finish')
            },
            error: function (error) {
              console.log(error);
            }
        });
        //console.log(filter_data)
        resolve(filter_data);
    });
}


//Upload Logo Picture
function uploadFile(){
    let file = document.getElementById("fileupload").files;  //存取檔案
    let title = $('#title').val();
    //console.log(file[0]);
    if(file[0] != undefined){
         processfile(file[0])
        .then(function(result) {
            //console.log(result);
            if(title == ''){
                 alert('Please fill in required data.');
            }
            else if(result == "over"){
                alert('It is recommended that you choose pictures smaller than 320 * 97');
            }
            else{
                var fd = new FormData();            //模擬表單
                fd.append('title', title);
                fd.append('fileupload', file[0]);    //圖檔

                let url = '/uploadSetData';
                fetch(url, {
                    method: 'POST',
                    //headers: headers,
                    body: fd,
                }).then((response) => {
                    //loadPageLoading();
                    return response.json();
                    //return response.text();
                }).then((jsonData) => {  //完成時
                    //console.log(jsonData['status']);
                    alert('The configurateion was updated success !');
                    location.reload();
                }).catch((err) => {
                    console.log('error:', err);
                });
            }

        });

    }
    else{
            var fd = new FormData();            //模擬表單
            fd.append('title', title);
            fd.append('fileupload', file[0]);    //圖檔

            let url = '/uploadSetData';
            fetch(url, {
                method: 'POST',
                //headers: headers,
                body: fd,
            }).then((response) => {
                //loadPageLoading();
                return response.json();
                //return response.text();
            }).then((jsonData) => {  //完成時
                //console.log(jsonData['status']);
                alert('The configurateion was updated success !');
                location.reload();
            }).catch((err) => {
                console.log('error:', err);
            });
    }
}


//前端判斷圖片寬度和高度
function processfile(file){
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        var regex = new RegExp("(.jpg|.png|.gif)$");

        if (regex.test(file.name.toLowerCase())) {    //驗証圖片副檔名
            reader.readAsDataURL(file);                 //readAsDataURL方法可以將讀取到的檔案編碼成Data URL
            reader.onload = function (e) {
                var image = new Image();
                image.src = e.target.result;
                let result = '';

                image.onload = function () {
                    console.log(this.width);
                    console.log(this.height);
                    if(this.width <=321 && this.height <=97){
                        //console.log('ok');
                        resolve("ok");
                    }
                    else{
                        //console.log('over');
                        resolve("over");
                    }
                }
            }
        }
    });
}