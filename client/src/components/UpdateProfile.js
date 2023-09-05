import React, { useState } from 'react'
import UpdateUsername from './UpdateUsername'

export default function UpdateProfile() {
  const [showUpdateForm, setShowUpdateForm] = useState(true)
  return (
    <div>
      { showUpdateForm ?
        <div>
        <button onClick={() => setShowUpdateForm((show) => !show)}>change username</button>
        </div>
      :
        <UpdateUsername setShowUpdateForm={setShowUpdateForm} />
      }

      {showUpdateForm ?
        <button>change password</button>
      :
        null
      }
    </div>
  )
}
