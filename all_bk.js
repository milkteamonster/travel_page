let data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "台北",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      "group": 99,
      "price": 240,
      "rate": 2.5
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7
    },
    {
      "id": 3,
      "name": "綠島自由行套裝行程",
      "imgUrl": "https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_1.png?raw=true",
      "area": "高雄",
      "description": "嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合。",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 4,
      "name": "清境高空觀景步道",
      "imgUrl": "https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_4.png?raw=true",
      "area": "台北",
      "description": "清境農場青青草原數十公頃碧草，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。",
      "group": 99,
      "price": 240,
      "rate": 5
    },
    {
      "id": 5,
      "name": "山林悠遊套票",
      "imgUrl": "https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_3.png?raw=true",
      "area": "台中",
      "description": "山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點。",
      "group": 20,
      "price": 1765,
      "rate": 8
    }
  ]


//卡片渲染功能
const text = document.querySelector(".ticketCard-area")
const searchResultText = document.querySelector("#searchResult-text")
let num = 0;

function print(){ 
    str = "";
    data.forEach(function(item){
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
      </li>` 
    });
    text.innerHTML = str;
    num+=1;
    searchResultText.innerHTML = `本次搜尋共 ${data.length} 筆資料`
}
print();

//區域選擇功能
const regionSearch = document.querySelector(".regionSearch")

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
          </li>`
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
          </li>`
          text.innerHTML = str;
          num+=1;
          searchResultText.innerHTML = `本次搜尋共 ${num} 筆資料`
           }
        })
    })
}
regionFilter();

//新增旅遊套票功能
function addNewCard(){
  const ticketName = document.querySelector("#ticketName")
  const ticketImgUrl = document.querySelector("#ticketImgUrl")
  const ticketRegion = document.querySelector("#ticketRegion")
  const ticketPrice = document.querySelector("#ticketPrice")
  const ticketNum = document.querySelector("#ticketNum")
  const ticketRate = document.querySelector("#ticketRate")
  const ticketDescription = document.querySelector("#ticketDescription")
  const btn = document.querySelector(".addTicket-btn")
  
  btn.addEventListener("click", function(e){
    const obj = {};
    obj.name = ticketName.value;
    obj.imgUrl = ticketImgUrl.value;
    obj.area = ticketRegion.value;
    obj.description = ticketDescription.value;
    obj.group = ticketNum.value;
    obj.price = ticketPrice.value;
    obj.rate = ticketRate.value;
    data.push(obj);
    print();
  })
}

addNewCard();


