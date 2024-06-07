const uploadFile = async (file) => {
    const CloudName = import.meta.env.VITE_CLOUD_NAME; 
    const url = `https://api.cloudinary.com/v1_1/${CloudName}/auto/upload`
  console.log("cloud",CloudName)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset','chat-app');
  
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
  
    const responseData = await response.json();
    return responseData;
  };
  
  export default uploadFile;
  