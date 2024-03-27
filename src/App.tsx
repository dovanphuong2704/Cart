import './App.css'
import { RecoilRoot } from 'recoil'
import Shop from './components/Shop'
import Cart from './components/Cart'

const AppContent = () => {
  return (
    <div>
      <Shop />
      <Cart />
    </div>
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
