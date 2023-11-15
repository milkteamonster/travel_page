axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(function (response) {
    data = response.data.data;
    print();
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
        data.forEach(function(item){
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
regionFilter();

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
    if(obj.name == "" || obj.imgUrl == "" || obj.area == "" || obj.description == "" ||obj.group == "" ||obj.price == "" ||obj.rate == ""){
      alert("請填入資料否則無法送出");
      return;
    }
    data.push(obj);
    print();
    addTicketForm.reset(); //新增送出後清空表單輸入框
    //regionSearch.reset(); 為何regionSearch不能用.reset() 來清空？
    regionSearch.value == ""; // 這樣也無效
    
}



