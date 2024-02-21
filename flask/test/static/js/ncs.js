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
   str1 += "<div class='card shadow mr-2 mb-2 h-100' id='card_"+item['id']+"'>";
   //card head
   //str1 += "<div class='card-header d-flex flex-row'>";
   str1 += "<div class='card-header'>";
   //核取選單
   str1 += "<div class='form-check-inline'>";
   str1 += "<label class='form-check-label'>";
   str1 += "<input type='checkbox' class='form-check-input' value=''><span class='m-0 text-primary align-middle'>"+item['name']+"</span>";
   str1 += "</label>";
   str1 += "</div>";
   /*
   str1 += "<div class='custom-control custom-checkbox'>";
   str1 += "<input class='form-check-input' type='checkbox'>";
   str1 += "</div>";
   str1 += "<span class='h6 m-0 font-weight-bold text-primary align-middle'>";
   //str1 += "Class "+(index+1);
   //str1 += "xxxxxxxxxxxx"; //12字元
   str1 += item['name'];
   str1 += "</span>";
   */
   //Card Header End
   str1 += "</div>";
   //Card Body
   //index = getRandom(0,2);
   str1 += "<div class='card-body'>";
   if(item['conn_status'] == "off"){
      str1 += "<div class='text-center px-0.7'>";
      str1 += icon[2];
   }
   else if(item['equipment_status'] == "on"){
      str1 += "<div class='text-center mb-3'>";
      str1 += icon[1];
   }
   else{
      str1 += "<div class='text-center mb-3'>";
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
function showDevicePanel(id){
  //console.log(id);
  $(".modal-dialog").addClass("modal-lg"); //變大modal
  $('#ModalLabel').text(id);
  //初始設備按鈕
  if( $(".e-status").text() == "ON"){
      $(".ctrlbtn").html('<button type="button" class="btn btn-primary" onClick="execution(\'OFF\')">OFF</button>');
  }
  else{
      $(".ctrlbtn").html('<button type="button" class="btn btn-primary" onClick="execution(\'ON\')">ON</button>');
  }

  $('.footer-content').html("<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>");
  $('#showMsg').modal({backdrop: 'static', keyboard: false});
}


// 執行設備
function execution(act){
   if(act == "ON"){
      $(".ctrlbtn").html('<button type="button" class="btn btn-primary" onClick="execution(\'OFF\')">OFF</button>');
      $(".resMsg").text("The equipment turn on");
   }
   else{
      $(".ctrlbtn").html('<button type="button" class="btn btn-primary" onClick="execution(\'ON\')">ON</button>');
      $(".resMsg").text("The equipment turn off");
   }
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
        let url = '/device/group/'+g_id;
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


//顯示畫面
function showDeviceList(obj_data){
    //console.log(obj_data.length);
    //console.log(obj_data);
    var str = '';
    if(obj_data.length != 0){    
        //顯示表格
        for(var i=0; i<obj_data.length; i++){
            let Remainder  = i % col;
            if(Remainder == 0){
                str += "<div class='d-flex align-content-around flex-wrap flex-fill'>";
                //str += "<div class='row d-flex flex-row w-100 h-100'>";
            }

            str += showDevice(obj_data[i]);

            if((i+1) % col == 0){
                str += "</div>";
            }
        }
    }
    else{
        str += "<div class='d-flex justify-content-center h2 pt-5'> No devices were found. </div>";
    }
    //console.log(str);
    $('.showdevlist').html(str);
}