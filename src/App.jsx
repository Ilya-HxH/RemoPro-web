// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuthStore } from './store/authStore';
// import LoginScreen from './screens/common/LoginScreen';
// import RegisterClientScreen from './screens/common/RegisterClientScreen';
// import RegisterContractorScreen from './screens/common/RegisterContractorScreen';
// import RegisterRoleScreen from './screens/common/RegisterRoleScreen';
// import Layout from './layout/Layout';

// // Client screens
// import ClientHomeScreen from './screens/client/HomeScreen';
// import ProjectsScreen from './screens/client/ProjectScreen';
// import TeamsScreen from './screens/client/TeamsScreen';
// import ChatScreen from './screens/client/ChatScreen';
// import TeamDetailScreen from './screens/client/TeamDetailScreen';
// import UserProfileScreen from './screens/client/UserProfileScreen';
// import NotificationScreen from './screens/client/NotificationScreen';
// import ProjectDetailScreen from './screens/client/ProjectDetailScreen';
// import CreateProjectStep1Screen from './screens/client/projectCreate/ProjectCreateStep1Screen';
// import CreateProjectStep2Screen from './screens/client/projectCreate/ProjectCreateStep2Screen';
// import CreateProjectStep3Screen from './screens/client/projectCreate/ProjectCreateStep3Screen';

// // Contractor screens
// import ContractorHomeScreen from './screens/contractor/HomeScreen';
// import ContractorProjectsScreen from './screens/contractor/ProjectsScreen';
// import ContractorOrdersScreen from './screens/contractor/OrderScreen';
// import ContractorChatScreen from './screens/contractor/ChatScreen';
// import ContractorProfileScreen from './screens/contractor/ContractorProfileScreen';
// import EditContractorProfileScreen from './screens/contractor/EditContractorProfileScreen';
// import ContractorNotificationScreen from './screens/contractor/NotificationScreen';
// import ContractorProjectDetailScreen from './screens/contractor/ProjectDetailScreen';

// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const role = useAuthStore(state => state.role);
  
//   if (!role) {
//     return <Navigate to="/login" replace />;
//   }
  
//   if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
//     return <Navigate to="/home" replace />;
//   }
  
//   return children;
// };

// // Public Route component (redirect if authenticated)
// const PublicRoute = ({ children }) => {
//   const role = useAuthStore(state => state.role);
  
//   if (role) {
//     return <Navigate to="/home" replace />;
//   }
  
//   return children;
// };

// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           {/* Public routes */}
//           <Route 
//             path="/login" 
//             element={
//               <PublicRoute>
//                 <LoginScreen />
//               </PublicRoute>
//             } 
//           />
//           <Route 
//             path="/register" 
//             element={
//               <PublicRoute>
//                 <RegisterRoleScreen />
//               </PublicRoute>
//             } 
//           />
//           <Route 
//             path="/register/client" 
//             element={
//               <PublicRoute>
//                 <RegisterClientScreen />
//               </PublicRoute>
//             } 
//           />
//           <Route 
//             path="/register/contractor" 
//             element={
//               <PublicRoute>
//                 <RegisterContractorScreen />
//               </PublicRoute>
//             } 
//           />

//           {/* Client routes */}
//           <Route 
//             path="/home" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
//                 <ClientHomeScreen />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/projects" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
//                 <ProjectsScreen />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/teams" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
//                 <TeamsScreen />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/chat" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
//                 <ChatScreen />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/notifications" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
//                 <NotificationScreen />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/profile" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
//                 <UserProfileScreen />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/team/:id" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
//                 <TeamDetailScreen />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/project/:id" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
//                 <ProjectDetailScreen />
//               </ProtectedRoute>
//             } 
//           />

//           {/* Contractor routes */}
//           <Route 
//             path="/contractor/home" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
//                 <ContractorHomeScreen />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/contractor/projects" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
//                 <ContractorProjectsScreen />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/orders" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
//                 <ContractorOrdersScreen />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/contractor/chat" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
//                 <ContractorChatScreen />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/contractor/notifications" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
//                 <ContractorNotificationScreen />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/contractor/profile" 
//             element={
//               <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
//                 <ContractorProfileScreen />
//               </ProtectedRoute>
//             } 
//           />

//           {/* Default redirects */}
//           <Route 
//             path="/" 
//             element={<Navigate to="/home" replace />} 
//           />
          
//           {/* 404 fallback */}
//           <Route 
//             path="*" 
//             element={
//               <div className="flex flex-col items-center justify-center min-h-64">
//                 <h1 className="text-2xl font-bold text-gray-900 mb-2">404 - Страница не найдена</h1>
//                 <p className="text-gray-600 mb-4">Запрашиваемая страница не существует</p>
//                 <button 
//                   onClick={() => window.history.back()}
//                   className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
//                 >
//                   Вернуться назад
//                 </button>
//               </div>
//             } 
//           />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LoginScreen from './screens/common/LoginScreen';
import RegisterClientScreen from './screens/common/RegisterClientScreen';
import RegisterContractorScreen from './screens/common/RegisterContractorScreen';
import RegisterRoleScreen from './screens/common/RegisterRoleScreen';
import Layout from './layout/Layout';

// Client screens
import ClientHomeScreen from './screens/client/HomeScreen';
import ProjectsScreen from './screens/client/ProjectScreen';
import TeamsScreen from './screens/client/TeamsScreen';
import ChatScreen from './screens/client/ChatScreen';
import TeamDetailScreen from './screens/client/TeamDetailScreen';
import UserProfileScreen from './screens/client/UserProfileScreen';
import NotificationScreen from './screens/client/NotificationScreen';
import ProjectDetailScreen from './screens/client/ProjectDetailScreen';
import CreateProjectStep1Screen from './screens/client/projectCreate/ProjectCreateStep1Screen';
import CreateProjectStep2Screen from './screens/client/projectCreate/ProjectCreateStep2Screen';
import CreateProjectStep3Screen from './screens/client/projectCreate/ProjectCreateStep3Screen';

// Contractor screens
import ContractorHomeScreen from './screens/contractor/HomeScreen';
import ContractorProjectsScreen from './screens/contractor/ProjectsScreen';
import ContractorOrdersScreen from './screens/contractor/OrderScreen';
import ContractorChatScreen from './screens/contractor/ChatScreen';
import ContractorProfileScreen from './screens/contractor/ContractorProfileScreen';
import EditContractorProfileScreen from './screens/contractor/EditContractorProfileScreen';
import ContractorNotificationScreen from './screens/contractor/NotificationScreen';
import ContractorProjectDetailScreen from './screens/contractor/ProjectDetailScreen';

// Временно отключаем проверку аутентификации для тестирования
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // Закомментировано для тестирования
  // const role = useAuthStore(state => state.role);
  
  // if (!role) {
  //   return <Navigate to="/login" replace />;
  // }
  
  // if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
  //   return <Navigate to="/home" replace />;
  // }
  
  return children;
};

// Отключаем редирект для публичных роутов
const PublicRoute = ({ children }) => {
  // Закомментировано для тестирования
  // const role = useAuthStore(state => state.role);
  
  // if (role) {
  //   return <Navigate to="/home" replace />;
  // }
  
  return children;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes - теперь доступны всегда */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginScreen />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <RegisterRoleScreen />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register/client" 
            element={
              <PublicRoute>
                <RegisterClientScreen />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register/contractor" 
            element={
              <PublicRoute>
                <RegisterContractorScreen />
              </PublicRoute>
            } 
          />

          {/* Client routes - теперь доступны без проверки роли */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <ClientHomeScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <ProjectsScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teams" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <TeamsScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <ChatScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <NotificationScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <UserProfileScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/team/:id" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <TeamDetailScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/project/:id" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <ProjectDetailScreen />
              </ProtectedRoute>
            } 
          />

          {/* Project creation routes */}
          <Route 
            path="/project/create/step1" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <CreateProjectStep1Screen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/project/create/step2" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <CreateProjectStep2Screen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/project/create/step3" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <CreateProjectStep3Screen />
              </ProtectedRoute>
            } 
          />

          {/* Contractor routes - теперь доступны без проверки роли */}
          <Route 
            path="/contractor/home" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
                <ContractorHomeScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contractor/projects" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
                <ContractorProjectsScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contractor/project/:id" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
                <ContractorProjectDetailScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contractor/orders" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
                <ContractorOrdersScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contractor/chat" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
                <ContractorChatScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contractor/notifications" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
                <ContractorNotificationScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contractor/profile" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
                <ContractorProfileScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contractor/profile/edit" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_CONTRACTOR']}>
                <EditContractorProfileScreen />
              </ProtectedRoute>
            } 
          />

          {/* Default redirects */}
          <Route 
            path="/" 
            element={<Navigate to="/login" replace />} 
          />
          
          {/* 404 fallback */}
          <Route 
            path="*" 
            element={
              <div className="flex flex-col items-center justify-center min-h-64">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">404 - Страница не найдена</h1>
                <p className="text-gray-600 mb-4">Запрашиваемая страница не существует</p>
                <button 
                  onClick={() => window.history.back()}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Вернуться назад
                </button>
              </div>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;