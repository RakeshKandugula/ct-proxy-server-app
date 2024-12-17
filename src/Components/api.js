import axios from "axios";

const api = axios.create({
  baseURL:"localhost:3001/api/proxy"
  //baseURL: "https://proxy-server-st.vercel.app/api",
});

export const postXMLFile = async (id, xmlblob) => {
  const formData = new FormData();
  console.log(xmlblob);
  formData.append('file', xmlblob, 'supplierFile.xml');
  console.log(formData);
  try {
    const response = await api.post(`/inbound-integration-endpoints/${id}/upload-and-invoke?context=International`, formData, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
    // Handle the response here if needed
    return response;
  } catch (error) {
    console.error("Error while making the request:", error);
    throw error; // You can rethrow the error or handle it as needed
  }
};

