// import { useSelector } from 'react-redux';
// import { Route, Redirect } from 'react-router-dom';

// function ProtectedRoute({ component: Component, ...rest }) {
//   const isUserAuth = Boolean(useSelector((state) => state.user.token));
//   return (
//     <Route
//       {...rest}
//       render={(props) => (isUserAuth ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: '/login',
//           }}
//         />
//       ))}
//     />
//   );
// }

// export default ProtectedRoute;
