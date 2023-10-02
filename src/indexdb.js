const dbName = "myDatabase";
const dbVersion = 1;
const objectStoreName = "employees";

// Open or create the database
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      console.error("Error opening database:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(objectStoreName)) {
        db.createObjectStore(objectStoreName, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  });
};

export { openDB };
// indexedDB.js (continued)

// Create a new employee record
const createEmployee = async (employee) => {
  const db = await openDB();
  const transaction = db.transaction([objectStoreName], "readwrite");
  const objectStore = transaction.objectStore(objectStoreName);

  const request = objectStore.add(employee);

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error("Error adding employee:", event.target.error);
      reject(event.target.error);
    };
  });
};

// Read all employees
const getAllEmployees = async () => {
  const db = await openDB();
  const transaction = db.transaction([objectStoreName], "readonly");
  const objectStore = transaction.objectStore(objectStoreName);

  const request = objectStore.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error("Error getting employees:", event.target.error);
      reject(event.target.error);
    };
  });
};
// employeeName,
// selected,
// selectedDateFrom,
// selectedDateTo,
// Update an employee record
const updateEmployee = async (oldEmployeeId, updatedEmployeeData) => {
  try {
    const db = await openDB();
    const transaction = db.transaction([objectStoreName], "readwrite");
    const objectStore = transaction.objectStore(objectStoreName);

    // Retrieve the existing employee by old ID
    const getRequest = objectStore.get(oldEmployeeId);

    getRequest.onsuccess = (event) => {
      const existingEmployee = event.target.result;

      if (existingEmployee) {
        // Update the data of the existing employee
        existingEmployee.employeeName = updatedEmployeeData.employeeName; // Update other fields as needed
        existingEmployee.selected = updatedEmployeeData.selected; // Update other fields as needed
        existingEmployee.selectedDateFrom =
          updatedEmployeeData.selectedDateFrom; // Update other fields as needed
        existingEmployee.selectedDateTo = updatedEmployeeData.selectedDateTo; // Update other fields as needed

        // Use the 'put' method to update the existing employee
        const putRequest = objectStore.put(existingEmployee);

        putRequest.onsuccess = () => {
          console.log(`Employee with ID ${oldEmployeeId} updated`);
        };

        putRequest.onerror = (event) => {
          console.error("Error updating employee:", event.target.error);
        };
      } else {
        console.error(`Employee with ID ${oldEmployeeId} not found.`);
      }
    };

    getRequest.onerror = (event) => {
      console.error("Error getting existing employee:", event.target.error);
    };

    // Commit the transaction
    transaction.oncomplete = () => {
      console.log("Transaction completed successfully");
    };

    transaction.onerror = (event) => {
      console.error("Transaction error:", event.target.error);
    };
  } catch (error) {
    console.error("Error opening database:", error);
  }
};

// Delete an employee by ID
const deleteEmployee = async (employeeId) => {
  const db = await openDB();
  const transaction = db.transaction([objectStoreName], "readwrite");
  const objectStore = transaction.objectStore(objectStoreName);

  const request = objectStore.delete(employeeId);

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      resolve();
    };

    request.onerror = (event) => {
      console.error("Error deleting employee:", event.target.error);
      reject(event.target.error);
    };
  });
};
// // Get an employee by ID
const getEmployeeById = async (employeeId) => {
  console.log(employeeId, "employeId");
  const db = await openDB();
  const transaction = db.transaction([objectStoreName], "readonly");
  const objectStore = transaction.objectStore(objectStoreName);

  const request = objectStore.get(employeeId);

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      const employee = event.target.result;
      if (employee) {
        resolve(employee);
      } else {
        reject(new Error(`Employee with ID ${employeeId} not found.`));
      }
    };

    request.onerror = (event) => {
      console.error("Error getting employee:", event.target.error);
      reject(event.target.error);
    };
  });
};

export {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
