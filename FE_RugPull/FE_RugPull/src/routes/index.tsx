import HomePage from "../pages/HomeTemplates/HomePage";

import React from "react";
import { Route } from "react-router-dom";
import HomeTemplates from "../pages/HomeTemplates";
import LoginPage from "../pages/HomeTemplates/Login";
import SignUpPage from "../pages/HomeTemplates/Signup";
import AboutPage from "../pages/HomeTemplates/AboutPage";
import ContactPage from "../pages/HomeTemplates/ContactPage";
import FAQPage from "../pages/HomeTemplates/FAQPage";
import FeaturePage from "../pages/HomeTemplates/FeaturesPage";
import RugPullPage from "../pages/HomeTemplates/RugPullPage";
import DetectPage from "../pages/HomeTemplates/DetectPage";
import TermsOfService from "../pages/HomeTemplates/TermsOfUsePage";
import PrivacyPage from "../pages/HomeTemplates/PrivacyPage";
import TermsOfOperation from "../pages/HomeTemplates/TermsOfOperation";
import PageNotFound from "../pages/PageNotFound";
import PremiumPage from "../pages/HomeTemplates/PremiumPage";
import CheckOutPage from "../pages/HomeTemplates/CheckoutPage";
import GetLPAPage from "../pages/HomeTemplates/GetLPAPage";
import RetrievePage from "../pages/HomeTemplates/RetrievePage";
import DefinitionPage from "../pages/HomeTemplates/Definition";


type TRoute = {
  path: string;
  element: React.ReactNode;
  children?: TRoute[];
};

export const routes: TRoute[] = [
  {
    path: "",
    element: <HomeTemplates />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/signup",
        element : <SignUpPage />
      },
      {
        path: "/about",
        element : <AboutPage />
      },
      {
        path: "/contact",
        element : <ContactPage />
      },
      {
        path: "/faq",
        element : <FAQPage />
      },
      {
        path: "/features",
        element : <FeaturePage />
      },
      {
        path: "/rugpull",
        element : <RugPullPage />
      },
      {
        path: "/detect",
        element : <DetectPage />
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPage />,
      },
      {
        path: "/terms-of-operation",
        element: <TermsOfOperation />
      },
      {
        path: "/premium",
        element: <PremiumPage />
      },
      {
        path: "/checkout",
        element: <CheckOutPage />
      },
      {
        path: "/getlpa",
        element: <GetLPAPage />
      },
      {
        path: "/retrieve",
        element: <RetrievePage />
      },
      {
        path: "/definition",
        element: <DefinitionPage />
      },
    ],
  },
  {
    path : "*",
    element : <PageNotFound />
  }
  
];

export const renderRoutes = (routes: TRoute[]) => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      );
    }
    return <Route key={route.path} path={route.path} element={route.element} />;
  });
};


