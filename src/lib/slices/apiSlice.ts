import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface UpdateTaskOrderDto {
  tasks: { id: string; order: number }[];
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/",
  prepareHeaders: (headers, { endpoint }) => {
    // Add Authorization header only for 'tasks' related endpoints
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Define the combined API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    // Auth endpoints
    registerUser: builder.mutation<any, any>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation<
      { access_token: string; user: any },
      { email: string; password: string }
    >({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    updateTaskOrder: builder.mutation({
      query: (payload) => ({
        url: "/order/update",
        method: "PATCH",
        body: { items: payload },
      }),
    }),

    // Task management endpoints
    fetchTasks: builder.query<any, void>({
      query: () => "/todos",
    }),
    addTask: builder.mutation<any, any>({
      query: (taskData) => ({
        url: "/todos",
        method: "POST",
        body: taskData,
      }),
    }),
    updateTask: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTask: builder.mutation<any, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
    }),
    updateProfile: builder.mutation<any, any>({
      query: (profileData) => ({
        url: "user/update-profile",
        method: "PUT",
        body: profileData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    getProfile: builder.query<any, void>({
      query: () => "user/profile",
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useFetchTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useUpdateTaskOrderMutation,
  useForgotPasswordMutation,
} = apiSlice;
