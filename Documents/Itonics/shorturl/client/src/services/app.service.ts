const axios = require('axios');

export class AppService {
  BaseURL = 'http://localhost:3001/';
  http = axios.create({
    baseURL: this.BaseURL,
    responseType: 'json',
  });

  getHeaders = () => {
    let headerOptions = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return headerOptions;
  };

  public async register(user: object) {
    try {
      const response = await this.http.post(`user/register`, user);
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  }

  public async login(data: object) {
    try {
      const response = await this.http.post(`user/login`, data);
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  }

  public async shortUrl(fullUrl: String) {
    try {
      const userInfo = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : false;

      if (userInfo) {
        let user = userInfo.id;
        const response = await this.http.post(
          ``,
          { fullUrl, user },
          { headers: this.getHeaders() }
        );
        return response.data;
      } else {
        const response = await this.http.post(``, { fullUrl });
        return response.data;
      }
    } catch (err: any) {
      return err.response.data;
    }
  }

  public async fetch() {
    try {
      const userInfo = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : false;
      let user = userInfo.id;
      const response = await this.http.get('shortUrl/' + user, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  }
}
