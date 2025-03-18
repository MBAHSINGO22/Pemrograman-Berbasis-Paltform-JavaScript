function submitStep1() {
    let nama = document.getElementById("nama").value;
    let jumlah = document.getElementById("jumlah").value;
    let button = event.target;
    
    if (!/^[a-zA-Z]+$/.test(nama)) {
        alert("Nama hanya boleh berisi huruf.");
        return;
    }

    if (nama === "" || jumlah <= 0) {
        return;
    }

    document.getElementById("nama").disabled = true;
    document.getElementById("jumlah").disabled = true;

    let formStep2 = document.getElementById("form2");
    formStep2.innerHTML = `<h3>Masukkan ${jumlah} Pilihan</h3>`;

    for (let i = 1; i <= jumlah; i++) {
        formStep2.innerHTML += `
            <label for="pilihan${i}">Pilihan ${i}:</label>
            <input type="text" id="pilihan${i}" required><br>
        `;
    }
    formStep2.innerHTML += `<button id="step2Btn" onclick="submitStep2(${jumlah})">OK</button>`;
    formStep2.style.display = "block";
    button.style.display = "none";
}

function submitStep2(jumlah) {
    let pilihan = [];
    let button = event.target;

    for (let i = 1; i <= jumlah; i++) {
        let input = document.getElementById(`pilihan${i}`);
        let value = input.value;
        if (value === "") {
            return;
        }
        pilihan.push(value);
        input.disabled = true;
    }

    let formStep3 = document.getElementById("form3");
    formStep3.innerHTML = `<h3>Pilih Salah Satu</h3>`;

    for (let i = 0; i < pilihan.length; i++) {
        formStep3.innerHTML += `
            <input type="radio" name="selectedOption" value="${pilihan[i]}" id="option${i}">
            <label for="option${i}">${pilihan[i]}</label><br>
        `;
    }

    formStep3.innerHTML += `<button id="step3Btn" onclick="submitStep3('${pilihan}')">OK</button>`;
    formStep3.style.display = "block";
    button.style.display = "none";
}

function submitStep3(pilihanString) {
    let pilihanArray = pilihanString.split(",");
    let selectedOption = document.querySelector('input[name="selectedOption"]:checked');
    let button = event.target;

    if (!selectedOption) {
        return;
    } 

    let radioButtons = document.querySelectorAll('input[name="selectedOption"]');
    radioButtons.forEach(radio => radio.disabled = true);

    let nama = document.getElementById("nama").value;
    let jumlah = document.getElementById("jumlah").value;
    let hasilDiv = document.getElementById("hasil");

    hasilDiv.innerHTML = `Hallo, nama saya ${nama}, saya mempunyai sejumlah ${jumlah} pilihan yaitu ${pilihanArray.join(", ")}, dan saya memilih ${selectedOption.value}.`;
    hasilDiv.style.display = "block";
    button.style.display = "none";
}