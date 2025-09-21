const baseurl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select"); // FIXED: removed extra space
const msg = document.querySelector(".msg");

// Dropdown population
for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;

        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        }
        if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }

        select.append(newoption);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

// Update flag icon
const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

// Handle conversion
btn.addEventListener("click", async (evt) => {
    evt.preventDefault(); // prevent form refresh
    let amount = document.querySelector(".amount input");
    let amtval = parseFloat(amount.value); // FIXED: parse as number

    if (isNaN(amtval) || amtval <= 0) {
        amtval = 1;
        amount.value = "1";
    }

    const from = fromcurr.value.toLowerCase();
    const to = tocurr.value.toLowerCase();
    const URL = `${baseurl}/${from}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[from][to]; // FIXED: Correct nested access
        let final = (amtval * rate).toFixed(2); //2decimal places tk krega
        msg.innerText = `${amtval} ${fromcurr.value} = ${final} ${tocurr.value}`;
    } catch (error) {
        msg.innerText = "Something went wrong!";
        console.error("Error fetching data:", error);
    }
});
