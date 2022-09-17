function addToQuotebook() {
    let quote = document.getElementById('input');
    let name = document.getElementById('name');

    let params = new URLSearchParams({ quote:`"${quote.value}," - ${name.value}, ${new Date().getFullYear()}` });

    fetch(`https:/quick-quote.vercel.app/api/quote?` + params.toString())
        .then(res => res.json())
        .then(data => {
            if(!`${data.status}`.startsWith('2')) {
                alert('ERROR! Please try again. If this persists, contact the developer');
                console.log(data); 
            }

            quote.value = '';
            name.value = '';

            let button = document.getElementById('submit');
            button.disabled = true;
            setTimeout(() => {
                button.disabled = false;
            }, 10000);

            alert('Quote submitted!');
        });
}

document.getElementById('submit').addEventListener('click', addToQuotebook);
document.getElementById('input').addEventListener('keyup', e => 
    ['enter', 'return'].includes(e.key.toLowerCase()) ? addToQuotebook() : 1
);