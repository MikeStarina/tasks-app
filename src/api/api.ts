import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../utils/constants';
import { TLoginResponse, TUser, TPassportResponse, TModelTypesResponse, TSupplierResponse, TUploadResponse } from '../utils/types';



export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<TLoginResponse, { identifier: string, password: string }>({
      query: (data) => ({
        url: '/api/auth/local',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-type": "Application/json",
          "Content-length": "*"
        }
      }),
    }),
    getMyUserData: builder.mutation<TUser, string>({
      query: (token) => ({
        url: '/api/users/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
          "Content-Length": "*",
        },
      })
    }),
    getPassports: builder.query<TPassportResponse, string>({
      query: (token) => ({
        url: '/api/passports?populate=*',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
          "Content-Length": "*",
        },
      })
    }),
    getModelTypes: builder.query<TModelTypesResponse, string>({
      query: (token) => ({
        url: '/api/model-types?populate=*',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
          "Content-Length": "*",
        },
      })
    }),
    getSuppliers: builder.query<TSupplierResponse, string>({
      query: (token) => ({
        url: '/api/suppliers',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
          "Content-Length": "*",
        },
      })
    }),
    previewUpload: builder.mutation<Array<TUploadResponse>, {userToken: string, file: any}>({
      query: (data) => ({
        url: '/api/upload/',
        method: 'POST',
        body: data.file,
        headers: {
          Authorization: `Bearer ${data.userToken}`,
          //"Content-Type": '*',
          //"Content-Length": "*",
        },
      })
    }),
    mockupUpload: builder.mutation<Array<TUploadResponse>, {userToken: string, file: any}>({
      query: (data) => ({
        url: '/api/upload/',
        method: 'POST',
        body: data.file,
        headers: {
          Authorization: `Bearer ${data.userToken}`,
          //"Content-Type": '*',
          //"Content-Length": "*",
        },
      })
    }),
    createOrder: builder.mutation<unknown, { data: { data: { number: string, user: any, order: string }}, userToken: string}>({
      query: (data) => ({
        url: '/api/orders',
        method: 'POST',
        body: data.data,
        headers: {
          Authorization: `Bearer ${data.userToken}`,
          "Content-Type": "Application/json",
          "Content-Length": "*",
        },
      })
    }),
    getOrders: builder.query<unknown, string>({
      query: (token) => ({
        url: '/api/orders',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
          "Content-Length": "*",
        },
      })
    }),
    deleteOrder: builder.mutation<any, {id: number, token: string}>({
      query: (data) => ({
        url: `/api/orders/${data.id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "Application/json",
          "Content-Length": "*",
        },
      })
    }),
    updateOrder: builder.mutation<unknown, { data: { data: { number: string, user: any, order: string }}, userToken: string, id: string}>({
      query: (data) => ({
        url: `/api/orders/${data.id}`,
        method: 'PUT',
        body: data.data,
        headers: {
          Authorization: `Bearer ${data.userToken}`,
          "Content-Type": "Application/json",
          "Content-Length": "*",
        },
      })
    })
  }),
});


export const { 
  useLoginMutation,
  useGetMyUserDataMutation, 
  useGetPassportsQuery, 
  useGetModelTypesQuery,
  useGetSuppliersQuery,
  usePreviewUploadMutation,
  useMockupUploadMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} = api;