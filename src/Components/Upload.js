import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { convert, allowedFile } from "./excelToXml";  // Ensure this is correctly implemented
import { suppliers, buyers, seasons, phases, lifestyles, lifestages, genders, ST_users, ticketTypes, poLocations, poTypes, poEDIs, orderPriceTags, lifestyleDetails, multiplicationFactorOptions, brands } from './constants';
import SubmitButton from './SubmitButton';  // Import the new component
import '../styles/styles.css';

function Upload() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [buyer, setBuyer] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedPhase, setSelectedPhase] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [lifestage, setLifestage] = useState("");
  const [gender, setGender] = useState("");
  const [ST_user, setSTUser] = useState("");
  const [selectedTicketType, setSelectedTicketType] = useState("");
  const [poLocation, setPOLocation] = useState("");
  const [poType, setPOType] = useState("");
  const [poEDI, setPOEDI] = useState("");
  const [priceTag, setPriceTag] = useState("");
  const [notBefore, setNotBefore] = useState("");
  const [notAfter, setNotAfter] = useState("");
  const [selectedLifestyleDetail, setSelectedLifestyleDetail] = useState("");
  const [multiplicationFactor, setMultiplicationFactor] = useState("");
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const formRef = useRef(null);  // Ref for form element

  const resetForm = () => {
    setFile(null);
    setErrorMessage(null);
    setSelectedSupplier(null);
    setSelectedBrand("");
    setBuyer("");
    setSelectedSeason("");
    setSelectedPhase("");
    setLifestyle("");
    setLifestage("");
    setGender("");
    setSTUser("");
    setSelectedTicketType("");
    setPOLocation("");
    setPOType("");
    setPOEDI("");
    setPriceTag("");
    setNotBefore("");
    setNotAfter("");
    setSelectedLifestyleDetail("");
    setMultiplicationFactor("");
    setFileInputKey(Date.now());
  };


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage(null);
  };
  
  const handleSubmit = async () => {
    // Check all mandatory fields
    if (!file || !selectedSupplier || !buyer || !selectedSeason) {
      setErrorMessage('Please fill out all the mandatory fields.');
      return;
    }
  
    if (!allowedFile(file.name)) {
      setErrorMessage('Invalid file format. Please upload a .xlsx file.');
      return;
    }
  
    try {
      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        try {
          const arrayBuffer = event.target.result;
          const result = convert(arrayBuffer, selectedSupplier, selectedBrand, buyer, selectedSeason, selectedPhase, lifestage, gender, ST_user, selectedTicketType, poLocation, poType, poEDI, priceTag, selectedLifestyleDetail, notBefore, notAfter, multiplicationFactor, lifestyle);
          
          if (result.success) {
            const xmlBlob = new Blob([result.xmlString], { type: 'application/xml' });
            const url = URL.createObjectURL(xmlBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'output.xml');
            document.body.appendChild(link);
            link.click();
            link.remove();
            resetForm();
          } else {
            setErrorMessage(`Conversion failed: ${result.error}`);
          }
        } catch (conversionError) {
          setErrorMessage(`Conversion error: ${conversionError.message}`);
        }
      };
      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      setErrorMessage(`File reading error: ${error.message}`);
    }
  };

  const handleLifestyleChange = (selectedOption) => {
    setLifestyle(selectedOption ? selectedOption.value : "");
    setSelectedLifestyleDetail(""); // Reset lifestyle detail on lifestyle change
  };

  const handleLifestyleDetailChange = (selectedOption) => {
    setSelectedLifestyleDetail(selectedOption ? selectedOption.value : "");
  };

  const brandOptions = selectedSupplier ? brands[selectedSupplier.value] || [] : [];

  const handleSupplierChange = (selectedOption) => {
    setSelectedSupplier(selectedOption);
    setSelectedBrand(null); // Reset brand selection when supplier changes
};

const handleBrandChange = (selectedOption) => {
    setSelectedBrand(selectedOption);
};
  

  return (
    <Container className="bg-image">
      <Row className="justify-content-md-center mt-5">
        <Col md="8">
          <Form ref={formRef} className="p-4 bg-light rounded shadow">
            <h4 className="mb-4">Product Creation Form</h4>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Row>
              <Col md="6">
                {/* Left Column Fields */}
                <Form.Group className="mb-3">
                  <Form.Label>Supplier <span style={{ color: "red" }}>*</span></Form.Label>
                  <Select
                    options={suppliers.sort((a, b) => a.value.localeCompare(b.value))}
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
                  <Form.Label>Buyer <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Select aria-label="Select Buyer" onChange={(e) => setBuyer(e.target.value)} value={buyer} required>
                    <option>Select...</option>
                    {buyers.map((b, index) => (
                      <option key={index} value={b}>{b}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Season <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Select aria-label="Select Season" onChange={(e) => {
                    setSelectedSeason(parseInt(e.target.value));
                    setSelectedPhase(""); // Reset phase on season change
                  }} value={selectedSeason} required>
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
                  <Form.Label>Consumer Lifestage</Form.Label>
                  <Form.Select aria-label="Select Lifestage" onChange={(e) => setLifestage(e.target.value)} value={lifestage}>
                    <option>Select...</option>
                    {lifestages.map((ls, index) => (
                      <option key={index} value={ls}>{ls}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Lifestyle</Form.Label>
                  <Select
                    options={lifestyles.map(l => ({ value: l, label: l }))}
                    value={lifestyle ? { value: lifestyle, label: lifestyle } : null}
                    onChange={handleLifestyleChange}
                    placeholder="Select..."
                    isSearchable={true}
                  />
                </Form.Group>
                {lifestyle !== "None" && lifestyle && (
                  <Form.Group className="mb-3">
                    <Form.Label>{`${lifestyle}'s Lifestyle`}</Form.Label>
                    <Select
                      options={lifestyleDetails[lifestyle] || []}
                      value={selectedLifestyleDetail ? { value: selectedLifestyleDetail, label: selectedLifestyleDetail } : null}
                      onChange={handleLifestyleDetailChange}
                      placeholder="Select..."
                      isSearchable={true}
                    />
                  </Form.Group>
                )}
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
                  <Form.Label>ST User</Form.Label>
                  <Form.Select aria-label="Select ST User" onChange={(e) => setSTUser(e.target.value)} value={ST_user}>
                    <option>Select...</option>
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
                  value={selectedTicketType || ""}  // Ensure it defaults to an empty string if not set
                >
                  <option>Select...</option>
                  {ticketTypes.map((ttype, index) => (
                    <option key={index} value={ttype.value}>{ttype.label}</option>
                  ))}
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>PO Location</Form.Label>
                  <Form.Select aria-label="Select PO Location" onChange={(e) => setPOLocation(e.target.value)} value={poLocation}>
                    <option>Select...</option>
                    {poLocations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>PO Type</Form.Label>
                  <Form.Select aria-label="Select PO Type" onChange={(e) => setPOType(e.target.value)} value={poType}>
                    <option>Select...</option>
                    {poTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Send PO via EDI</Form.Label>
                  <Form.Select aria-label="Select EDI" onChange={(e) => setPOEDI(e.target.value)} value={poEDI}>
                    <option>Select...</option>
                    {poEDIs.map((edi, index) => (
                      <option key={index} value={edi}>{edi}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Order Price Tags</Form.Label>
                  <Form.Select aria-label="Select Price Tag" onChange={(e) => setPriceTag(e.target.value)} value={priceTag}>
                    <option>Select...</option>
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
              </Col>
            </Row>
          </Form>
          <SubmitButton onClick={handleSubmit} />  {/* Use the SubmitButton component */}
        </Col>
      </Row>
    </Container>
  );
}

export default Upload;
