import config from "../config";
import axios from "axios";
import React from "react";
export default class Apimanager {
  async Getroute(route, params = {}) {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    try {
      const response = await axios.get(`${config.url}${route}`, {
        headers: { Authorization: user && "Bearer " + user.token },
        params: { ...params },
      });
      if (response.status == 404 || response.status == 500) {
        return (window.location.href = `/admin/Error`);
      }
      // console.log(response+'jkjkj');
      // alert('')
      return response.data;
    } catch (error) {
      console.log(error.response.data + "hjklj");
      // alert('')
      // return (window.location.href = `/admin/Error`);
    }
  }

  async PutrouteByid(route, data) {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    try {
      const response = await axios.put(
        `${config.url}${route}`,
        {
          ...data,
        },
        {
          headers: { Authorization: user && "Bearer " + user.token },
        }
      );
      if (response.status == 404 || response.status == 500) {
        return (window.location.href = `/admin/Error`);
      }
      return response;
    } catch (error) {
      console.log(error.response);
      // return (window.location.href = `/admin/Error`);
    }
  }
  async postroute(route, data) {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    try {
      const response = await axios.post(
        `${config.url}${route}`,
        {
          ...data,
        },
        {
          headers: { Authorization: user && "Bearer " + user.token },
        }
      );
      if (response.status == 404 || response.status == 500) {
        return (window.location.href = `/admin/Error`);
      }
      return response;
    } catch (error) {
      console.log(error.response.data);
      // return (window.location.href = `/admin/Error`);
    }
  }

  async deleterouteByid(route, data) {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    try {
      const response = await axios.delete(`${config.url}${route}`, {
        ...data,
      });
      if (response.status == 404 || response.status == 500) {
        return (window.location.href = `/admin/Error`);
      }
      return response;
    } catch (error) {
      return (window.location.href = `/admin/Error`);
    }
  }
  async patchroute(route, data) {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    try {
      const response = await axios.patch(
        `${config.url}${route}`,
        {
          ...data,
        },
        {
          headers: { Authorization: user && "Bearer " + user.token },
        }
      );
      if (response.status == 404 || response.status == 500) {
        return (window.location.href = `/admin/Error`);
      }
      return response;
    } catch (error) {
      return (window.location.href = `/admin/Error`);
    }
  }

  async postrouteFormdata(route, data) {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    try {
      const response = await axios.post(`${config.url}${route}`, data, {
        headers: { Authorization: user && "Bearer " + user.token },
      });
      if (response.status == 404 || response.status == 500) {
        return (window.location.href = `/admin/Error`);
      }
      return response;
    } catch (error) {
      return (window.location.href = `/admin/Error`);
    }
  }

  async getrouteByid(route) {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    try {
      const response = await axios.get(`${config.url}${route}`, {
        headers: { Authorization: user && "Bearer " + user.token },
      });
      if (response.status == 404 || response.status == 500) {
        return (window.location.href = `/admin/Error`);
      }
      return response;
    } catch (error) {
      return (window.location.href = `/Error`);
    }
  }
}
