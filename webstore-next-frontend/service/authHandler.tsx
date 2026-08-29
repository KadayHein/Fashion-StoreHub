"use client"

export const storeToken = (token : string) => localStorage.setItem('token',token)

export const getToken = () => localStorage.getItem('token')

export const saveLoggedInUser = (email : string) => sessionStorage.setItem('authenticatedUser',email)

export const getLoggedInUser = () => sessionStorage.getItem('authenticatedUser')

export const isUserLoggedIn = () => typeof window === "undefined" ? false : !!localStorage.getItem("token");

export const logoutUser = () => { localStorage.clear(); localStorage.removeItem("token"); sessionStorage.clear(); }