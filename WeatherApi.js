import axios from 'axios';

const lat = 42.9634;
const lon = 85.6681;
const OpenMapServer = axios.create({
  //  baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${85.6681}&appid=5e6a65c8b51045ae43ef4f6f839d564c`
    baseURL: `https://api.openweathermap.org/data/2.5/weather`
});

OpenMapServer.interceptors.request.use(
    async (config) => {
        // called when request is made.
        config.headers.Accept = 'application/json';
        // const token = await AsyncStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (err) => {
        // called when error
        return Promise.reject(err);
      }
    );

    export const getWeather = async (lat, long, callback) => {
        const response = await OpenMapServer.get(
            `?lat=${lat}&lon=${long}&units=imperial&appid=5e6a65c8b51045ae43ef4f6f839d564c`
        );
        callback(response.data);
    }
    export default OpenMapServer;