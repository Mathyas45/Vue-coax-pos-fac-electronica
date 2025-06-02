const setTitle = (title: string) => {
  return title
    ? `${title} | Rizz Vue - Responsive Admin Dashboard Template`
    : "Rizz Vue | Responsive Admin Dashboard Template";
};

const authRoutes = [
  {
    path: "/auth/sign-in",
    name: "auth.sign-in",
    meta: {
      title: setTitle("Sign In"),
      authLogin:true,
    },
    component: () => import("@/views/auth/login.vue"),
  },
  {
    path: "/products",
    name: "products",
    meta: {
      title: setTitle("Productos"),
      authRequired: true,
      permission: 'all',
    },
    component: () => import("@/views/products.vue"),
  },
  // {
    //   path: "/auth/register",
    //   name: "auth.register",
    //   meta: {
    //     title: setTitle("Register"),
    //   },
    //   component: () => import("@/views/auth/register.vue"),
    // },
    // {
    //   path: "/auth/reset-pass",
    //   name: "auth.reset-pass",
    //   meta: {
    //     title: setTitle("Reset Password"),
    //   },
    //   component: () => import("@/views/auth/reset-pass.vue"),
    // },
    // {
    //   path: "/auth/lock-screen",
    //   name: "auth.lock-screen",
    //   meta: {
    //     title: setTitle("Lock Screen"),
    //   },
    //   component: () => import("@/views/auth/lock-screen.vue"),
    // },
    // {
    //   path: "/auth/maintenance",
    //   name: "auth.maintenance",
    //   meta: {
    //     title: setTitle("Maintenance"),
    //   },
    //   component: () => import("@/views/auth/maintenance.vue"),
  // },
];

const errorRoutes = [
  {
    path: "/auth/error-404",
    name: "error.404",
    meta: {
      title: setTitle("Error 404"),
    },
    component: () => import("@/views/auth/error-404.vue"),
  },
  {
    path: "/auth/error-500",
    name: "error.500",
    meta: {
      title: setTitle("Error 500"),
    },
    component: () => import("@/views/auth/error-500.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/auth/error-404",
  },
];

const dashboardRoutes = [
  {
    path: "/",
    name: "dashboards.analytics",
    meta: {
      title: setTitle("Analytics"),
      authRequired: true,
      permission: 'all',
    },
    component: () => import("@/views/dashboards/analytics/index.vue"),
  },
  {
    path: "/dashboards/ecommerce",
    name: "dashboards.ecommerce",
    meta: {
      title: setTitle("Ecommerce"),
      authRequired: true,
      permission: 'all',
    },
    component: () => import("@/views/dashboards/ecommerce/index.vue"),
  },
];



export const allRoute = [
  ...authRoutes,
  ...errorRoutes,
  ...dashboardRoutes,
];
