import React from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

const ToastComponent = () => {
  return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Bounce}
        />
      </div>
  )
}

export default ToastComponent