import { destroyCookie } from 'nookies';


export default function logoutRequestHandler(req, res) {
  destroyCookie({ res }, 'USER_TOKEN', { path: '/' });
  res.redirect('/login');
}
