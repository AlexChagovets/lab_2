const getById = (id) => document.getElementById(id);
const getByClass = (className) => document.getElementsByClassName(className);

const form = getById("form");
const username = getById("username");
const phone = getById("phone");
const idCard = getById("idCard");
const birthDate = getById("birthDate");
const email = getById("email");
const errorMsg = getByClass("error");

let isFormValid;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  isFormValid = true;

  validateField(username, 0, "Поле не може бути пустим");
  validateField(phone, 1, "Номер має бути у форматі: 0695995959");
  validateField(idCard, 2, "Номер паспорту має складатися з 6 цифр");
  validateField(birthDate, 3, "Потрібно обрати дату");
  validateField(email, 4, "Уведіть email");

  if (isFormValid) {
    displayData();
  }
});

const validateField = (field, serial, message) => {
  const value = field.value.trim();

  if (value === "" || 
      (field === phone && isNaN(value)) ||
      (field === idCard && !/^\d{6}$/.test(value))) {
    setErrorMessage(field, serial, message);
  } else {
    clearErrorMessage(field, serial);
  }
};

const setErrorMessage = (field, serial, message) => {
  errorMsg[serial].innerHTML = message;
  field.style.border = "2px solid red";
  isFormValid = false;
};

const clearErrorMessage = (field, serial) => {
  errorMsg[serial].innerHTML = "";
};

const displayData = () => {
  const fieldLabels = {
    username: "ПІБ",
    phone: "Телефон",
    idCard: "ID карта",
    birthDate: "Дата народження",
    email: "Email",
  };

  const values = {
    [fieldLabels.username]: username.value.trim(),
    [fieldLabels.phone]: phone.value.trim(),
    [fieldLabels.idCard]: idCard.value.trim(),
    [fieldLabels.birthDate]: birthDate.value.trim(),
    [fieldLabels.email]: email.value.trim(),
  };

  const displayContent = Object.entries(values).map(([key, value]) => `<p>${key}: ${value}</p>`).join("");

  let displayBlock = getById("displayData");
  displayBlock.innerHTML = displayContent;

  displayBlock.style.display = "flex";
};
