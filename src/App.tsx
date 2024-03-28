import './App.css'
import { RecoilRoot } from 'recoil'
import Shop from './components/Shop'
import Cart from './components/Cart'

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
    </RecoilRoot>
  )
}

export default App
