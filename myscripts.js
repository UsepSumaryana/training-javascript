var data = [];

var vacancySelect = document.getElementById("vacancy");
var positionSelect = document.getElementById("position");

var vacancies = [
    { value: "1", text: "System Administrator", quota: 1 },
    { value: "2", text: "Programmer", quota: 2 },
    { value: "3", text: "Technical Writter", quota: 3 },
];

var positions = [
    { value: "1", text: "Database Engginer" },
    { value: "2", text: "Junior Programmer" },
    { value: "3", text: "Senior Programmer" },
];

vacancySelect.addEventListener("change", function () {
    var selectedValue = this.value;
    var selectedText = this.options[this.selectedIndex].text;

    var selectedVacancy = vacancies.find(function (vacancy) {
        return vacancy.value === selectedValue;
    });

    if (selectedVacancy) {
        var quota = selectedVacancy.quota;

        if (quota <= 2 && quota > 0) {
            document.getElementById("vacancyError").innerHTML = "";
            document.getElementById("vacancyInfo").innerHTML = "Kuota tersisa untuk " + selectedText + " hanya 2 pendaftar.";
        } else if (quota <= 0) {
            document.getElementById("vacancyInfo").innerHTML = "";
            document.getElementById("vacancyError").innerHTML = "Mohon maaf, rekrutasi untuk " + selectedText + " sudah penuh. dan tidak dapat dipilih.";   
            this.selectedIndex = 0;
        } else {
            document.getElementById("vacancyError").innerHTML = "";
            document.getElementById("vacancyInfo").innerHTML = "Anda dapat memilih lowongan" + selectedText;
        }
    }
});


for (var i = 0; i < vacancies.length; i++) {
    var option = document.createElement("option");
    option.value = vacancies[i].value;
    option.text = vacancies[i].text;
    vacancySelect.appendChild(option);
}

for (var i = 0; i < positions.length; i++) {
    var option = document.createElement("option");
    option.value = positions[i].value;
    option.text = positions[i].text;
    positionSelect.appendChild(option);
}

// form validation
function validateForm(event) {
    var isValid = true;
    var fullName = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var vacancy = document.getElementById("vacancy").value;
    var position = document.getElementById("position").value;

    document.getElementById("fullNameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("vacancyError").innerHTML = "";
    document.getElementById("positionError").innerHTML = "";
    document.getElementById("vacancyInfo").innerHTML = "";

    if (!fullName) {
        document.getElementById("fullNameError").innerHTML =
            "Nama harus diisi.";
        isValid = false;
    }
    if (!email) {
        document.getElementById("emailError").innerHTML = "Email harus diisi.";
        isValid = false;
    }
    if (!phone) {
        document.getElementById("phoneError").innerHTML =
            "Nomor Hp harus diisi.";
        isValid = false;
    }
    if (!vacancy) {
        document.getElementById("vacancyError").innerHTML =
            "Lowongan harus dipilih.";
        isValid = false;
    }
    if (!position) {
        document.getElementById("positionError").innerHTML =
            "Posisi harus diisi.";
        isValid = false;
    }

    return isValid;
}

var form = document.getElementById("myForm");
var modal = document.getElementById("myModal");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm(event)) showModal();
});

var closeBtn = document.getElementsByClassName("close")[0];
closeBtn.onclick = function () {
    closeModal();
};

function showModal() {
    var fullName = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var vacancy = document.getElementById("vacancy").value;
    var position = document.getElementById("position").value;

    var localData = {
        fullName: fullName,
        email: email,
        phone: phone,
        vacancy: vacancy,
        positionn: position,
    };

    data.push(localData);

    var index = vacancies.findIndex(function(e) {
        return e.value === vacancy;
    });

    var newQuota = vacancies[index].quota--;

    if (index) vacancies[index].quota = newQuota;

    var modalData = document.getElementById("modalData");
    modalData.innerHTML = "Jumlah pendaftar: " + data.length;

    modal.style.display = "block";

    form.reset();
}

function closeModal() {
    modal.style.display = "none";
}
