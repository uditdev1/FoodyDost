import axios from "axios";

export const getUser = () => {
    return localStorage.getItem("user") ? 
        JSON.parse(localStorage.getItem("user")) : null ; 
}

export const login = async (email, password) => {
    const {data} = await axios.post("api/users/login", {email , password});
    localStorage.setItem("user" , JSON.stringify(data));
    return data;
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const register = async (registerData) => {
    const {data} = await axios.post("/api/users/register", registerData);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
}

export const updateProfile = async (user) => {
    const {data} = await axios.put("/api/users/updateProfile", user);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
}

export const getAll = async searchTerm => {
    const { data } = await axios.get('/api/users/getAll/' + (searchTerm ?? ''));
    return data;
};

export const changePassword = async (passData) => {
    await axios.put("/api/users/changePassword", passData);
}

export const toggleBlock = async userId => {
    const { data } = await axios.put('/api/users/toggleBlock/' + userId);
    return data;
};
  
export const getById = async userId => {
    const { data } = await axios.get('/api/users/getById/' + userId);
    return data;
};

export const updateUser = async userData => {
    const { data } = await axios.put('/api/users/update', userData);
    return data;
};

export const mail_verification = async id => {
    const { data } = await axios.put('/api/users/email_verification/'+ id);
    return data;
};

export const sendEmailVerification = async id => {
    const data = await axios.get('/api/users/send_email_verification/'+ id);
    return data;
};

export const verifyToken = async () => {
    try {
        const {data} = await axios.get("/api/users/verifytoken");
        return data;
    } catch (err) {
        return err.response.data;
    }
    
}