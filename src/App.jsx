import { ToastContainer } from 'react-toastify'
import { Slide } from 'react-toastify'

import AppRouter from "./router/AppRouter"

function App() {
  return (
    <div>
      <ToastContainer
      autoClose={1200}
      transition={Slide}
      position='bottom-right'
      />
      <AppRouter />
    </div>
  )
}

export default App