 const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

 const dropdowns = document.querySelectorAll(".dropdown select");
 const btn = document.querySelector("form button");
 const fromCurr = document.querySelector(".from select")
 const toCurr = document.querySelector(".to select");
 const msg = document.querySelector(".msg");

/* for (codes in countryList){
    console.log(codes, countryList[code]);
 }*/


for (let selects of dropdowns){
    for (currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (selects.name == "from" && currcode == "USD"){
            newOption.selected = "selected";
        }
        else if (selects.name == "to" && currcode == "INR"){
            newOption.selected = "selected";

        }
        selects.append(newOption);

    }
    selects.addEventListener("change", (evt) =>  {
        updateFlag(evt.target);
    })
}

const updateExchange = async () => {
   let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal == "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const fromCurrency = fromCurr.value.toLowerCase();
    const toCurrency = toCurr.value.toLowerCase();
    const URL = `${BASE_URL}/${fromCurrency}.json`;
    try {
        let response = await fetch (URL);
        let data = await response.json();
        let rate = data[fromCurrency][toCurrency];
        console.log(rate);

        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal}  ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        console.log(`Converted Amount : ${finalAmount}`);

    }catch(error){
        console.error("Failed to fetch exchange rate:", error);
    }
}

const updateFlag =(element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img =  element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click" ,  (evt) => {
    evt.preventDefault();
    updateExchange();
    
});

window.addEventListener("load", () => {
    updateExchange();
});