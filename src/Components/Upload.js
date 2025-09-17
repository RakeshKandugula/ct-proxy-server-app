import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Alert, Modal, Button, Toast, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { convert, allowedFile } from "./excelToXml";  // Ensure this is correctly implemented
import { suppliers, departments,getDepartmentsForSupplier,departmentGenderMap,departmentLifestageMap, buyers, seasons, phases, lifestages, genders, ST_users, ticketTypes, poLocations, poTypes, poEDIs, orderPriceTags, multiplicationFactorOptions, brands } from './constants';
import SubmitButton from './SubmitButton';  // Import the new component
import '../styles/styles.css';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedDepartment, setselectedDepartment] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [buyer, setBuyer] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedPhase, setSelectedPhase] = useState("");
  const [lifestage, setLifestage] = useState("");
  const [gender, setGender] = useState("");
  const [ST_user, setSTUser] = useState("");
  const [selectedTicketType, setSelectedTicketType] = useState("");
  const [poLocation, setPOLocation] = useState("Distribution Centre B&M");
  const [poType, setPOType] = useState("PRE");
  const [poEDI, setPOEDI] = useState("No");
  const [priceTag, setPriceTag] = useState("No");
  const [notBefore, setNotBefore] = useState("");
  const [notAfter, setNotAfter] = useState("");
  const [multiplicationFactor, setMultiplicationFactor] = useState("");
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [convertedBlob, setConvertedBlob] = useState(null); // State to store the converted XML file
  const [dealInfo, setDealInfo] = useState("");

  const formRef = useRef(null);  // Ref for form element

  const resetForm = () => {
    setFile(null);
    setErrorMessage(null);
    setSelectedSupplier(null);
    setselectedDepartment("");
    setSelectedBrand("");
    setBuyer("");
    setSelectedSeason("");
    setSelectedPhase("");
    setLifestage("");
    setGender("");
    setSTUser("");
    setSelectedTicketType("");
    setPOLocation("Distribution Centre B&M");
    setPOType("PRE");
    setPOEDI("No");
    setPriceTag("No");
    setNotBefore("");
    setNotAfter("");
    setMultiplicationFactor("");
    setFileInputKey(Date.now());
    setConvertedBlob(null);
    setDealInfo("");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage(null);
  };

  // Step 1: Convert file and trigger local download before confirmation
  const handleConvertAndDownload = () => {
    if (!file || !selectedSupplier || !buyer || !ST_user || !lifestage ||!selectedDepartment ) {
      setErrorMessage('Please fill out all the mandatory fields.');
      return;
    }

    if (!allowedFile(file.name)) {
      setErrorMessage('Invalid file format. Please upload a .xlsx file.');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;

        // Convert the file to XML (note: lifestyle parameters have been removed)
        const result = convert(
          file,
          arrayBuffer,
          selectedSupplier,
          selectedDepartment,
          selectedBrand,
          buyer,
          selectedSeason,
          selectedPhase,
          lifestage,
          gender,
          ST_user,
          selectedTicketType,
          poLocation,
          poType,
          poEDI,
          priceTag,
          notBefore,
          notAfter,
          multiplicationFactor,
          dealInfo
        );

        // Check if conversion was successful
        if (!result.success) {
          setErrorMessage(`Conversion failed: ${result.error}`);
          return;
        }

        // Check if the XML content appears empty or unreadable
        if (result.xmlString.includes('<Value AttributeID="att_fields">[]</Value>')) {
          setErrorMessage('Error: File can\'t be delivered as it appears empty or unread.');
          return;
        }

        // Create a Blob from the XML string
        const xmlBlob = new Blob([result.xmlString], { type: 'application/xml' });

        // Trigger the local download of the file
        const downloadUrl = window.URL.createObjectURL(xmlBlob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'output.xml');
        document.body.appendChild(link);
        link.click();
        link.remove();

        // Save the converted file for later sending
        setConvertedBlob(xmlBlob);

        // Now show the confirmation modal for sending to the API Gateway
        setShowConfirmation(true);
      } catch (conversionError) {
        setErrorMessage(`Conversion error: ${conversionError.message}`);
      }
    };

    fileReader.onerror = (error) => {
      setErrorMessage(`File reading error: ${error.message}`);
    };

    fileReader.readAsArrayBuffer(file);
  };

  // Step 2: Send the converted file to the API Gateway after confirmation
  const handleConfirmSubmit = async () => {
    setShowConfirmation(false); // Hide the modal

    if (!convertedBlob) {
      setErrorMessage("No converted file available for sending.");
      return;
    }

    const proxyUrl = 'https://p8dzzvc71j.execute-api.eu-west-1.amazonaws.com/default/opil-converter-tool-to-pim';

    const environment = 'tst';

    try {
      const response = await axios.post(proxyUrl, convertedBlob, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'X-Environment': environment
        },
      });

      if (response.status === 200) {
        console.log('File sent to API Gateway proxy successfully.');
        setShowSuccessToast(true);
        resetForm();
      } else {
        setErrorMessage('Server did not acknowledge the file.');
      }
    } catch (error) {
      console.error('Error sending file:', error);
      setErrorMessage('An error occurred while sending the file.');
    }
  };

  const brandOptions = selectedSupplier ? brands[selectedSupplier.value] || [] : [];

  const handleSupplierChange = (selectedOption) => {
    setSelectedSupplier(selectedOption);
    setSelectedBrand(null); // Reset brand selection when supplier changes
    setselectedDepartment(null);
    if (selectedOption && (selectedOption.label === "J.LINDEBERG_AB" || selectedOption.value === "J.LINDEBERG_AB")) {
      setLifestage("Adult");
      setGender("Men");
    } else {
      setLifestage("");
      setGender("");
    }
  };

  const handleBrandChange = (selectedOption) => {
    setSelectedBrand(selectedOption);
  };

  const supplierDepts = selectedSupplier
    ? getDepartmentsForSupplier(selectedSupplier.value).map(d => ({
        ...d,
        isSupplierDept: true
      }))
    : [];

  const allOptions = selectedSupplier
    ? [
        ...supplierDepts,
        ...departments().filter(d => !supplierDepts.some(sd => sd.value === d.value))
      ]
    : departments();

 const handleDepartmentChange = (selectedOption) => {
    setselectedDepartment(selectedOption||" ");
     if (selectedOption?.value === "MULTIPLE_DEPARTMENTS") {
    // Reset department, gender, lifestage → nothing added
    setGender("");
    setLifestage("");
    return;
  }
    if (selectedOption) {
    const deptId = selectedOption.value;
    
    // Set Gender
    if (departmentGenderMap.Men.includes(deptId)) {
      setGender("Men");
    } else if (departmentGenderMap.Women.includes(deptId)) {
      setGender("Women");
    }  else {
      setGender("");
    }

    // Set Lifestage
    if (departmentLifestageMap.Adult.includes(deptId)) {
      setLifestage("Adult");
    } else if (departmentLifestageMap.Kids.includes(deptId)) {
      setLifestage("Kids");
    } else {
      setLifestage("");
    }

  } else {
    setGender("");
    setLifestage("");
  }
  };


  const handlePOLocationChange = (selectedOption) => {
    setPOLocation(selectedOption);
    if (selectedOption === "Distribution Centre DR warehouse") {
      setPOType("CD");
    } else if (["Distribution Centre B&M", "Helsinki Department Store", "Itis Department Store", "Jumbo Department Store", "Riga Department Store", "Tallinn Department Store", "Tampere Department Store", "Tapiola Department Store", "Turku Department Store"].includes(selectedOption)) {
      setPOType("PRE");
    }
  };

  const handlePOTypeChange = (selectedOption) => {
    setPOType(selectedOption);
    if (selectedOption === "CD" && poLocation === "Distribution Centre B&M") {
      setPOLocation("Distribution Centre DR warehouse");
    } else if (selectedOption === "PRE" && poLocation === "Distribution Centre DR warehouse") {
      setPOLocation("Distribution Centre B&M");
    }
  };

  return (
    <Container className="bg-image">
      {/* Success Toast */}
      <ToastContainer position="top-center" className="p-3" style={{ zIndex: 9999 }}>
        <Toast onClose={() => setShowSuccessToast(false)} show={showSuccessToast} delay={3000} autohide bg="success">
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">File successfully sent!</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to send the file to the server? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmSubmit}>Yes, Send</Button>
        </Modal.Footer>
      </Modal>

      <Row className="justify-content-md-center mt-5">
        <Col md="8">
          <Form ref={formRef} className="p-4 bg-light rounded shadow">
            <h4 className="mb-4">Product Creation Form - TEST ONLY</h4>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Row>
              <Col md="6">
                {/* Left Column Fields */}
                <Form.Group className="mb-3">
                  <Form.Label>Supplier <span style={{ color: "red" }}>*</span></Form.Label>                  <Select
                    options={suppliers()}
                    value={selectedSupplier}
                    onChange={handleSupplierChange}
                    placeholder="Select a supplier..."
                    isSearchable={true}
                    required
                  />
                </Form.Group>
                {selectedSupplier && brandOptions.length > 0 && (
                  <Form.Group className="mb-3">
                    <Form.Label>{`${selectedSupplier.label}'s Brand`}</Form.Label>
                    <Select
                      options={brandOptions}
                      value={selectedBrand}
                      onChange={handleBrandChange}
                      placeholder="Select a brand..."
                      isSearchable={true}
                    />
                  </Form.Group>
                )}
       <Form.Group className="mb-3">
       <Form.Label> Departments <span style={{ color: "red" }}>*</span></Form.Label>
       <Select
        options={allOptions}
        onChange={handleDepartmentChange}
        value={selectedDepartment || null}
        placeholder="Select a department..."
        isSearchable={true}
        isClearable={true}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        styles={{
        option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused
        ? "#0d6efd" // very dark blue on hover
        : state.data.isSupplierDept
        ? "#d6e9ff" // grey-blue for supplier departments when not focused
        : "white",
          color: state.isFocused ? "white" : "black"
          })
        }}
        />
      </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Assortment Lead <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Select aria-label="Select Assortment Lead" onChange={(e) => setBuyer(e.target.value)} value={buyer} required>
                    <option value="" disabled>Select Assortment Lead...</option>
                    {buyers.map((b, index) => (
                      <option key={index} value={b}>{b}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Season </Form.Label>
                  <Form.Select
                    aria-label="Select Season"
                    onChange={(e) => {
                      setSelectedSeason(parseInt(e.target.value));
                      setSelectedPhase(""); // Reset phase on season change
                    }}
                    value={selectedSeason}
                    required
                  >
                    <option>Select...</option>
                    {seasons.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phase</Form.Label>
                  <Form.Select aria-label="Select Phase" onChange={(e) => setSelectedPhase(e.target.value)} value={selectedPhase}>
                    <option>Select...</option>
                    {phases[selectedSeason]?.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Consumer Lifestage <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Select aria-label="Select Lifestage" onChange={(e) => setLifestage(e.target.value)} value={lifestage} required>
                    <option value="" disabled>Select Consumer Lifestage...</option>
                    {lifestages.map((ls, index) => (
                      <option key={index} value={ls}>{ls}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select aria-label="Select Gender" onChange={(e) => setGender(e.target.value)} value={gender}>
                    <option>Select...</option>
                    {genders.map((g, index) => (
                      <option key={index} value={g}>{g}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>ST User <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Select aria-label="Select ST User" onChange={(e) => setSTUser(e.target.value)} value={ST_user} required>
                    <option value="" disabled>Select ST User...</option>
                    {ST_users.map((user, index) => (
                      <option key={index} value={user}>{user}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upload File <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} key={fileInputKey} required />
                </Form.Group>
              </Col>
              <Col md="6">
                {/* Right Column Fields */}
                <Form.Group className="mb-3">
                  <Form.Label>Ticket Type</Form.Label>
                  <Form.Select
                    aria-label="Select Ticket Type"
                    onChange={(e) => setSelectedTicketType(e.target.value)}
                    value={selectedTicketType || ""}
                  >
                    <option>Select...</option>
                    {ticketTypes.map((ttype, index) => (
                      <option key={index} value={ttype.value}>{ttype.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>PO Location</Form.Label>
                  <Form.Select aria-label="Select PO Location" onChange={(e) => handlePOLocationChange(e.target.value)} value={poLocation}>
                    {poLocations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>PO Type</Form.Label>
                  <Form.Select aria-label="Select PO Type" onChange={(e) => handlePOTypeChange(e.target.value)} value={poType}>
                    {poTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Send PO via EDI</Form.Label>
                  <Form.Select aria-label="Select EDI" onChange={(e) => setPOEDI(e.target.value)} value={poEDI}>
                    {poEDIs.map((edi, index) => (
                      <option key={index} value={edi}>{edi}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Order Price Tags</Form.Label>
                  <Form.Select aria-label="Select Price Tag" onChange={(e) => setPriceTag(e.target.value)} value={priceTag}>
                    {orderPriceTags.map((tag, index) => (
                      <option key={index} value={tag}>{tag}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Not Before Date</Form.Label>
                  <Form.Control type="date" value={notBefore} onChange={(e) => setNotBefore(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Not After Date</Form.Label>
                  <Form.Control type="date" value={notAfter} onChange={(e) => setNotAfter(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Multiplication Factor (Optional)</Form.Label>
                  <Select
                    options={multiplicationFactorOptions}
                    value={multiplicationFactorOptions.find(option => option.value === multiplicationFactor) || null}
                    onChange={(option) => setMultiplicationFactor(option ? option.value : null)}
                    placeholder="Select..."
                    isSearchable={true}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>PO Exclusive Deal</Form.Label>
                  <Form.Control
                    type="number"
                    value={dealInfo}
                    onChange={(e) => setDealInfo(e.target.value)}
                    placeholder="Enter Deal Info..."
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          {/* When the user clicks submit, the file will be converted, downloaded, and then the confirmation modal appears */}
          <SubmitButton onClick={() => handleConvertAndDownload()} />
        </Col>
      </Row>
    </Container>
  );
}

export default Upload;
