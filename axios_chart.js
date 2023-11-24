axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(function (response) {
    data = response.data.data;
    print();
    regionFilter();
    initChart();
  })
  .catch(function (error) {
    console.log(error);
  });

//新增旅遊套票功能的DOM取值
  const ticketName = document.querySelector("#ticketName");
  const ticketImgUrl = document.querySelector("#ticketImgUrl");
  const ticketRegion = document.querySelector("#ticketRegion");
  const ticketPrice = document.querySelector("#ticketPrice");
  const ticketNum = document.querySelector("#ticketNum");
  const ticketRate = document.querySelector("#ticketRate");
  const ticketDescription = document.querySelector("#ticketDescription");
  const btn = document.querySelector(".addTicket-btn");
  const addTicketForm = document.querySelector(".addTicket-form");

  const regionSearch = document.querySelector(".regionSearch"); //地區搜尋
  const text = document.querySelector(".ticketCard-area"); //套票卡片區ul
  const searchResultText = document.querySelector("#searchResult-text"); //本次資料共幾筆的p
  
//卡片渲染功能
function print(){ 
    let str = "";
    data.forEach((item)=>{
        str += `<li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src="${item.imgUrl}" alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
            ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num">${item.group}</span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
          </div>
        </div>
          </li>`; 
    });
    text.innerHTML = str;
    searchResultText.innerHTML = `本次搜尋共 ${data.length} 筆資料`;
}


//區域選擇功能
function regionFilter(){
    regionSearch.addEventListener("change", function(e){
        let num = 0;
        let str = "";
        data.forEach((item)=>{
        //有選擇區域
           if(e.target.value == item.area){
            str += `<li class="ticketCard">
            <div class="ticketCard-img">
              <a href="#">
                <img src="${item.imgUrl}" alt="">
              </a>
              <div class="ticketCard-region">${item.area}</div>
              <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3>
                  <a href="#" class="ticketCard-name">${item.name}</a>
                </h3>
                <p class="ticketCard-description">
                ${item.description}
                </p>
              </div>
              <div class="ticketCard-info">
                <p class="ticketCard-num">
                  <span><i class="fas fa-exclamation-circle"></i></span>
                  剩下最後 <span id="ticketCard-num">${item.group}</span> 組
                </p>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">$${item.price}</span>
                </p>
              </div>
            </div>
          </li>`;
          text.innerHTML = str;
          num+=1;
          searchResultText.innerHTML = `本次搜尋共 ${num} 筆資料`
           } else if (e.target.value == ""){
            //全部地區
            str += `<li class="ticketCard">
            <div class="ticketCard-img">
              <a href="#">
                <img src="${item.imgUrl}" alt="">
              </a>
              <div class="ticketCard-region">${item.area}</div>
              <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3>
                  <a href="#" class="ticketCard-name">${item.name}</a>
                </h3>
                <p class="ticketCard-description">
                ${item.description}
                </p>
              </div>
              <div class="ticketCard-info">
                <p class="ticketCard-num">
                  <span><i class="fas fa-exclamation-circle"></i></span>
                  剩下最後 <span id="ticketCard-num">${item.group}</span> 組
                </p>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">$${item.price}</span>
                </p>
              </div>
            </div>
          </li>`;
          text.innerHTML = str;
          num+=1;
          searchResultText.innerHTML = `本次搜尋共 ${num} 筆資料`;
           }
        })
    })
}


//新增旅遊套票功能
btn.addEventListener("click", addNewCard);
function addNewCard(e){
    const obj = {};
    obj.id = data.length; //加上各自的id
    obj.name = ticketName.value;
    obj.imgUrl = ticketImgUrl.value;
    obj.area = ticketRegion.value;
    obj.description = ticketDescription.value;
    obj.group = parseInt(ticketNum.value); //input取得的值是string,要換成number
    obj.price = parseInt(ticketPrice.value); //input取得的值是string,要換成number
    obj.rate = parseInt(ticketRate.value); //input取得的值是string,要換成number
    const inputArr = document.querySelectorAll("input")
    console.log(inputArr)
    inputArr.forEach((item)=>{
      if(item.value == ""){
        alert("請填入資料否則無法送出");
        return;
      }
    })
    // if(obj.name == "" || obj.imgUrl == "" || obj.area == "" || obj.description == "" ||obj.group == "" ||obj.price == "" ||obj.rate == ""){
    //   alert("請填入資料否則無法送出");
    //   return;
    // }
    data.push(obj);
    print();
    addTicketForm.reset(); //新增送出後清空表單輸入框
    //regionSearch.reset(); Q: 為何regionSearch不能用.reset() 來清空？ A: reset() 是針對 form 標籤表單的方法，會清除 form 內容的值。所以 regionSearch 不能使用 reset() 來清除。
    regionSearch.value = ""; // 兩個等於是是比較運算子的「寬鬆比對」所以不行 
    initChart();
}


const initChart = ()=>{  
    // 篩選地區，並累加數字上去
   // totalObj 會變成 {高雄: 2, 台北: 1, 台中: 2}
   let totalObj = {};
   data.forEach(function(item,index){
     if(totalObj[item.area]==undefined){
       totalObj[item.area] = 1;
     }else{
        totalObj[item.area] +=1;
     }
   })
   
   // newData = [["高雄", 2], ["台北",1], ["台中", 1]]
   let newData = [];
   let area = Object.keys(totalObj);
   // area output ["高雄","台北","台中"]
   area.forEach(function(item,index){
     let ary = [];
     ary.push(item);
     ary.push(totalObj[item]);
     newData.push(ary);
   })
   console.log(newData)
   
   
   // 將 newData 丟入 c3 產生器
   const chart = c3.generate({
     bindto: "#chart",
     size: {
        height: 250,
        width: 250,
      },
     data: {
       columns: newData,
       type : 'donut',
     },
     donut: {
       title: "套票地區比重",
       label: {
             show: false,
           }
     },
     gauge: {
       width: 20
       },
   
   });
   }



