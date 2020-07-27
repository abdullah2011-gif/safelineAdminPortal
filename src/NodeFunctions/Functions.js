import config from '../config'
import axios from 'axios'
import React from 'react'
export default class Apimanager{
 async Getroute(route){
    try {
      const response = await axios.get(`${config.url}${route}`);
      if(response.status==404||response.status==500){
        return window.location.href = `/admin/Error`;
      }
      // console.log(response+'jkjkj');
      // alert('')
      return response.data
    } catch (error) {
      
      // console.log(error +'hjklj');
      // alert('')
     return window.location.href = `/admin/Error`;
    }
}

async PutrouteByid(route,data){
  try {
    const response = await axios.put(`${config.url}${route}`,{
      ...data
    });
    if(response.status==404||response.status==500){
      return window.location.href = `/admin/Error`;
    }
    return response
  } catch (error) {
    return window.location.href = `/admin/Error`;
  }}
  async postroute(route,data){
    try {
      const response = await axios.post(`${config.url}${route}`,{
        ...data
      });
      if(response.status==404||response.status==500){
        return window.location.href = `/admin/Error`;
      }
      return response
    } catch (error) {
      return window.location.href = `/admin/Error`;
    }}

    async deleterouteByid(route,data){
      try {
        const response = await axios.delete(`${config.url}${route}`,{
          ...data
        });
        if(response.status==404||response.status==500){
          return window.location.href = `/admin/Error`;
        }
        return response
      } catch (error) {
        return window.location.href = `/admin/Error`;
      }}

      async postrouteFormdata(route,data){
        try {
          const response = await axios.post(`${config.url}${route}`,data);
          if(response.status==404||response.status==500){
            return window.location.href = `/admin/Error`;
          }
          return response
        } catch (error) {
          return window.location.href = `/admin/Error`;
        }}

        async getrouteByid(route){
          try {
            const response = await axios.get(`${config.url}${route}`);
            if(response.status==404||response.status==500){
              return window.location.href = `/admin/Error`;
            }
            return response
          } catch (error) {
            return window.location.href = `/Error`;
          }}
    
}