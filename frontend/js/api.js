const API = {
  async request(endpoint, options = {}) {
    
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const headers = {"Content-Type": "application/json",...options.headers,};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {...options, headers,});
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  get(endpoint) {
    return this.request(endpoint);
  },

  post(endpoint, body) {
    return this.request(endpoint, {method: "POST",body: JSON.stringify(body),});
  },

  put(endpoint, body) {
    return this.request(endpoint, {method: "PUT", body: JSON.stringify(body),});
  },

  delete(endpoint) {
    return this.request(endpoint, {method: "DELETE",});
  },
};