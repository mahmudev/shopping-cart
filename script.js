const btn = document.getElementsByClassName('cart-btn')

for (const button of btn) {
    button.addEventListener('click', function (e) {
        addData(e)
        
        e.target.setAttribute('disabled',true)
    })
}
let pNo = 0;
function addData(e) {
    const parent = e.target.parentNode.parentNode;
    const [pName, pPrice, pQuantity] = parent.querySelectorAll('.card-title, .price, .quantity');
    const pTotalPrice = parseInt(pPrice.innerText) * parseInt(pQuantity.innerText);
    const container = document.getElementById('table-container');
    const pNo = container.children.length + 1;
    container.innerHTML += `<tr>
      <td>${pNo}</td>
      <td>${pName.innerText}</td>
      <td class="item-price">${pPrice.innerText}</td>
      <td><div class="input-group number-spinner">
        <button class="btn-minus"><i class="fas fa-minus"></i></button>
        <input type="number" min="0" class="total-quantity form-control text-center w-[40px] outline-none border-none" value="${pQuantity.innerText}">
        <button class="btn-plus"><i class="fas fa-plus"></i></button>
      </div></td>
      <td class="item-total-price">${pTotalPrice}</td>
      <td><i class="fa fa-trash remove-item text-red-500 cursor-pointer" aria-hidden="true"></i></td>
    </tr>`;
    execute();
  }
  
//  remove item function 
function removeitem(e) {
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
}

// remove item event 
//  why i cant use direct function on there like this removeitem(e) ? 
function execute() {
    const items = document.getElementsByClassName('remove-item')
    for (const item of items) {
        item.addEventListener('click', function (e) {
            removeitem(e)
            totalCalculate()
        })
    }

    // quantity increment function 
    const incrementBtn = document.getElementsByClassName('btn-plus')
    for (const btn of incrementBtn) {
        btn.addEventListener('click', function (e) {
            let input = e.target.parentNode.parentNode.getElementsByClassName('total-quantity')[0]
            let inputValue = parseInt(input.value);
            input.value = inputValue + 1
            update(e.target.parentNode.parentNode.parentNode.parentNode)
        })
    }
    // quantity dicrement funciton 
    const dicrementBtn = document.getElementsByClassName('btn-minus')
    for (const btn of dicrementBtn) {
        btn.addEventListener('click', function (e) {
            let input = e.target.parentNode.parentNode.getElementsByClassName('total-quantity')[0]
            let inputValue = parseInt(input.value);

            if (inputValue > 0) {
                input.value = inputValue - 1
            }
            update(e.target.parentNode.parentNode.parentNode.parentNode)
        })
    }
    totalCalculate()

}
function update(e) {
    const itemPrice = parseInt(e.getElementsByClassName('item-price')[0].innerText)
    const itemQuantity = parseInt(e.getElementsByClassName('total-quantity')[0].value)
    const totalPrice = itemPrice * itemQuantity
    e.getElementsByClassName('item-total-price')[0].innerText = totalPrice
    totalCalculate()
}



// function for all total item price calculate 
function totalCalculate() {
    const itemPrice = document.getElementsByClassName('item-total-price')
    const totalItemPrice = document.getElementById('totalItemPrice')
    let sum = 0;
    for (const price of itemPrice) {
        sum += parseInt(price.innerText)
    }
    totalItemPrice.innerText = sum
}
execute();
totalCalculate()