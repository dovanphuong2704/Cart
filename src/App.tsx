import './App.css'
import { RecoilRoot } from 'recoil'
import Shop from './components/Shop'
import Cart from './components/Cart'
import 'react-notifications/lib/notifications.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContent = () => {
  return (
    <>
      <div className='container'>
        <div className="container-shop"> <Shop /></div>
        <div className="container-cart"><Cart /></div>
      </div>
    </>
  )
}

function App() {
  return (
    <RecoilRoot>
      <AppContent />
      <ToastContainer />
    </RecoilRoot>
  )
}

export default App
