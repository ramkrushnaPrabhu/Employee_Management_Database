(async function () {
  const data = await fetch("data.json");
  const res = await data.json();

  let employees = res;
  let selectedEmployeeId = employees[0].id;
  let selectedEmployee = employees[0];

  const employeesList = document.querySelector(".employees_name--list");
  const employeesInfo = document.querySelector(".employees_single--Info");

  // Add Single Employee
  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");
  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });

  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
      addEmployeeModal.style.display = "none";
    }
  });

  //Edit Single Employee
  const editEmployeeModal = document.querySelector(".editEmployee");
  const editInfoButton = document.querySelector(".editInfo");
  const editEmployeeEdit = document.querySelector(".editEmployee_Edit");

  editInfoButton.addEventListener("click", () => {
    editEmployeeModal.style.display = "flex";
    EditInfo();
  });

  editEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === "editEmployee") {
      editEmployeeModal.style.display = "none";
    }
  });
  ///
  const editFirstName = document.querySelector(".edit_firstName");
  const editLastName = document.querySelector(".edit_lastName");
  const editImg = document.querySelector(".edit_Img");
  const editEmail = document.querySelector(".edit_email");
  const editContactNumber = document.querySelector(".edit_contactNumber");
  const editSalary = document.querySelector(".edit_salary");
  const editaddress = document.querySelector(".edit_address");
  const editDate = document.querySelector("#edit_date");
  ///
  const dobInput = document.querySelector(".addEmployee_create--dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  ///
  editEmployeeEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(editEmployeeEdit);

    const values = [...formData.entries()];
    let empData = {};

    values.forEach((val) => {
      empData[val[0]] = val[1];
    });
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);

    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";

    var tempEditDobSplit = empData.dob.split("-");
    var tempEditDobReverse = tempEditDobSplit.reverse();
    var array = [
      tempEditDobReverse[0],
      "/",
      tempEditDobReverse[1],
      "/",
      tempEditDobReverse[2],
    ];
    var finalTempEditDOB = array.join("");

    selectedEmployee.imageUrl = empData.imageUrl;
    selectedEmployee.firstName = empData.firstName;
    selectedEmployee.lastName = empData.lastName;
    selectedEmployee.age = empData.age;
    selectedEmployee.address = empData.address;
    selectedEmployee.email = empData.email;
    selectedEmployee.contactNumber = empData.contactNumber;
    selectedEmployee.dob = finalTempEditDOB;
    selectedEmployee.salary = empData.salary;
    renderEmployees();
    renderSingleEmployee();
    editEmployeeEdit.reset();
    editEmployeeModal.style.display = "none";
  });
  ///
  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);

    const values = [...formData.entries()];

    let empData = {};

    values.forEach((val) => {
      empData[val[0]] = val[1];
    });

    // console.log(empData);
    empData.id = employees[employees.length - 1].id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);

    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";


      let tempEditDobSplit = empData.dob.split("-");
      let tempEditDobReverse = tempEditDobSplit.reverse();
      let array = [
        tempEditDobReverse[0],
        "/",
        tempEditDobReverse[1],
        "/",
        tempEditDobReverse[2],
      ];
      let finalTempEditDOB = array.join("");
    empData.dob=finalTempEditDOB;

    employees.push(empData);

    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  });

  ///

  //Select Employee logic
  employeesList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      renderEmployees();
      renderSingleEmployee();
    }

    if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );

      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }
      renderEmployees();
    }
  });

  const renderEmployees = () => {
    employeesList.innerHTML = "";

    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employees__name--item");

      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }

      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>
      `;

      employeesList.append(employee);
    });
  };

  //Edit Info
  const EditInfo = () => {
    //
    editFirstName.value = `${selectedEmployee.firstName}`;
    editLastName.value = `${selectedEmployee.lastName}`;
    editImg.value = selectedEmployee.imageUrl;
    editEmail.value = selectedEmployee.email;
    editContactNumber.value = selectedEmployee.contactNumber;
    editSalary.value = selectedEmployee.salary;
    editaddress.value = selectedEmployee.address;
    //
    rap = selectedEmployee.dob.replace(/\D/g, "");
    day = rap.slice(0, 2);
    intDay = parseInt(day) + 1;
    month = rap.slice(2, 4);
    year = rap.slice(4, 9);
    date = new Date(year, month - 1, String(intDay));
    editDate.valueAsDate = date;
  };

  const renderSingleEmployee = () => {
    //delete employee
    if (selectedEmployeeId === -1) {
      employeesInfo.innerHTML = "";
      return;
    }

    employeesInfo.innerHTML = `<img src="${selectedEmployee.imageUrl}"/><span class="employees__single--heading">${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})</span>
    <span>Address - ${selectedEmployee.address}</span>
    <span>Email Address - ${selectedEmployee.email}</span>
    <span>Phone No. - ${selectedEmployee.contactNumber}</span>
    <span>DOB - ${selectedEmployee.dob}</span>
    <span>Salary :- ${selectedEmployee.salary}</span>
    `;
  };

  if (selectedEmployee) {
    renderSingleEmployee();
  }

  renderEmployees();
})();
