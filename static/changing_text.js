let changing_text = document.querySelector('.changing-text');
let arr = ['A Better Way', 'A Secure Way', 'A New Way'];
let i = 0;
setInterval(function () {
    changing_text.innerHTML = arr[i];
    i++;
    if (i >= arr.length) {
        i = 0;
    }
}
    , 800);