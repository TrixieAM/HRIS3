import React, { Children, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import "./components.css";

const PDS1 = () => {
  /* Start */
  /* Code for fetching the data in the person table in the database */
  const [formData, setFormData] = useState([]);
  const [formData2, setFormData2] = useState([]);
  const [formData3, setFormData3] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allDataResponse, childrenResponse, SchoolData] = await Promise.all([
          axios.get("http://localhost:5000/personalinfo/person_table"),
          axios.get("http://localhost:5000/childrenAPI/children_table"),
          axios.get("http://localhost:5000/allData/all_data")
        ]);
        console.log('All Data Response:', allDataResponse.data);
        console.log('Children Data Response:', childrenResponse.data);
        setFormData(allDataResponse.data);
        setFormData2(childrenResponse.data);
        setFormData3(SchoolData.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  //ITONG CODE LANG
  const getEmployeeNumFromToken = () => {
    const token = localStorage.getItem("token");  // Get token from localStorage
    if (token) {
      const decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded);
      return decoded.employeeNumber;  // get the employeeNumber
    }
    return null;
  };
//store the employeeNumber in a new variable 
  const employeeNum = getEmployeeNumFromToken();

    // Filter the data based on employeeNum
  const filteredFormData = formData.filter((data) => String(data.employeeID) === String(employeeNum));
  const filteredFormData2 = formData2.filter((data) => String(data.employeeID) === String(employeeNum));
  const filteredFormData3 = formData3.filter((data) => String(data.employeeID) === String(employeeNum));
  
  console.log('Employee Number from Token:', employeeNum);
  console.log('Filtered FormData:', filteredFormData);
  const maxRows = 12; // Define the maximum number of rows
  // Pad `data` with placeholders if it has fewer than `maxRows` rows
  const paddedData = [
    ...filteredFormData2,
    ...Array.from({ length: Math.max(0, maxRows - formData2.length) }, () => ({
      childrenFirstName: "",
      childrenMiddleName: "",
      childrenLastName: "",
      childrenNameExtension: "",
      dateOfBirth: "",
      person_id: "",
    })),
  ];
  
  /* END */
  return (
    <form
      style={{
        border: "1px solid black",
        padding: "0.25in",
        width: "8in",
        marginBottom: "7%",
        height: "fit-content",
        position: "relative",
      }}
    >
      <table

        style={{
          border: "1px solid black",
          borderCollapse: "collapse",
          fontFamily: "Arial, Helvetica, sans-serif",
          width: "8in",
          position: "relative",
          tableLayout: "fixed",
        }}
      >
        <tbody>
          <tr>
            <td colSpan={2} style={{ height: "0.1in", fontSize: "72.5%" }}>
              <b>
                <i>CS Form No. 212</i>
              </b>
            </td>
            <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
            <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
            <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
            <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
            <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
            <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
            <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
            <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
            <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
            <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
            <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
            <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
            <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
          </tr>
          <tr>
            <td colSpan={2} style={{ height: "0.1in", fontSize: "62.5%" }}>
              <b>
                <i>Revised 2017</i>
              </b>
            </td>
          </tr>
          <tr>
            <td colSpan={15} style={{ height: "0.5in" }}>
              <h1 style={{ textAlign: "center" }}>
                <b>PERSONAL DATA SHEET</b>
              </h1>
            </td>
          </tr>
          <tr>
            <td colSpan={15} style={{ height: "0.3in", fontSize: "62.5%" }}>
              <b>
                <i>
                  WARNING: Any misrepresentation made in the Personal Data Sheet
                  and the Work Experience Sheet shall cause the filing of
                  administrative/criminal case/s
                </i>
              </b>
              <br />
              <b>
                <i>against the person concerned.</i>
              </b>
              <br />
              <br />
              <b>
                <i>
                  READ THE ATTACHED GUIDE TO FILLING OUT THE PERSONAL DATA SHEET
                  (PDS) BEFORE ACCOMPLISHING THE PDS FORM.
                </i>
              </b>
            </td>
          </tr>
          <tr>
            <td colSpan={11} style={{ height: "0.1in", fontSize: "55%" }}>
              Print legibly. Tick appropriate boxes (□) and use separate sheet
              if necessary. Indicate N/A if not applicable.{" "}
              <b>DO NOT ABBREVIATE.</b>
            </td>
            <td
              colSpan={1}
              style={{
                height: "0.1in",
                fontSize: "55%",
                backgroundColor: "gray",
                border: "1px solid black",
              }}
            >
              1. CS ID No
            </td>
            <td
              colSpan={3}
              style={{
                height: "0.1in",
                fontSize: "50%",
                textAlign: "right",
                border: "1px solid black",
              }}
            >
              (Do not fill up. For CSC use only)
            </td>
          </tr>
          <tr>
            <td
              colSpan={15}
              style={{
                height: "0.2in",
                fontSize: "72.5%",
                backgroundColor: "gray",
                color: "white",
              }}
            >
              <b>
                <i>I. PERSONAL INFORMATION</i>
              </b>
            </td>
          </tr>
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px 1px 0px 1px solid black",
                }}
              >
                2. SURNAME
              </td>
              <td
                colSpan={12}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  name="lastName"
                  value={item.lastName}
                  style={{ width: "98%", border: "none", outline: "none" }}
                />
              </td>
            </tr>
          ))}

          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                rowSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "0px 1px 0px 1px solid black",
                }}
              >
                FIRST NAME
              </td>
              <td
                colSpan={9}
                rowSpan={2}
                style={{
                  height: "0.125in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  name="firstName"
                  value={item.firstName}
                  style={{ width: "98%", border: "none", outline: "none" }}
                />
              </td>
              <td
                colSpan={3}
                style={{
                  fontSize: "62.5%",
                  border: "1px 1px 0px 1px solid black",
                  backgroundColor: "lightgray",
                }}
              >
                <sup>NAME EXTENSION (JR, SR)</sup>
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.125in",
                  fontSize: "62.5%",
                  border: "0px 1px 1px 1px solid black",
                  backgroundColor: "lightgray",
                }}
              >
                <sup>
                  <input
                    type="text"
                    value={item.nameExtension}
                    style={{
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none",
                    }}
                  />
                </sup>
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "0px 1px 1px 1px solid black",
                }}
              >
                MIDDLE NAME
              </td>
              <td
                colSpan={12}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  name="middleName"
                  value={item.middleName}
                  style={{ width: "99.3%", border: "none", outline: "none" }}
                />{" "}
              </td>
            </tr>
          ))}

          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                rowSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                3. DATE OF BIRTH
                <br />
                <p>  (mm/dd/yyyy)</p>
              </td>
              <td
                colSpan={4}
                rowSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  name="dateOfBirth"
                  value={item.birthDate}
                  style={{ width: "98%", border: "none", outline: "none" }}
                />
              </td>
              <td
                colSpan={3}
                rowSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                  verticalAlign: "top",
                }}
              >
                <br />
                16. CITIZENSHIP <br />
                <br />
                If holder of dual citizenship,
                <br />
                <br />
                please indicate the details
              </td>
              <td
                colSpan={5}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.citizenship}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}

          <tr>
            <td
              colSpan={5}
              style={{
                height: "0.25in",
                fontSize: "62.5%",
                border: "1px solid black",
              }}
            ></td>
          </tr>
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                4. PLACE OF BIRTH
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.placeOfBirth}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                5. SEX
              </td>
              <td
                colSpan={5}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.Sex}
                  style={{ width: "78%", border: "none", outline: "none" }}
                />
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                rowSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                  verticalAlign: "top",
                }}
              >
                <br />
                6. CIVIL STATUS
              </td>
              <td
                colSpan={4}
                rowSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.civilStatus}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                rowSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black black lightgray black",
                  verticalAlign: "top",
                }}
              >
                <br />
                17. RESIDENTIAL ADDRESS
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.15in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={`  ${item.houseBlockLotNum}      ${item.streetName}`}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}

          <tr>
            <td
              colSpan={3}
              style={{
                height: "0.1in",
                fontSize: "55%",
                border: "1px solid gray white black black",
                textAlign: "center",
              }}
            >
              <i>House/Block/Lot No.</i>
            </td>
            <td
              colSpan={3}
              style={{
                height: "0.1in",
                fontSize: "55%",
                border: "1px solid gray white black black",
                textAlign: "center",
              }}
            >
              <i>Street</i>
            </td>
          </tr>

          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={6}
                style={{
                  height: "0.15in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={`  ${item.subdivisionOrVillage}    ${item.barangayName}`}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}

          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.1in",
                  fontSize: "55%",
                  border: "1px solid gray black black white",
                  textAlign: "center",
                }}
              >
                <i>Subdivision/Village</i>
              </td>
              <td
                colSpan={3}
                style={{
                  height: "0.1in",
                  fontSize: "55%",
                  border: "1px solid gray black black white",
                  textAlign: "center",
                }}
              >
                <i>Barangay</i>
              </td>
            </tr>
          ))}

          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                rowSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                7. HEIGHT (m)
              </td>
              <td
                colSpan={4}
                rowSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                {/* Height */}
                <input
                  type="text"
                  value={item.heightM}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.15in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                {/* City and Province*/}
                <input
                  type="text"
                  value={`  ${item.cityOrMunicipality}   ${item.provinceName}`}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}

          <tr>
            <td
              colSpan={3}
              style={{
                height: "0.1in",
                fontSize: "55%",
                border: "1px solid gray black black black",
                textAlign: "center",
              }}
            >
              <i>City/Municipality</i>
            </td>
            <td
              colSpan={3}
              style={{
                height: "0.1in",
                fontSize: "55%",
                border: "1px solid gray black black black",
                textAlign: "center",
              }}
            >
              <i>Province</i>
            </td>
          </tr>

          {/* Weight and Zipcode */}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                8. WEIGHT (kg)
              </td>

              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.weightKg}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>

              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black black gray black",
                  textAlign: "center",
                }}
              >
                ZIP CODE
              </td>

              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.zipcode}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}

          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                rowSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                9. BLOOD TYPE
              </td>

              <td
                colSpan={4}
                rowSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.bloodType}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>

              <td
                colSpan={2}
                rowSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                  verticalAlign: "top",
                }}
              >
                <br />
                18. PERMANENT ADDRESS
              </td>

              <td
                colSpan={6}
                style={{
                  height: "0.15in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={`  ${item.houseBlockLotNum}      ${item.streetName}`}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}

          <tr>
            <td
              colSpan={3}
              style={{
                height: "0.1in",
                fontSize: "55%",
                border: "1px solid gray white black black",
                textAlign: "center",
              }}
            >
              <i>House/Block/Lot No.</i>
            </td>
            <td
              colSpan={3}
              style={{
                height: "0.1in",
                fontSize: "55%",
                border: "1px solid gray white black black",
                textAlign: "center",
              }}
            >
              <i>Street</i>
            </td>
          </tr>
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                rowSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                10. GSIS ID NO.
              </td>

              <td
                colSpan={4}
                rowSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.gsisNum}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>

              <td
                colSpan={6}
                style={{
                  height: "0.15in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={`  ${item.subdivisionOrVillage}    ${item.barangayName}`}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}

          <tr>
            <td
              colSpan={3}
              style={{
                height: "0.1in",
                fontSize: "55%",
                border: "1px solid gray black black black",
                textAlign: "center",
              }}
            >
              <i>Subdivision/Village</i>
            </td>
            <td
              colSpan={3}
              style={{
                height: "0.1in",
                fontSize: "55%",
                border: "1px solid gray black black black",
                textAlign: "center",
              }}
            >
              <i>Barangay</i>
            </td>
          </tr>

          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                rowSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                11. PAG-IBIG ID NO.
              </td>
              <td
                colSpan={4}
                rowSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.pagibigNum}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.15in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={`  ${item.cityOrMunicipality}   ${item.provinceName}`}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td
              colSpan={3}
              style={{
                height: "0.1in",
                fontSize: "55%",
                border: "1px solid gray black black black",
                textAlign: "center",
              }}
            >
              <i>City/Municipality</i>
            </td>
            <td
              colSpan={3}
              style={{
                height: "0.1in",
                fontSize: "55%",
                border: "1px solid gray black black black",
                textAlign: "center",
              }}
            >
              <i>Province</i>
            </td>
          </tr>

          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                12. PHILHEALTH NO.
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.philhealthNum}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid gray black black black",
                  textAlign: "center",
                }}
              >
                ZIP CODE
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.zipcode}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                13. SSS NO.
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.sssNum}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "57.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                19. TELEPHONE NO.
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.telephone}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                14. TIN NO.
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.tinNum}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                20. MOBILE NO.
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.mobileNum}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                15. AGENCY EMPLOYEE NO.
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.agencyEmployeeNum}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "45%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                21. E-MAIL ADDRESS (if any)
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.emailAddress}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}

          <tr>
            <td
              colSpan={15}
              style={{
                height: "0.2in",
                fontSize: "72.5%",
                backgroundColor: "gray",
                color: "white",
              }}
            >
              <b>
                <i>II. FAMILY BACKGROUND</i>
              </b>
            </td>
          </tr>
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                rowSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                22. SPOUSE'S SURNAME
                <br />
                <br />
                FIRST NAME
                <br />
                <br />
                MIDDLE NAME
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.spouseLastName}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "52.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                23. NAME of CHILDREN (Write full name and list all)
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "52.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                  textAlign: "center",
                }}
              >
                DATE OF BIRTH
                <br />
                (mm/dd/yyyy)
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={4}
                rowSpan={2}
                style={{
                  height: "0.125in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.spouseFirstName}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.125in",
                  fontSize: "47.5%",
                  backgroundColor: "lightgray",
                  border: "1px 1px 0px 1px solid black",
                }}
              >
                NAME EXTENSION (JR, SR)
              </td>
              <td
                colSpan={4}
                rowSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
              </td>
              <td
                colSpan={2}
                rowSpan={2}
                style={{
                  height: "0.125in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
              </td>
            </tr>
          ))}
          {filteredFormData.map(item => (
          <tr>
            <td
              colSpan={2}
              style={{
                height: "0.125in",
                fontSize: "52.5%",
                backgroundColor: "lightgray",
                border: "0px 1px 1px 1px solid black",
              }}
            >
              <input
                type="text"
                value={item.spouseNameExtension}
                style={{
                  width: "98%",
                  border: "none",
                  outline: "none",
                  background: "none",
                }}
              />
            </td>
          </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.spouseMiddleName}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
              </td>
            </tr>
          ))}

          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                OCCUPATION
                <br />
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.spouseOccupation}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                EMPLOYER/BUSINESS NAME
                <br />
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.spouseEmployerBusinessName}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                BUSINESS ADDRESS
                <br />
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.spouseBusinessAddress}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
            
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
               
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                TELEPHONE NO.
                <br />
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.spouseTelephone}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
               
              </td>
            </tr>
          ))} 
          {paddedData.map((item, index) => (
            <div style={{position: "absolute", margin: "-8rem 31rem"}}>
              <div style={{position: "relative"}}>
                <tr
                  style={{
                    ...(index === 0 && { 
                      overflow: "hidden",
                      position: "absolute",
                      width: "40rem",
                      marginTop: "-2.3rem",
                      backgroundColor: "transparent",
                    }),
                    ...(index === 1 && {
                      overflow: "hidden",
                      position: "absolute",
                      width: "40rem",
                      marginTop: "-.3rem",
                      backgroundColor: "transparent",
                    }),
                    ...(index === 2 && {
                      overflow: "hidden",
                      position: "absolute",
                      width: "40rem",
                      marginTop: "1.3rem",
                      backgroundColor: "transparent",
                    }),
                    ...(index === 3 && {
                      overflow: "hidden",
                      position: "absolute",
                      width: "40rem",
                      marginTop: "3rem",
                      backgroundColor: "transparent",
                    }),
                    ...(index === 4 && {
                      overflow: "hidden",
                      position: "absolute",
                      width: "40rem",
                      marginTop: "4.7rem",
                      backgroundColor: "transparent",
                    }),
                    ...(index === 5 && {
                      overflow: "hidden",
                      position: "absolute",
                      width: "40rem",
                      marginTop: "6.4rem",
                      backgroundColor: "transparent",
                    }),
                    ...(index === 6 && {
                      overflow: "hidden",
                      position: "absolute",
                      width: "40rem",
                      marginTop: "8.1rem",
                      backgroundColor: "transparent",
                    }),
                    ...(index === 7 && {
                      overflow: "hidden",
                      position: "absolute",
                      width: "40rem",
                      marginTop: "10.3rem",
                      backgroundColor: "transparent", // Style for the first row
                    }),
                    ...(index === 8 && {
                      overflow: "hidden",
                      position: "absolute",
                      width: "40rem",
                      marginTop: "12.3rem",
                      backgroundColor: "transparent", // Style for the first row
                    }),
                    ...(index === 9 && {
                      overflow: "hidden",
                      position: "absolute",
                      width: "40rem",
                      marginTop: "14rem",
                      backgroundColor: "transparent", // Style for the first row
                    }),
                    ...(index === 10 && {
                      overflow: "hidden",
                      position: "absolute",
                      width: "40rem",
                      marginTop: "15.7rem",
                      backgroundColor: "transparent", // Style for the first row
                    }),
                    ...(index === 11 && {
                      overflow: "hidden",
                      position: "absolute",
                      width: "40rem",
                      marginTop: "17.4rem",
                      backgroundColor: "transparent", // Style for the first row
                    }),
                  }}
                >
                  <td
                  colSpan={4}
                  rowSpan={2}
                  style={{
                    marginTop: "2rem",
                    borderTop: "none",
                    height: "0.125in",
                    fontSize: "52.5%",
                    borderLeft: "none",
                    borderBottom: "none",
                    border: "none",
                  }}
                  
                >
                  <input
                    type="text"
                    value={`${item.childrenFirstName} ${item.childrenLastName}`}
                    style={{
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none",
                    }}
                  />
                  </td>
                  <td
                    colSpan={2}
                    rowSpan={2}
                    style={{
                      height: "0.125in",
                      fontSize: "52.5%",
                      border: "none",
                      width: "1.1in",
                    }}
                    
                  >
                    <input
                      type="text"
                      value={item.dateOfBirth}
                      style={{
                        width: "98%",
                        border: "none",
                        outline: "none",
                        background: "none",
                      }}
                    />
                  </td>
                </tr>
              </div>
            </div>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                rowSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  
                }}
              >
                24. FATHER'S SURNAME
                <br />
                <br />
                FIRST NAME
                <br />
                <br />
                MIDDLE NAME
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                  borderTop: "0px"
                }}
              >
                <input
                  type="text"
                  value={item.fatherLastName}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                  borderTop: "0px",
                }}
              >
                
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                  borderTop: "0px",
                }}
              >
                
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={4}
                rowSpan={2}
                style={{
                  height: "0.125in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.fatherFirstName}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.125in",
                  fontSize: "47.5%",
                  backgroundColor: "lightgray",
                  border: "1px 1px 0px 1px solid black",
                }}
              >
                NAME EXTENSION (JR, SR)
              </td>
              <td
                colSpan={4}
                rowSpan={2}
                style={{
                  height: "0.125in",
                  fontSize: "52.5%",
                  border: "1px solid black",
                }}
              >
              </td>
              <td
                colSpan={2}
                rowSpan={2}
                style={{
                  height: "0.125in",
                  fontSize: "52.5%",
                  border: "1px solid black",
                }}
              >
                
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={2}
                style={{
                  height: "0.125in",
                  fontSize: "52.5%",
                  backgroundColor: "lightgray",
                  border: "0px 1px 1px 1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.fatherNameExtension}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.fatherMiddleName}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
        
              </td>
            </tr>
          ))}
          
            <tr>
              <td
                colSpan={9}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px 1px 0px 1px solid black",
                }}
              >
                25. MOTHER'S MAIDEN NAME
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              ></td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
              </td>
            </tr>
          
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                rowSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "0px 1px 1px 1px solid black",
                }}
              >
                SURNAME
                <br />
                <br />
                FIRST NAME
                <br />
                <br />
                MIDDLE NAME
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.motherMaidenLastName}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
              
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.motherMaidenFirstName}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={4}
                style={{
                  height: "0.25in",
                  fontSize: "52.5%",
                  border: "1px solid black",
                }}
              >
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "52.5%",
                  border: "1px solid black",
                }}
              >
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.motherMaidenMiddleName}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={6}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  color: "red",
                  border: "1px solid black",
                  textAlign: "center",
                }}
              >
                <b>
                  <i>(Continue on separate sheet if necessary)</i>
                </b>
              </td>
            </tr>
          ))}
          <tr>
            <td
              colSpan={15}
              style={{
                height: "0.2in",
                fontSize: "72.5%",
                backgroundColor: "gray",
                color: "white",
              }}
            >
              <b>
                <i>III. EDUCATIONAL BACKGROUND</i>
              </b>
            </td>
          </tr>
          <tr>
            <td
              colSpan={1}
              rowSpan={2}
              style={{
                height: "0.3in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px 1px 1px 0px solid black",
              }}
            >
              26.
            </td>
            <td
              colSpan={2}
              rowSpan={2}
              style={{
                height: "0.3in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px 0px 1px 1px solid black",
                textAlign: "center",
              }}
            >
              LEVEL
            </td>
            <td
              colSpan={3}
              rowSpan={2}
              style={{
                height: "0.3in",
                fontSize: "52.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              NAME OF SCHOOL
              <br />
              (Write in full)
            </td>
            <td
              colSpan={3}
              rowSpan={2}
              style={{
                height: "0.3in",
                fontSize: "50%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              BASIC EDUCATION/DEGREE/COURSE
              <br />
              (Write in full)
            </td>
            <td
              colSpan={2}
              style={{
                height: "0.3in",
                fontSize: "50%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              PERIOD OF
              <br />
              ATTENDANCE
            </td>
            <td
              colSpan={2}
              rowSpan={2}
              style={{
                height: "0.3in",
                fontSize: "50%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              HIGHEST LEVEL/
              <br />
              UNITS EARNED
              <br />
              (if not graduated)
            </td>
            <td
              colSpan={1}
              rowSpan={2}
              style={{
                height: "0.3in",
                fontSize: "50%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              YEAR
              <br />
              GRADUATED
            </td>
            <td
              colSpan={1}
              rowSpan={2}
              style={{
                height: "0.3in",
                fontSize: "40%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              SCHOLARSHIP/
              <br />
              ACADEMIC
              <br />
              HONORS
              <br />
              RECEIVED
            </td>
          </tr>
          <tr>
            <td
              colSpan={1}
              style={{
                height: "0.1in",
                fontSize: "50%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              From
            </td>
            <td
              colSpan={1}
              style={{
                height: "0.1in",
                fontSize: "50%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              To
            </td>
          </tr>
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                ELEMENTARY
                <br />
              </td>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.elementaryNameOfSchool}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.elementaryDegree}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.elementaryPeriodFrom}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.elementaryPeriodTo}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.elementaryHighestAttained}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.elementaryYearGraduated}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.elementaryScholarshipAcademicHonorsReceived}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}
          {filteredFormData.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                SECONDARY
                <br />
              </td>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.secondaryNameOfSchool}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.secondaryDegree}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.secondaryPeriodFrom}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.secondaryPeriodTo}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.secondaryHighestAttained}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.secondaryYearGraduated}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.secondaryScholarshipAcademicHonorsReceived}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}

          {filteredFormData3.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                VOCATIONAL/TRADE COURSE
                <br />
              </td>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.vocationalNameOfSchool}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.vocationalDegree}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.vocationalPeriodFrom}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.vocationalPeriodTo}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.vocationalHighestAttained}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.vocationalYearGraduated}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.vocationalScholarshipAcademicHonorsReceived}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}
          {filteredFormData3.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                COLLEGE
                <br />
              </td>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.collegeNameOfSchool}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.collegeDegree}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.collegePeriodFrom}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.collegePeriodTo}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.collegeHighestAttained}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.collegeYearGraduated}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.collegeScholarshipAcademicHonorsReceived}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}

          {filteredFormData3.map((item) => (
            <tr>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                }}
              >
                GRADUATE STUDIES
                <br />
              </td>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.graduateNameOfSchool}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={3}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.graduateDegree}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.graduatePeriodFrom}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.graduatePeriodTo}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={2}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.graduateHighestAttained}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={item.graduatedYearGraduated}
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
              <td
                colSpan={1}
                style={{
                  height: "0.25in",
                  fontSize: "62.5%",
                  border: "1px solid black",
                }}
              >
                <input
                  type="text"
                  value={
                    item.graduatedvocationalScholarshipAcademicHonorsReceived
                  }
                  style={{
                    width: "98%",
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                />
              </td>
            </tr>
          ))}

          <tr>
            <td
              colSpan={15}
              style={{
                height: "0.1in",
                fontSize: "55%",
                backgroundColor: "lightgray",
                color: "red",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              <b>
                <i>(Continue on separate sheet if necessary)</i>
              </b>
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              style={{
                height: "0.25in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              <b>
                <i>
                  SIGNATURE
                  <i />
                </i>
              </b>
              <i>
                <i></i>
              </i>
            </td>
            <td
              colSpan={6}
              style={{
                height: "0.25in",
                fontSize: "62.5%",
                border: "1px solid black",
              }}
            >
              <input
                type="file"
                style={{
                  width: "98%",
                  border: "none",
                  outline: "none",
                  background: "none",
                }}
              />
            </td>
            <td
              colSpan={2}
              style={{
                height: "0.25in",
                fontSize: "62.5%",
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              <b>
                <i>
                  DATE
                  <i />
                </i>
              </b>
              <i>
                <i></i>
              </i>
            </td>
            <td
              colSpan={4}
              style={{
                height: "0.25in",
                fontSize: "62.5%",
                border: "1px solid black",
              }}
            >
              <input
                type="text"
                style={{
                  width: "98%",
                  border: "none",
                  outline: "none",
                  background: "none",
                }}
              />
            </td>
          </tr>
          <tr>
            <td
              colSpan={15}
              style={{
                height: "0.1in",
                fontSize: "50%",
                border: "1px solid white",
                textAlign: "right",
              }}
            >
              <i>CS FORM 212 (Revised 2017), Page 1 of 4</i>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default PDS1;
