import { destroyCookie } from 'nookies';


export default function LogoutRequestHandler(req, res) {
  destroyCookie({ res }, 'USER_TOKEN', { path: '/' });
  res.redirect('/login');
}
