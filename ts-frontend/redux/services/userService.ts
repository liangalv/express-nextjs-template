import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const expressUrl = process.env.NEXT_PUBLIC_EXPRESS_URL; 
export const userApi = createApi({
    //Queries
    reducerPath: 'userId',
    baseQuery: fetchBaseQuery({ baseUrl: `${expressUrl}`}),
    endpoints: (builder) => ({
      getUserById: builder.query<UserState,string>({
        query: (id) => `user/${id}`,
      }),
      //Mutations
      handleUserLogin: builder.mutation({
        query: (credentials: {username: string, password: string}) => ({
          url: 'auth/login', // Ensure this is a correct relative path
          method: 'POST',
          body: credentials // Directly pass the credentials object
        })
      })
    }),
  })

  export const {useGetUserByIdQuery, useHandleUserLoginMutation} = userApi